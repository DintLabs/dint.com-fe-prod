import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { ENV } from 'frontend/config';
import { authInstance } from 'frontend/contexts/FirebaseInstance';
import { RootState, useSelector } from 'frontend/redux/store';
import { IEvent } from 'frontend/types/event';
import { isMobile } from 'frontend/utils';
import { SOLANA_MAINNET } from 'frontend/web3/model';
import { fetchTokenBalance } from 'frontend/web3/service';
import { getNetworkByUniqueId, toHex } from 'frontend/web3/utils';
import { useNavigate } from 'react-router';
import * as Alert from '../../components/common/alert';
import * as metamask from '../../web3/wallets/metamask';
import * as phantom from '../../web3/wallets/phantom';
import EventListCard from './EventListCard';

const win = window as any;

const EventList = () => {
  const { lstEvent, isLoading } = useSelector((rootState: RootState) => rootState.event);
  const navigate = useNavigate();

  const openMetaMaskUrl = (url: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_self';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  if (typeof win.ethereum !== 'undefined') {
    win.ethereum.on('chainChanged', async () => {
      console.log('chainChanged');
    });
  }

  const getMetamaskBalance = async (selectedEvent: IEvent) => {
    const n = selectedEvent?.network ? parseInt(selectedEvent?.network.toString(), 10) : 0;
    const netWork: any = getNetworkByUniqueId(n);

    console.log('netWork ===>', netWork);
    console.log('SOLANA_MAINNET ====>', SOLANA_MAINNET);

    const getBalance = async (walletAddress: string) =>
      fetchTokenBalance({
        Network: netWork.uniqueId,
        Network_Standard: selectedEvent?.tokenType || '',
        Token_Address: selectedEvent?.tokenAddress || '',
        tokenDecimal: selectedEvent?.tokenDecimal || 0,
        walletAddress
      });
    // check which is network
    // EVM -> METAMASK
    // Solana -> Phantom Wallet

    if (ENV === 'test') {
      const walletAddress = '0xC6869257205e20c2A43CB31345DB534AECB49F6E';
      const balanceOf = await getBalance(walletAddress);
      if (balanceOf <= 0) {
        const config = Alert.configWarnAlert({
          title: 'Balance not sufficient ',
          text: `Your balance ${balanceOf}`
        });
        Alert.alert(config);
      } else {
        navigate('/ticketcreate', {
          state: { eventid: selectedEvent.eventId, userid: authInstance?.currentUser?.uid || '' }
        });
      }
      return;
    }
    if (netWork.uniqueId === SOLANA_MAINNET.uniqueId) {
      const provider = phantom.getProvider();

      const afterConnect = async () => {
        const walletAddress = provider.publicKey.toString();
        const balanceOf = await getBalance(walletAddress);

        if (balanceOf <= 0) {
          const config = Alert.configWarnAlert({
            title: 'Balance not sufficient ',
            text: `Your balance ${balanceOf}`
          });
          Alert.alert(config);
        } else {
          navigate('/ticketcreate', {
            state: {
              eventid: selectedEvent.eventId,
              userid: authInstance?.currentUser?.uid
            }
          });
        }
        console.log('Accounts', balanceOf); // still remain yet
      };

      provider.on('connect', () => {
        afterConnect();
      });
      if (!provider.isConnected) {
        await provider.connect();
      } else {
        afterConnect();
      }
    } else {
      if (isMobile()) {
        if (!(await metamask.hasWallet())) {
          openMetaMaskUrl(`https://metamask.app.link/dapp/${win.location.host}`);
          return;
        }
      }
      const chainId = await metamask.getChainId();
      console.log('chainId ===>', chainId, toHex(netWork.chainId));
      if (chainId == null) {
        // Alert metamask does not availible
        const config = Alert.configErrorAlert({
          title: 'Metamask Not available',
          text: 'Please install Metamask!',
          footer: `<a href="https://metamask.io" target="_blank">Click here to install</a>`
        });
        Alert.alert(config);
      } else if (toHex(netWork.chainId) !== chainId) {
        // Switch your network to {network.name}

        const config = Alert.configWarnAlert({
          title: 'Please switch your network',
          text: `Switch your network to ${netWork.name}`
        });
        Alert.alert(config);
      } else {
        const accounts = await metamask.getConnectedAccounts();

        if (accounts && accounts.length) {
          const walletAddress = accounts[0];
          const balanceOf = await getBalance(walletAddress);

          if (balanceOf <= 0) {
            const config = Alert.configWarnAlert({
              title: 'Balance not sufficient ',
              text: `Your balance ${balanceOf}`
            });
            Alert.alert(config);
          } else {
            navigate('/ticketcreate', {
              state: {
                eventid: selectedEvent.eventId,
                userid: authInstance?.currentUser?.uid
              }
            });
          }

          console.log('Accounts', balanceOf); // still remain yet
        } else {
          // alert seems like account does not exist
          const config = Alert.configWarnAlert({
            title: 'Seems like account does not exist',
            text: `Please Add account!`
          });
          Alert.alert(config);
        }
      }
    }
  };

  if (isLoading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );

  if (!lstEvent.length)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography component="span">No Events Found. </Typography>
      </Box>
    );

  return (
    <>
      {lstEvent.map((ev: IEvent, index: number) => (
        <EventListCard objEvent={ev} key={index} getMetamaskBalance={getMetamaskBalance} />
      ))}
    </>
  );
};

export default EventList;
