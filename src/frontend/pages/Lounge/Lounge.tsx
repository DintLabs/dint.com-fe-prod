import { useLayoutEffect, useMemo, useState, useEffect, useCallback } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { checkUsernameAvailability } from 'frontend/redux/actions/commonActions'
import { dispatch, RootState } from 'frontend/redux/store'
import { commonSliceActions } from 'frontend/redux/slices/common'
import { HOME_SIDE_MENU } from 'frontend/redux/slices/newHome'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify'

import { Box, Grid, Modal, useMediaQuery } from '@mui/material'
import NotificationsContainer from '../Notifications'
import ProcessWithdrawal from '../Wallet/ProcessWithdrawal'
import MobileTopHeader from './MobileTopHeader'
import SidebarMobile from './SidebarMobile'
import Subscriptions from '../Subscriptions/Subscriptions'
import PageSkeleton from 'frontend/components/common/skeletons/PageSkeleton'
import ProfilePage from './ProfilePage'
import DintWallet from '../Wallet/DintWallet'
import Withdrawal from '../Wallet/Withdrawal'
import ViewPage from '../View-Page/ViewPage'
import BuyToken from 'frontend/pages/BuyToken'
import Messages from '../Messages/Messages'
import HomeTab from './HomeTab'
import Sidebar from './Sidebar'
import AddPost from './AddPost'
import Search from '../search/index'
import CloseIcon from '@mui/icons-material/Close';
import Events from "../Events/Events";
import { createPost } from '../../redux/slices/loungeFeed';

const NewHome = () => {
  const mobileView = useMediaQuery('(max-width:899px)')
  const userData = useSelector((state: RootState) => state?.user?.userData)

  const [widthScreen, setWidthScreen] = useState<number>(window.screen.width)
  const [isLounge, setIsLounge] = useState<boolean>(false)
  const [isViewPage, setIsViewPage] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)

  const isPrimaryLoader = useSelector((state: RootState) => state.common.isLoading)

  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()

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
      HOME_SIDE_MENU.NOTIFICATIONS,
    ]

    if (params.page) {
      if (!params.username) {
        if (validPages.includes(params.page as string as HOME_SIDE_MENU)) {
          setIsLounge(true)
        } else {
          navigate('/404')
        }
      } else {
        navigate('/404')
      }
    } else if (params.username) {
      dispatch(commonSliceActions.startLoading())
      dispatch(checkUsernameAvailability(params.username))
        .then((res: { user_id?: number; page_id?: number | null }) => {
          if (res) {
            if (res?.user_id) {
              setIsLounge(true)
            } else {
              setIsLounge(false)
              setIsViewPage(true)
            }
            dispatch(commonSliceActions.stopLoading())
          } else {
            dispatch(commonSliceActions.stopLoading())
            navigate('/404')
          }
        })
        .catch((err: any) => {
          console.error(err)
        })
    } else {
      setIsLounge(true)
    }
  }, [location, navigate, params, params.username])

  useLayoutEffect(() => {
    function updateWidth() {
      setWidthScreen(window.screen.width)
    }
    window.addEventListener('resize', updateWidth)
    updateWidth()
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

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

  const handleCreatePost = useCallback(
    async (toastId: string, data: any) => {
      try {
        await dispatch(createPost(data));
        setTimeout(() => {
          toast.update(toastId, {
            render: 'Post Added Successful!',
            type: 'success',
            isLoading: false,
          })
        }, 1000)

        setTimeout(() => {
          toast.dismiss()
        }, 3000)
      } catch (err: any) {
        toast.error(err.toString())
      }
    },
    []
  )

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
        <Grid container sx={{ paddingBottom: '55px' }}>
          <Grid item xs={12} md={12}>
            <HomeTab />
          </Grid>
        </Grid>
      )
    if (location.pathname.includes(HOME_SIDE_MENU.MESSAGES)) return <Messages />;
    if (location.pathname.includes(HOME_SIDE_MENU.TOKEN)) return <BuyToken />;
    if (location.pathname.includes(HOME_SIDE_MENU.WALLET)) return <DintWallet />;
    if (location.pathname.includes(HOME_SIDE_MENU.WITHDRAWAL)) return <Withdrawal />;
    if (location.pathname.includes(HOME_SIDE_MENU.PROCESSWITHDRAWAL)) return <ProcessWithdrawal />;
    if (location.pathname.includes(HOME_SIDE_MENU.NOTIFICATIONS)) return <NotificationsContainer />;
    if (location.pathname === HOME_SIDE_MENU.EVENTS) return <Events />;
    if (location.pathname.includes(HOME_SIDE_MENU.ADD_POST))
      return mobileView ? (
        <Box style={{width: '100%',height: '100%', position: 'fixed', zIndex: 999, background: 'rgba(0,0,0,0.5)'}}>
          <CloseIcon
            onClick={handleClose}
            style={{
              color: 'black',
              cursor: 'pointer',
              position: 'absolute',
              top: '80px',
              right: '35px',
              zIndex: 9999,
            }}
          />
          <AddPost createPost={handleCreatePost} />
        </Box>
      ) : (
        <Modal open={true} onClose={handleClose}>
          <AddPost createPost={handleCreatePost} />
        </Modal>
      )
    if (location.pathname.includes(HOME_SIDE_MENU.SEARCH)) return <Search />
    if (location.pathname.includes(HOME_SIDE_MENU.SUBSCRIPTIONS)) return <Subscriptions />
    return (
      <>
        <Grid container>
          <Grid item xs={12} md={12}>
            <ProfilePage username={params.username} />
          </Grid>
        </Grid>
      </>
    )
  }, [handleCreatePost, location.pathname, params.username, widthScreen, mobileView]);

  if (isPrimaryLoader) {
    return <PageSkeleton />;
  }

  if (isViewPage) {
    return <ViewPage />;
  }

  const renderMobileView = () => {
    return (
      <Box display="flex" flexDirection="column">
        {userData && !!userData.id && (
          <MobileTopHeader
            userName={userData.display_name || ''}
            avatar={userData.profile_image || ''}
          />
        )}

        <Box flexGrow="1">
          {isLounge ? renderComponent : null}
        </Box>

        {userData && !!userData.id && (
          <Box position="fixed" bottom="0" sx={{ boxShadow: 3 }}>
            <SidebarMobile widthScreen={widthScreen} />
          </Box>
        )}
      </Box>
    );
  };

  const renderDesktopView = () => {
    if (location.pathname === HOME_SIDE_MENU.EVENTS) return isLounge ? renderComponent : null;

    return (
      <Grid container>
        <Grid item xs={0} md={1} className='desktop-nav'>
          {userData && !!userData.id && <Sidebar />}
        </Grid>

        <Grid item xs={12} md={10}>
          {isLounge ? renderComponent : null}
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <Helmet>
        <title>Lounge</title>
        <meta name='' content='' />
      </Helmet>
      <Box style={{ margin: 0 }}>
        {mobileView ? renderMobileView() : renderDesktopView()}
      </Box>
    </>
  );
}

export default NewHome
