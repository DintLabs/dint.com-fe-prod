import * as ethers from 'ethers';
import { createSlice } from '@reduxjs/toolkit';
import CryptoJS from 'crypto-js';
import { AppDispatch } from '../store';
import axios from '../../api/axios';

type walletState = {
  walletModal: boolean;
  isLoading: boolean;
  phrase: string;
  privateKey: string;
  address: string;
  balance: any
};

const initialState: walletState = {
  walletModal: false,
  isLoading: false,
  phrase: '',
  privateKey: '',
  address: '',
  balance: '',
};

const slice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    setWalletSliceChanges(state, action) {
      return { ...state, ...action.payload };
    },
    setWalletPhrase(state, action) {
      return { ...state, ...action.payload };
    },
    setWalletPrivateKey(state, action) {
      return { ...state, ...action.payload };
    },
    setAddress(state, action) {
      return { ...state, ...action.payload };
    },
    setBalance(state, action) {
      return { ...state, ...action.payload };
    }
  }
});

export const createWallet = () => async (dispatch: AppDispatch) => {
  try {
    const token = localStorage.getItem('apiToken');
    if (token) {
      const response = await axios.get('api/user/get-wallet-by-token/').then(async (res: any) => {
        if (res.status === 200) {
          const webWallet = res.data.data.web3_wallet;
          if(webWallet) {
            const bytes = CryptoJS.AES.decrypt(webWallet.keys.password, 'secret');
            const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
            const jsonObject = JSON.stringify(webWallet);
            dispatch(slice.actions.setWalletPhrase({ phrase: webWallet.keys.phraseKey }));
            dispatch(slice.actions.setWalletPrivateKey({ privateKey: webWallet.keys.privateKey }));
            dispatch(slice.actions.setAddress({ address: webWallet.keys.address }));
          } else {
            const wallet = ethers.Wallet.createRandom();
            const getPassword: any = generatePassword();
            const ciphertext = CryptoJS.AES.encrypt(getPassword, 'secret').toString();

            const password = ciphertext
            const encryptPromise = wallet.encrypt(password);
              encryptPromise.then((json) => {
              ethers.Wallet.fromEncryptedJson(json, password).then((wallet) => {
                
                dispatch(slice.actions.setWalletPhrase({ phrase: wallet.mnemonic.phrase }));
                dispatch(slice.actions.setWalletPrivateKey({ privateKey: wallet.privateKey }));
                dispatch(slice.actions.setAddress({ address: wallet.address }));
                const newJson = {
                  web3_wallet: JSON.parse(json)
                }
                newJson.web3_wallet.keys = {
                  'privateKey': wallet.privateKey,
                  'phraseKey': wallet.mnemonic.phrase,
                  'address': wallet.address,
                  'password': password
                }
                axios.put('api/user/update-wallet-by-token/', newJson).then(async (res: any) => {});
              });
            });
          }
        }
        return false;
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getKeys = () => async (dispatch: AppDispatch) => {
  try {
    const token = localStorage.getItem('apiToken');
    if (token) {
      await axios.get('api/user/wallet').then(async (res: any) => {
      if (res.data.code===200){
        // dispatch(slice.actions.setWalletPhrase({ phrase: keys.phraseKey }));
        // dispatch(slice.actions.setWalletPrivateKey({ privateKey: keys.privateKey }));
        dispatch(slice.actions.setAddress({ address: res.data.data.wallet_address }));
        dispatch(slice.actions.setBalance({ balance: res.data.data.wallet_balance }));
      }
      });
    
    }
  } catch (error) {
    console.error(error);
  }
};

const generatePassword = () => {
  const length = 8;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

export default slice.reducer;
export const { setWalletSliceChanges, setWalletPhrase, setWalletPrivateKey, setAddress, setBalance } = slice.actions;
