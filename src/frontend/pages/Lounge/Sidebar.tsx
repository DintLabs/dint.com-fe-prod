import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import TextsmsRoundedIcon from '@mui/icons-material/TextsmsRounded';
import { List, ListItem, ListItemAvatar, ListItemText,ListItemIcon, Typography } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { HOME_SIDE_MENU, setNewHomeSliceChanges } from 'frontend/redux/slices/newHome';
import { RootState, useDispatch, useSelector } from 'frontend/redux/store';
import MoreOptionsDrawer from 'frontend/layouts/MoreOptionsDrawer';
import { FiMoreHorizontal } from 'react-icons/fi';
import { useNavigate } from 'react-router';
import { useEffect, useState, useContext } from 'react';
import { getCreditCards } from '../../redux/actions/StripeAction';
import {ThemeContext} from '../../contexts/ThemeContext'

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedMenu } = useSelector((rootState: RootState) => rootState.newHome);
  const user = useSelector((state: RootState) => state.user.userData);

  const [showMoreDrawer, setShowMoreDrawer] = useState(false);


  const [clicked, setClicked] = useState(false);

  const translate = ()=>{
    setTimeout(() => {
      const selectedLanguage = localStorage.getItem('selectedLanguage');
      if (selectedLanguage !== null && selectedLanguage !== 'en') {
        const languageDropdown = $('.goog-te-combo');
        languageDropdown.val(selectedLanguage);
        languageDropdown[0].dispatchEvent(new Event('change'))
      }
    }, 10);
  }
  const { toggle } = useContext(ThemeContext);

  useEffect(() => {
    if (clicked) {
      // do something meaningful, Promises, if/else, whatever, and then
      window.location.assign('https://paydev.dint.com');
    }
  });
  
  return (
    <>
      <MoreOptionsDrawer open={showMoreDrawer} onClose={() => setShowMoreDrawer(false)} />
      <List>
        <ListItem
          sx={{
            color: HOME_SIDE_MENU.HOME === selectedMenu || HOME_SIDE_MENU.LOUNGE === selectedMenu
                ? toggle ? 'text.primary' : '#161C24'
                : 'text.secondary',
            cursor: 'pointer'
          }}
          onClick={() => {
            dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.HOME }));
            navigate(`/lounge/${HOME_SIDE_MENU.HOME}`);
          }}
        >
          <ListItemAvatar>
            <OtherHousesIcon />
          </ListItemAvatar>
          <ListItemText primary={<Typography variant="subtitle1">Lounge</Typography>} />
        </ListItem>
        <ListItem
          sx={{
            cursor: 'pointer',
            color: HOME_SIDE_MENU.MESSAGES === selectedMenu ? toggle ? 'text.primary' : '#161C24' : 'text.secondary'
          }}
          onClick={() => {
            dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.MESSAGES }));
            navigate(`/lounge/${HOME_SIDE_MENU.MESSAGES}`);
          }}
        >
          <ListItemAvatar>
            <TextsmsRoundedIcon />
          </ListItemAvatar>
          <ListItemText primary={<Typography variant="subtitle1">Chat</Typography>} />
        </ListItem>
        <ListItem
          sx={{
            cursor: 'pointer',
            color: HOME_SIDE_MENU.MY_PROFILE === selectedMenu ? toggle ? 'text.primary' : '#161C24' : 'text.secondary'
          }}
          onClick={() => {
            dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.MY_PROFILE }));
            navigate(`/${user?.custom_username}`);
          }}
        >
          <ListItemAvatar>
            <AccountCircleRoundedIcon />
          </ListItemAvatar>
          <ListItemText primary={<Typography variant="subtitle1">Profile</Typography>} />
        </ListItem>
        {/* <ListItem
          sx={{
            cursor: 'pointer',
            color: HOME_SIDE_MENU.SUBSCRIPTIONS === selectedMenu ? '#161C24' : 'text.secondary'
          }}
          onClick={() => {
            dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.SUBSCRIPTIONS }));
            navigate('/lounge/subscriptions');
          }}
        >
          <ListItemAvatar>
            <RiUserHeartFill fontSize="1.5rem" />
          </ListItemAvatar>
          <ListItemText primary={<Typography variant="subtitle1">Subscribed</Typography>} />
        </ListItem>

        <ListItem
          sx={{
            cursor: 'pointer',
            color: HOME_SIDE_MENU.FOLLOWERS === selectedMenu ? '#161C24' : 'text.secondary'
          }}
          onClick={() => {
            dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.FOLLOWERS }));
            navigate('/followers');
          }}
        >
          <ListItemAvatar>
            <FaUserFriends fontSize="1.5rem" />
          </ListItemAvatar>
          <ListItemText primary={<Typography variant="subtitle1">Followers</Typography>} />
        </ListItem> */}

        <ListItem
          sx={{
            cursor: 'pointer',
            color: HOME_SIDE_MENU.LISTS === selectedMenu ? toggle ? 'text.primary' : '#161C24' : 'text.secondary'
          }}
          
          onClick={() => {
            dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.LISTS })); 
            navigate(`/lists`);
          
          }}
        >
          <ListItemAvatar>
            <FormatListBulletedIcon />
          </ListItemAvatar>
          <ListItemText primary={<Typography variant="subtitle1">Lists</Typography>} />
        </ListItem>

        <ListItem
        
          sx={{
            cursor: 'pointer',
            color: HOME_SIDE_MENU.TOKEN === selectedMenu ? toggle ? 'text.primary' : '#161C24' : 'text.secondary'
          }}
          onClick={() => {
            dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.TOKEN }));
            navigate(`/dint-wallet`);
          }}
        >
          <ListItemAvatar>
            <AccountBalanceWalletIcon />
          </ListItemAvatar>
          <ListItemText primary={<Typography variant="subtitle1">Wallet</Typography>} />
        </ListItem>

        <ListItem
          sx={{
            cursor: 'pointer',
            color: HOME_SIDE_MENU.MORE === selectedMenu ? toggle ? 'text.primary' : '#161C24' : 'text.secondary'
          }}
          onClick={() => {
            dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.MORE }));
            setShowMoreDrawer(true);
            translate();
          }}
        >
          <ListItemAvatar>
            <FiMoreHorizontal fontSize="1.5rem" />
          </ListItemAvatar>
          <ListItemText primary={<Typography variant="subtitle1">More</Typography>} />
        </ListItem>
      </List>
    </>
  );
};

export default Sidebar;
