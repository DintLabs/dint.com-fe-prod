import moment from 'moment';
import axios from 'frontend/api/axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from 'frontend/redux/store';

export type Transaction = {
  id: string | number;
  txHash: string;
  status: 'pending' | 'success' | 'failed',
  amount: number;
  date: string;
};

type WalletState = {
  balance: number;
  address: string;
  transactions: Transaction[];
};

type SendTipPayload = {
  senderId: number;
  receiverId: number;
  amount: number;
};

const initialState: WalletState = {
  balance: localStorage.getItem('walletBalance')
    ? +(localStorage.getItem('walletBalance') as string)
    : 0,
  address: localStorage.getItem('walletAddress') ?? '',
  transactions: [],
};

const slice = createSlice({
  name: 'walletState',
  initialState,
  reducers: {
    setBalance(state, action) {
      localStorage.setItem('walletBalance', action.payload);
      return { ...state, balance: action.payload };
    },
    setAddress(state, action) {
      localStorage.setItem('walletAddress', action.payload);
      return { ...state, address: action.payload };
    },
    setTransactionList(state, action: PayloadAction<Transaction[]>) {
      const pendingTransactions = state.transactions.filter((t) => t.status === 'pending');
      return {
        ...state,
        transactions: [
          ...pendingTransactions,
          ...action.payload,
        ],
      };
    },
    addTransaction(state, action: PayloadAction<Transaction>) {
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    },
    updateTransaction(state, action: PayloadAction<{ id: string, updates: Transaction }>) {
      return {
        ...state,
        transactions: state.transactions.map((transaction) => {
          return transaction.id === action.payload.id
            ? action.payload.updates
            : transaction;
        }),
      };
    },
    deleteTransaction(state, action: PayloadAction<string>) {
      return {
        ...state,
        transactions: state.transactions.filter(
          (t) => t.id !== action.payload,
        ),
      };
    }
  },
});

export const getWalletBalance = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const token = localStorage.getItem('apiToken');
      if (!token) return;

      const { data } = await axios.get('api/user/wallet');
      if (data.code !== 200) return;

      dispatch(slice.actions.setAddress(data.data.wallet_address));
      dispatch(slice.actions.setBalance(data.data.wallet_balance));
    } catch (error) {
      console.error('Error while retrieving the wallet balance:', error);
    }
  };
};

export const getTransactionsList = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const token = localStorage.getItem('apiToken');
      if (!token) return;

      const { data } = await axios.get('api/user/get_payouts_by_token/');
      if (data.code !== 200) return;

      const transactions: Transaction[] = (data.data ?? []).map((raw: any, i: number) => {
        return {
          id: `${Date.now().toString()}_${i}`,
          date: raw.accountNumber,
          amount: raw.amount,
          status: raw.paid ? 'success' : 'failed',
          txHash: raw.txHash,
        };
      });
      dispatch(slice.actions.setTransactionList(transactions));
    } catch (error) {
      console.error('Error while retrieving transactions list:', error);
    }
  };
};

export const sendTip = ({
  senderId,
  receiverId,
  amount,
}: SendTipPayload) => {
  return (dispatch: AppDispatch) => {
    const transactionId = Date.now().toString();

    try {
      const token = localStorage.getItem('apiToken');
      if (!token) throw new Error('Token not found');

      let transaction: Transaction = {
        id: transactionId,
        txHash: '',
        status: 'pending',
        amount,
        date: moment(new Date()).format('YYYY-MM-DD'),
      };
      dispatch(slice.actions.addTransaction(transaction));

      axios.post('api/user/send-dint/', {
        sender_id: senderId,
        reciever_id: receiverId,
        amount,
      })
        .then(({ data }: { data: any }) => {
          if (data.status === 400) {
            return dispatch(slice.actions.deleteTransaction(transactionId));
          }

          const updates: Transaction = data.status === 200 ? {
            ...transaction,
            txHash: data.data.txHash,
            status: 'success',
          } : {
            ...transaction,
            txHash: data?.data?.txHash ?? '',
            status: 'failed',
          };

          dispatch(slice.actions.updateTransaction({
            id: transactionId,
            updates,
          }));
        })
        .catch((error: any) => {
          console.error('Error while sending tip:', error);
          const updates: Transaction = { ...transaction, status: 'failed' };
          dispatch(slice.actions.updateTransaction({
            id: transactionId,
            updates,
          }));
        });
    } catch (error) {
      console.error('Internal error while sending tip:', error);
      dispatch(slice.actions.deleteTransaction(transactionId));
    }
  };
};

export default slice.reducer;
