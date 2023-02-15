import {
  Autocomplete,
  Box,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import _axios from "frontend/api/axios";
import useAuth from "frontend/hooks/useAuth";
import { commonSliceActions } from "frontend/redux/slices/common";
import { UserDataInterface } from "frontend/interfaces/reduxInterfaces";
import { AppDispatch, RootState } from "frontend/redux/store";

import React, { useState } from "react";
import Dropdown from "frontend/reusable/Dropdown";

import { BsSearch } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import KeysDialog from "frontend/pages/Wallet/KeysDialog";

import MetamaskLogin from "../../components/MetamaskLogin";
import blacklogo from "../../material/black.png";
import "../../material/Event.css";
import mainlogo from "../../material/white.png";

const MainNavBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const theme = useTheme();
  const { logout } = useAuth();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const pageData = useSelector((state: RootState) => state?.page?.pageData);

  React.useEffect(() => {
    const checkAuth = () => {
      const apiToken = localStorage.getItem("apiToken");
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");

      if (apiToken && apiToken?.length > 0 && userData) {
        setIsAuthenticated(true);
      }
    };

    window.addEventListener("storage", checkAuth);
    checkAuth();
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const isEventsPage = pathname === "/events";

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
      navigate("/");
      dispatch({ type: "RESET_STORE" });
    } catch (e: any) {
      console.error("Error occurred in onLogout", e?.message);
    }
  };

  const navigateOnCreatePage = () => {
    navigate("/page/creation");
  };

  const navigateOnViewPage = () => {
    dispatch(commonSliceActions.startLoading());
    navigate(`/${pageData?.page_name}`);
  };

  const search = async (value: string) => {
    setIsLoadingSearch(true);
    try {
      const { data } = await _axios.get(`/api/search-user/?search=${value}`);
      if (data.code === 200) {
        setSuggestions(data.data);
      }
    } catch (e: any) {
      console.error("e ====>", e.message);
    }
    setIsLoadingSearch(false);
  };

  // navigation array

  const arrNavList = [
    {
      onChange: navigateOnCreatePage,
      title: pageData?.page_name ? "" : "Create Page",
    },
    {
      onChange: navigateOnViewPage,
      title: pageData?.page_name ? "Page" : "",
    },
    {
      onChange: onLogout,
      title: "Logout",
    },
  ];

  const arrNavListMobile = [
    {
      onChange: navigateOnCreatePage,
      title: pageData?.page_name ? "" : "Create Page",
    },
    {
      onChange: navigateOnViewPage,
      title: pageData?.page_name ? "Page" : "",
    },
    {
      onChange: onLogout,
      title: "Logout",
    },
  ];

  const arrNavListMobileNotAuth = [
    {
      onChange: () => navigate(isAuthenticated ? "/events" : "/public/events"),
      title: "Events",
    },
    {
      onChange: () =>
        navigate(
          window.location.href.includes("/auth/login")
            ? "/auth/signup"
            : "/auth/login"
        ),
      title: window.location.href.includes("/auth/login") ? "Sign Up" : "Login",
    },
  ];

  return (
    <div id="event_nav" style={{ marginTop: "80px" }}>
      <header
        id="header"
        className="fixed-top d-flex align-items-center "
        style={{ height: "60px" }}
      >
        <div
          className="container-fluid container-xl d-flex align-items-center justify-content-between"
          style={{ gap: 10, height: "100%", marginBottom: '22px' }}
        >
          <div className="logo" style={{ flex: 1, height: "80%" }}>
            <Link to={isAuthenticated ? "/lounge" : "/"}>
              <h1>
                <img src={mainlogo} alt="logo" id="logo_homepage" style={{maxHeight: '30px'}} />{" "}
              </h1>
            </Link>
            {isEventsPage && (
              <>
                &nbsp; <h2 style={{ color: "white", margin: "0" }}>&nbsp;</h2>
              </>
            )}
          </div>
          {isAuthenticated && isLargeScreen && !pathname.includes("/help") && (
            <Autocomplete
              // freeSolo
              forcePopupIcon={false}
              id="free-solo-2-demo"
              disableClearable
              loading={isLoadingSearch}
              options={suggestions}
              autoHighlight
              onChange={(e, val: UserDataInterface) =>
                navigate(`/${val.custom_username}`)
              }
              getOptionLabel={(option) =>
                option.display_name || option.custom_username
              }
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
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
                    type: "search",
                    style: {
                      backgroundColor: theme.palette.grey[800],
                      paddingLeft: 10,
                    },
                  }}
                  fullWidth
                  size="small"
                  sx={{
                    borderWidth: 0,
                    "& label.Mui-focused": {
                      // color: 'white'
                    },
                    "& .MuiInput-underline:after": {
                      // borderBottomColor: theme.palette.grey[800]
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        // borderColor: 'white'
                      },
                      "&:hover fieldset": {
                        // borderColor: 'white'
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.grey[600],
                        borderWidth: 1,
                      },
                    },
                  }}
                />
              )}
              style={{
                width: 250,
                marginRight: 20,
                flex: 1,
              }}
            />
          )}
          <nav style={{ flex: 1, justifyContent: "flex-end" }}>
            <ul
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                margin: "0",
                gap: "10px",
                listStyle: "none",
              }}
            >
              <li className="mobile-logo">
                <Link to="/">
                  <img
                    src={blacklogo}
                    width="40"
                    height="40"
                    className=""
                    alt=""
                  />
                </Link>
              </li>

              {isAuthenticated && window.innerWidth > 980 && (
                <>
                  <div className="profile_hide_pc">
                    <li className="no_effect_li">
                      <Link
                        id="no_effect"
                        to="/page/creation"
                        state={{ from: "events" }}
                      >
                        {pageData?.page_name ? "Edit Page" : "Create Page"}
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
                          Page
                        </Typography>
                      </li>
                    </div>
                  ) : null}
                </>
              )}

              {isAuthenticated ? (
                <>
                  <Dropdown
                    title={<CgProfile style={{ color: "white" }} size={37} />}
                    arrChanges={
                      window.innerWidth < 980 ? arrNavListMobile : arrNavList
                    }
                    mobile={window.innerWidth < 980}
                  />

                  {window.innerWidth > 980 && (
                    <>
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
                  )}
                </>
              ) : (
                <></>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <KeysDialog />
    </div>
  );
};

export default MainNavBar;
