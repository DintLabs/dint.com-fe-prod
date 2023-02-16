import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import TextsmsRoundedIcon from '@mui/icons-material/TextsmsRounded';
import { List, ListItem, ListItemAvatar } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MoreOptionsDrawer from 'frontend/layouts/MoreOptionsDrawer';
import { HOME_SIDE_MENU, setNewHomeSliceChanges } from 'frontend/redux/slices/newHome';
import { dispatch, RootState, useSelector } from 'frontend/redux/store';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

import { useNavigate } from 'react-router';

import { ThemeContext } from "frontend/contexts/ThemeContext";
import { useContext } from "react";
interface Props {
  widthScreen: number;
}

const SidebarMobile = ({ widthScreen }: Props) => {
  const navigate = useNavigate();
  
  const { toggle } = useContext(ThemeContext);
  const { selectedMenu } = useSelector((rootState: RootState) => rootState.newHome);

  const [showMoreDrawer, setShowMoreDrawer] = useState(false);

  const styleListItem = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    px: widthScreen > 375 ? '' : '0px'
  };

  return (
    <>
      <MoreOptionsDrawer
        open={showMoreDrawer}
        onClose={() => setShowMoreDrawer(false)}
        openFrom="right"
      />
      <List sx={{ display: 'flex', backgroundColor: toggle ? "#000" : "#fff",  }}>
        <ListItem
          sx={{
            color: HOME_SIDE_MENU.HOME === selectedMenu ? (toggle ? "#fff" : '#000') : 'text.secondary',
            cursor: 'pointer',
            ...styleListItem
          }}
          onClick={() => {
            dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.HOME }));
            navigate(`/lounge/${HOME_SIDE_MENU.HOME}`);
          }}
        >
          <ListItemAvatar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <OtherHousesIcon />
          </ListItemAvatar>
        </ListItem>
        <ListItem
          sx={{
            color: HOME_SIDE_MENU.SEARCH === selectedMenu ?  (toggle ? "#fff" : '#000') : 'text.secondary',
            cursor: 'pointer',
            ...styleListItem
          }}
          onClick={() => {
            dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.SEARCH }));
            navigate('/search');
          }}
        >
          <ListItemAvatar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <BsSearch />
          </ListItemAvatar>
        </ListItem>
        <ListItem
          sx={{
            cursor: 'pointer',
            color: HOME_SIDE_MENU.MESSAGES === selectedMenu ?  (toggle ? "#fff" : '#000') : 'text.secondary',
            ...styleListItem
          }}
          onClick={() => {
            dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.MESSAGES }));
            navigate(`/lounge/${HOME_SIDE_MENU.MESSAGES}`);
          }}
        >
          <ListItemAvatar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <TextsmsRoundedIcon />
          </ListItemAvatar>
        </ListItem>

        <ListItem
          sx={{
            cursor: 'pointer',
            color: HOME_SIDE_MENU.WALLET === selectedMenu ?  (toggle ? "#fff" : '#000') : 'text.secondary',
            ...styleListItem
          }}
          onClick={() => {
            dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.WALLET }));
            navigate(`/dint-wallet`);
          }}
        >
          <ListItemAvatar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <AccountBalanceWalletIcon  />
          </ListItemAvatar>
        </ListItem>

        <ListItem
          sx={{
            cursor: 'pointer',
            color: HOME_SIDE_MENU.MORE === selectedMenu ?  (toggle ? "#fff" : '#000') : 'text.secondary',
            ...styleListItem
          }}
          onClick={() => {
            dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.MORE }));
            setShowMoreDrawer(true);
          }}
        >
          <ListItemAvatar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <AccountCircleRoundedIcon />
          </ListItemAvatar>
        </ListItem>
      </List>
    </>
  );
};

export default SidebarMobile;
