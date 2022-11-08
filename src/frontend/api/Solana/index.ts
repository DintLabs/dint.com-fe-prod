import { API_KEY, SOLONA_TOKEN } from '../../config';
import { ICallMoralisParams } from '../EVM';

export const getSolanaTokenDetails = (params: {
  Token_Address: any;
  abi?: any;
  rpcURL?: string;
  method?: string;
}) => {
  const { Token_Address } = params;

  return new Promise((resolve, reject) => {
    try {
      const requestOptions: RequestInit = {
        method: 'GET',
        redirect: 'follow'
      };
      fetch(SOLONA_TOKEN.API_URL, requestOptions)
        .then((response) => response.json())
        .then((tokenList) => {
          const solanatokenname = tokenList.tokens.find(
            (element: { address: any }) => element.address === Token_Address
          );

          resolve(solanatokenname);
        });
    } catch (error) {
      console.error(error, 'Error occurred in fn:getSolanaTokenDetails');
      reject(error);
    }
  });
};

export const callMoralis = async ({ rpcURL, params, method }: ICallMoralisParams) => {
  const myHeaders = new Headers();
  myHeaders.append('X-API-Key', API_KEY.CALL_MORALIS);
  myHeaders.append('Content-Type', 'application/json');

  const raw = {
    params: { ...params }
  };

  const body: string = JSON.stringify(raw);

  const requestOptions: RequestInit = {
    method,
    headers: myHeaders,
    redirect: 'follow'
  };

  if (method === 'POST' || method === 'post') {
    requestOptions.body = body;
  }

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
        console.error('error occurred in solana.callMoralis', error);
        reject(error);
      });
  });
};
