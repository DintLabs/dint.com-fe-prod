import axios from 'axios';
import { SOLANA_MAINNET } from '../../web3/model';

// client.js api

const baseURL = SOLANA_MAINNET.rpcURL;
export { baseURL };

const client = axios.create({
  baseURL
});

export default {};
