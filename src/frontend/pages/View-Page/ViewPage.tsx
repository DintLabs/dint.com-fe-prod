import { List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material';

import React, { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupsIcon from '@mui/icons-material/Groups';
import { useLocation, useNavigate, useParams } from 'react-router';
import { fetchViewPageDataByPageName, viewPageActions } from 'frontend/redux/slices/viewPage';
import PageProfile from 'frontend/pages/View-Page/PageProfile';
import { dispatch } from 'frontend/redux/store';
import PageSkeleton from 'frontend/components/common/skeletons/PageSkeleton';
import PageSettings from './PageSettings';
import Subscribers from './Subscribers';
import { ThemeContext } from '../../contexts/ThemeContext';

const ViewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [selectedMenuItemIndex, setSelectedMenuItemIndex] = useState<number | null>();
  const pageData = useSelector((state: any) => state?.viewPage?.pageData);
  const [pageProfileLoader, setPageProfileLoader] = useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] = useState<any>();
  const { toggle } = useContext(ThemeContext);

  // to fetch loggedIn user Details
  const userData = localStorage.getItem('userData');
  useEffect(() => {
    if (typeof userData === 'string') {
      setLoggedInUser(JSON.parse(userData));
    }
  }, [userData]);

  const [isCreator, setIsCreator] = useState<boolean>(false);
  const [isCreatorSet, setIsCreatorSet] = useState<boolean>(false);

  const navigateOnViewPage = () => {
    navigate(`/${pageData?.page_name}`);
  };

  const navigateOnEditPage = () => {
    navigate('/page/creation');
  };

  const navigateOnSubcribersPage = () => {
    navigate(`/${pageData?.page_name}/subscribers`);
  };

  const navigateOnSettingsPage = () => {
    navigate(`/${pageData?.page_name}/settings`);
  };

  // to reset the exsiting page data
  useEffect(() => {
    return () => {
      dispatch(viewPageActions.resetViewPageData());
    };
  }, []);

  useEffect(() => {
    if (loggedInUser?.id && pageData?.user?.id) {
      setIsCreator(loggedInUser?.id === pageData?.user?.id);
      setIsCreatorSet(true);
    } else {
      setIsCreator(false);
    }
  }, [loggedInUser, pageData]);

  // to fetch the page data

  useEffect(() => {
    if (params.username) {
      setPageProfileLoader(true);
      dispatch(fetchViewPageDataByPageName(params.username))
        .then((res: any) => {
          if (res) {
            setPageProfileLoader(false);
          } else {
            setPageProfileLoader(false);
            navigate('/404');
          }
        })
        .catch(() => {
          setPageProfileLoader(false);
          navigate('/404');
        });
    }
  }, [params, navigate]);

  useEffect(() => {
    if (location.pathname.split('/')[2] === 'settings') {
      setSelectedMenuItemIndex(3);
    } else if (location.pathname.split('/')[2] === 'subscribers') {
      setSelectedMenuItemIndex(2);
    } else if (location.pathname.split('/')[2] === 'creation') {
      setSelectedMenuItemIndex(1);
    } else {
      setSelectedMenuItemIndex(0);
    }
  }, [location]);

  const getPageWithCheckPermission = () => {
    if (location.pathname.split('/')[2] === 'settings') {
      return <PageSettings />;
    }
    if (location.pathname.split('/')[2] === 'subscribers') {
      return <Subscribers />;
    }
    return <PageProfile isCreator={isCreator} />;
  };

  return !isCreatorSet && pageProfileLoader ? (
    <PageSkeleton />
  ) : (
    <Stack direction="row" className="view-page-container">
      {/* <Loader loading={!isCreatorSet && pageProfileLoader} /> */}
      {/* left-side creator's menu */}
      {isCreator && !(window.innerWidth < 1000) ? (
        <Stack className="left-side-panel" direction="column">
          {/* navigation menu */}

          <List className="navigation-menu">
            <ListItem
              className={`secondary-text-color navigation-menu-item ${
                selectedMenuItemIndex === 0 ? 'selected-menu-item' : ''
              }`}
              onClick={navigateOnViewPage}
            >
              <ListItemAvatar>
                <HomeIcon
                  sx={{
                    color: toggle ? 'white' : 'text.secondary'
                  }}
                />
              </ListItemAvatar>
              <ListItemText primary={
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: toggle ? 'white' : 'text.secondary'
                  }}
                >
                  Page
                </Typography>
              } />
            </ListItem>
            <ListItem
              className={`secondary-text-color navigation-menu-item ${
                selectedMenuItemIndex === 1 ? 'selected-menu-item' : ''
              }`}
              onClick={navigateOnEditPage}
            >
              <ListItemAvatar>
                <EditIcon
                  sx={{
                    color: toggle ? 'white' : 'text.secondary'
                  }}
                />
              </ListItemAvatar>
              <ListItemText primary={
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: toggle ? 'white' : 'text.secondary'
                  }}
                >
                  Edit Page
                </Typography>
              } />
            </ListItem>
            <ListItem
              className={`secondary-text-color navigation-menu-item ${
                selectedMenuItemIndex === 2 ? 'selected-menu-item' : ''
              }`}
              onClick={navigateOnSubcribersPage}
            >
              <ListItemAvatar>
                <GroupsIcon
                  sx={{
                    color: toggle ? 'white' : 'text.secondary'
                  }}
                  fontSize="medium"
                />
              </ListItemAvatar>
              <ListItemText primary={
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: toggle ? 'white' : 'text.secondary'
                  }}
                >
                  Subscribers
                </Typography>
              } />
            </ListItem>
            <ListItem
              className={`secondary-text-color navigation-menu-item ${
                selectedMenuItemIndex === 3 ? 'selected-menu-item' : ''
              }`}
              onClick={navigateOnSettingsPage}
            >
              <ListItemAvatar>
                <SettingsIcon
                  sx={{
                    color: toggle ? 'white' : 'text.secondary'
                  }}
                />
              </ListItemAvatar>
              <ListItemText primary={
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: toggle ? 'white' : 'text.secondary'
                  }}
                >
                  Settings
                </Typography>
              } />
            </ListItem>
          </List>
        </Stack>
      ) : null}

      {/* main view */}

      {isCreatorSet && getPageWithCheckPermission()}
      {/* <PageProfile isCreator={isCreator} /> */}
    </Stack>
  );
};

export default ViewPage;
