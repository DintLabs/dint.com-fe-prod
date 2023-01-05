import React, { MouseEvent, SyntheticEvent, useEffect, useState, useContext } from 'react';
import { Avatar, Divider, Grid, IconButton, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { Box, Stack } from '@mui/system';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';
import { getPageCategoryLabelFromValue } from 'frontend/utils';
import TogglingText from 'frontend/components/common/TogglingText';
import AddPost from 'frontend/components/common/AddPost';
import SubscriptionModal from 'frontend/components/view-page/SubscriptionModal';
import PrivateCard from 'frontend/components/common/PrivateCard';
import { createPagePost, getPagePosts } from 'frontend/redux/slices/viewPage';
import NothingToShow from 'frontend/components/common/NothingToShow';
import UnsubscribeModal from 'frontend/components/view-page/UnsubscribeModal';
import { dispatch, RootState } from 'frontend/redux/store';
import MediaList from 'frontend/components/view-page/MediaList';
import SubscriptionSection from '../../components/view-page/SubscriptionSection';
import TabPanel from '../../components/common/TabPanel';
import coverPhoto from '../../material/images/create-page-cover-photo.png';
import CreatorActions from '../../components/view-page/CreatorActions';
import { ThemeContext } from '../../contexts/ThemeContext';

type PageProfileProps = {
  isCreator: boolean;
};

type PostPaginationPayload = {
  page: number | null;
  start: number;
  length: number;
  post_type: string;
};

const PageProfile = (props: PageProfileProps) => {
  const theme = useTheme();
  const posts = useSelector((state: RootState) => state?.viewPage?.posts);
  const pageData = useSelector((state: RootState) => state?.viewPage?.pageData);
  const userData = useSelector((state: RootState) => state?.user?.userData);
  const [creatorMenuAnchorEl, setCreatorMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState<boolean>(false);
  const [selectedSubscription, setSelectedSubscripition] = useState<any>(null);
  const [isUnsubscribeModalOpen, setIsUnsubscribeModalOpen] = useState<boolean>(false);
  const [fetchImagePostPayload, setFetchImagePostPayload] = useState<PostPaginationPayload>({
    page: null,
    post_type: 'image',
    start: 0,
    length: 5
  });
  const [fetchVideoPostPayload, setFetchVideoPostPayload] = useState<PostPaginationPayload>({
    page: null,
    post_type: 'video',
    start: 0,
    length: 5
  });

  const [imagePostLoader, setImagePostLoader] = useState<boolean>(false);
  const [videoPostLoader, setVideoPostLoader] = useState<boolean>(false);
  const { toggle } = useContext(ThemeContext);

  // unsubscription modal handlers
  const handleUnsubscriptionModalOpen = () => {
    setIsUnsubscribeModalOpen(true);
  };

  const handleUnsubscriptionModalClose = () => {
    setIsUnsubscribeModalOpen(false);
  };

  // subscription modal handlers
  const handleSubscriptionModalOpen = () => {
    setIsSubscriptionModalOpen(true);
  };

  const handleSubscriptionModalClose = () => {
    setIsSubscriptionModalOpen(false);
    setSelectedSubscripition(null);
  };

  // handler for tab selection
  const handleTabSelection = (event: SyntheticEvent, newValue: number) => {
    setSelectedTabIndex(newValue);
  };

  // to handle the opening of the creator menu in the mobiel devices.
  const handleCreatorMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setCreatorMenuAnchorEl(event.currentTarget);
  };
  // to close the creator menu in the mobiel devices
  const handleCreatorMenuClose = () => {
    setCreatorMenuAnchorEl(null);
  };

  // to set the page id
  useEffect(() => {
    if (pageData?.id) {
      setFetchImagePostPayload((prevState: PostPaginationPayload) => ({
        ...prevState,
        page: pageData?.id
      }));
      setFetchVideoPostPayload((prevState: PostPaginationPayload) => ({
        ...prevState,
        page: pageData?.id
      }));
    }
  }, [pageData?.id]);

  // to fetch page posts
  const getImageList = (userId: number, payload: PostPaginationPayload) => {
    setImagePostLoader(true);
    dispatch(getPagePosts(userId, payload)).then((res: boolean) => {
      if (res) {
        setImagePostLoader(false);
      } else {
        setImagePostLoader(false);
      }
    });
  };
  const getVideoList = (userId: number, payload: PostPaginationPayload) => {
    setVideoPostLoader(true);
    dispatch(getPagePosts(userId, payload)).then((res: boolean) => {
      if (res) {
        setVideoPostLoader(false);
      } else {
        setVideoPostLoader(false);
      }
    });
  };

  useEffect(() => {
    if (userData?.id && fetchImagePostPayload.page) {
      getImageList(+userData?.id, fetchImagePostPayload);
    }
  }, [fetchImagePostPayload, userData?.id]);

  useEffect(() => {
    if (userData?.id && fetchVideoPostPayload.page) {
      getVideoList(+userData?.id, fetchVideoPostPayload);
    }
  }, [fetchVideoPostPayload, userData?.id]);

  const fetchImageHandler = () => {
    setFetchImagePostPayload((prevState: PostPaginationPayload) => {
      return {
        ...prevState,
        start: prevState.start + prevState.length
      };
    });
  };
  const fetchVideoHandler = () => {
    setFetchVideoPostPayload((prevState: PostPaginationPayload) => {
      return {
        ...prevState,
        start: prevState.start + prevState.length
      };
    });
  };

  return (
    <>
      {/* center side view page and creator page */}
      <Stack
        direction="column"
        className="center-page-container"
        id="media-infinite-scroll-container"
        sx={{ width: window.innerWidth < 1000 ? '100%' : props.isCreator ? '55%' : '75%' }}
      >
        {/* edit and settings floating menu for creator in mobile view */}
        {window.innerWidth < 1000 && props.isCreator ? (
          <IconButton className="creator-floating-menu" onClick={handleCreatorMenuOpen}>
            <MoreVertIcon />
          </IconButton>
        ) : null}
        {/* page-profile-section */}
        <Box className="page-profile-section" style={{backgroundColor: toggle ? '#161C24' : '#FFFFFF'}}>
          {/* Cover photo */}
          <Box
            className="cover-photo-container full-image-container"
            sx={{
              backgroundImage: `url(${pageData?.cover_picture || coverPhoto})`
            }}
          />
          {/* Profile details */}
          <Grid container sx={{ p: 1 }}>
            <Grid item sm={12} md={4} lg={2}>
              <Avatar sx={{ width: 88, height: 88, mt: -2.5 }} src={pageData?.profile_picture} />
            </Grid>
            <Grid item sm={12} md={8} lg={9}>
              <Stack direction="column">
                <Typography variant="h2" className="primary-text-color">
                  {pageData?.title || 'Page'}
                </Typography>
                <Typography variant="body1" className="secondary-text-color">
                  {getPageCategoryLabelFromValue(+pageData?.type) || 'Category'}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
          {/* Description */}
          <Stack direction="column" sx={{ p: 1 }}>
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

          {props?.isCreator ? <AddPost createPost={createPagePost} pageId={+pageData?.id} /> : null}

          <Divider />

          {/* Tabs */}
          <Tabs
            value={selectedTabIndex}
            variant="fullWidth"
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
                mediaType="image"
                fetchMoreMedia={fetchImageHandler}
                loader={imagePostLoader}
              />
            ) : (
              <NothingToShow padding={14} />
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
                mediaType="video"
                fetchMoreMedia={fetchVideoHandler}
                loader={videoPostLoader}
              />
            ) : (
              <NothingToShow padding={14} />
            )
          ) : (
            <PrivateCard padding={14} />
          )}
        </TabPanel>
      </Stack>

      {/* right side view panel */}
      {!(window.innerWidth < 1000) ? (
        <Stack className="right-side-panel">
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
  );
};

export default PageProfile;
