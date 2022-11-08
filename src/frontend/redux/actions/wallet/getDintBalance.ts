import * as ethers from 'ethers'; // We pull ethers into our project 
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch, store } from '../../store';

const provider = new ethers.providers.JsonRpcProvider(`${process.env.REACT_APP_JSON_RPC_MUMBAI_URL}`); // We set up connection to blockchain

type walletState = {
  name: string;
  symbol: string;
  balance: string;
};

const initialState: walletState = {
  name: '',
  symbol: '',
  balance: '',
};

const slice = createSlice({
  name: 'dint',
  initialState,
  reducers: {
    setName(state, action) {
      return { ...state, ...action.payload };
    },
    setSymbol(state, action) {
      return { ...state, ...action.payload };
    },
    setBalance(state, action) {
      return { ...state, ...action.payload };
    }
  }
});

export const getDintBalance = () => async (dispatch: AppDispatch) => {

  const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
  ];

  const tokenAddress: any = process.env.REACT_APP_DINT_CONTRACT_ADDR
  const address: any = store.getState().wallet
  const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider)
  const nameDint = await contract.name()
  const symbolDint = await contract.symbol()
  const totalSupply = await contract.totalSupply()

  const balance = await contract.balanceOf(tokenAddress)

  dispatch(slice.actions.setName({ name: nameDint }));
  dispatch(slice.actions.setSymbol({ symbol: symbolDint }));
  dispatch(slice.actions.setBalance({ balance: ethers.utils.formatEther(balance) }));
}

export default slice.reducer;
export const { setName, setSymbol, setBalance } = slice.actions;
