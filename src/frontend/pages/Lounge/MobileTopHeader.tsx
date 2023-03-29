import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logos/logo.png';
import { Avatar, Box, Typography } from '@mui/material';
import { ThemeContext } from 'frontend/contexts/ThemeContext';
import { useContext } from 'react';
import { HOME_SIDE_MENU } from 'frontend/redux/slices/newHome';
import { useParams } from 'react-router';
import _axios from 'frontend/api/axios';
import { AccountBalanceWallet } from '@mui/icons-material';
import { dispatch, RootState, useSelector } from 'frontend/redux/store';
import { getKeys } from 'frontend/redux/actions/createWallet';

export default function MobileTopHeader({ userName, avatar }: { userName: string, avatar: string }) {
  const [hasShadow, setHasShadow] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [notificationsLength, setNotificationsLength] = React.useState();
  const navigate = useNavigate();
  const { balance } = useSelector(
    (rootState: RootState) => rootState.wallet,
  );

  const { toggle } = useContext(ThemeContext);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const routeurl = useParams();
  const menuId = 'primary-search-account-menu';

  const walletBalance = async () => {
    await dispatch(getKeys());
  };

  React.useEffect(() => {
    const getUnseenMessagesLength = async () => {
      await _axios.get('/api/chat/get-unseen-message/').then((res: any) => {
        setNotificationsLength(res.data.data.length);
      }).catch((err: any) => {
        console.log(err);
      });
    };
    getUnseenMessagesLength();
    walletBalance();

  }, []);

  React.useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 70 && !hasShadow) {
        setHasShadow(true)
      }

      if (window.scrollY <= 70 && hasShadow) {
        setHasShadow(false);
      }
    };

    document.addEventListener('scroll', onScroll);

    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [hasShadow]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        className="mobile-menu"
        sx={{ background: toggle ? '#151c24' : '#fff', boxShadow: hasShadow ? 1 : 0 }}
        position="fixed"
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <Link to="/lounge">
              <h1>
                <img
                  src={logo}
                  alt="logo"
                  id="logo_homepage"
                  style={{ maxHeight: '30px' }}
                />{' '}
              </h1>
            </Link>
          </IconButton>
          <Typography
            sx={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
          }}
            color={toggle ? '#fff' : '#000'}
          >
            {routeurl.username && userName}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              sx={{
                color: toggle ? '#fff' : '#6E747A',
                padding: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              }}
              onClick={() => {
                navigate(`/dint-wallet/`);
              }}
            >
              <AccountBalanceWallet />
              {balance >= 0 ? (
                <span
                  className="notranslate"
                  style={{
                    color: toggle ? 'white' : '#666666',
                    textAlign: 'center',
                    fontSize: '17px',
                    padding: '5px',
                  }}
                >
                  ${balance}
                </span>
              ) : null}
            </IconButton>

            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              sx={{ color: toggle ? '#fff' : '#6E747A', padding: '5px', cursor: 'pointer' }}
              onClick={() => {
                navigate(`/lounge/${HOME_SIDE_MENU.NOTIFICATIONS}`);
              }}
            >
              <NotificationsOutlinedIcon />
              <Badge badgeContent={notificationsLength} color="secondary" />
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              sx={{ color: toggle ? '#fff' : '#6E747A', padding: '5px' }}
            >
              <Avatar
                className="story-avatar avtar-mobile-dev"
                src={avatar}
                sx={{
                  width: 92,
                  height: 92,
                  borderWidth: '3px',
                  borderStyle: 'solid',
                  borderColor: toggle ? '#4AA081' : '#4AA081',
                }}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
