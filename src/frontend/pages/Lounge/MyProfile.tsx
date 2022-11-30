import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import {
  Avatar,
  Badge,
  Box,
  Button as MUIButton,
  IconButton,
  Stack,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
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
import { UploadCoverPhoto } from "frontend/services/profileService";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import TipPopUp from "frontend/components/tip/TipPopUp";
import DiscordIcon from "../../assets/img/web3/discord.png";
import InstagramIcon from "../../assets/img/web3/instagram.png";
import TwitterIcon from "../../assets/img/web3/twitter.png";
import PostItem from "./PostItem";
import { ThemeContext } from "../../contexts/ThemeContext";
import moment from "moment";

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
        <Box sx={{ p: 3 }}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const MyProfile = ({ username }: { username: string | null | undefined }) => {
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

  const [isLoadingUserDetails, setIsLoadingUserDetails] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowLoading, setIsFollowLoading] = useState(false);

  const [counts, setCounts] = useState<CountInerface>({
    all_posts: 0,
    text_posts: 0,
    image_posts: 0,
    video_posts: 0,
  });

  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [photoPosts, setPhotoPosts] = useState<PostInterface[]>([]);
  const [textPosts, setTextPosts] = useState<PostInterface[]>([]);
  const [videoPosts, setVideoPosts] = useState<PostInterface[]>([]);

  const [paginationPosts, setPaginationPosts] =
    useState<PaginationPostsInerface>(DEFAULT_POSTS_PAGINATION);

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
        navigate("/404");
      }
    } catch (err: any) {
      navigate("/404");
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const result = await UploadCoverPhoto(e.target.files[0]);
      if (userDetails && result.success) {
        setUserDetails({
          ...userDetails,
          banner_image: result?.data?.banner_image || "",
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
      const {data} = await _axios
        .delete(`api/connection/delete-follow-request/${userDetails?.id}`);
        if (data?.code === 200) {
          await fetchUserDetails(true);
          toast.warning(
            `Request Cancelled ${
              userDetails?.display_name || userDetails?.custom_username
            }`
          );
        } else {
          toast.error(data?.message || "Unable to process request")
        }
      }
      catch (err: any) {
        console.error("Cancellation error", err.message);
        toast.error("Unable to process request");
      }
        setIsFollowLoading(false);
    }
  
  const handleClose = () => {
    setOpenPopUpTip(false);
  };

  const handleClickOpen = () => {
    setOpenPopUpTip(true);
  };

  if (!user)
    return (
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        Under Contruction
      </Typography>
    );

  return (
    <>
      <Box
        style={{
          borderLeft: `1px solid ${theme.palette.grey[700]}`,
          borderRight: `1px solid ${theme.palette.grey[700]}`,
        }}
      >
        <Box
          style={{
            borderBottom: `8px solid ${theme.palette.grey[700]}`,
          }}
          sx={{ pb: 2 }}
        >
          <Box sx={{ position: "relative" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                width: "100%",
                height: 250,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${userDetails?.banner_image || ""})`,
              }}
            >
              {username === savedUser?.custom_username && (
                <MUIButton variant="contained" component="label" sx={{ m: 1 }}>
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleFileChange}
                  />
                  Edit cover photo
                </MUIButton>
              )}
            </div>

            <Stack direction="row" justifyContent="space-between">
              <Box
                sx={{ position: "relative", bottom: 15, left: 20, right: 30 }}
              >
                {/* <Badge
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  color="success"
                  overlap="circular"
                  badgeContent=" "
                  variant="dot"
                  invisible={!userDetails}
                >
                  <Avatar src={userDetails?.profile_image} sx={{ width: 75, height: 75 }} />
                </Badge> */}
                {userDetails?.is_online === true ? (
                  <Badge
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    color="success"
                    overlap="circular"
                    badgeContent=" "
                    variant="dot"
                    invisible={!userDetails}
                  >
                    <Avatar
                      src={userDetails?.profile_image}
                      sx={{ width: 75, height: 75 }}
                    />
                  </Badge>
                ) : (
                  <Badge
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    color="warning"
                    overlap="circular"
                    badgeContent=" "
                    variant="dot"
                    invisible={!userDetails}
                  >
                    <Avatar
                      src={userDetails?.profile_image}
                      sx={{ width: 75, height: 75 }}
                    />
                  </Badge>
                )}
              </Box>
              <Box>
                {savedUser?.id !== userDetails?.id ? (
                  <>
                    <IconButton onClick={() => setOpenPopUpTip(true)}>
                      <MonetizationOnOutlinedIcon sx={{ fontSize: "32px" }} />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        navigate(
                          `/lounge/messages/user/${
                            userDetails && userDetails.id
                          }`
                        )
                      }
                    >
                      <ChatOutlinedIcon sx={{ fontSize: "32px" }} />
                    </IconButton>
                    <IconButton>
                      <StarOutlinedIcon sx={{ fontSize: "32px" }} />
                    </IconButton>
                    <IconButton onClick={copyToClipBoard}>
                      <LaunchRoundedIcon sx={{ fontSize: "32px" }} />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton onClick={copyToClipBoard}>
                      <LaunchRoundedIcon sx={{ fontSize: "32px" }} />
                    </IconButton>
                  </>
                )}
              </Box>
            </Stack>
          </Box>
          <Box sx={{ px: 2 }}>
            <Typography
              variant="h3"
              sx={{ color: toggle ? "text.primary" : "#161C24" }}
            >
              {userDetails && userDetails.display_name}
            </Typography>
            <input type="hidden" id="dummy" />
            {isEligibleForFetchingPost === true ? (
              userDetails?.is_online === true ? (
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  @{userDetails && userDetails.custom_username} &#8226;
                  Available Now
                </Typography>
              ) : (
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  @{userDetails && userDetails.custom_username} &#8226;{" "}
                  {moment
                    .utc(userDetails?.last_login)
                    .local()
                    .startOf("seconds")
                    .fromNow() || "Days Ago"}
                </Typography>
              )
            ) : (
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                @{userDetails && userDetails.custom_username} &#8226;
              </Typography>
            )}
         
          </Box>
          {userDetails?.bio && (
            <Box sx={{ px: 2, pt: 1 }}>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", fontSize: "12px" }}
              >
                {userDetails.bio}
              </Typography>
            </Box>
          )}
          {!!savedUser?.custom_username &&
            savedUser?.custom_username !== userDetails?.custom_username &&
            !isLoadingUserDetails && (
              <>
                {userDetails?.is_followed === true && (
                  <MUIButton
                    onClick={unfollow}
                    variant="contained"
                    color="primary"
                    sx={{ m: 1 }}
                  >
                    {isFollowLoading ? `Loading...` : `Unfollow`}
                  </MUIButton>
                )}
                {userDetails?.is_followed === false && (
                  <MUIButton
                    onClick={follow}
                    variant="contained"
                    color="primary"
                    sx={{ m: 1 }}
                  >
                    {isFollowLoading ? `Loading...` : `Follow`}
                  </MUIButton>
                )}
                {userDetails?.is_followed === "Request Sent" && (
                  <MUIButton
                    onClick={cancelRequest}
                    variant="contained"
                    color="primary" 
                    sx={{ m: 1 }}
                  >
                    {isFollowLoading ? `Loading...` : `Cancel Request`} 
                  </MUIButton>
                )}
               
                
              </>
            )}
          
          <Box display="flex" gap={1} sx={{ p: 2 }}>
            {!!userDetails?.instagram && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                py="4px"
                px="8px"
                bgcolor="#3a3d3a"
                borderRadius="12px"
                gap="4px"
                sx={{ cursor: "pointer" }}
                onClick={() =>
                  handleSocialIconClick(userDetails?.instagram || "")
                }
              >
                <img src={InstagramIcon} height="20" width="20" alt="img" />
                <Typography sx={{ color: "white", fontSize: "14px" }}>
                  Instagram
                </Typography>
              </Box>
            )}
            {!!userDetails?.twitter && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                py="4px"
                px="8px"
                bgcolor="#3a3d3a"
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
                <Typography sx={{ color: "white", fontSize: "14px" }}>
                  Twitter
                </Typography>
              </Box>
            )}
            {!!userDetails?.discord && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                py="4px"
                px="8px"
                bgcolor="#3a3d3a"
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
                <Typography sx={{ color: "white", fontSize: "14px" }}>
                  Discord
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        {isEligibleForFetchingPost && (
          <>
            <Box>
              <Tabs
                value={value}
                variant="fullWidth"
                onChange={handleChange}
                sx={{ borderBottom: `1px solid ${theme.palette.grey[700]}` }}
              >
                <Tab label={`All (${counts?.all_posts ?? 0})`} />
                <Tab label={`Text (${counts?.text_posts ?? 0})`} />
                <Tab label={`Photos (${counts?.image_posts ?? 0})`} />
                <Tab label={`Videos (${counts?.video_posts ?? 0})`} />
              </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
              {posts.map((item, i) => (
                <PostItem
                  fetchPosts={() => {}}
                  canDeletePost={true}
                  key={`${item?.created_at}_${i}`}
                  description={item?.content}
                  createdAt={item.created_at}
                  userName={
                    item?.user?.display_name || item?.user?.custom_username
                  }
                  custom_username={item?.user?.custom_username}
                  image={item?.media || null}
                  post={item}
                  onDelete={postDeleted}
                />
              ))}
              {isLoading && (
                <>
                  <PostItemSkeleton />
                  <PostItemSkeleton />
                  <PostItemSkeleton />
                </>
              )}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {textPosts.map((item, i) => (
                <PostItem
                  fetchPosts={() => {}}
                  canDeletePost={true}
                  key={`textPosts_${i}`}
                  description={item?.content}
                  createdAt={item?.created_at}
                  userName={
                    item?.user?.display_name || item?.user?.custom_username
                  }
                  custom_username={item?.user?.custom_username}
                  image={item?.media || null}
                  post={item}
                  onDelete={postDeleted}
                />
              ))}
              {isLoading && (
                <>
                  <PostItemSkeleton />
                  <PostItemSkeleton />
                  <PostItemSkeleton />
                </>
              )}
            </TabPanel>
            <TabPanel value={value} index={2}>
              {photoPosts.map((item, i) => (
                <PostItem
                  fetchPosts={() => {}}
                  canDeletePost={true}
                  key={`photoPosts_${i}`}
                  description={item?.content}
                  createdAt={item?.created_at}
                  userName={
                    item?.user?.display_name || item?.user?.custom_username
                  }
                  custom_username={item?.user?.custom_username}
                  image={item?.media || null}
                  post={item}
                  onDelete={postDeleted}
                />
              ))}
              {isLoading && (
                <>
                  <PostItemSkeleton />
                  <PostItemSkeleton />
                  <PostItemSkeleton />
                </>
              )}
            </TabPanel>

            <TabPanel value={value} index={3}>
              {videoPosts.map((item, i) => (
                <PostItem
                  fetchPosts={() => {}}
                  canDeletePost={true}
                  key={`videoPosts_${i}`}
                  description={item?.content}
                  createdAt={item?.created_at}
                  userName={
                    item?.user?.display_name || item?.user?.custom_username
                  }
                  image={item?.media || null}
                  post={item}
                  onDelete={postDeleted}
                />
              ))}
              {isLoading && (
                <>
                  <PostItemSkeleton />
                  <PostItemSkeleton />
                  <PostItemSkeleton />
                </>
              )}
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
            sx={{ fontSize: "12px", color: "black", textAlign: "center" }}
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

export default MyProfile;
