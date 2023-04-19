import {
  Avatar,
  Box,
  Button,
  Grid,
  ListItemAvatar,
  Modal,
  Tab,
  Tabs,
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
  useLayoutEffect,
} from "react";

import "./navbarTab.css";
import { ThemeContext } from "frontend/contexts/ThemeContext";
import { useNavigate } from "react-router";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CreateStory from "./CreateStory";
import { toast } from "react-toastify";
import { getUserOwnStories } from 'frontend/redux/slices/lounge';
import { useSelector } from "react-redux";
import { RootState, useDispatch } from "frontend/redux/store";
import Carousel from "./Carousel";
import { config } from "react-spring";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { createUserStories } from 'frontend/utils/stories';
import PostItemNew from 'frontend/pages/Lounge/PostItem/PostItem';
import AvatarComponent from '../../components/common/Avatar';
import UserStories from '../../components/UserStories/UserStories';
import { AxiosResponse } from 'axios';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}
interface RespPost {
  data: PostInterface[];
  code: number;
  message: string;
  recordsFiltered: number;
  recordsTotal: number;
}

const PAGE_SIZE = 6;

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

const HomeTab = () => {
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

  const [widthScreen, setWidthScreen] = useState<number>(window.screen.width);
  const userData = useSelector((state: RootState) => state.user.userData);
  const [userStories, setUserStories] = useState<any[]>([]);
  const { userOwnStories } = useSelector((state: RootState) => state.lounge);
  const [state, setState] = useState<any>({
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: true,
    enableSwipe: true,
    config: config.gentle,
  });
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
    resetPosts,
    setActiveType,
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

          fetchPosts({ ...pagination, start: pagination.start + PAGE_SIZE });
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

    return () => {
      resetPosts();
    };
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

      const { data }: AxiosResponse<RespPost> = await _axios.post(
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

        if (pagination.start + PAGE_SIZE > data.recordsTotal) {
          setHasNextFalse(pagination.post_type);
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

  useEffect(() => {
    if (value === 0) setActiveType('all');
    if (value === 1) setActiveType('text');
    if (value === 2) setActiveType('image');
    if (value === 3) setActiveType('video');
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
          setOpenStoryModal('');
          // handleStoryOnCreateStory(result?.data?.data);
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

  const handleClose = () => {
    setOpenModal(false);
    setOpenModalMobile(false);
  };

  useEffect(() => {
    const data: any = [];
    if (storyList.length > 0) {
      storyList?.forEach((story: any, index: number) => {
        data.push({
          key: story?.id,
          content: (
            <UserStories
              username={story.custom_username}
              profileName={story.display_name}
              avatarUrl={story.profile_image}
              stories={story.user_stories}
              onClose={handleClose}
              onAllStoriesEnd={() => {
                if (index === storyList.length - 1) {
                  setOpenModal(false);
                  setOpenModalMobile(false);
                } else {
                  setState((prevState: any) => ({
                    ...prevState,
                    goToSlide: prevState.goToSlide + 1
                  }));
                }
              }}
            />
          ),
        });
      });
      setUserStories(data);
    }
  }, [storyList, userData, state.goToSlide, state]);

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
                    >
                      <AvatarComponent
                        user={savedUser}
                        stories={userOwnStories}
                        size={92}
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

                {storyList?.map((item: any, i: number) => (
                  <React.Fragment key={i}>
                    <div
                      style={{ textAlign: "center", width: "fit-content" }}
                      className="user-story"
                      onClick={() => {
                        if (item?.user_stories?.length > 0) {
                          setOpenModal(true);
                          setOpenStoryModal("Follower");
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
                  label={`All`}
                />
                <Tab
                  className={`${
                    toggle && value === 1 && "active-tab"
                  } custom-tab-list`}
                  label={`Text`}
                />
                <Tab
                  className={`${
                    toggle && value === 2 && "active-tab"
                  } custom-tab-list`}
                  label={`Photos`}
                />
                <Tab
                  className={`${
                    toggle && value === 3 && "active-tab"
                  } custom-tab-list`}
                  label={`Videos`}
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
    </>
  );
};

export default HomeTab;
