import { Box, Grid } from '@mui/material';
import { useLayoutEffect, useMemo, useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';

import _axios from 'frontend/api/axios';
import { isMobile } from "frontend/utils";
import { HOME_SIDE_MENU } from 'frontend/redux/slices/newHome';
import { useLounge } from 'frontend/contexts/LoungeContext';
import { dispatch, RootState } from 'frontend/redux/store';
import { checkUsernameAvailability } from 'frontend/redux/actions/commonActions';

import { commonSliceActions } from 'frontend/redux/slices/common';
import PageSkeleton from 'frontend/components/common/skeletons/PageSkeleton';

import BuyToken from 'frontend/pages/BuyToken';
import HomeTab from './HomeTab';
import MyProfile from './MyProfile';
import Sidebar from './Sidebar';
import SidebarMobile from './SidebarMobile';
import Subscriptions from '../Subscriptions/Subscriptions';
import ViewPage from '../View-Page/ViewPage';
import AddPost from './AddPost';
import Messages from '../Messages/Messages';
import DintWallet from '../Wallet/DintWallet';
import Withdrawal from '../Wallet/Withdrawal';
import ProcessWithdrawal from '../Wallet/ProcessWithdrawal';
import { Modal } from '@mui/material';
import Search from "../search/index";
import ProfilePage from "./ProfilePage";
import MobileTopHeader from "./MobileTopHeader";
import NotificationsContainer from '../Notifications';

const NewHome = () => {
  const userData = useSelector((state: RootState) => state?.user?.userData);
  const { addNewPostToContext } = useLounge();
  
  const [widthScreen, setWidthScreen] = useState<number>(window.screen.width);
  const [isLounge, setIsLounge] = useState<boolean>(false);
  const [isViewPage, setIsViewPage] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const isPrimaryLoader = useSelector((state: RootState) => state.common.isLoading);

  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const validPages = [
      HOME_SIDE_MENU.ADD_POST,
      HOME_SIDE_MENU.HOME,
      HOME_SIDE_MENU.TOKEN,
      HOME_SIDE_MENU.WALLET,
      HOME_SIDE_MENU.WITHDRAWAL,
      HOME_SIDE_MENU.PROCESSWITHDRAWAL,
      HOME_SIDE_MENU.LOUNGE,
      // HOME_SIDE_MENU.MY_PROFILE,
      HOME_SIDE_MENU.MESSAGES,
      HOME_SIDE_MENU.SUBSCRIPTIONS,
      HOME_SIDE_MENU.SEARCH,
      HOME_SIDE_MENU.NOTIFICATIONS
    ];

    if (params.page) {
      if (!params.username) {
        if (validPages.includes(params.page as string as HOME_SIDE_MENU)) {
          setIsLounge(true);
        } else {
          navigate('/404');
        }
      } else {
        navigate('/404');
      }
    } else if (params.username) {
      dispatch(commonSliceActions.startLoading());
      dispatch(checkUsernameAvailability(params.username))
        .then((res: { user_id?: number; page_id?: number | null }) => {
          if (res) {
            if (res?.user_id) {
              setIsLounge(true);
            } else {
              setIsLounge(false);
              setIsViewPage(true);
            }
            dispatch(commonSliceActions.stopLoading());
          } else {
            dispatch(commonSliceActions.stopLoading());
            navigate('/404');
          }
        })
        .catch((err: any) => {
          console.error(err);
        });
    } else {
      setIsLounge(true);
    }
  }, [location, navigate, params, params.username]);

  useLayoutEffect(() => {
    function updateWidth() {
      setWidthScreen(window.screen.width);
    }
    window.addEventListener('resize', updateWidth);
    updateWidth();
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // const isMobileScreen = useMemo(() => {
  //   return isMobile()
  // }, [widthScreen])

  // const styleSidebarMobile = {
  //   display: widthScreen >= 900 ? "none" : "",
  //   position: "fixed",
  //   bottom: 0,
  //   left: 0,
  //   width: "100%",
  //   zIndex: "120",
  // };

  const createPost = useCallback(
    async (toastId: string, data: any) => {
      try {
        const result = await _axios.post('/api/posts/create/', data);
        if (result?.data?.data) addNewPostToContext(result.data.data);
        setTimeout(() => {
          toast.update(toastId, {
            render: 'Post Added Successful!',
            type: 'success',
            isLoading: false
          });
        }, 1000);

        setTimeout(() => {
          toast.dismiss();
        }, 3000);
        
      } catch (err: any) {
        toast.error(err.toString());
      }
    },
    [addNewPostToContext]
  );

  const handleClose = () => {
    setOpenModal(false)
    navigate('/lounge')
  }

  const renderComponent = useMemo(() => {
    if (
      location.pathname.includes(HOME_SIDE_MENU.HOME) ||
      location.pathname === `/${HOME_SIDE_MENU.LOUNGE}`
    )
      return (
        <Grid container>
          <Grid item xs={12} md={12}>
            <HomeTab createPost={createPost} />
          </Grid>
          {/* <Grid item xs={12} md={4} /> */}
        </Grid>
      );
    if (location.pathname.includes(HOME_SIDE_MENU.MESSAGES)) return <Messages />;
    if (location.pathname.includes(HOME_SIDE_MENU.TOKEN)) return <BuyToken />;
    if (location.pathname.includes(HOME_SIDE_MENU.WALLET)) return <DintWallet />;
    if (location.pathname.includes(HOME_SIDE_MENU.WITHDRAWAL)) return <Withdrawal />;
    if (location.pathname.includes(HOME_SIDE_MENU.PROCESSWITHDRAWAL)) return <ProcessWithdrawal />;
    if (location.pathname.includes(HOME_SIDE_MENU.NOTIFICATIONS)) return <NotificationsContainer />;
    if (location.pathname.includes(HOME_SIDE_MENU.ADD_POST))
      return (
        <Modal
          open={true}
          onClose={handleClose}
        >
          <AddPost widthScreen={widthScreen} createPost={createPost}  />
        </Modal>
      );
    if (location.pathname.includes(HOME_SIDE_MENU.SEARCH)) return <Search />;
    if (location.pathname.includes(HOME_SIDE_MENU.SUBSCRIPTIONS))
      return <Subscriptions />;
    return (
      <>
        <Grid container>
          <Grid item xs={12} md={12}>
            <ProfilePage username={params.username} />
          </Grid>
        </Grid>
      </>
    );
  }, [createPost, location.pathname, params.username, widthScreen]);

  return isPrimaryLoader ? (
    <PageSkeleton />
  ) : isViewPage ? (
    <ViewPage />
  ) : (
    <>
      <Helmet>
        <title>Lounge</title>
        <meta
          name=""
          content=""
        />
      </Helmet>
      <Box style={{ margin: 0 }}>
        <Grid container>
          <Grid
            item
            xs={0}
            md={1}
            className="desktop-nav"
          >
            {userData && !!userData.id && <Sidebar />}
          </Grid>
          <Grid item className="mobile-nav">
            {userData && !!userData.id && ( 
              // isMobileScreen &&
              <>
                <MobileTopHeader userName={userData.display_name || ""} avatar={userData.profile_image || ""} />
                <SidebarMobile widthScreen={widthScreen} />
              </>
            )}
          </Grid>
          <Grid item xs={12} md={10}>
            {isLounge ? renderComponent : null}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default NewHome;
