import React, { MouseEvent, SyntheticEvent, useEffect, useState, useContext } from 'react'
import { getPageCategoryLabelFromValue } from 'frontend/utils'
import { createPagePost, getPagePosts } from 'frontend/redux/slices/viewPage'
import { dispatch, RootState } from 'frontend/redux/store'
import { ThemeContext } from '../../contexts/ThemeContext'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import SubscriptionSection from '../../components/view-page/SubscriptionSection'
import SubscriptionModal from 'frontend/components/view-page/SubscriptionModal'
import UnsubscribeModal from 'frontend/components/view-page/UnsubscribeModal'
import CreatorActions from '../../components/view-page/CreatorActions'
import NothingToShow from 'frontend/components/common/NothingToShow'
import TogglingText from 'frontend/components/common/TogglingText'
import PrivateCard from 'frontend/components/common/PrivateCard'
import coverPhoto from '../../material/images/create-page-cover-photo.png'
import MediaList from 'frontend/components/view-page/MediaList'
import TabPanel from '../../components/common/TabPanel'
import AddPost from 'frontend/pages/Lounge/AddPost';
import AddIcon from '@mui/icons-material/Add';

import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Box, Stack, Avatar, Divider, Modal, IconButton, Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material'
import BackIconButton from 'frontend/components/BackIconButton';
import CloseIcon from '@mui/icons-material/Close';

type PageProfileProps = {
  isCreator: boolean
}

type PostPaginationPayload = {
  page: number | null
  start: number
  length: number
  post_type: string
}

const PageProfile = (props: PageProfileProps) => {
  const mobileView = useMediaQuery("(max-width:899px)");
  const theme = useTheme();
  const navigate = useNavigate();
  const posts = useSelector((state: RootState) => state?.viewPage?.posts)
  const pageData = useSelector((state: RootState) => state?.viewPage?.pageData)
  const userData = useSelector((state: RootState) => state?.user?.userData)
  const [addPostOpened, setAddPostOpened] = React.useState<boolean>(false);
  const [creatorMenuAnchorEl, setCreatorMenuAnchorEl] = React.useState<null | HTMLElement>(null)
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0)
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState<boolean>(false)
  const [selectedSubscription, setSelectedSubscripition] = useState<any>(null)
  const [isUnsubscribeModalOpen, setIsUnsubscribeModalOpen] = useState<boolean>(false)
  const [fetchImagePostPayload, setFetchImagePostPayload] = useState<PostPaginationPayload>({
    page: null,
    post_type: 'image',
    start: 0,
    length: 5,
  })
  const [fetchVideoPostPayload, setFetchVideoPostPayload] = useState<PostPaginationPayload>({
    page: null,
    post_type: 'video',
    start: 0,
    length: 5,
  })

  const [imagePostLoader, setImagePostLoader] = useState<boolean>(false)
  const [videoPostLoader, setVideoPostLoader] = useState<boolean>(false)
  const { toggle } = useContext(ThemeContext)

  // unsubscription modal handlers
  const handleUnsubscriptionModalOpen = () => {
    setIsUnsubscribeModalOpen(true)
  }
  const handleUnsubscriptionModalClose = () => {
    setIsUnsubscribeModalOpen(false)
  }

  // subscription modal handlers
  const handleSubscriptionModalOpen = () => {
    setIsSubscriptionModalOpen(true)
  }
  const handleSubscriptionModalClose = () => {
    setIsSubscriptionModalOpen(false)
    setSelectedSubscripition(null)
  }

  // to handle the opening of the creator menu in the mobiel devices.
  const handleCreatorMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setCreatorMenuAnchorEl(event.currentTarget)
  }
  const handleCreatorMenuClose = () => {
    setCreatorMenuAnchorEl(null)
  }

  // handler for tab selection
  const handleTabSelection = (event: SyntheticEvent, newValue: number) => {
    setSelectedTabIndex(newValue)
  }

  // to set the page id
  useEffect(() => {
    if (pageData?.id) {
      setFetchImagePostPayload((prevState: PostPaginationPayload) => ({
        ...prevState,
        page: pageData?.id,
      }))
      setFetchVideoPostPayload((prevState: PostPaginationPayload) => ({
        ...prevState,
        page: pageData?.id,
      }))
    }
  }, [pageData?.id])

  // to fetch page posts
  const getImageList = (userId: number, payload: PostPaginationPayload) => {
    setImagePostLoader(true)
    dispatch(getPagePosts(userId, payload)).then((res: boolean) => {
      if (res) {
        setImagePostLoader(false)
      } else {
        setImagePostLoader(false)
      }
    })
  }

  const getVideoList = (userId: number, payload: PostPaginationPayload) => {
    setVideoPostLoader(true)
    dispatch(getPagePosts(userId, payload)).then((res: boolean) => {
      if (res) {
        setVideoPostLoader(false)
      } else {
        setVideoPostLoader(false)
      }
    })
  }

  useEffect(() => {
    if (userData?.id && fetchImagePostPayload.page) {
      getImageList(+userData?.id, fetchImagePostPayload)
    }
  }, [fetchImagePostPayload, userData?.id])

  useEffect(() => {
    if (userData?.id && fetchVideoPostPayload.page) {
      getVideoList(+userData?.id, fetchVideoPostPayload)
    }
  }, [fetchVideoPostPayload, userData?.id])

  const fetchImageHandler = () => {
    setFetchImagePostPayload((prevState: PostPaginationPayload) => {
      return {
        ...prevState,
        start: prevState.start + prevState.length,
      }
    })
  }
  const fetchVideoHandler = () => {
    setFetchVideoPostPayload((prevState: PostPaginationPayload) => {
      return {
        ...prevState,
        start: prevState.start + prevState.length,
      }
    })
  }

  const createPost = async (toastId: string, payload: any) => {
    await dispatch(createPagePost(toastId, {
      ...payload,
      page: +pageData?.id,
    }));
    setAddPostOpened(false);
  };

  return (
    <>
      {/* center side view page and creator page */}
      <Stack
        direction='column'
        className='center-page-container'
        id='media-infinite-scroll-container'
        sx={{ width: mobileView ? '100%' : props.isCreator ? '55%' : '75%' }}
      >
        {/* edit and settings floating menu for creator in mobile view */}
        {mobileView && props.isCreator ? (
          <IconButton className='creator-floating-menu' onClick={handleCreatorMenuOpen}>
            <MoreVertIcon />
          </IconButton>
        ) : null}

        {/* page-profile-section */}
        <Box
          className='page-profile-section'
          style={{ backgroundColor: toggle ? '#161C24' : '#FFFFFF' }}
        >
          <BackIconButton onClick={() => navigate('/lounge')} />

          {/* Cover photo */}
          <Box
            className='cover-photo-container full-image-container'
            sx={{
              backgroundImage: `url(${pageData?.cover_picture || coverPhoto})`,
            }}
          />

          {/* Profile details */}
          <Stack direction='row' spacing={2} sx={{ px: 2, py: 1 }}>
            <Avatar sx={{ width: 88, height: 88, mt: -2.5 }} src={pageData?.profile_picture} />

            <Stack direction='column'>
              <Typography variant='h2' className='primary-text-color'>
                {pageData?.title || 'Page'}
              </Typography>
              <Typography variant='body1' className='secondary-text-color'>
                {getPageCategoryLabelFromValue(+pageData?.type) || 'Category'}
              </Typography>
            </Stack>

            <Box display="flex" flexGrow={1} />

            <IconButton
              onClick={() => setAddPostOpened(true)}
              sx={{ width: '68px' }}
            >
              <AddIcon />
            </IconButton>
          </Stack>

          {/* Description */}
          <Stack direction='column' sx={{ px: 2, py: 1 }}>
            <TogglingText text={pageData?.desciption} thresoldLength={85} />
          </Stack>

          {/* subscription section */}
          {props?.isCreator ? null : (
            <SubscriptionSection
              freeTrialDetails={pageData?.trial_page}
              monthlySubscriptionPrice={pageData?.subscribe_amount}
              subscriptionBundles={pageData?.subscription_tier_page}
              promotionalCampaign={pageData?.campaign_page}
              handleSubscriptionModalOpen={handleSubscriptionModalOpen}
              setSelectedSubscripition={setSelectedSubscripition}
              isCreator={props?.isCreator}
              isSubscriber={pageData?.is_subscribed && !props?.isCreator}
              handleUnsubscriptionModalOpen={handleUnsubscriptionModalOpen}
            />
          )}

          {/* Add new Post */}
          {props?.isCreator && !mobileView && (
            <Modal open={addPostOpened} onClose={() => setAddPostOpened(false)}>
              <AddPost
                hideTextField
                forSubscription
                createPost={createPost}
              />
            </Modal>
          )}
          {props?.isCreator && mobileView && addPostOpened && (
            <Box
              style={{
                width: '100%',
                height: '100%',
                position: 'fixed',
                zIndex: 999,
                background: 'rgba(0,0,0,0.5)',
                top: 0,
                left: 0,
              }}
            >
              <CloseIcon
                onClick={() => setAddPostOpened(false)}
                style={{
                  color: 'black',
                  cursor: 'pointer',
                  position: 'absolute',
                  top: '80px',
                  right: '35px',
                  zIndex: 9999,
                }}
              />
              <AddPost
                hideTextField
                forSubscription
                createPost={createPost}
              />
            </Box>
          )}

          <Divider />

          {/* Tabs */}
          <Tabs
            value={selectedTabIndex}
            variant='fullWidth'
            onChange={handleTabSelection}
            sx={{ borderBottom: `1px solid ${theme.palette.grey[700]}` }}
          >
            {/* <Tab label={`All Posts (${posts?.totalImages})`} /> */}
            <Tab label={`Photos (${posts?.totalImages})`} />
            <Tab label={`Videos (${posts?.totalVideos})`} />
          </Tabs>
        </Box>

        {/* Tabs body container */}
        {/* <TabPanel value={selectedTabIndex} index={0}>
          {props?.isCreator || pageData?.is_subscribed ? (
            posts?.images?.length > 0 ? (
              <PageImageList imageList={posts?.images} />
            ) : (
              <NothingToShow padding={14} />
            )
          ) : (
            <PrivateCard padding={14} />
          )}
        </TabPanel> */}
        <TabPanel value={selectedTabIndex} index={0}>
          {props?.isCreator || pageData?.is_subscribed ? (
            posts?.images?.length > 0 ? (
              <MediaList
                mediaList={posts?.images}
                totalMedia={posts?.totalImages}
                mediaType='image'
                fetchMoreMedia={fetchImageHandler}
                loader={imagePostLoader}
                isPage={true}
              />
            ) : (
              <NothingToShow
                padding={14}
                color={toggle ? "#fff" : "#000"}
              />
            )
          ) : (
            <PrivateCard padding={14} />
          )}
        </TabPanel>
        <TabPanel value={selectedTabIndex} index={1}>
          {props?.isCreator || pageData?.is_subscribed ? (
            posts?.videos?.length > 0 ? (
              <MediaList
                mediaList={posts?.videos}
                totalMedia={posts?.totalVideos}
                mediaType='video'
                fetchMoreMedia={fetchVideoHandler}
                loader={videoPostLoader}
                isPage={true}
              />
            ) : (
              <NothingToShow
                padding={14}
                color={toggle ? "#fff" : "#000"}
              />
            )
          ) : (
            <PrivateCard padding={14} />
          )}
        </TabPanel>
      </Stack>

      {/* right side view panel */}
      {!mobileView ? (
        <Stack className='right-side-panel'>
          <SubscriptionSection
            containerBorder={1}
            containerRadius={1}
            freeTrialDetails={pageData?.trial_page}
            monthlySubscriptionPrice={pageData?.subscribe_amount}
            subscriptionBundles={pageData?.subscription_tier_page}
            promotionalCampaign={pageData?.campaign_page}
            handleSubscriptionModalOpen={handleSubscriptionModalOpen}
            setSelectedSubscripition={setSelectedSubscripition}
            isCreator={props?.isCreator}
            isSubscriber={pageData?.is_subscribed && !props?.isCreator}
            handleUnsubscriptionModalOpen={handleUnsubscriptionModalOpen}
          />
        </Stack>
      ) : null}

      <CreatorActions anchorElement={creatorMenuAnchorEl} handleClose={handleCreatorMenuClose} />

      {/* Subscription modal */}
      <SubscriptionModal
        pageName={pageData?.title}
        coverPicture={pageData?.cover_picture}
        profilePicture={pageData?.profile_picture}
        pageData={pageData}
        open={isSubscriptionModalOpen}
        handleClose={handleSubscriptionModalClose}
        subscription={selectedSubscription}
      />

      {/* Unsubscribe modal */}
      <UnsubscribeModal
        subscriptionId={pageData?.page_subscription?.[0]?.id}
        open={isUnsubscribeModalOpen}
        handleClose={handleUnsubscriptionModalClose}
      />
    </>
  )
}

export default PageProfile;
