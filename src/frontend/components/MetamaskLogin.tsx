/* eslint-disable no-prototype-builtins */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import $ from 'jquery';
import { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import Metamask_icon from '../material/metamask.svg';
import '../material/walletsSidebar.css';
import { groupBy, isMobile } from '../utils';
import { EVM_NETWORKS, NETWORKS, SOLANA_MAINNET } from '../web3/model';
import { fetchWalletBalance } from '../web3/service';
import * as metamask from '../web3/wallets/metamask';
import * as phantom from '../web3/wallets/phantom';
import * as Alert from './common/alert';

const win = window as any;

const MetamaskLogin = () => {
  const [shouldLoad, setShouldLoad] = useState<boolean>(false);
  const [walletConnected, SetWallet] = useState<boolean>();
  const [mobileBalance] = useState('');
  const [mobilechainId] = useState('');
  const navigate = useNavigate();

  const [wallet, SetWallets] = useState<any>([]);

  const openNav = () => {
    // setShouldLoad(true);
    // $('#mySidenav').css('width', '350px');
    // $('#main').css('margin-left', '350px');
    navigate('dint-wallet');
  };
  const closeNav = () => {
    $('#mySidenav').css('width', '0');
    $('#main').css('margin-left', '0');
  };

  const other_wallet_clicked = () => {
    Swal.fire({
      title: 'Sorry',
      text: 'Currently We Have Only Metamask, Other Wallets Are Coming Soon',
      icon: 'warning',
      confirmButtonText: 'Close'
    });
  };

  function openMetaMaskUrl(url: string) {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_self';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
  const App_URL = () => window.location.host;

  const walletPhantom = async () => {
    try {
      const provider = phantom.getProvider();

      const afterConnect = async () => {
        const walletAddress = provider.publicKey.toString();
        const balanceOf = await fetchWalletBalance({
          Network: SOLANA_MAINNET.uniqueId,
          walletAddress
        });
        SetWallets((current: any) => [
          ...current,
          {
            balance: balanceOf,
            network: SOLANA_MAINNET.uniqueId,
            walletAddress
          }
        ]);
      };

      provider?.on('connect', () => {
        afterConnect();
      });
      if (!provider?.isConnected) {
        await provider?.connect();
      } else {
        SetWallet(true);

        afterConnect();
      }
    } catch (ex) {
      console.error(ex, 'Error');
    }
  };

  const connectMetamask = async () => {
    try {
      const getBalance = async (netWork: number, walletAddress: string) =>
        fetchWalletBalance({
          Network: netWork,
          walletAddress
        });

      if (isMobile()) {
        if (!(await metamask.hasWallet())) {
          openMetaMaskUrl(`https://metamask.app.link/dapp/${App_URL()}`);
          return;
        }
      }
      SetWallet(true);
      const chainId = await metamask.getChainId();

      if (chainId == null) {
        // Alert metamask does not availible
        const config = Alert.configErrorAlert({
          title: 'Metamask Not available',
          text: 'Please install Metamask!',
          footer: `<a href="https://metamask.io" target="_blank">Click here to install</a>`
        });
        Alert.alert(config);
      } else {
        const accounts = await metamask.getConnectedAccounts();

        if (accounts && accounts.length) {
          accounts.map(async (walletAddress: string) => {
            Object.keys(EVM_NETWORKS).map(async (network: any) => {
              const balanceOf = await getBalance(network, walletAddress);
              SetWallets((current: any) => [
                ...current,
                {
                  balance: balanceOf,
                  network,
                  walletAddress
                }
              ]);
            });
          });
        } else {
          // alert seems like account does not exist
          const config = Alert.configWarnAlert({
            title: 'Seems like account does not exist',
            text: `Please Add account!`
          });
          Alert.alert(config);
        }
      }
    } catch (ex) {
      console.error(ex, 'ERROR');
    }
  };

  if (typeof win.ethereum !== 'undefined') {
    win.ethereum.on('chainChanged', async () => {
      // await connectMetamask();
    });
    win.ethereum.on('accountsChanged', async () => {
      // await connectMetamask();
    });
  }

  useEffect(() => {
    if (shouldLoad) {
      connectMetamask();
      walletPhantom();
      return () => {
        SetWallets([]);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldLoad]);

  return (
    <>
      <div className="profile_hide_mobile">
        <button id="wallet_btn" onClick={openNav} type="button">
          <MdOutlineAccountBalanceWallet size={35} />
        </button>
      </div>

      <div className="profile_hide_pc">
        <li className="no_effect_li" style={{ marginLeft: '10px' }}>
          <p
            style={{ color: '#433f39', marginTop: '30px', fontSize: '20px' }}
            onClick={connectMetamask}
            aria-hidden="true"
          >
            Wallet {walletConnected ? ': ' : <></>} {walletConnected}
          </p>

          {walletConnected && (
            <p style={{ color: '#433f39', marginTop: '30px', fontSize: '20px' }}>
              Balance : {mobileBalance}
              <span style={{ color: '#8e44ad' }}>{mobilechainId}</span>
            </p>
          )}
        </li>
      </div>
      {/*  Code of Sidebar */}
      <div id="mySidenav" className="sidenav">
        <button className="closebtn" onClick={closeNav} type="button">
          ×
        </button>
        {walletConnected ? (
          <>
            <div className="container">
              {wallet &&
                wallet.length > 0 &&
                Object.values(groupBy(wallet, 'walletAddress')).map((data: any, index: number) => {
                  if (!data) {
                    return null;
                  }
                  const { walletAddress } = data[0];
                  return (
                    <div key={`MetaMask_${index}`}>
                      <div className="row border  m-2">
                        <div className="row align-items-center">
                          <CgProfile size={35} className="col-2" />
                          <div className="col-10">
                            {`${walletAddress.slice(0, 7)}...${walletAddress.slice(
                              35,
                              walletAddress.length
                            )}`}
                          </div>
                          <small className="text_title">Account Balance</small>
                        </div>
                        {data.map((item: { network: number; balance: any }, index: number) => {
                          const { network, balance } = item;
                          return (
                            <div className="wallets" key={`account_balance${index}`}>
                              <h4 className="p-1 d-flex w-100 justify-content-around">
                                <img
                                  className=""
                                  src={NETWORKS[network].icon}
                                  alt="icon"
                                  height="27px"
                                  style={{ marginBottom: '2px' }}
                                />
                                {EVM_NETWORKS.hasOwnProperty(network) ? balance : balance?.solana}
                              </h4>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        ) : (
          <div className="sidenav_child">
            <div className="sidenav_top_div">
              <CgProfile size={35} />
              <div>
                <p>Connect Wallet</p>
              </div>
            </div>
            <div className="wallets_parent_div">
              <div className="wallets_div" onClick={connectMetamask} role="button">
                <img src={Metamask_icon} alt="meta-mask-login" />
                <p>Metamask</p>
              </div>
              <div className="wallets_div last_wallet" onClick={other_wallet_clicked} role="button">
                <p>Other Wallets</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Code of slidebar ends */}
    </>
  );
};

export default MetamaskLogin;
