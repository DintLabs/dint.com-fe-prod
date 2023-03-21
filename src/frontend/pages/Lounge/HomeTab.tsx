import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  ListItemAvatar,
  Modal,
  Tab,
  Tabs,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import _axios from "frontend/api/axios";
import PostItemSkeleton from "frontend/components/common/skeletons/PostItemSkeleton";
import { useLounge } from "frontend/contexts/LoungeContext";
import { postTypes } from "frontend/data";
import { PaginationPostsInerface } from "frontend/interfaces/contextInterface";
import { PostInterface } from "frontend/interfaces/postInterface";
import {
  ReactNode,
  SyntheticEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from "react";

import "./navbarTab.css";
import PostItem from "./PostItem";
import { ThemeContext } from "frontend/contexts/ThemeContext";
import { useNavigate } from "react-router";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CreateStory from "./CreateStory";
import { toast } from "react-toastify";
import { getUserOwnStories } from "frontend/redux/slices/lounge";
import { useSelector } from "react-redux";
import { RootState, useDispatch } from "frontend/redux/store";
import StoriesUserOwn from "frontend/components/lounge/StoriesUserOwn";
import Carousel from "./Carousel";
import Stories from "react-insta-stories";
import { config } from "react-spring";
import CloseIcon from "@mui/icons-material/Close";
import { sendMessage } from "frontend/redux/slices/messages";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import TipPopUp from "frontend/components/tip/TipPopUp";
import React from "react";
import { createUserStories } from 'frontend/utils/stories';
import PostItemNew from 'frontend/pages/Lounge/PostItem/PostItem';

interface Props {
  createPost: Function;
}

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}
interface RespPost {
  data: { data: PostInterface[] };
  code: number;
  message: string;
  recordsFiltered: number;
  recordsTotal: number;
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
        <Box>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const getTouches = (evt: any) => {
  return (
    evt.touches || evt.originalEvent.touches // browser API
  );
};

const HomeTab = ({ createPost }: Props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { toggle } = useContext(ThemeContext);
  const mobileView = useMediaQuery("(max-width:899px)");

  const [value, setValue] = useState(0);
  const [suggestionList, setSuggestionList] = useState([]);
  const [storyList, setStoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const savedUser = JSON.parse(localStorage.getItem("userData") ?? "{}");
  const [showAddPageButton, setShowAddPageButton] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalMobile, setOpenModalMobile] = useState<boolean>(false);
  const [openStoryModal, setOpenStoryModal] = useState<string>("");
  const [messageContent, setMessageContent] = useState<string>("test");
  const inputRef = useRef<any>(null);

  const [widthScreen, setWidthScreen] = useState<number>(window.screen.width);
  const [selectedStory, setSelectedStory] = useState<any>();
  const userData = useSelector((state: RootState) => state.user.userData);
  const [userStories, setUserStories] = useState<any[]>([]);
  const [state, setState] = useState<any>({
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: true,
    enableSwipe: true,
    config: config.gentle,
  });
  const [openPopUpTip, setOpenPopUpTip] = useState<boolean>(false);
  const [profileByUsername, setProfileByUsername] = useState<any>();
  const [alreadyLike, setAlreadyLike] = useState(false);
  const dispatch = useDispatch();
  const {
    counts,
    getUserPostCounts,
    posts,
    setPosts,
    textPosts,
    setTextPosts,
    photoPosts,
    setPhotoPosts,
    videoPosts,
    setVideoPosts,
    paginationPosts,
    setPaginationPosts,
    paginationTextPosts,
    setPaginationTextPosts,
    paginationPhotoPosts,
    setPaginationPhotoPosts,
    paginationVideoPosts,
    setPaginationVideoPosts,
  } = useLounge();

  const postDeleted = (postId: number) => {
    setPosts(posts.filter((prev) => prev.id !== postId));
    setTextPosts(textPosts.filter((prev) => prev.id !== postId));
    setPhotoPosts(photoPosts.filter((prev) => prev.id !== postId));
    setVideoPosts(videoPosts.filter((prev) => prev.id !== postId));
    getUserPostCounts();
  };

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
        if (pagination && !isLoading && pagination.hasNext) {
          fetchPosts({ ...pagination, start: pagination.start + 5 });
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
  ]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    getSuggestionList();
    getStoryList();
  }, []);

  useLayoutEffect(() => {
    function updateWidth() {
      setWidthScreen(window.screen.width);
    }
    window.addEventListener("resize", updateWidth);
    updateWidth();
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const getSuggestionList = async () => {
    const result = await _axios.get("api/user/get_suggestions/", {});
    if (result?.data?.code === 200) {
      setSuggestionList(result?.data?.data);
    }
  };

  const getStoryList = async () => {
    dispatch(getUserOwnStories());
    const result = await _axios.get("api/user/get-stories/", {});
    if (result?.data?.code === 200) {
      setStoryList(result?.data?.data);
    }
  };

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const ShowAddPage = () => {
    if (showAddPageButton === true) {
      setShowAddPageButton(false);
    } else {
      setShowAddPageButton(true);
    }
  };

  const setHasNextFalse = (postType: string) => {
    if (postType === postTypes.all.value) {
      setPaginationPosts({ ...paginationPosts, hasNext: false });
    } else if (postType === postTypes.text.value) {
      setPaginationTextPosts({ ...paginationTextPosts, hasNext: false });
    } else if (postType === postTypes.image.value) {
      setPaginationPhotoPosts({ ...paginationPhotoPosts, hasNext: false });
    } else if (postType === postTypes.video.value) {
      setPaginationVideoPosts({ ...paginationVideoPosts, hasNext: false });
    }
  };

  const fetchPosts = async (pagination?: PaginationPostsInerface) => {
    if (isLoading || !pagination?.hasNext) return;

    try {
      setIsLoading(true);

      const { data }: RespPost = await _axios.post(
        `/api/lounge/pagination/list/`,
        pagination
      );

      setIsLoading(false);

      if (data?.data?.length) {
        if (pagination.post_type === postTypes.all.value) {
          setPosts([...posts, ...data.data]);
          setPaginationPosts(pagination);
        } else if (pagination.post_type === postTypes.text.value) {
          setTextPosts([...textPosts, ...data.data]);
          setPaginationTextPosts(pagination);
        } else if (pagination.post_type === postTypes.image.value) {
          setPhotoPosts([...photoPosts, ...data.data]);
          setPaginationPhotoPosts(pagination);
        } else if (pagination.post_type === postTypes.video.value) {
          setVideoPosts([...videoPosts, ...data.data]);
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

  useEffect(() => {
    getUserPostCounts();
  }, []);

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
    if (!list?.length) {
      fetchPosts(pagination);
    }
  }, [value]);

  const createNewStory = useCallback(
    async (toastId: string, userId: string, storyUrl: any, fileType: any) => {
      // const formData = new FormData();
      // formData.append("user", userId);
      // formData.append("story", storyUrl);
      // formData.append("type", fileType);
      const createStory = {
        user: userId,
        type: fileType,
        story: storyUrl,
      };

      try {
        const result = await _axios.post(
          "/api/user/create-stories/",
          createStory
        );
        if (result?.data?.data) {
          dispatch(getUserOwnStories());
          setOpenModal(false);
          setOpenModalMobile(false);
          handleStoryOnCreateStory(result?.data?.data);
          toast.update(toastId, {
            render: result?.data?.message,
            type: "success",
            isLoading: false,
          });
        }
        setTimeout(() => {
          toast.dismiss();
        }, 3000);
        setTimeout(() => toast.dismiss(), 2000);
      } catch (err: any) {
        toast.error(err.message.toString());
      }
    },
    []
  );

  const handleStoryOnCreateStory = (objStory: any) => {
    setTimeout(() => {
      const userStoriesItem = {
        ...objStory,
        story: objStory.story.replace(process.env.REACT_APP_API_URL, ""),
      };
      userStoriesItem.story.replace(process.env.REACT_APP_API_URL, "");
      const objStoryItem = {
        custom_username: savedUser?.custom_username,
        display_name: savedUser?.display_name,
        id: savedUser?.id,
        profile_image: savedUser?.id,
        user_stories: [userStoriesItem],
      };
      setSelectedStory(objStoryItem);
      setOpenStoryModal("Follower");
      setOpenModal(true);
    }, 500);
  };

  const handleClose = () => {
    setOpenModal(false);
    setOpenModalMobile(false);
  };

  const renderData = useCallback(
    (story: any) => (
      <TextField
        inputRef={inputRef}
        fullWidth
        color="secondary"
        onChange={(e) => setMessageContent(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            sendMessageHandler(story.id.toString(), userData);
          }
        }}
        placeholder="Send Message"
        sx={{
          color: toggle ? "white" : "#161C24",
          height: 40,
          ".MuiInputBase-root": {
            borderRadius: "25px",
            ".MuiInputBase-input": {
              height: "40px !important",
              padding: "0 14px",
              outline: "none",
              boxShadow: "none",
              "&:hover": {
                borderColor: "transparent",
                boxShadow: "none",
              },
              "&:focus": {
                boxShadow: "none",
                outline: "none",
                borderColor: "red",
              },
            },
          },
        }}
      />
    ),
    [messageContent, userData]
  );

  const sendTip = async (story: any) => {
    try {
      const { data } = await _axios.post("/api/user/get-profile-by-username/", {
        custom_username: story.custom_username,
      });

      if (data.code === 200) {
        setProfileByUsername(data.data);
        setOpenPopUpTip(true);
      } else {
        toast.error("User is not availabe for tip!!");
      }
    } catch (err) {
      toast.error("User is not availabe!!");
    }
  };

  useEffect(() => {
    const data: any = [];
    if (storyList.length > 0) {
      storyList?.map((story: any, index: number, { length }: any) => {
        data.push({
          key: story?.id,
          content: (
            <Box
              sx={{
                position: "relative",
                "@media screen and (max-width: 899px)": {
                  height: "100vh",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  flex: 1,
                  flexDirection: "column",
                  "> div ~ div": {
                    "> div ~ div": {
                      height: "100vh !important",
                      div: {
                        width: "100%",
                      },
                    },
                  },
                },
              }}
            >
              <div
                onClick={() => navigate(`/${story.custom_username}`)}
                style={{
                  display: "flex",
                  gap: "15px",
                  position: "absolute",
                  top: 20,
                  left: 15,
                  zIndex: 1000,
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Avatar
                  className="story-avatar"
                  src={story?.profile_image}
                  sx={{
                    width: 50,
                    height: 50,
                    borderWidth: "3px",
                    borderStyle: "solid",
                    borderColor: toggle ? "#4AA081" : "#4AA081",
                    position: "relative",
                  }}
                />
                <h4 style={{ color: "#fff" }}>{story.display_name}</h4>
                {/* {story.user_stories.map((user_story: any) => <h4>{moment(user_story.created_at).fromNow()}</h4> )} */}
              </div>
              <Stories
                stories={createUserStories(story)}
                onStoryEnd={(s: any, st: any) => {
                  console.log("story ended===", s, st, state.goToSlide);
                  // setState({
                  //   ...state,
                  //   goToSlide: index + 1
                  // })
                }}
                onAllStoriesEnd={(s: any, st: any) => {
                  console.log("all stories ended", s, st, state.goToSlide);
                  if (state.goToSlide === length) {
                    setOpenModal(false);
                    setOpenModalMobile(false);
                  } else {
                    setState({
                      ...state,
                      goToSlide: index + 1,
                    });
                  }
                }}
                onStoryStart={(s: any, st: any) =>
                  console.log("story started", s, st)
                }
                width={window.innerWidth < 900 ? "100%" : undefined}
                height={window.innerWidth < 900 ? "100%" : undefined}
              />
              <CloseIcon
                onClick={handleClose}
                style={{
                  cursor: "pointer",
                  color: "white",
                  zIndex: 9999,
                  position: "absolute",
                  top: "25px",
                  right: "15px",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  position: "absolute",
                  bottom: 15,
                  left: 0,
                  width: "100%",
                  padding: "0 10px",
                  zIndex: 999,
                  "@media screen and (max-width: 899px)": {
                    position: "sticky",
                  },
                }}
              >
                {renderData(story)}
                <IconButton
                  onClick={() => sendTip(story)}
                  sx={{ fontSize: "12px" }}
                >
                  <MonetizationOnIcon />
                </IconButton>
              </Box>
            </Box>
          ),
        });
      });
      setUserStories(data);
    }
  }, [storyList, userData, alreadyLike, state.goToSlide]);

  const handleTouchStart = (evt: any) => {
    if (!state.enableSwipe) {
      return;
    }

    const firstTouch = getTouches(evt)[0];
    setState({
      ...state,
      xDown: firstTouch.clientX,
      yDown: firstTouch.clientY,
    });
  };

  const handleTouchMove = (evt: any) => {
    if (!state.enableSwipe || (!state.xDown && !state.yDown)) {
      return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = state.xDown - xUp;
    let yDiff = state.yDown - yUp;
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        /* left swipe */
        setState({
          goToSlide: state.goToSlide + 1,
          xDown: null,
          yDown: null,
        });
      } else {
        /* right swipe */
        setState({
          goToSlide: state.goToSlide - 1,
          xDown: null,
          yDown: null,
        });
      }
    }
  };

  const sendMessageHandler = useCallback(
    async (receiverId: string, userData: any) => {
      const messageContent = inputRef?.current?.value;
      if (messageContent.trim().length > 0) {
        const res = await dispatch(
          sendMessage({
            reciever: receiverId,
            sender: userData?.id?.toString(),
            content: messageContent.trim(),
            media: "", // Add a default value for the media property
          })
        );
        if (res) {
          toast.success("Message sent successful!!");
        }
      }
      setMessageContent("");
    },
    [messageContent, userData]
  );

  // for popup tip
  const handleClickOpen = () => {
    setOpenPopUpTip(true);
  };

  const handleCloseTipModal = () => {
    setOpenPopUpTip(false);
  };

  useEffect(() => {
    openModalMobile
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "scroll");
  }, [openModalMobile]);

  return (
    <>
      <Box
        id="postsListScrollableDiv"
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
          }}
        >
          <Box
            sx={{ width: { xs: "100%", md: "60%" } }}
            className="custom-padding"
          >
            <Box
              sx={{
                padding: { xs: "8px 24px", md: "0" },
                overflow: "auto",
                scrollBehavior: "smooth",
              }}
            >
              <ListItemAvatar
                style={{ cursor: "pointer", display: "flex", gap: "35px" }}
              >
                {mobileView && (
                  <div
                    style={{ textAlign: "center", width: "fit-content" }}
                    className="user-story"
                  >
                    <div
                      style={{ position: "relative" }}
                      onClick={() => {
                        mobileView
                          ? setOpenModalMobile(true)
                          : setOpenModal(true);
                        setOpenStoryModal("User");
                      }}
                    >
                      <Avatar
                        className="story-avatar"
                        src={savedUser?.profile_image}
                        sx={{
                          width: 92,
                          height: 92,
                          borderWidth: "3px",
                          borderStyle: "solid",
                          borderColor: toggle ? "#4AA081" : "#4AA081",
                          position: "relative",
                        }}
                      />

                      {/* Create Story Button */}
                      <Fab
                        disableFocusRipple
                        disableRipple
                        disableTouchRipple
                        sx={{
                          "&:hover": { background: "#979797" },
                          background: "#979797",
                        }}
                        size="small"
                        style={{
                          position: "absolute",
                          bottom: "-4px",
                          right: "-8px",
                          zIndex: "9",
                        }}
                        onClick={() => {
                          mobileView
                            ? setOpenModalMobile(true)
                            : setOpenModal(true);
                          setOpenStoryModal("User");
                        }}
                      >
                        <AddIcon fontSize="small" sx={{ color: "#fff" }} />
                      </Fab>
                    </div>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "600",
                        marginTop: "10px",
                        color: toggle ? "text.primary" : "#161C24",
                      }}
                    >
                      {"Your Story"}
                    </Typography>
                  </div>
                )}
                <StoriesUserOwn />

                {storyList?.map((item: any, i: number) => (
                  <React.Fragment key={i}>
                    <div
                      style={{ textAlign: "center", width: "fit-content" }}
                      className="user-story"
                      onClick={() => {
                        if (item?.user_stories?.length > 0) {
                          setOpenModal(true);
                          setOpenStoryModal("Follower");
                          setSelectedStory(item);
                          createUserStories(item);
                          setState({
                            ...state,
                            goToSlide: i,
                          });
                        }
                      }}
                    >
                      <Avatar
                        className="story-avatar"
                        src={item?.profile_image}
                        sx={{
                          width: 92,
                          height: 92,
                          borderWidth: "3px",
                          borderStyle: "solid",
                          borderColor: toggle ? "#4AA081" : "#4AA081",
                        }}
                      />
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: "600",
                          marginTop: "10px",
                          color: toggle ? "text.primary" : "#161C24",
                        }}
                      >
                        {item?.display_name}
                      </Typography>
                    </div>
                  </React.Fragment>
                ))}

                <Modal open={openModal} onClose={handleClose}>
                  {openStoryModal === "Follower" ? (
                    <div
                      className="App"
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                    >
                      <Carousel
                        height="100%"
                        width="100%"
                        margin="0 200px 0 200px"
                        // offset={2}
                        showNavigation={true}
                        goToSlide={state.goToSlide}
                        animationConfig={state.config}
                        cards={userStories || []}
                      />
                    </div>
                  ) : (
                    <div>
                      <CreateStory
                        widthScreen={widthScreen}
                        createStory={createNewStory}
                      />
                    </div>
                  )}
                </Modal>
              </ListItemAvatar>
            </Box>

            <Box className="custom-tab-wrapper">
              <Tabs
                value={value}
                variant="fullWidth"
                onChange={handleChange}
                sx={{
                  borderBottom: `0 solid ${theme.palette.grey[700]}`,
                  display: "inline-flex",
                }}
                className="custom-tabs-root"
              >
                <Tab
                  className={`${
                    toggle && value === 0 && "active-tab"
                  } custom-tab-list`}
                  label={`All (${counts?.all_posts ?? 0})`}
                />
                <Tab
                  className={`${
                    toggle && value === 1 && "active-tab"
                  } custom-tab-list`}
                  label={`Text (${counts?.text_posts ?? 0})`}
                />
                <Tab
                  className={`${
                    toggle && value === 2 && "active-tab"
                  } custom-tab-list`}
                  label={`Photos (${counts?.image_posts ?? 0})`}
                />
                <Tab
                  className={`${
                    toggle && value === 3 && "active-tab"
                  } custom-tab-list`}
                  label={`Videos (${counts?.video_posts ?? 0})`}
                />
              </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
              {posts.map((item) => (
                <PostItemNew
                  key={item.id}
                  post={item}
                  onPostChange={fetchPosts}
                  onPostDelete={postDeleted}
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
                <PostItemNew
                  key={`textPosts_${i}_${item.id}`}
                  post={item}
                  onPostChange={fetchPosts}
                  onPostDelete={postDeleted}
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
                <PostItemNew
                  key={`photoPosts_${i}_${item.id}`}
                  post={item}
                  onPostChange={fetchPosts}
                  onPostDelete={postDeleted}
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
                <PostItemNew
                  key={`videoPosts_${i}_${item.id}`}
                  post={item}
                  onPostChange={fetchPosts}
                  onPostDelete={postDeleted}
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
          </Box>

          {/* Mobile Create Stories Modal */}
          {mobileView && openModalMobile && (
            <Box
              style={{
                width: "100%",
                height: "100%",
                position: "fixed",
                zIndex: 999,
                background: "rgba(0,0,0,0.5)",
              }}
            >
              <CloseIcon
                onClick={handleClose}
                style={{
                  color: "black",
                  cursor: "pointer",
                  position: "absolute",
                  top: "80px",
                  right: "35px",
                  zIndex: 9999,
                }}
              />
              <CreateStory
                widthScreen={widthScreen}
                createStory={createNewStory}
              />
            </Box>
          )}

          <Box
            sx={{
              display: { xs: "none", md: "block" },
              marginLeft: "5rem",
              marginTop: "26px",
              width: "30%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <Button
                onClick={() => navigate("/page/creation")}
                sx={{
                  "&:hover": { background: "grey" },
                  display: showAddPageButton ? "block" : "none",
                  position: "absolute",
                  top: "8%",
                  right: "33%",
                  background: "black",
                  color: "white",
                  padding: "10px",
                  borderRadius: "12px",
                  borderTopRightRadius: "0px",
                }}
              >
                + Add Page
              </Button>
              <Button onClick={() => ShowAddPage()}>
                <Avatar
                  src={savedUser?.profile_image}
                  sx={{ width: 50, height: 50 }}
                />
              </Button>
              <div>
                <Typography
                  variant="h4"
                  sx={{ color: toggle ? "text.primary" : "#161C24" }}
                >
                  {savedUser.display_name}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: "text.secondary",
                    cursor: 'pointer',
                }}
                  onClick={() => navigate(`/${savedUser.custom_username}`)}
                >
                  @{savedUser.custom_username}
                </Typography>
              </div>
            </Box>
            <Box
              sx={{
                marginTop: "2rem",
                marginLeft: "10px",
              }}
            >
              <Typography
                variant="h4"
                sx={{ color: toggle ? "text.primary" : "#161C24" }}
              >
                Suggestions
              </Typography>
              {suggestionList?.map((item: any, i: number) => (
                <div
                  onClick={() => navigate(`/${item?.custom_username}`)}
                  key={i}
                >
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      gap: "12px",
                      marginTop: "12px",
                      cursor: "pointer",
                    }}
                  >
                    <Avatar
                      src={item?.profile_image}
                      sx={{ width: 35, height: 35 }}
                    />
                    <div>
                      <Typography
                        variant="h5"
                        sx={{ color: toggle ? "text.primary" : "#161C24" }}
                      >
                        {item?.display_name}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ color: "text.secondary" }}
                        onClick={() => navigate(`/${item?.custom_username}`)}
                      >
                        {item?.custom_username}
                      </Typography>
                    </div>
                  </Box>
                </div>
              ))}
              <Grid
                container
                direction="row"
                gap={2}
                sx={{ display: "flex", marginTop: "30px" }}
              >
                <div onClick={() => navigate("/terms")}>
                  <Typography
                    variant="h6"
                    sx={{ color: "#4AA081", cursor: "pointer" }}
                  >
                    Terms of Service
                  </Typography>
                </div>
                <div onClick={() => navigate("/privacy")}>
                  <Typography
                    variant="h6"
                    sx={{ color: "#4AA081", cursor: "pointer" }}
                  >
                    Privacy Policy
                  </Typography>
                </div>
                <div onClick={() => navigate("/cookies")}>
                  <Typography
                    variant="h6"
                    sx={{ color: "#4AA081", cursor: "pointer" }}
                  >
                    Cookie Policy
                  </Typography>
                </div>
              </Grid>
              <Grid
                container
                direction="row"
                gap={2}
                sx={{ display: "flex", marginTop: "30px" }}
              >
                <div onClick={() => navigate("/help")}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "400",
                      color: toggle ? "text.primary" : "#536471",
                      cursor: "pointer",
                    }}
                  >
                    Help
                  </Typography>
                </div>

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "400",
                    color: toggle ? "text.primary" : "#536471",
                  }}
                  className="notranslate"
                >
                  Dint © 2023
                </Typography>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
      <TipPopUp
        user={profileByUsername}
        onClose={handleCloseTipModal}
        setOpenPopUpTip={setOpenPopUpTip}
        onOpen={handleClickOpen}
        openPopUpTip={openPopUpTip}
      />
    </>
  );
};

export default HomeTab;
