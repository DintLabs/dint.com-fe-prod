import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import storyImage from "frontend/assets/img/web3/story-1.png";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import MediaList from 'frontend/components/view-page/MediaList';
import NothingToShow from 'frontend/components/common/NothingToShow';
import ShareProfileModal from 'frontend/components/common/ShareProfileModal'

import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button as MUIButton,
  IconButton,
  ListItemAvatar,
  Stack,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import _axios from "frontend/api/axios";
import PostItemSkeleton from "frontend/components/common/skeletons/PostItemSkeleton";
import { DEFAULT_POSTS_PAGINATION, postTypes } from "frontend/data";
import useAuth from "frontend/hooks/useAuth";
import useUser from "frontend/hooks/useUser";
import {
  CountInerface,
  PaginationPostsInerface,
} from "frontend/interfaces/contextInterface";
import { PostInterface } from "frontend/interfaces/postInterface";
import { UserDataInterface } from "frontend/interfaces/reduxInterfaces";
import {  UploadProfilePicture } from "frontend/services/profileService";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate, useRouteLoaderData } from "react-router";
import { toast } from "react-toastify";
import TipPopUp from "frontend/components/tip/TipPopUp";
import DiscordIcon from "../../assets/img/socialmedia/discord.png";
import InstagramIcon from "../../assets/img/socialmedia/instagram.png";
import TwitterIcon from "../../assets/img/socialmedia/twitter.png";
import PostItem from "./PostItem";
import { ThemeContext } from "../../contexts/ThemeContext";
import moment from "moment";
import { RootState, useDispatch } from "frontend/redux/store";
import { messagesActions } from "frontend/redux/slices/messages";
import { display } from "@mui/system";
import { Flex } from "../../reusable/reusableStyled";
import { useSelector } from "react-redux";
import { MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import StoriesUserOwn from "frontend/components/lounge/StoriesUserOwn";
import { getApiURL } from "frontend/config";
import { getUserOwnStories } from "frontend/redux/slices/lounge";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ padding: "25px 25px 80px" }}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

type PostPaginationPayload = {
  page: number | null;
  start: number;
  length: number;
  post_type: string;
};

type ProfilePageProps = {
  username: string | null | undefined;
  avatar?: string;
}
function ProfilePage({ username, avatar }: ProfilePageProps) {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggle } = useContext(ThemeContext);

  const userHook = useUser();
  const theme = useTheme();

  const [value, setValue] = useState(0);
  const [userDetails, setUserDetails] = useState<UserDataInterface | null>(
    null
  );
  const [openPopUpTip, setOpenPopUpTip] = React.useState<boolean>(false);
  const [showShareProfileModal, setShowShareProfileModal] = useState<boolean>(false);
  const [isLoadingUserDetails, setIsLoadingUserDetails] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowLoading, setIsFollowLoading] = useState(false);

  const [counts, setCounts] = useState<CountInerface>({
    all_posts: 0,
    text_posts: 0,
    image_posts: 0,
    video_posts: 0,
    subscriptions: 0,
  });
  const images = ["jpg", "gif", "png", "svg", "webp", "ico", "jpeg"];
  const videos = ["MP4", "mp4", "MOV", "mov", "3gp", "ogg", "quicktime"];

  let url, splits, extension;

  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [photoPosts, setPhotoPosts] = useState<PostInterface[]>([]);
  const [textPosts, setTextPosts] = useState<PostInterface[]>([]);
  const [videoPosts, setVideoPosts] = useState<PostInterface[]>([]);
  const [subscriptions, setSubscriptions] = useState<PostInterface[]>([]);
  const [paginationPosts, setPaginationPosts] =
    useState<PaginationPostsInerface>(DEFAULT_POSTS_PAGINATION);
  const { follower, following } = useSelector((state: RootState) => state.user);
  const { userOwnStories } = useSelector((state: RootState) => state.lounge);
  const {userData} = useSelector((state: any) => state.user);
  const [isUserProfile , setIsUserProfile ] = useState<boolean>(false)
  const [storyList , setStoryList] = useState()
  const [paginationPhotoPosts, setPaginationPhotoPosts] =
    useState<PaginationPostsInerface>({
      ...DEFAULT_POSTS_PAGINATION,
      post_type: postTypes.image.value,
    });

  const [paginationTextPosts, setPaginationTextPosts] =
    useState<PaginationPostsInerface>({
      ...DEFAULT_POSTS_PAGINATION,
      post_type: postTypes.text.value,
    });

  const [paginationVideoPosts, setPaginationVideoPosts] =
    useState<PaginationPostsInerface>({
      ...DEFAULT_POSTS_PAGINATION,
      post_type: postTypes.video.value,
    });
  
    const [fetchImagePostPayload, setFetchImagePostPayload] = useState<PostPaginationPayload>({
      page: null,
      post_type: "",
      start: 0,
      length: 5
    });
  
    const [fetchVideoPostPayload, setFetchVideoPostPayload] = useState<PostPaginationPayload>({
      page: null,
      post_type: 'video',
      start: 0,
      length: 5
    });
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const handleScroll = useCallback(() => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const { body } = document;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const currentHeight = windowHeight + window.pageYOffset;
    if (currentHeight + 900 >= docHeight) {
      if (!isLoading) {
        let pagination = null;
        if (value === 0) {
          pagination = paginationPosts;
        } else if (value === 1) {
          pagination = paginationTextPosts;
        } else if (value === 2) {
          pagination = paginationPhotoPosts;
        } else if (value === 3) {
          pagination = paginationVideoPosts;
        }
        if (userDetails && pagination && !isLoading && pagination.hasNext) {
          fetchPosts(userDetails.id, {
            ...pagination,
            start: pagination.start + 5,
          });
        }
      }
    }
  }, [
    paginationPosts,
    paginationPhotoPosts,
    paginationTextPosts,
    paginationVideoPosts,
    isLoading,
    value,
    userDetails,
  ]);
  useEffect(()=>{
    setIsUserProfile(userData?.id === userDetails?.id)
    getStoryList()
  },[userDetails])

  const getStoryList = async () => {
    dispatch(getUserOwnStories());
    const result = await _axios.get("api/user/get-stories/", {});
    if (result?.data?.code === 200) {
      setStoryList(result?.data?.data);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const savedUser = userHook.reduxUser;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const getUserPostCounts = async (userId: number) => {
    const { data } = await _axios.get(
      `/api/posts/fetch-post-counts/${userId}/`
    );
    if (data?.code === 200) {
      setCounts(data?.data);
    }
  };

  const setHasNextFalse = (postType: string) => {
    if (postType === postTypes.all.value) {
      setPaginationPosts((p) => ({ ...p, hasNext: false }));
    } else if (postType === postTypes.text.value) {
      setPaginationTextPosts((p) => ({ ...p, hasNext: false }));
    } else if (postType === postTypes.image.value) {
      setPaginationPhotoPosts((p) => ({ ...p, hasNext: false }));
    } else if (postType === postTypes.video.value) {
      setPaginationVideoPosts((p) => ({ ...p, hasNext: false }));
    }
  };

  const isEligibleForFetchingPost = useMemo(() => {
    if (userDetails && "is_private" in userDetails) {
      if (userDetails.is_followed === true) return true;
      if (userDetails.custom_username === savedUser?.custom_username)
        return true;
    }
    if (userDetails?.is_private === false) {
      return true;
    }

    return false;
  }, [userDetails]);

  const fetchPosts = async (
    userId: number,
    pagination: PaginationPostsInerface
  ) => {
    if (!userId) return;
    if (isLoading || !pagination.hasNext) return;
    try {
      setIsLoading(true);
      const { data } = await _axios.post(
        `/api/posts/pagination/list_by_user_id/${userId}/`,
        pagination
      );

      setIsLoading(false);
      if (data?.data?.length) {
        if (pagination.post_type === postTypes.all.value) {
          setPosts((p) => [...p, ...data.data]);
          setPaginationPosts(pagination);
        } else if (pagination.post_type === postTypes.text.value) {
          setTextPosts((p) => [...p, ...data.data]);
          setPaginationTextPosts(pagination);
        } else if (pagination.post_type === postTypes.image.value) {
          setPhotoPosts((p) => [...p, ...data.data]);
          setPaginationPhotoPosts(pagination);
        } else if (pagination.post_type === postTypes.video.value) {
          setVideoPosts((p) => [...p, ...data.data]);
          setPaginationVideoPosts(pagination);
        }
      } else {
        setHasNextFalse(pagination.post_type);
      }
    } catch (err) {
      setIsLoading(false);
      setHasNextFalse(pagination.post_type);
    }
  };

  const fetchUserDetails = async (onlyDetails = false) => {
    setValue(0);
    try {
      const { data } = await _axios.post("/api/user/get-profile-by-username/", {
        custom_username: username,
      });
      if (data.code === 200) {
        setUserDetails(data.data);
        if (!onlyDetails) {
          getUserPostCounts(data.data?.id);
          fetchPosts(data.data?.id, paginationPosts);
        }
      } else {
        setError("An error occurred while fetching user details.");
      }
    } catch (err) {
      setError("An error occurred while fetching user details.");
      console.error(err);
    }
    setIsLoadingUserDetails(false);
  };
  

  React.useEffect(() => {
    if (username) {
      setIsLoadingUserDetails(true);
      fetchUserDetails();
    } else {
      setIsLoadingUserDetails(false);
    }
  }, [username]);

  useEffect(() => {
    let list = [];
    let pagination = null;
    if (value === 0) {
      list = JSON.parse(JSON.stringify(posts));
      pagination = JSON.parse(JSON.stringify(paginationPosts));
    } else if (value === 1) {
      list = JSON.parse(JSON.stringify(textPosts));
      pagination = JSON.parse(JSON.stringify(paginationTextPosts));
    } else if (value === 2) {
      list = JSON.parse(JSON.stringify(photoPosts));
      pagination = JSON.parse(JSON.stringify(paginationPhotoPosts));
    } else if (value === 3) {
      list = JSON.parse(JSON.stringify(videoPosts));
      pagination = JSON.parse(JSON.stringify(paginationVideoPosts));
    }
    if (userDetails && !list?.length) {
      fetchPosts(userDetails.id, pagination);
    }
  }, [value]);

  const copyToClipBoard = () => {
    const profileUrl = `${window.location.origin}/${username}`;
    navigator.clipboard.writeText(profileUrl);
  };

  const handleSocialIconClick = (url: string) => {
    window.open(url, "_blank");
  };

  const handleProPicChange  = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const result = await UploadProfilePicture(e.target.files[0]);
      if (userDetails && result?.success) {
        setUserDetails({
          ...userDetails,
          profile_image: result?.data?.profile_image  || "",
        });
      }
      toast.dismiss();
    }
  };

  const postDeleted = (postId: number) => {
    setPosts((p) => p.filter((prev) => prev.id !== postId));
    setTextPosts((p) => p.filter((prev) => prev.id !== postId));
    setPhotoPosts((p) => p.filter((prev) => prev.id !== postId));
    setVideoPosts((p) => p.filter((prev) => prev.id !== postId));

    if (userDetails) {
      getUserPostCounts(userDetails?.id);
    }
  };

  const follow = async () => {
    setIsFollowLoading(true);
    try {
      const { data } = await _axios.post(
        `/api/connection/follow/${userDetails?.id}/`,
        {}
      );
      if (data?.code === 200) {
        await fetchUserDetails(true);
        toast.success(
          `Follow request sent to ${
            userDetails?.display_name || userDetails?.custom_username
          }`
        );
      } else {
        toast.error(data?.message || "Unable to process request");
      }
    } catch (err) {
      toast.error("Unable to process request");
    }
    setIsFollowLoading(false);
  };

  const unfollow = async () => {
    setIsFollowLoading(true);
    try {
      const { data } = await _axios.delete(
        `/api/connection/unfollow/${userDetails?.id}/`
      );
      if (data?.code === 200) {
        await fetchUserDetails(true);
        toast.warning(
          `Unfollowed ${
            userDetails?.display_name || userDetails?.custom_username
          }`
        );
      } else {
        toast.error(data?.message || "Unable to process request");
      }
    } catch (err: any) {
      console.error("unfollow error", err.message);
      toast.error("Unable to process request");
    }
    setIsFollowLoading(false);
  };
  const cancelRequest = async () => {
    setIsFollowLoading(true);
    try {
      const { data } = await _axios.delete(
        `api/connection/delete-follow-request/${userDetails?.id}`
      );
      if (data?.code === 200) {
        await fetchUserDetails(true);
        toast.warning(
          `Request Cancelled ${
            userDetails?.display_name || userDetails?.custom_username
          }`
        );
      } else {
        toast.error(data?.message || "Unable to process request");
      }
    } catch (err: any) {
      console.error("Cancellation error", err.message);
      toast.error("Unable to process request");
    }
    setIsFollowLoading(false);
  };

  const handleClose = () => {
    setOpenPopUpTip(false);
  };

  const handleClickOpen = () => {
    setOpenPopUpTip(true);
  };

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

  if (!user)
    return (
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        Under Contruction
      </Typography>
    );
    const createUserStories = (item: any) => {
      const { user_stories } = item;
      const data = user_stories.map((story: any) => {
        const extension = story.story.substr(story.story.length - 3);
        switch (extension.toLowerCase()) {
          case "mp4":
            return {
              url: story.story,
              type: "video",
            };

          default:
            return {
              content: () => (
                <div style={contentStylestoryback}>
                  <img style={image} src={story.story}></img>
                </div>
              ),
            };
        }
      });
      return data;
    };
    const image = {
      display: "block",
      borderRadius: 4,
      // objectFit: "cover",
      height: "100%",
      width: "100%",
    };

    const contentStylestoryback = {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
     '@media screen and (max-width: 899px)': {
        width: '100% !important',
        height: '100% !important',
     },
    };
 

      
  return (
    <>
      <Box
      // style={{
      //   borderLeft: `1px solid ${theme.palette.grey[700]}`,
      //   borderRight: `1px solid ${theme.palette.grey[700]}`,
      // }}
      >
     <div className="profile-wrapper-wrapper">
  <Box
    className="main-profile-wrapper"
    sx={{ pb: 2 }}
  >
    <Box sx={{ position: "relative" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
      >
        <Box sx={{ width: "100%" }}>
          <div className="profile-menu">
            {isEligibleForFetchingPost === true ? (
             <Badge
             anchorOrigin={{
               vertical: "bottom",
               horizontal: "right",
             }}
             overlap="circular"
             badgeContent=" "
           >
             {isUserProfile ? (
               <StoriesUserOwn
                 createUserStories={createUserStories}
                 hideName={true}
               />
             ) : (
               <Avatar
               src={userDetails?.profile_image ?? avatar}
                 sx={{ width: 70, height: 70 }}
               />
             )}
           </Badge>
            ) : (
              <Badge
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                overlap="circular"
                badgeContent=" "
                invisible={!userDetails}
              >
                <Avatar
                  src={userDetails?.profile_image ?? avatar}
                  sx={{ width: 175, height: 175 }}
                />
              </Badge>
            )}
                    
                    <div className="post-wrapper-mobile">
                      <Typography
                        className="followers-tab-wrap"
                        color={toggle ? "#fff" : "#000"}
                      >
                        {counts?.all_posts ?? 0} Post
                      </Typography>
                      <Typography
                        className="followers-tab-wrap"
                        color={toggle ? "#fff" : "#000"}
                      
                        >
                        {userDetails?.user_follower.length || 0} Followers
                      </Typography>
                      <Typography
                        className="followers-tab-wrap"
                        color={toggle ? "#fff" : "#000"}
                        >
                        {userDetails?.user_following.length || 0} Following
                      </Typography>



                    </div>
                  </div>
                </Box>
          
              </Stack>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="flex-start"
                alignItems={{ xs: "flex-start", md: "center" }}
                gap="20px"
                order={{ xs: "1", md: "0" }}
              >
                <Typography
                  variant="h3"
                  display={{ xs: "none", md: "flex" }}
                  sx={{ color: toggle ? "text.primary" : "#161C24" }}
                >
                  {userDetails && userDetails.display_name}
                </Typography>
                {!!savedUser?.custom_username &&
                savedUser?.custom_username !== userDetails?.custom_username &&
                !isLoadingUserDetails ? (
                  <Box className="btn-group-follow">
                    {userDetails?.is_followed === true && (
                      <Button
                        onClick={unfollow}
                        variant="contained"
                        sx={{
                          color: "#353535",
                          backgroundColor: toggle ? "#fff" : "#EFEFEF",
                          boxShadow: "none",
                          width: "100%",
                          ":hover": {
                            backgroundColor: toggle ? "#fff" : "#EFEFEF",
                          },
                        }}
                      >
                    {isFollowLoading ? `Loading...` : `Following`}
                      </Button>
                    )}
                    {userDetails?.is_followed === false && (
                      <Button
                        onClick={follow}
                        variant="contained"
                        sx={{
                          color: "#353535",
                          backgroundColor: toggle ? "#fff" : "#EFEFEF",
                          boxShadow: "none",
                          width: "100%",
                          ":hover": {
                            backgroundColor: toggle ? "#fff" : "#EFEFEF",
                          },
                        }}
                      >
                        {isFollowLoading ? `Loading...` : `Follow`}
                      </Button>
                    )}
                    {userDetails?.is_followed === "Request Sent" && (
                      <Button
                        onClick={cancelRequest}
                        variant="contained"
                        sx={{
                          color: "#353535",
                          backgroundColor: toggle ? "#fff" : "#EFEFEF",
                          boxShadow: "none",
                          width: "100%",
                          ":hover": {
                            backgroundColor: toggle ? "#fff" : "#EFEFEF",
                          },
                        }}
                      >
                        {isFollowLoading ? `Loading...` : `Cancel Request`}
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      size="medium"
                      sx={{
                        color: "#353535",
                        backgroundColor: toggle ? "#fff" : "#EFEFEF",
                        boxShadow: "none",
                        width: "100%",
                        ":hover": {
                          backgroundColor: toggle ? "#fff" : "#EFEFEF",
                        },
                      }}
                      onClick={() => {
                        dispatch(messagesActions.addNewUserInChat(userDetails));
                        navigate(
                          `/lounge/messages/user/${
                            userDetails && userDetails.id
                          }`
                        );
                      }}
                    >
                      Message
                    </Button>
                    {!userDetails?.is_private && userDetails?.is_followed !== "Request Sent" && <Box className="btn-group-follow">
                      <Button
                        variant="contained"
                        sx={{
                          color: "#353535",
                          backgroundColor: toggle ? "#fff" : "#EFEFEF",
                          boxShadow: "none",
                          width: "100%",
                          ":hover": {
                            backgroundColor: toggle ? "#fff" : "#EFEFEF",
                          },
                          whiteSpace: "nowrap",
                          px: 4,
                        }}
                        onClick={() => setShowShareProfileModal(true)}
                      >
                        Share profile
                      </Button>

{showShareProfileModal && <ShareProfileModal
                        open={showShareProfileModal}
                        onClose={() => setShowShareProfileModal(false)}
                      />}
                    </Box>}
              
                  </Box>
                ) : (
                  <div className="btn-group-follow-wrapper">
                    <Box className="btn-group-follow">
                      <Button
                        variant="contained"
                        sx={{
                          color: "#353535",
                          backgroundColor: toggle ? "#fff" : "#EFEFEF",
                          boxShadow: "none",
                          width: "100%",
                          ":hover": {
                            backgroundColor: toggle ? "#fff" : "#EFEFEF",
                          },
                          whiteSpace: 'nowrap',
                          px: 4
                        }}
                        onClick={() => setShowShareProfileModal(true)}
                      >
                        Share profile
                      </Button>

                     {showShareProfileModal && <ShareProfileModal
                        open={showShareProfileModal}
                        onClose={() => setShowShareProfileModal(false)}
                      />}
                

                    </Box>
                  </div>
                )}
              </Stack>
              <div className="post-wrapper-desktop">
                <Typography color={toggle ? "#fff" : "#000"} >
                {counts?.all_posts ?? 0} Post
                </Typography>
                <Typography color={toggle ? "#fff" : "#000"}  >
                {userDetails?.user_follower.length || 0} Followers
                </Typography>
                <Typography color={toggle ? "#fff" : "#000"}  >
                {userDetails?.user_following.length || 0} Following
                </Typography>
              </div>
 

              <Box sx={{ pt: 1 }} order={{ xs: "0", md: "3" }}>
                <Box className="username">
                  <Typography
                    variant="body1"
                    sx={{ color: toggle ? "#fff" : "#000" }}
                  >
                    <strong>
                      {" "}
                      @{userDetails && userDetails.custom_username} &#8226;
                    </strong>
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {isEligibleForFetchingPost === true &&
                    userDetails?.is_online === true
                      ? "Available Now"
                      : moment
                          .utc(userDetails?.last_login)
                          .local()
                          .startOf("seconds")
                          .fromNow() || "Days Ago"}
                  </Typography>
                </Box>
                {userDetails?.bio && (
                  <Typography
                    variant="body1"
                    sx={{ color: toggle ? "#fff" : "#000", fontSize: "12px" }}
                  >
                    {userDetails?.bio}
                  </Typography>
                )}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    padding: "15px 0",
                  }}
                >
                  <AvatarGroup
                    max={3}
                    sx={{
                      display: { xs: "flex", md: "none" },
                    }}
                  >
                    <Avatar
                      sx={{ width: 24, height: 24 }}
                      alt="Remy Sharp"
                      src={storyImage}
                    />
                    <Avatar
                      sx={{ width: 24, height: 24 }}
                      alt="Travis Howard"
                      src={storyImage}
                    />
                    <Avatar
                      sx={{ width: 24, height: 24 }}
                      alt="Cindy Baker"
                      src={storyImage}
                    />
                  </AvatarGroup>
                
                </Box>
                <Box display="flex" gap={1} sx={{ padding: "15px 0" }}>
                  {!!userDetails?.instagram && (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      py="5px"
                      px="10px"
                      bgcolor={toggle ? "#fff" : "#EFEFEF"}
                      borderRadius="12px"
                      gap="4px"
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        handleSocialIconClick(userDetails?.instagram || "")
                      }
                    >
                      <img
                        src={InstagramIcon}
                        height="20"
                        width="20"
                        alt="img"
                      />
                      <Typography
                        sx={{
                          fontSize: "14px",
                          display: { sx: "none", md: "flex" },
                          color: "#000",
                        }}
                      >
                        Instagram
                      </Typography>
                    </Box>
                  )}
                  {!!userDetails?.twitter && (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      py="5px"
                      px="10px"
                      bgcolor={toggle ? "#fff" : "#EFEFEF"}
                      borderRadius="12px"
                      gap="4px"
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        handleSocialIconClick(userDetails?.twitter || "")
                      }
                    >
                      <img
                        src={TwitterIcon}
                        height="20"
                        width="20"
                        style={{ borderRadius: 10 }}
                        alt="img"
                      />
                      <Typography
                        sx={{
                          fontSize: "14px",
                          display: { sx: "none", md: "flex" },
                          color: "#000",
                        }}
                      >
                        Twitter
                      </Typography>
                    </Box>
                  )}
                  {!!userDetails?.discord && (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      py="5px"
                      px="10px"
                      bgcolor={toggle ? "#fff" : "#EFEFEF"}
                      borderRadius="12px"
                      gap="4px"
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        handleSocialIconClick(userDetails?.discord || "")
                      }
                    >
                      <img
                        src={DiscordIcon}
                        height="20"
                        width="20"
                        style={{ borderRadius: 10 }}
                        alt="img"
                      />
                      <Typography
                        sx={{
                          fontSize: "14px",
                          display: { sx: "none", md: "flex" },
                          color: "#000",
                        }}
                      >
                        Discord
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              padding: { xs: "8px 0", md: "0" },
              overflow: "auto",
              scrollBehavior: "smooth",
            }}
          ></Box>
        </div>
        {isEligibleForFetchingPost && (
          <>
            <Box className="tab-main-wrapper" id="postId">
              <Tabs
                value={value}
                variant="fullWidth"
                onChange={handleChange}
                sx={{ borderTop: `1px solid ${theme.palette.grey[700]}` }}
                className="profile-tabs-root"
              >
                <Tab
                  className={`profile-tab ${
                    toggle && value === 0 && "active-tab"
                  } profile-tab-list`}
                  icon={<BrokenImageOutlinedIcon />}
                  iconPosition="start"
                  label={
                    <div className="profile-tab-text">
                      All ({counts?.all_posts ?? 0})
                    </div>
                  }
                />
                <Tab
                  className={`profile-tab ${
                    toggle && value === 1 && "active-tab"
                  } profile-tab-list`}
                  icon={<TextSnippetOutlinedIcon />}
                  iconPosition="start"
                  label={
                    <div className="profile-tab-text">
                      Text ({counts?.text_posts ?? 0})
                    </div>
                  }
                />
                <Tab
                  className={`profile-tab ${
                    toggle && value === 2 && "active-tab"
                  } profile-tab-list`}
                  icon={<PhotoLibraryOutlinedIcon />}
                  iconPosition="start"
                  label={
                    <div className="profile-tab-text">
                      Photos ({counts?.image_posts ?? 0})
                    </div>
                  }
                />
                <Tab
                  className={`profile-tab ${
                    toggle && value === 3 && "active-tab"
                  } profile-tab-list`}
                  icon={<PlayCircleOutlineOutlinedIcon />}
                  iconPosition="start"
                  label={
                    <div className="profile-tab-text">
                      Videos ({counts?.video_posts ?? 0})
                    </div>
                  }
                />
                {/* <Tab
                  className={`profile-tab ${
                    toggle && value === 4 && "active-tab"
                  } profile-tab-list`}
                  icon={<LocalOfferOutlinedIcon />}
                  iconPosition="start"
                  label={
                    <div className="profile-tab-text">
                      Subscription ({counts?.subscriptions ?? 0})
                    </div>
                  }
                /> */}
              </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
              {posts?.length > 0 ? (
                <MediaList
                  mediaList={posts}
                  totalMedia={counts.all_posts}
                  fetchMoreMedia={fetchImageHandler}
                  loader={isLoading}
                  userDetails={userDetails}
                  getUserPostCounts={getUserPostCounts}
                  postDeleted={postDeleted}
                />
              ) : (
                <NothingToShow padding={14} color={toggle ? "#fff" : "#000"} />
              )}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {textPosts?.length > 0 ? (
                <MediaList
                  mediaList={textPosts}
                  totalMedia={counts.text_posts}
                  fetchMoreMedia={fetchImageHandler}
                  loader={isLoading}
                  userDetails={userDetails}
                  getUserPostCounts={getUserPostCounts}
                  postDeleted={postDeleted}
                />
              ) : (
                <NothingToShow padding={14} color={toggle ? "#fff" : "#000"} />
              )}
            </TabPanel>
            <TabPanel value={value} index={2}>
              {photoPosts?.length > 0 ? (
                <MediaList
                  mediaList={photoPosts}
                  totalMedia={counts.image_posts}
                  fetchMoreMedia={fetchImageHandler}
                  loader={isLoading}
                  userDetails={userDetails}
                  getUserPostCounts={getUserPostCounts}
                  postDeleted={postDeleted}
                />
              ) : (
                <NothingToShow padding={14} color={toggle ? "#fff" : "#000"} />
              )}
            </TabPanel>

            <TabPanel value={value} index={3}>
              {videoPosts?.length > 0 ? (
                <MediaList
                  mediaList={videoPosts}
                  totalMedia={counts.video_posts}
                  fetchMoreMedia={fetchImageHandler}
                  loader={isLoading}
                  userDetails={userDetails}
                  getUserPostCounts={getUserPostCounts}
                  postDeleted={postDeleted}
                />
              ) : (
                <NothingToShow padding={14} color={toggle ? "#fff" : "#000"} />
              )}
            </TabPanel>
            <TabPanel value={value} index={4}>
              <div className="image-wrapper">
                {subscriptions.length ? (
                  subscriptions.map((item, i) => {
                    return (
                      <Box
                        style={{
                          border: `1px solid ${theme.palette.grey[400]}`,
                          borderRadius: "10px",
                          overflow: "hidden",
                        }}
                      >
                        <Box sx={{ textAlign: "center" }}></Box>
                      </Box>
                    );
                  })
                ) : (
                  <Typography
                    variant="h4"
                    sx={{
                      textAlign: "center",
                      color: toggle ? "#fff" : "#000",
                    }}
                  >
                    No Subscriptions added!
                  </Typography>
                )}
                {isLoading && (
                  <>
                    <PostItemSkeleton />
                    <PostItemSkeleton />
                    <PostItemSkeleton />
                  </>
                )}
              </div>
            </TabPanel>
          </>
        )}
      </Box>
      {!isEligibleForFetchingPost && (
        <Box
          style={{
            border: `1px solid ${theme.palette.grey[700]}`,
            borderRadius: 10,
            marginTop: 20,
            padding: 20,
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              color: toggle ? "#fff" : "#000",
              textAlign: "center",
            }}
          >
            This account is private
          </Typography>
          {!savedUser?.custom_username && (
            <>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "white",
                  textAlign: "center",
                  padddingTop: 2,
                }}
              >
                Already follow {userDetails?.custom_username}?{" "}
                <a
                  href="/"
                  onClick={() => navigate(`/auth/login?r=/${username}`)}
                >
                  Login
                </a>{" "}
                to
              </Typography>
              <Typography
                sx={{ fontSize: "12px", color: "white", textAlign: "center" }}
              >
                see their photos and videos.
              </Typography>
            </>
          )}
        </Box>
      )}
      <TipPopUp
        user={userDetails}
        onClose={handleClose}
        setOpenPopUpTip={setOpenPopUpTip}
        onOpen={handleClickOpen}
        openPopUpTip={openPopUpTip}
      />
    </>
  );
};

export default ProfilePage;
function setImage(imageURL: string) {
  throw new Error("Function not implemented.");
}

  function html2canvas(avatarElement: Element | null) {
    throw new Error("Function not implemented.");
  }

function setError(arg0: string) {
  throw new Error("Function not implemented.");
}

