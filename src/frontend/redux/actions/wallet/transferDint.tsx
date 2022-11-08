import { ethers } from 'ethers';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch, store } from '../../store';

const provider = new ethers.providers.JsonRpcProvider(`${process.env.REACT_APP_JSON_RPC_MUMBAI_URL}`) // mumbai, polygon, eth mainnet

export const transferDint = (data: any) => async (dispatch: AppDispatch) => {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.REACT_APP_JSON_RPC_MUMBAI_URL // mumbai, polygon, eth mainnet
  );
  // private key of account that holds DINT.
  // Caution: this account must have MATIC/ETH to cover gas fees!
  const signer = new ethers.Wallet(
    store.getState().wallet.privateKey,
    provider
  )
  if (data.type == 'dint') {
    const abi = [
      {
        "constant": false,
        "inputs": [
          { "name": "_to", "type": "address" },
          { "name": "_amount", "type": "uint256" }
        ],
        "name": "transfer",
        "outputs": [{ "name": "success", "type": "bool" }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];
  
    const contractAddr: any = process.env.REACT_APP_DINT_CONTRACT_ADDR;
    const erc20dint = new ethers.Contract(contractAddr, abi, signer);
    const gasPrice = await provider.getGasPrice();
    const tx = await erc20dint.transfer(
     data.recipient_address,
     ethers.utils.parseEther(data.amount),
      {
        gasPrice
      }
    ); // TRANSFER DINT to the customer
    console.log('tx', tx);
  
    return tx;
  }


}
