// @ts-ignore
import { ethers } from 'ethers';
import { API_KEY } from '../../config';
import { ABI } from '../../web3/model';
// import Moralis from "moralis/dist/moralis.min.js";

// Moralis.start({ serverUrl, appId });
interface IMoralisRow {
  params: any;
  abi: any;
}
export interface ICallMoralisParams {
  rpcURL: string;
  abi?: any;
  params?: any;
  method?: string;
}

export const callMoralis = async ({ rpcURL, abi, params, method }: ICallMoralisParams) => {
  const myHeaders = new Headers();
  myHeaders.append('X-API-Key', API_KEY.CALL_MORALIS);
  myHeaders.append('Content-Type', 'application/json');

  const raw: IMoralisRow = {
    params: params ? { ...params } : undefined,
    abi: abi ? ABI[abi] : undefined
  };

  const body: string = JSON.stringify(raw);

  const requestOptions: RequestInit = {
    method,
    headers: myHeaders,
    redirect: 'follow',
    body: undefined
  };

  if (method === 'POST' || method === 'post') {
    requestOptions.body = body;
  }
  console.log(requestOptions, 'requestOptions');

  return new Promise((resolve, reject) => {
    fetch(rpcURL, requestOptions)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Required');
        }
        return response.json();
      })
      .then((result) => resolve(result))
      .catch((error) => {
        console.error('error', error);
        reject(error);
      });
  });
};

export const getEVMTokenName = async (params: {
  Token_Address: string;
  abi: any;
  rpcURL: string;
  method?: string;
}) => {
  const { rpcURL, abi, Token_Address } = params;
  try {
    const provider = new ethers.providers.JsonRpcProvider(rpcURL);
    const contract = new ethers.Contract(Token_Address, ABI[abi], provider);
    console.log('getpolygontokenname ==> ', contract);
    const name = await contract.name();
    return name;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getEVMTokenSymbol = async (params: {
  rpcURL: string;
  abi: any;
  Token_Address: string;
}) => {
  const { rpcURL, abi, Token_Address } = params;
  try {
    const provider = new ethers.providers.JsonRpcProvider(rpcURL);
    const contract = new ethers.Contract(Token_Address, ABI[abi], provider);
    const symbol = await contract.symbol();
    return symbol;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const getEVMTokenDecimal = async (params: {
  Token_Address: string;
  abi: any;
  rpcURL: string;
  method?: string;
}) => {
  const { rpcURL, abi, Token_Address } = params;
  try {
    const provider = new ethers.providers.JsonRpcProvider(rpcURL);
    const contract = new ethers.Contract(Token_Address, ABI[abi], provider);
    const decimals = await contract.decimals();
    return decimals;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getEVMTokenBalance = async (params: {
  Token_Address: string;
  walletAddress: string;
  method?: string;
  rpcURL: any;
  abi: any;
  params?: any;
}) => {
  const { rpcURL, abi, Token_Address, walletAddress } = params;
  try {
    const provider = new ethers.providers.JsonRpcProvider(rpcURL);
    const contract = new ethers.Contract(Token_Address, ABI[abi], provider);
    const balanceOf = await contract.balanceOf(walletAddress);
    return balanceOf;
  } catch (error) {
    console.error(error, 'Error occurred while getting balance of');
    return null;
  }
};
