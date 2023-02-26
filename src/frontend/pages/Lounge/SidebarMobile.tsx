import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import TextsmsRoundedIcon from '@mui/icons-material/TextsmsRounded';
import { List, ListItem, ListItemAvatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreOptionsDrawer from 'frontend/layouts/MoreOptionsDrawer';
import { HOME_SIDE_MENU, setNewHomeSliceChanges } from 'frontend/redux/slices/newHome';
import { dispatch, RootState, useSelector } from 'frontend/redux/store';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

import { useNavigate } from 'react-router';

import { ThemeContext } from "frontend/contexts/ThemeContext";
import { useContext } from "react";
import { Add } from '@mui/icons-material';
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
      <List sx={{ display: 'flex', padding :"3% 0%" , backgroundColor: toggle ? "#000" : "#fff",  }}>
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
            <OtherHousesIcon sx={{ height :"30px" , width : "30px"}}/>
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
            <BsSearch style={{ height :"20px" , width : "20px"}} />
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
            navigate(`/lounge/add-post`);
          }}
        >
          <ListItemAvatar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Add  sx={{ height :"70px" , width : "70px"}}/>
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
            <TextsmsRoundedIcon sx={{ height :"35px" , width : "35px"}}/>
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
            <AccountCircleRoundedIcon sx={{ height :"35px" , width : "35px"}}/>
          </ListItemAvatar>
        </ListItem>
      </List>
    </>
  );
};

export default SidebarMobile;
