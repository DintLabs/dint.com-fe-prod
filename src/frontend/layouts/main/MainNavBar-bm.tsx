import {
  Autocomplete,
  Box,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import _axios from 'frontend/api/axios';
import useAuth from 'frontend/hooks/useAuth';
import { commonSliceActions } from 'frontend/redux/slices/common';
import { UserDataInterface } from 'frontend/interfaces/reduxInterfaces';
import { RootState } from 'frontend/redux/store';
import $ from 'jquery';
import React, { useCallback, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MetamaskLogin from '../../components/MetamaskLogin';
import blacklogo from '../../material/black.png';
import '../../material/Event.css';
import mainlogo from '../../material/white.png';

const MainNavBar = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const { logout } = useAuth();
  const { pathname } = useLocation();
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const pageData = useSelector((state: RootState) => state?.page?.pageData);

  React.useEffect(() => {
    window.addEventListener('storage', checkAuth);
    checkAuth();
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const checkAuth = () => {
    const apiToken = localStorage.getItem('apiToken');
    let userData = localStorage.getItem('userData');
    userData = JSON.parse(userData ?? '{}');

    if (apiToken && apiToken?.length > 0 && userData) {
      setIsAuthenticated(true);
    }
  };

  const isEventsPage = pathname === '/events';

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
      setIsAuthenticated(false);
      navigate('/');
      dispatch({ type: 'RESET_STORE' });
    } catch (e: any) {
      console.error('Error occurred in onLogout', e?.message);
    }
  };

  const navigateOnCreatePage = () => {
    navigate('/page/creation');
  };

  const navigateOnViewPage = () => {
    dispatch(commonSliceActions.startLoading());
    navigate(`/${pageData?.page_name}`);
  };

  const select = (el: string, all = false): any => {
    el = el.trim();
    if (all) {
      return [...(document as any).querySelectorAll(el)];
    }
    return document.querySelector(el);
  };

  const mobile_nav = useCallback(() => {
    select('#navbar').classList.toggle('navbar-mobile');
    $('#navbar_icon').toggleClass('bi-list');
    $('#navbar_icon').toggleClass('bi-x');
  }, []);

  React.useEffect(() => {
    $('#navbar li').on('click', () => {
      if ($('#navbar').hasClass('navbar-mobile')) {
        mobile_nav();
      }
    });
  }, [mobile_nav]);

  const search = async (value: string) => {
    setIsLoadingSearch(true);
    try {
      const { data } = await _axios.get(`/api/search-user/?search=${value}`);
      if (data.code === 200) {
        setSuggestions(data.data);
      }
    } catch (e: any) {
      console.error('e ====>', e.message);
    }
    setIsLoadingSearch(false);
  };

  return (
    <>
      <div id="event_nav" style={{ marginTop: '80px' }}>
        <header
          id="header"
          className="fixed-top d-flex align-items-center "
          style={{ height: '80px' }}
        >
          <div
            className="container-fluid container-xl d-flex align-items-center justify-content-between"
            style={{ gap: 10 }}
          >
            <div className="logo" style={{ flex: 1 }}>
              <Link to={isAuthenticated ? '/lounge' : '/'}>
                <h1>
                  <img src={mainlogo} alt="logo" id="logo_homepage" />{' '}
                </h1>
              </Link>
              {isEventsPage ? (
                <>
                  &nbsp; <h2 style={{ color: 'white', margin: '0' }}>&nbsp;</h2>
                </>
              ) : (
                <></>
              )}
            </div>
            {isAuthenticated && isLargeScreen && (
              <Autocomplete
                // freeSolo
                forcePopupIcon={false}
                id="free-solo-2-demo"
                disableClearable
                loading={isLoadingSearch}
                options={suggestions}
                autoHighlight
                onChange={(e, val: UserDataInterface) => navigate(`/${val.custom_username}`)}
                getOptionLabel={(option) => option.display_name || option.custom_username}
                renderOption={(props, option) => (
                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <img
                      // loading="lazy"
                      width="20"
                      height="20"
                      src={option.profile_image}
                      alt="img"
                    />
                    {option.display_name || option.custom_username}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id="user-search-input"
                    // value={userSearchText}
                    onChange={(e) => {
                      search(e.target.value);
                    }}
                    placeholder="Search here..."
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <BsSearch />
                        </InputAdornment>
                      ),
                      type: 'search',
                      style: {
                        backgroundColor: theme.palette.grey[800],
                        paddingLeft: 10
                      }
                    }}
                    fullWidth
                    size="small"
                    sx={{
                      borderWidth: 0,
                      '& label.Mui-focused': {
                        // color: 'white'
                      },
                      '& .MuiInput-underline:after': {
                        // borderBottomColor: theme.palette.grey[800]
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          // borderColor: 'white'
                        },
                        '&:hover fieldset': {
                          // borderColor: 'white'
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.grey[600],
                          borderWidth: 1
                        }
                      }
                    }}
                  />
                )}
                style={{
                  width: 250,
                  marginRight: 20,
                  flex: 1
                }}
              />
            )}
            <nav
              id="navbar"
              className="navbar order-lg-0"
              style={{ flex: 1, justifyContent: 'flex-end' }}
            >
              <ul>
                <li className="mobile-logo">
                  <Link to="/">
                    <img src={blacklogo} width="40" height="40" className="" alt="" />
                  </Link>
                </li>

                {isAuthenticated && window.innerWidth > 980 && (
                  <>
                    <div className="profile_hide_pc">
                      <li className="no_effect_li">
                        <Link id="no_effect" to="/page/creation" state={{ from: 'events' }}>
                          {pageData?.page_name ? 'Edit Page' : 'Create Page'}
                        </Link>
                      </li>
                    </div>
                    {pageData?.page_name ? (
                      <div className="profile_hide_pc">
                        <li className="no_effect_li">
                          <Typography
                            variant="inherit"
                            onClick={navigateOnViewPage}
                            fontSize="20px"
                          >
                            View Page
                          </Typography>
                        </li>
                      </div>
                    ) : null}
                  </>
                )}

                {isAuthenticated ? (
                  <li className="no_effect_li">
                    <Link id="no_effect" to="/events" state={{ from: 'events' }}>
                      Events
                    </Link>
                  </li>
                ) : (
                  <li className="no_effect_li">
                    <Link id="no_effect" to="/public/events" state={{ from: 'events' }}>
                      Events
                    </Link>
                  </li>
                )}

                {isAuthenticated ? (
                  <>
                    <div className="profile_hide_mobile">
                      <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                          <span id="profile_btn">
                            <CgProfile size={35} />
                          </span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item style={{ color: 'black' }} onClick={navigateOnCreatePage}>
                            {pageData?.page_name ? 'Edit Page' : 'Create Page'}
                          </Dropdown.Item>
                          {pageData?.page_name ? (
                            <Dropdown.Item style={{ color: 'black' }} onClick={navigateOnViewPage}>
                              View Page
                            </Dropdown.Item>
                          ) : null}
                          <Dropdown.Item style={{ color: 'black' }} onClick={onLogout}>
                            Logout
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>

                    {/* wallet */}
                    <div className="navlinks">
                      <MetamaskLogin />
                    </div>

                    <div className="profile_hide_pc">
                      <li className="no_effect_li">
                        <a id="no_effect" onClick={onLogout} href="/">
                          Logout
                        </a>
                      </li>
                    </div>
                  </>
                ) : (
                  <>
                    <li className="no_effect_li">
                      <Link id="no_effect" to="/auth/login/ ">
                        Login
                      </Link>
                    </li>
                    <li className="no_effect_li">
                      <Link id="no_effect" to="/auth/signup">
                        Sign Up
                      </Link>
                    </li>

                    <li className="no_effect_li">
                      <button
                        type="button"
                        onClick={() => navigate('/auth/login')}
                        style={{ background: 'transparent', border: '0', color: 'white' }}
                      >
                        <MdOutlineAccountBalanceWallet size={35} />{' '}
                      </button>
                    </li>
                  </>
                )}
              </ul>

              <div onClick={mobile_nav} aria-hidden="true">
                <i className="bi bi-list mobile-nav-toggle" id="navbar_icon" />
              </div>
            </nav>
          </div>
        </header>
      </div>
    </>
  );
};

export default MainNavBar;