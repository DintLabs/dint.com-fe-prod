/* eslint-disable no-await-in-loop */
import { createSlice } from '@reduxjs/toolkit';
import { Contract, ethers } from 'ethers';
import { IMarketPlace } from 'frontend/types/marketPlace';
import { IPurchases } from 'frontend/types/purchases';

import Swal from 'sweetalert2';

import MarketplaceAddress from '../../contractsData/Marketplace-address.json';
import MarketplaceAbi from '../../contractsData/Marketplace.json';
import NFTAddress from '../../contractsData/NFT-address.json';
import NFTAbi from '../../contractsData/NFT.json';
import { dispatch, RootState } from '../store';

const winEthereum = window.ethereum as any;

type IMarketPlaceState = {
  isLoading: boolean;
  account: string;
  nftContract?: Contract;
  marketplaceContract?: Contract;
  error: any;
  isPurchaseLoading: boolean;
  lstPurchase: IPurchases[];
  lstMarketPlace: IMarketPlace[];
};

const initialState: IMarketPlaceState = {
  isLoading: false,
  isPurchaseLoading: false,
  account: '',
  error: false,
  lstPurchase: [],
  lstMarketPlace: []
};

const slice = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.isPurchaseLoading = false;
      state.error = action.payload;
    },
    setSliceChanges(state, action) {
      return { ...state, ...action.payload };
    }
  }
});

// Reducer
export default slice.reducer;

export function checkConnectionForMarketPlace() {
  return async (dispatch: any) => {
    try {
      dispatch(slice.actions.startLoading());

      if (typeof winEthereum !== 'undefined') {
        const accounts = await winEthereum.request({ method: 'eth_accounts' });

        dispatch(slice.actions.setSliceChanges({ account: accounts[0] }));

        if (accounts.length !== 0) {
          handleAccountsChanged(accounts);
        }
      } else {
        const isConfirmed = await Swal.fire({
          title: 'It will required a web3 wallet to use this area of our application',
          text: 'Click Here to Install ',
          html: '<a href="https://metamask.io" target="_blank">Click here to install</a>',
          icon: 'error',
          showCancelButton: true,
          cancelButtonColor: '#CBC9C9',
          cancelButtonText: 'Back'
        });

        if (!isConfirmed) {
          (window as any).objNavigate('/', { replace: true });
        }
      }
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

function handleAccountsChanged(accounts: any) {
  console.log('handleAccountsChanged-------', accounts);

  winEthereum.on('accountsChanged', async (resAccounts: any) => {
    console.log('accountsChanged--------', resAccounts);

    dispatch(slice.actions.setSliceChanges({ account: resAccounts[0] }));

    await web3Handler();
  });

  loadContracts();
}

// MetaMask Login/Connect
const web3Handler = async () => {
  const accounts = await winEthereum.request({ method: 'eth_requestAccounts' });
  dispatch(slice.actions.setSliceChanges({ account: accounts[0] }));
  winEthereum.on('accountsChanged', async (responseAccounts: any) => {
    dispatch(slice.actions.setSliceChanges({ account: responseAccounts[0] }));

    await web3Handler();
  });
  loadContracts();
};

const loadContracts = async () => {
  const provider = new ethers.providers.Web3Provider(winEthereum);
  const signer = provider.getSigner();
  // Get deployed copies of contracts
  const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer);
  const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);

  dispatch(slice.actions.setSliceChanges({ nft, isLoading: false, marketplace }));
};

export function loadPurchasedItems() {
  return async (dispatch: any, getStore: () => RootState) => {
    try {
      const { marketplaceContract, account, nftContract } = getStore().marketplace;
      if (!marketplaceContract) return null;

      dispatch(slice.actions.setSliceChanges({ isPurchaseLoading: true }));

      // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
      const filter = marketplaceContract.filters.Bought(null, null, null, null, null, account);
      const results = await marketplaceContract.queryFilter(filter);
      // Fetch metadata of each nft and add that to listedItem object.
      const purchases = await Promise.all(
        results.map(async (i: any) => {
          // fetch arguments from each result
          i = i.args;
          // get uri url from nft contract
          const uri = await nftContract?.tokenURI(i.tokenId);
          // use uri to fetch the nft metadata stored on ipfs
          const response = await fetch(uri);
          const metadata = await response.json();
          // get total price of item (item price + fee)
          const totalPrice = await marketplaceContract.getTotalPrice(i.itemId);
          // define listed item object
          const purchasedItem = {
            totalPrice,
            price: i.price,
            itemId: i.itemId,
            name: metadata.name,
            description: metadata.description,
            image: metadata.image
          };
          return purchasedItem;
        })
      );

      dispatch(slice.actions.setSliceChanges({ isPurchaseLoading: false, lstPurchase: purchases }));

      return null;
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
      return null;
    }
  };
}

export function loadMarketplaceItems() {
  return async (dispatch: any, getStore: () => RootState) => {
    try {
      const { marketplaceContract, nftContract } = getStore().marketplace;
      if (!marketplaceContract) return null;

      dispatch(slice.actions.setSliceChanges({ isLoading: true }));

      const itemCount = await marketplaceContract.itemCount();
      const items = [];
      for (let i = 1; i <= itemCount; i++) {
        const item = await marketplaceContract.items(i);
        if (!item.sold) {
          // get uri url from nft contract
          const uri = await nftContract?.tokenURI(item.tokenId);
          // use uri to fetch the nft metadata stored on ipfs
          const response = await fetch(uri);
          const metadata = await response.json();
          // get total price of item (item price + fee)
          const totalPrice = await marketplaceContract.getTotalPrice(item.itemId);
          // Add item to items array
          items.push({
            totalPrice,
            itemId: item.itemId,
            seller: item.seller,
            name: metadata.name,
            description: metadata.description,
            image: metadata.image
          });
        }
      }

      dispatch(slice.actions.setSliceChanges({ isLoading: false, lstMarketPlace: items }));
      return null;
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
      return null;
    }
  };
}
