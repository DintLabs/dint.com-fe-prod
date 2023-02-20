import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TextsmsRoundedIcon from '@mui/icons-material/TextsmsRounded';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { List, ListItem, ListItemAvatar, ListItemText, ListItemIcon, Typography, useTheme } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { HOME_SIDE_MENU, setNewHomeSliceChanges } from 'frontend/redux/slices/newHome';
import { RootState, useDispatch, useSelector } from 'frontend/redux/store';
import MoreOptionsDrawer from 'frontend/layouts/MoreOptionsDrawer';
import { FiMoreHorizontal } from 'react-icons/fi';
import { useNavigate } from 'react-router';
import { useEffect, useState, useContext } from 'react';
import { getCreditCards } from '../../redux/actions/StripeAction';
import { ThemeContext } from '../../contexts/ThemeContext'
import blackLogo from "../../material/black.png";
import whiteLogo from "../../material/white.png";
import logo from '../../assets/img/logos/logo.png'
import { Link } from "react-router-dom";
import Badge from '@mui/material/Badge';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { selectedMenu } = useSelector((rootState: RootState) => rootState.newHome);
  const user = useSelector((state: RootState) => state.user.userData);

  const [showMoreDrawer, setShowMoreDrawer] = useState(false);

  
  const [clicked, setClicked] = useState(false);

  const translate = () => {
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
      <List sx={{
          borderRight: `1px solid ${theme.palette.grey[400]}`,
          width: '60px',
          height: '100vh',
          overflowX: "hidden",
          overflowY: "auto",
        position: "fixed",
        }}
      >
        <ListItem>
          <Link to="/lounge">
            <h1>
              <img src={logo} alt="logo" id="logo_homepage" style={{ maxHeight: '30px' }} />{" "}
            </h1>
          </Link>
        </ListItem>
        <ListItem
          sx={{
            color: HOME_SIDE_MENU.HOME === selectedMenu || HOME_SIDE_MENU.LOUNGE === selectedMenu
              ? toggle ? 'text.primary' : '#161C24'
              : 'text.secondary',
            cursor: 'pointer',
            paddingBottom: '20px'
          }}
          onClick={() => {
            dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.HOME }));
            navigate(`/lounge/${HOME_SIDE_MENU.HOME}`);
          }}
        >
          <ListItemAvatar>
            <HomeOutlinedIcon />
          </ListItemAvatar>
          {/* <ListItemText primary={<Typography variant="subtitle1">Lounge</Typography>} /> */}
        </ListItem>
        <ListItem
          sx={{
            color: HOME_SIDE_MENU.SEARCH === selectedMenu ? toggle ? 'text.primary' : '#161C24' : 'text.secondary',
            cursor: 'pointer',
            paddingBottom: '20px'
          }}
          onClick={() => {
            dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.SEARCH }));
            navigate(`/lounge/${HOME_SIDE_MENU.SEARCH}`);
          }}
        >
          <ListItemAvatar>
            <SearchOutlinedIcon />
          </ListItemAvatar>
          {/* <ListItemText primary={<Typography variant="subtitle1">Search</Typography>} /> */}
        </ListItem>
        <ListItem
          sx={{
            cursor: 'pointer',
            paddingBottom: '20px',
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
          {/* <ListItemText primary={<Typography variant="subtitle1">Lists</Typography>} /> */}
        </ListItem>
        <ListItem
          sx={{
            cursor: 'pointer',
            paddingBottom: '20px',
            color: HOME_SIDE_MENU.NOTIFICATIONS === selectedMenu ? toggle ? 'text.primary' : '#161C24' : 'text.secondary'
          }}
          onClick={() => {
            dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.NOTIFICATIONS }));
            navigate(`/lounge/${HOME_SIDE_MENU.NOTIFICATIONS}`);
          }}

          // onClick={() => {
          //   dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.LISTS }));
          //   navigate(`/lists`);

          // }}
        >
          <ListItemAvatar>
            <NotificationsNoneOutlinedIcon />
            <Badge badgeContent={4} color="secondary"/>
          </ListItemAvatar>
          {/* <ListItemText primary={<Typography variant="subtitle1">Notifications</Typography>} /> */}
        </ListItem>
        <ListItem
          sx={{
            cursor: 'pointer',
            paddingBottom: '20px',
            color: HOME_SIDE_MENU.MESSAGES === selectedMenu ? toggle ? 'text.primary' : '#161C24' : 'text.secondary'
          }}
          onClick={() => {
            dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.MESSAGES }));
            navigate(`/lounge/${HOME_SIDE_MENU.MESSAGES}`);
          }}
        >
          <ListItemAvatar>
            <EmailOutlinedIcon />
            <Badge color="secondary" badgeContent={4}/>
          </ListItemAvatar>
          {/* <ListItemText primary={<Typography variant="subtitle1">Chat</Typography>} /> */}
        </ListItem>
        <ListItem
          sx={{
            cursor: 'pointer',
            paddingBottom: '20px',
            color: HOME_SIDE_MENU.MY_PROFILE === selectedMenu ? toggle ? 'text.primary' : '#161C24' : 'text.secondary'
          }}
          onClick={() => {
            dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.MY_PROFILE }));
            navigate(`/${user?.custom_username}`);
          }}
        >
          <ListItemAvatar>
            <AccountCircleOutlinedIcon />
          </ListItemAvatar>
          {/* <ListItemText primary={<Typography variant="subtitle1">Profile</Typography>} /> */}
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
            paddingBottom: '20px',
            color: HOME_SIDE_MENU.TOKEN === selectedMenu ? toggle ? 'text.primary' : '#161C24' : 'text.secondary'
          }}
          onClick={() => {
            dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.TOKEN }));
            navigate(`/dint-wallet`);
          }}
        >
          <ListItemAvatar>
            <AccountBalanceWalletOutlinedIcon />
          </ListItemAvatar>
          {/* <ListItemText primary={<Typography variant="subtitle1">Wallet</Typography>} /> */}
        </ListItem>
        <ListItem
          
          sx={{
            cursor: 'pointer',
            paddingBottom: '20px',
            color: HOME_SIDE_MENU.ADD_POST === selectedMenu ? toggle ? 'text.primary' : '#161C24' : 'text.secondary'
          }}
          onClick={() => {
            dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.ADD_POST }));
            navigate(`/lounge/${HOME_SIDE_MENU.ADD_POST}`);
          }}
        >
          <ListItemAvatar>
            <AddBoxOutlinedIcon />
          </ListItemAvatar>
          {/* <ListItemText primary={<Typography variant="subtitle1">Create</Typography>} /> */}
        </ListItem>

        <ListItem
          sx={{
            cursor: 'pointer',
            paddingBottom: '20px',
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
          {/* <ListItemText primary={<Typography variant="subtitle1">More</Typography>} /> */}
        </ListItem>
      </List>
    </>
  );
};

export default Sidebar;
