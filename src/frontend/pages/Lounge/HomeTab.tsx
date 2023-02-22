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
} from "react";
import BuyToken from "frontend/pages/BuyToken";
import storyImage from "frontend/assets/img/web3/story-1.png";

import AddPost from "./AddPost";
import "./navbarTab.css";
import PostItem from "./PostItem";
import { ThemeContext } from "frontend/contexts/ThemeContext";
import { useNavigate } from "react-router";
import MobileTopHeader from "./MobileTopHeader";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CreateStory from "./CreateStory";
import { toast } from "react-toastify";
import ShowStories from "./ShowStories";
import { getUserOwnStories } from "frontend/redux/slices/lounge";
import { useSelector } from "react-redux";
import { RootState, useDispatch } from "frontend/redux/store";
import StoriesUserOwn from "frontend/components/lounge/StoriesUserOwn";
import { getApiURL } from "frontend/config";

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

const HomeTab = ({ createPost }: Props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { toggle } = useContext(ThemeContext);

  const [value, setValue] = useState(0);
  const [suggestionList, setSuggestionList] = useState([]);
  const [storyList, setStoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const savedUser = JSON.parse(localStorage.getItem("userData") ?? "{}");
  const [showAddPageButton, setShowAddPageButton] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openStoryModal, setOpenStoryModal] = useState<string>("");

  const [widthScreen, setWidthScreen] = useState<number>(window.screen.width);
  const [selectedStory, setSelectedStory] = useState<any>();
  const userData = useSelector((state: RootState) => state.user.userData);
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

  const fetchPosts = async (pagination: PaginationPostsInerface) => {
    if (isLoading || !pagination.hasNext) return;

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
    async (toastId: string, userId: string, fileData: any) => {
      const formData = new FormData();
      formData.append("user", userId);
      formData.append("story", fileData);
      try {
        const result = await _axios.post("/api/user/create-stories/", formData);
        if (result?.data?.data) {
          dispatch(getUserOwnStories());
          setOpenModal(false);
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
        story: objStory.story.replace("http://bedev.dint.com", ""),
      };
      userStoriesItem.story.replace("http://bedev.dint.com", "");
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
  };

  return (
    <Box
      id="postsListScrollableDiv"
      style={
        {
          // borderLeft: `1px solid ${theme.palette.grey[700]}`,
          // borderRight: `1px solid ${theme.palette.grey[700]}`
        }
      }
    >
      {/* <AddPost createPost={createPost} widthScreen={0} /> */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          // margin: "10px 0",
          // padding: "10px 0",
        }}
      >
        {/* <MobileTopHeader /> */}
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
              <div
                style={{ textAlign: "center", width: "fit-content" }}
                className="user-story"
              >
                <div
                  style={{ position: "relative" }}
                  onClick={() => {
                    setOpenModal(true);
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
              <StoriesUserOwn />

              {storyList?.map((item: any, i: number) => (
                <>
                  <div
                    key={i}
                    style={{ textAlign: "center", width: "fit-content" }}
                    className="user-story"
                    onClick={() => {
                      if (item?.user_stories?.length > 0) {
                        setOpenModal(true);
                        setOpenStoryModal("Follower");
                        setSelectedStory(item);
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
                </>
              ))}
              <Modal open={openModal} onClose={handleClose}>
                {openStoryModal === "Follower" ? (
                  <ShowStories
                    widthScreen={widthScreen}
                    item={selectedStory}
                    image={selectedStory?.user_stories}
                    setOpenModal={setOpenModal}
                  />
                ) : (
                  <CreateStory
                    widthScreen={widthScreen}
                    createStory={createNewStory}
                  />
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
                label={`All  (${counts?.all_posts ?? 0})`}
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
                label={`Photos  (${counts?.image_posts ?? 0})`}
              />
              <Tab
                className={`${
                  toggle && value === 3 && "active-tab"
                } custom-tab-list`}
                label={`Videos  (${counts?.video_posts ?? 0})`}
              />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            {posts.map((item) => (
              <PostItem
                fetchPosts={fetchPosts}
                canDeletePost={true}
                key={item?.id}
                description={item?.content}
                createdAt={item?.created_at}
                userName={
                  item?.user
                    ? item?.user?.display_name ||
                      item?.user?.first_name ||
                      item?.user?.custom_username
                    : ""
                }
                custom_username={item?.user ? item?.user?.custom_username : ""}
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
                fetchPosts={fetchPosts}
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
                fetchPosts={fetchPosts}
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
                fetchPosts={fetchPosts}
                canDeletePost={true}
                key={`videoPosts_${i}`}
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
        </Box>
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
              <Typography variant="h5" sx={{ color: "text.secondary" }}>
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
              <div onClick={() => navigate(`/${item?.custom_username}`)}>
                <Box
                  key={i}
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
                    <Typography variant="h6" sx={{ color: "text.secondary" }}>
                      {item?.custom_username}
                    </Typography>
                  </div>
                </Box>
              </div>
            ))}
            <Grid
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
              >
                Dint © 2023
              </Typography>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeTab;
