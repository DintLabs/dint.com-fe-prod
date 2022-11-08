import { ERC_1155, ERC_20, ERC_721 } from './abi';
import SOLANA_ICON from '../assets/img/web3/solana-token.png';
import ETHERUM_ICON from '../assets/img/web3/eth_logo.svg';
import POLYGON_ICON from '../assets/img/web3/matic-token.png';

export const NETWORK_STANDARD = {
  ERC_721: 'ERC 721',
  ERC_1155: 'ERC 1155',
  ERC_20: 'ERC 20'
};

export const SOLANA_MAINNET = {
  uniqueId: 1,
  name: 'Solana',
  rpcURL: 'https://solana-gateway.moralis.io/account/mainnet/',
  chainId: 101,
  SYMBOL: 'SOL',
  DECIMALS: 18,
  icon: SOLANA_ICON
};

export const POLYGON_MAINNET = {
  uniqueId: 2,
  name: 'Polygon',
  rpcURL: 'https://polygon-rpc.com/',
  chainId: 137,
  SYMBOL: 'MATIC',
  DECIMALS: 18,
  icon: POLYGON_ICON
};

export const ETHERIUM = {
  uniqueId: 3,
  name: 'Etherum',
  rpcURL: 'https://deep-index.moralis.io/api/v2/',
  chainId: 1,
  SYMBOL: 'ETH',
  DECIMALS: 18,
  icon: ETHERUM_ICON
};

export const NETWORKS: { [key: number]: any } = Object.freeze({
  1: SOLANA_MAINNET,
  2: POLYGON_MAINNET,
  3: ETHERIUM
});

export const ABI: { [key: string]: any } = {
  TOKEN_721: ERC_721,
  TOKEN_1155: ERC_1155,
  ERC_20
};

export const EVM_NETWORKS: { [key: number]: any } = Object.freeze({
  2: POLYGON_MAINNET,
  3: ETHERIUM
});
