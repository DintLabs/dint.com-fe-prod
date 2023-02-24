import { AccountBalance, Logout, Payment, Settings } from '@mui/icons-material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {
  Avatar,
  Badge,
  Box,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Radio,
  RadioGroup,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LightModeIcon from '@mui/icons-material/LightMode';
import LanguageIcon from '@mui/icons-material/Language';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

import useAuth from 'frontend/hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from 'styled-components';
import { getFollowerList, getFollowingList } from 'frontend/redux/slices/user';
import { AppDispatch, RootState } from 'frontend/redux/store';
import { FlexRow } from 'frontend/reusable/reusableStyled';
import { useContext, useEffect, useState } from 'react';
import { setWalletSliceChanges } from 'frontend/redux/actions/createWallet';
import { getCreditCards } from '../redux/actions/StripeAction';
import {ThemeContext} from '../contexts/ThemeContext';
import _axios from 'frontend/api/axios';

const languages = [
  {
    title: 'English',
    value: 'en'
  },
  {
    title: 'Chinese Simplified',
    value: 'zh-CN'
  },
  {
    title: 'Chinese Traditional',
    value: 'zh-TW'
  },
  {
    title: 'Portuguese',
    value: 'pt'
  },
  {
    title: 'Spanish',
    value: 'es'
  },
  {
    title: 'Japanese',
    value: 'ja'
  },
  {
    title: 'Korean',
    value: 'ko'
  },
  {
    title: 'Hindi',
    value: 'hi'
  },
  {
    title: 'French',
    value: 'fr'
  },
  {
    title: 'German',
    value: 'de'
  },
  {
    title: 'Italian',
    value: 'it'
  },
  {
    title: 'Romanian',
    value: 'ro'
  },
  {
    title: 'Arabic',
    value: 'ar'
  },
  {
    title: 'Ukrainian',
    value: 'uk'
  },
  {
    title: 'Russian',
    value: 'ru'
  }
];

const itemSelectionStyle = {
  "& selected": {
    color: "white",
    "& .MuiListItemIcon-root": {
      color: "white",
    },
  },
  "& selected:hover": {
    color: "white",
    "& .MuiListItemIcon-root": {
      color: "white",
    },
  },
  "&:hover": {
    color: "white",
    "& .MuiListItemIcon-root": {
      color: "white",
    },
    "& p": {
      color: "white",
    },
  },
};

const BoxStyled = styled(Box)`
  width: 250px;
  background: #161c24;
  height: auto;

  @media (max-height: 731px) {
    height: auto;
  }
`;

const MoreOptionsDrawer = ({ open, onClose, openFrom = 'left' }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const { logout } = useAuth();
  const [valueLang, setValueLang] = React.useState<string | null>(localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') :  'en');
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const savedUser = JSON.parse(localStorage.getItem('userData') ?? '{}');

  const currentLanguage = localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') :  'en';

  if (valueLang !== currentLanguage) {
    setValueLang(currentLanguage);
  }

  const { toggle, toggleFunction } = useContext(ThemeContext);

  const onLogout = async () => {
    const obj = {
      is_online: false,
    };

    await _axios
      .put(`/api/user/update-status/`, obj)
      .then((response: any) => {
        console.log("response", response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
    try {
      await logout();
      navigate('/');
      dispatch({ type: 'RESET_STORE' });
    } catch (e: any) {
      console.error('Error occurred in onLogout', e?.message);
    }
  };

  const handleChangeCard = async () => {
    await dispatch(getCreditCards()).then((response: any) => {
      if (response.length !== 0){
        navigate('/cards');
      } else {
        navigate('/payment/add');
      }
    });
  }


  // Accordione

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueLang((event.target as HTMLInputElement).value);
    const selectedLanguage = (event.target as HTMLInputElement).value;
    localStorage.setItem('selectedLanguage', selectedLanguage);
    const languageDropdown = $('.goog-te-combo');
    languageDropdown.val(selectedLanguage);
    languageDropdown[0].dispatchEvent(new Event('change'))
  };

  const accordion = (
    <Accordion
      onClick={(e) => e.stopPropagation()}
      sx={{
        background: 'none',
        boxShadow: 'none',
        margin: '0'
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{color:toggle? "white" : "black"}} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ padding: '0' }}
      >
        <ListItemIcon>
          <LanguageIcon />
        </ListItemIcon>

        <Typography component="span" translate="no">
          {languages.filter((currLang) => currLang.value === valueLang)[0].title}
        </Typography>
      </AccordionSummary>

      <FormControl style={{ padding: '0 0 0 12px' }}>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={valueLang}
          onChange={handleChange}
        >
          {languages.map((oneLang, i) => (
            <AccordionDetails key={i}>
              <FormControlLabel
                key={`${oneLang.value}_${i}`}
                value={oneLang.value}
                control={<Radio sx={{color:toggle ? "white" : "black"}}/>}
                label={oneLang.title}
                translate="no"
              />
            </AccordionDetails>
          ))}
        </RadioGroup>
      </FormControl>
    </Accordion>
  );

  const { follower, following } = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    dispatch(getFollowerList());
    dispatch(getFollowingList());
  }, [dispatch]);

  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    if (clicked) {
      // do something meaningful, Promises, if/else, whatever, and then
      window.location.assign('https://paydev.dint.com');
    }
  });

  return (
    <Drawer anchor={openFrom} open={open} onClose={onClose}>
      <BoxStyled role="presentation" onClick={onClose} onKeyDown={onClose} className={toggle ? '' : 'white-content'}>
        <Box p={2}>
          <Badge
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            color="success"
            overlap="circular"
            badgeContent=" "
            variant="dot"
            invisible={!savedUser}
          >
            <Avatar src={savedUser?.profile_image} sx={{ width: 75, height: 75 }} />
          </Badge>
          <Typography variant="h3" sx={{ color: toggle ? 'text.primary' : '#161C24', pt: 2 }}>
            {savedUser.display_name}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }} onClick={() => navigate(`/${savedUser?.custom_username}`) } >
            @{savedUser.custom_username}
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: toggle ? 'text.primary' : '#161C24', pt: 2, display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            <FlexRow onClick={() => navigate('/followers')} cursor="pointer">
              {(Array.isArray(follower) && follower.length) || 0} Follower
            </FlexRow>{' '}
            •{' '}
            <FlexRow onClick={() => navigate('/lounge/following')} cursor="pointer">
              {(Array.isArray(following) && following.length) || 0} Following
            </FlexRow>
          </Typography>
        </Box>

        <Divider />

        <List>
          <ListItem
            sx={itemSelectionStyle}
            disablePadding
            // onClick={() => navigate(`/settings/profile`)}
            onClick ={ ()=>   navigate(`/${savedUser?.custom_username}`)  }
          >
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>

          <ListItem sx={itemSelectionStyle} disablePadding onClick={() => navigate(`/referrals`)}>
            <ListItemButton>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="Referrals" />
            </ListItemButton>
          </ListItem>

          <ListItem
            sx={itemSelectionStyle}
            disablePadding
            onClick={() => navigate(isLargeScreen ? `/bookmarks/all-bookmarks` : `/bookmarks`)}
          >
            <ListItemButton>
              <ListItemIcon>
                <BookmarkBorderIcon />
              </ListItemIcon>
              <ListItemText primary="Bookmarks" />
            </ListItemButton>
          </ListItem>

          <ListItem sx={itemSelectionStyle} disablePadding onClick={() => navigate(`/lists`)}>
            <ListItemButton>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText primary="Lists" />
            </ListItemButton>
          </ListItem>

          <ListItem
            sx={itemSelectionStyle}
            disablePadding
            onClick={() => navigate(isLargeScreen ? `/settings/profile` : `/settings`)}
          >
            <ListItemButton>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>

          <Divider />

          <ListItem sx={itemSelectionStyle} disablePadding onClick={handleChangeCard}>
            <ListItemButton>
              <ListItemIcon>
                <Payment />
              </ListItemIcon>
              <ListItemText primary="Your Cards" secondary="(to add funds)" />
            </ListItemButton>
          </ListItem>

          <ListItem
            sx={itemSelectionStyle}
            disablePadding
            onClick={() => navigate(`/buy-dint-token`)}
          >
            <ListItemButton>
              <ListItemIcon>
                <CurrencyExchangeIcon />
              </ListItemIcon>
              <ListItemText primary="Buy Token" secondary="(to play)" />
            </ListItemButton>
          </ListItem>

          <ListItem
            sx={itemSelectionStyle}
            disablePadding
               onClick={() => navigate('/your-bank')}
          >
            <ListItemButton>
              <ListItemIcon>
                <AccountBalance />
              </ListItemIcon>
              <ListItemText primary="Your bank" secondary="(to withdrawal)" />
            </ListItemButton>
          </ListItem>

          <ListItem
            sx={itemSelectionStyle}
            disablePadding
onClick={() => navigate('/dint-wallet')}
          >
            <ListItemButton>
              <ListItemIcon>
                <AccountBalanceWalletIcon />
              </ListItemIcon>
              <ListItemText primary="Wallet" />
            </ListItemButton>
          </ListItem>

          <Divider />

          <ListItem
            sx={itemSelectionStyle}
            disablePadding
            onClick={() => navigate('/help')}
          >
            <ListItemButton>
              <ListItemIcon>
                <ContactSupportIcon />
              </ListItemIcon>
              <ListItemText primary="Help and support" />
            </ListItemButton>
          </ListItem>

          <ListItem
            sx={itemSelectionStyle}
            disablePadding
            onClick={toggleFunction}
          >
            <ListItemButton>
              <ListItemIcon>
                <LightModeIcon />
              </ListItemIcon>
              <ListItemText primary={ toggle ? 'Light Mode' : 'Dark Mode'} />
            </ListItemButton>
          </ListItem>
          <div id="test-div" />
          <ListItem
            sx={{
              // ...itemSelectionStyle,
              "& .MuiTypography-root": {
                color: toggle ? "white" : "#161C24",
              },
              "& selected": {
                color: "white",
                "& .MuiListItemIcon-root": {
                  color: "white",
                },
              },
              "& selected:hover": {
                color: "white",
                "& .MuiListItemIcon-root": {
                  color: "white",
                },
              },
              '.MuiButtonBase-root':{
                background : toggle ? '#161c24' : "white" 
              },
              '&:hover': {
                color: 'white',
                '.MuiButtonBase-root': {
                  background: '#919EAB'
                },
                "& .MuiListItemIcon-root": {
                  color: "white",
                },
                "& p": {
                  color: "white",
                },
              },
            }}
            disablePadding
            // onClick={onLogout}
          >
            <ListItemButton>
              <ListItemText primary={accordion} />
            </ListItemButton>
          </ListItem>

          <Divider />

          <ListItem sx={itemSelectionStyle} disablePadding onClick={onLogout}>
            <ListItemButton>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>

          <Divider />
        </List>
      </BoxStyled>
    </Drawer>
  );
};

export default MoreOptionsDrawer;