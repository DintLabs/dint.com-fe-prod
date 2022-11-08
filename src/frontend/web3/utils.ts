import { NETWORKS } from './model';

export const toHex = (num: number) => `0x${Number(num).toString(16)}`;

export const getNetworkByUniqueId = (_id: number) => {
  console.log('NETWORKS ===>', NETWORKS);
  try {
    return NETWORKS[_id];
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const convertBigNumberToDecimal = (value: string, decimal: number) => {
  const num = Number(value.toString());
  const denom = Math.pow(10, decimal);
  return num / denom;
};
