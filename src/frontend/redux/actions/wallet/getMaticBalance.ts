import * as ethers from 'ethers'; // We pull ethers into our project 
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch, store } from '../../store';

const provider = new ethers.providers.JsonRpcProvider(`${process.env.REACT_APP_JSON_RPC_URL}`); // We set up connection to blockchain


type walletState = {
  maticWallet: any;
};

const initialState: walletState = {
  maticWallet: '',
};

const slice = createSlice({
  name: 'matic',
  initialState,
  reducers: {
    setMaticWallet(state, action) {
      return { ...state, ...action.payload };
    }
  }
});

export const getMaticBalance = () => async (dispatch: AppDispatch) => {
  const { address }: any = store.getState().wallet // We get the user's wallet address from our database encrypted and decrypt it 
  const balance = await provider.getBalance(address)
  dispatch(slice.actions.setMaticWallet({ maticWallet: ethers.utils.formatEther(balance) }));
}

export default slice.reducer;
export const { setMaticWallet } = slice.actions;
