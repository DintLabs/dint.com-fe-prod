import { IFetchNetworkToken } from 'frontend/types/network';
import { callMoralis, getEVMTokenBalance, getEVMTokenDecimal, getEVMTokenName } from '../api/EVM';
import * as solanaServices from '../api/Solana';
import { getSolanaTokenDetails } from '../api/Solana';
import { FILTER_OWNER_NFT_EVM, FILTER_OWNER_SOL, IS_TOKEN } from '../utils';
import { ETHERIUM, POLYGON_MAINNET, SOLANA_MAINNET } from './model';
import { convertBigNumberToDecimal, toHex } from './utils';

export async function fetchTokenDetails(Network: any, Network_Standard: any, Token_Address: any) {
  if (!Token_Address) {
    return null;
  }

  const req = {
    Token_Address,
    abi: Network_Standard,
    rpcURL: '',
    method: ''
  };

  switch (Network) {
    case 1: {
      const details: any = await getSolanaTokenDetails(req);

      if (IS_TOKEN(Network_Standard)) {
        return {
          name: details?.name,
          symbol: details?.symbol,
          decimals: details?.decimals,
          icon: details?.logoURI
        };
      }
      return { name: details?.name };
    }
    case 2: {
      req.rpcURL = POLYGON_MAINNET.rpcURL;
      const name = await getEVMTokenName(req);
      if (IS_TOKEN(Network_Standard)) {
        const symbol = await getEVMTokenName(req);
        const decimals = await getEVMTokenDecimal(req);

        return { name, symbol, decimals };
      }

      return { name };
    }
    case 3: {
      req.rpcURL = `${ETHERIUM.rpcURL}${Token_Address}/function?chain=${toHex(
        ETHERIUM.chainId
      )}&function_name=name`;
      req.method = 'POST';

      const name = await callMoralis({ ...req });

      if (IS_TOKEN(Network_Standard)) {
        req.rpcURL = `${ETHERIUM.rpcURL}${Token_Address}/function?chain=${toHex(
          ETHERIUM.chainId
        )}&function_name=symbol`;
        const symbol = await callMoralis({ ...req });

        req.rpcURL = `${ETHERIUM.rpcURL}${Token_Address}/function?chain=${toHex(
          ETHERIUM.chainId
        )}&function_name=decimals`;
        const decimals = await callMoralis({ ...req });

        return { name, symbol, decimals };
      }

      return { name };
    }
    default:
      break;
  }

  return {};
}

export const fetchTokenBalance = async ({
  Network,
  Network_Standard,
  Token_Address,
  tokenDecimal,
  walletAddress
}: IFetchNetworkToken) => {
  const res = {};
  const req = {
    Token_Address: '' as any,
    walletAddress: '',
    method: '',
    rpcURL: '',
    abi: '' as any,
    params: {} as any
  };
  req.Token_Address = Token_Address;
  switch (Network) {
    case 1: {
      req.walletAddress = walletAddress;
      req.method = 'GET';
      if (IS_TOKEN(Network_Standard)) {
        req.rpcURL = `${SOLANA_MAINNET.rpcURL}${Token_Address}/tokens`;
        const result: any = await solanaServices.callMoralis({ ...req });
        return result.filter((nft: any) =>
          FILTER_OWNER_SOL(nft, {
            owner_of: walletAddress
          })
        ).length;
      }
      req.rpcURL = `${SOLANA_MAINNET.rpcURL}${Token_Address}/nft`;
      const result: any = await solanaServices.callMoralis({ ...req });
      return result.filter((nft: any) =>
        FILTER_OWNER_SOL(nft, {
          owner_of: walletAddress
        })
      ).length;
    }
    case 2: {
      req.rpcURL = POLYGON_MAINNET.rpcURL;
      req.walletAddress = walletAddress;

      if (IS_TOKEN(Network_Standard)) {
        req.abi = Network_Standard;
        const result = await getEVMTokenBalance(req);
        return convertBigNumberToDecimal(result ? result.toString() : result, tokenDecimal);
      }

      req.rpcURL = `${ETHERIUM.rpcURL}${walletAddress}/nft/${Token_Address}?chain=${toHex(
        POLYGON_MAINNET.chainId
      )}&format=decimal`;
      req.method = 'GET';
      const result: any = await callMoralis({ ...req });

      return result.filter((nft: any) =>
        FILTER_OWNER_NFT_EVM(nft, { token_address: Token_Address, owner_of: walletAddress })
      ).length;
    }

    case 3: {
      if (IS_TOKEN(Network_Standard)) {
        req.rpcURL = `${ETHERIUM.rpcURL}${Token_Address}/function?chain=${toHex(
          ETHERIUM.chainId
        )}&function_name=balanceOf`;
        req.abi = Network_Standard;
        req.params = { _owner: walletAddress };
        req.method = 'POST';

        const result: any = await callMoralis({ ...req });

        return convertBigNumberToDecimal(result.toString(), tokenDecimal);
      }
      req.rpcURL = `${ETHERIUM.rpcURL}${walletAddress}/nft/${Token_Address}?chain=${toHex(
        ETHERIUM.chainId
      )}&format=decimal`;
      req.method = 'GET';

      const { result }: any = await callMoralis({ ...req });

      return result.filter((nft: any) =>
        FILTER_OWNER_NFT_EVM(nft, {
          token_address: Token_Address,
          contract_type: Network_Standard,
          owner_of: walletAddress
        })
      ).length;
    }

    default:
      break;
  }
  return res;
};

export const fetchWalletBalance = async ({
  Network,
  walletAddress
}: {
  Network: number;
  walletAddress: string;
}) => {
  if (Network.toString() === '1') {
    const requestObject = {
      method: 'GET',
      rpcURL: `${SOLANA_MAINNET.rpcURL}${walletAddress}/balance`
    };

    const result = await solanaServices.callMoralis({ ...requestObject });
    return result;
  }
  if (Network.toString() === '2') {
    const requestObject = {
      rpcURL: `${ETHERIUM.rpcURL}${walletAddress}/balance?chain=${toHex(POLYGON_MAINNET.chainId)}`,
      method: 'GET'
    };
    const result: any = await callMoralis({ ...requestObject });
    return convertBigNumberToDecimal(result.balance.toString(), POLYGON_MAINNET.DECIMALS);
  }

  if (Network.toString() === '3') {
    const requestObject = {
      rpcURL: `${ETHERIUM.rpcURL}${walletAddress}/balance?chain=${toHex(ETHERIUM.chainId)}`,
      method: 'GET'
    };
    const result: any = await callMoralis({ ...requestObject });

    return convertBigNumberToDecimal(result.balance.toString(), ETHERIUM.DECIMALS);
  }
  return null;
};
