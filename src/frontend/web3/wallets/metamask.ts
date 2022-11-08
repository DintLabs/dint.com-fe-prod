import detectEthereumProvider from '@metamask/detect-provider';

export const hasWallet = async () => {
  if (await detectEthereumProvider()) {
    return true;
  }
  return false;
};

export const getChainId = async () => {
  const provider: any = await detectEthereumProvider();
  if (provider) {
    const res = await provider.request({
      method: 'eth_chainId'
    });
    return res;
  }
  return null;
};

export const getConnectedAccounts = async () => {
  try {
    const ethereum: any = { ...window.ethereum };
    const res = await ethereum.request({ method: 'eth_requestAccounts' });
    return res;
  } catch (_) {
    return null;
  }
};
