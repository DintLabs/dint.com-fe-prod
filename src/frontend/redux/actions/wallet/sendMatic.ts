import { ethers } from 'ethers';
import { createSlice } from '@reduxjs/toolkit';
import { FaSortAmountDown } from 'react-icons/fa';
import { AppDispatch, store } from '../../store';


const provider = new ethers.providers.JsonRpcProvider(`${process.env.REACT_APP_JSON_RPC_MUMBAI_URL}`) // mumbai, polygon, eth mainnet

export const sendMatic = (data: any) => async (dispatch: AppDispatch) => {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.REACT_APP_JSON_RPC_MUMBAI_URL // mumbai, polygon, eth mainnet
  );
  // private key of account that holds MATIC.
  // Caution: this account must have MATIC/ETH to cover gas fees!
  const signer = new ethers.Wallet(
    store.getState().wallet.privateKey,
    provider
  )
  if (data.type == 'matic') {

    const erc20matic = new ethers.Wallet(signer, provider);
 
       const tx = await erc20matic.sendTransaction({
        to: data.recipient_address,
        value: ethers.utils.parseEther(data.amount)

          
        })
    
    console.log('tx', tx);
  
    return tx;
  }


}