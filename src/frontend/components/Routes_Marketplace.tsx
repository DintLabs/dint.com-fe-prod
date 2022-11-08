import { Box, CircularProgress } from '@mui/material';
import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';

import { Route, Routes, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import MarketplaceAddress from '../contractsData/Marketplace-address.json';
import MarketplaceAbi from '../contractsData/Marketplace.json';
import NFTAddress from '../contractsData/NFT-address.json';
import NFTAbi from '../contractsData/NFT.json';

import './App.css';
import Create from './Create.jsx';
import Navigation from './MarketplaceNavbar';
import MyListedItems from './MyListedItems.jsx';

const winEthereum = window.ethereum as any;

function Marketplace_app() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [nft, setNFT] = useState({});
  const [marketplace, setMarketplace] = useState({});

  // MetaMask Login/Connect
  const web3Handler = useCallback(async () => {
    const accounts = await winEthereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(winEthereum);
    // Set signer
    const signer = provider.getSigner();

    winEthereum.on('accountsChanged', async (responseAccounts: any) => {
      setAccount(responseAccounts[0]);
      await web3Handler();
    });
    loadContracts(signer);
  }, []);

  const handleAccountsChanged = useCallback(
    (accounts: any) => {
      setAccount(accounts[0]);
      if (accounts.length !== 0) {
        winEthereum.on('accountsChanged', async (resAccounts: any) => {
          setAccount(resAccounts[0]);
          await web3Handler();
        });
        const provider = new ethers.providers.Web3Provider(winEthereum);
        const signer = provider.getSigner();
        loadContracts(signer);
      }
    },
    [web3Handler]
  );

  const checkConnection = useCallback(() => {
    if (typeof winEthereum !== 'undefined') {
      winEthereum
        .request({ method: 'eth_accounts' })
        .then(handleAccountsChanged)
        .catch(console.error);
    } else {
      Swal.fire({
        title: 'It will required a web3 wallet to use this area of our application',
        text: 'Click Here to Install ',
        html: '<a href="https://metamask.io" target="_blank">Click here to install</a>',
        icon: 'error',
        showCancelButton: true,
        cancelButtonColor: '#CBC9C9',
        cancelButtonText: 'Back'
      }).then(({ isConfirmed }) => {
        if (!isConfirmed) {
          navigate('/', { replace: true });
        }
      });
    }
  }, [handleAccountsChanged, navigate]);

  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  const loadContracts = async (signer: ethers.Signer) => {
    // Get deployed copies of contracts
    const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer);
    setMarketplace(marketplace);
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
    setNFT(nft);
    setLoading(false);
  };

  return (
    <>
      <div className="App">
        <>
          {/* <Navigation web3Handler={web3Handler} account={account} islogin={props.islogin} /> */}
          <Navigation />
        </>
        <div>
          {loading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '80vh'
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
              <p className="mx-3 my-0">Awaiting Metamask Connection...</p>
            </div>
          ) : (
            <Routes>
              <Route path="create" element={<Create marketplace={marketplace} nft={nft} />} />
              <Route
                path="my-listed-items"
                element={<MyListedItems marketplace={marketplace} nft={nft} account={account} />}
              />
            </Routes>
          )}
        </div>
      </div>
    </>
  );
}

export default Marketplace_app;
