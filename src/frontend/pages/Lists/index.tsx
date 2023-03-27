import * as React from "react";
import {
  Avatar,
  Grid,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Submenu from "frontend/components/submenu";
import GridWithBoxConteiner from "frontend/reusable/GridWithBoxConteiner";
import { FlexCol, FlexRow } from "frontend/reusable/reusableStyled";
import SortIcon from "@mui/icons-material/Sort";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useEffect, useMemo, useState } from "react";
import _axios from "frontend/api/axios";
import { RootState, AppDispatch } from "frontend/redux/store";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import PlaceHolder from "../../assets/img/web3/images.jpeg";
import { getSubscriptionsForUser } from "frontend/redux/slices/subscriptions";
const PopupStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};
const PopupInnerContant = {
  position: "relative",
  "& h4": { color: "#ffffff", marginBottom: "25px" },
  "& .SaveBTN": { textAlign: "end", marginTop: "8px" },
  "& form": {
    "& .MuiFormControl-root.MuiTextField-root": { width: "100%" },
    "& label": {
      backgroundColor: "#212b36",
      paddingLeft: "5px",
      paddingRight: "5px",
    },
  },
};
const DeleteBtnWrapper = {
  "& svg": {
    color: "#ff0000",
    opacity: "0",
    "& path": {
      transition: "all 0.5s ease",
    },
    "&:hover": {
      color: "#ff0000",
      "& path": {
        // transition: "all 0.5s ease",
        d: "path('M 6 19 c 0 1.1 0.9 2 2 2 h 8 c 1.1 0 2 -0.9 2 -2 V 7 H 6 v 12 Z M 19 2 h -3.5 l -1 -1 h -5 l -1 1 H 5 v 2 h 14 V 4 Z')",
      },
    },
  },
};
const FollowingAvatarListWrapper = {
  display: "flex",
  alignItems: "center",
  "& .MuiAvatar-circular": {
    border: "1px solid #000000",
  },
  "& .AvatarWrapper": {
    ml: "-20px",
    transition: "all 0.5s ease",
    "&:first-of-type": { ml: "0" },
    "&:hover": { transform: "translateX(-10px)" },
  },
};
const Lists = () => {
  const userData = useSelector((state: any) => state.user);
  const allSubscriptions = useSelector(
    (state: RootState) => state?.subscriptions?.allSubscriptions?.data
  );
  const theme = useTheme();
  const confineUser = userData?.confineData;
  const navigate = useNavigate();
  const location = useLocation();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const goToProfile = () => {
    // navigate(`/${data?.follower?.custom_username}`);
  };
  const obj: any = {
    name: "",
    user: userData?.userData?.id,
  };

  const [user, setUser] = React.useState<any>(obj);

  const [userList, setUserList] = useState([]);
  const [newList, setNewList] = useState({});
  // const [confineUser, setConfineUser] = useState([]);
  const [allFollowing, setAllFollowing] = useState<any>([]);
  const [closeFriend, setCloseFriend] = useState<any>([]);
  const [allCloseFriend, setAllCloseFriend] = useState<any>([]);
  const [bookmarks, setBookmarks] = useState([]);
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    if (userData?.userData?.id) {
      dispatch(getSubscriptionsForUser(userData?.userData?.id)).then((res: boolean) => {
      });
    }
  }, [dispatch, userData?.userData?.id]);

  const handleChange = ({ target: { value, name } }: any) => {
    const newUser = { ...user };
    newUser[name] = value;
    newUser["user"] = userData?.userData?.id;
    setUser({ ...newUser });
  };

  const handleSubmit = async () => {
    await _axios
      .post(`${process.env.REACT_APP_API_URL}/api/user-list/`, user)
      .then((response: any) => {
        setNewList({ ...response.data });
        handleClose();
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const getUserList = async () => {
    _axios
      .get(`${process.env.REACT_APP_API_URL}api/user-list/`)
      .then((response: any) => {
        setUserList([...response.data] as any);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    getUserList();
  }, [newList]);

  const onSelect = async (user: any) => {
    if (user.id) {
      await _axios
        .delete(`/api/user-list/${user.id}`, user.id)
        .then((response: any) => {
          getUserList();
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };
  // const fetchConfineData = async () => {
  //   try {
  //     const { data } = await _axios.get(`api/confine-user`);

  //     setConfineUser(data);
  //   } catch (err: any) {
  //     console.error("err ===>", err.message);
  //   }
  // };

  // React.useEffect(() => {
  //   fetchConfineData();
  // }, [newList]);

  const fetchFollowingData = async () => {
    setAllFollowing(userData?.following);
  };
  React.useEffect(() => {
    fetchFollowingData();
  }, [userData]);

  const filteredRestrictedUser = useMemo(()=> confineUser?.filter((confineUser: any) => confineUser.user_block_type === "restrict"),[confineUser])


  const filteredBlockedUser = useMemo(()=> confineUser?.filter((confineUser: any) => confineUser.user_block_type === "block"),[confineUser])

  const fetchCloseFriend = async () => {
    try {
      const { data } = await _axios.get(`api/user/get-close-friends/`);

      setCloseFriend(data.data);
    } catch (err: any) {
      console.error("err ===>", err.message);
    }
  };
  useEffect(() =>{
    fetchCloseFriend();
  },[]);
console.log("Close friends", closeFriend);
  const fetchUserBoookmarks = async () => {
    try{
      const { data }: any = await _axios.get(`/api/user/get-user-bookmarks/`);
      if(data?.data?.length){
        // setBookmarkups(bookMarkedPost)
        setBookmarks(data.data)
      }
    } catch(err){
      console.log("err", err);
    }
  }

  useEffect(()=>{
    fetchUserBoookmarks()
  },[])
  const filterCloseFriendData = (allFollowing: any, closeFriend: any) => {

    let res = [];
    res = allFollowing?.filter((el: any) => {
      return closeFriend?.find((element: any) => {
        return element.close_friend === el.id;
      });
    });
    setAllCloseFriend(res);
    return res;
  };

  useEffect(() => {
    filterCloseFriendData(allFollowing, closeFriend);
  }, [allFollowing, closeFriend]);

  return (
    <>
      <Grid container md={8}>
        <>
          {isLargeScreen ? (
            <Submenu
              handleOpen={handleOpen}
              handleClose={handleClose}
              title="Lists"
              username=""
              routes={[]}
              md={12}
              isPlusIco
            />
          ) : (
            <>
              {location.pathname !== `/settings` && (
                <IconButton onClick={() => navigate(-1)}>
                  <IoMdArrowRoundBack className="primary-text-color cursor-pointer" />
                </IconButton>
              )}
            </>
          )}
        </>

        <Grid container sx={{ position: "relative" }}>
          <GridWithBoxConteiner sx={{ borderBottom: "none" }}>
            <FlexRow w="100%" jc="space-between" ai="center">
              <Typography
                className="primary-text-color"
                variant="caption"
                sx={{ fontWeight: "bold", fontSize: "13px" }}
              >
                CUSTOM LISTS
              </Typography>

              <SortIcon />
            </FlexRow>
          </GridWithBoxConteiner>

          <GridWithBoxConteiner  onClick={() => navigate("/close-friends", {state: {allCloseFriend:closeFriend } })}>
            <FlexCol>
              <Typography
                className="primary-text-color typo-label"
                variant="subtitle2"
              >
                Close Friends
              </Typography>
              <Typography
                className="primary-text-color typo-label"
                variant="caption"
              >
                {closeFriend?.length || 0} person
              </Typography>
            </FlexCol>
            <Box sx={FollowingAvatarListWrapper}>
              {allCloseFriend?.slice(0, 6).map((following: any, ind: any) => {
                return (
                  <Box className="AvatarWrapper" key={ind}>
                    <Avatar
                      onClick={goToProfile}
                      src={
                        following?.profile_image
                          ? following?.profile_image
                          : PlaceHolder
                      }
                      sx={{ width: 40, height: 40, cursor: "pointer" }}
                    />
                  </Box>
                );
              })}
            </Box>
          </GridWithBoxConteiner>

          <GridWithBoxConteiner
            onClick={() => {
              // dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.SUBSCRIPTIONS }));
              navigate("/lounge/subscriptions");
            }}
          >
            <FlexCol>
              <Typography
                className="primary-text-color typo-label"
                variant="subtitle2"
              >
                Subscriptions
              </Typography>
              <Typography
                className="primary-text-color typo-label"
                variant="caption">
                {allSubscriptions?.length} Subscriptions
              </Typography>
            </FlexCol>
          </GridWithBoxConteiner>

          <GridWithBoxConteiner onClick={() => navigate("/lounge/following")}>
            <FlexCol>
              <Typography
                className="primary-text-color typo-label"
                variant="subtitle2"
              >
                Following
              </Typography>
              <Typography
                className="primary-text-color typo-label"
                variant="caption"
              >
                {userData?.following?.length} person
              </Typography>
            </FlexCol>
            <Box sx={FollowingAvatarListWrapper}>
              {allFollowing?.slice(0, 6).map((following: any, ind: any) => {
                return (
                  <Box className="AvatarWrapper" key={ind}>
                    <Avatar
                      onClick={goToProfile}
                      src={
                        following?.profile_image
                          ? following?.profile_image
                          : PlaceHolder
                      }
                      sx={{ width: 40, height: 40, cursor: "pointer" }}
                    />
                  </Box>
                );
              })}
            </Box>
          </GridWithBoxConteiner>

          <GridWithBoxConteiner
            onClick={() => {
              navigate("/followers");
            }}
          >
            <FlexCol>
              <Typography
                className="primary-text-color typo-label"
                variant="subtitle2"
              >
                Followers
              </Typography>
              <Typography
                className="primary-text-color typo-label"
                variant="caption"
              >
                {userData?.follower?.length} person
              </Typography>
            </FlexCol>
          </GridWithBoxConteiner>

          <GridWithBoxConteiner onClick={() => navigate("/bookmarks")}>
            <FlexCol>
              <Typography
                className="primary-text-color typo-label"
                variant="subtitle2"
              >
                Bookmarks
              </Typography>
              <Typography
                className="primary-text-color typo-label"
                variant="caption"
              >
                {bookmarks.length || 0 } Post
              </Typography>
            </FlexCol>
          </GridWithBoxConteiner>

          <GridWithBoxConteiner
            onClick={() =>
              navigate("/restrictedlist", {
                state: { restictedUsers: filteredRestrictedUser },
              })
            }
          >
            <FlexCol>
              <Typography
                className="primary-text-color typo-label"
                variant="subtitle2"
              >
                Restricted
              </Typography>
              <Typography
                className="primary-text-color typo-label"
                variant="caption"
              >
                {filteredRestrictedUser?.length} person
              </Typography>
            </FlexCol>
          </GridWithBoxConteiner>

          <GridWithBoxConteiner
            onClick={() =>
              navigate("/blockedlist", {
                state: { blockedUsers: filteredBlockedUser },
              })
            }
          >
            <FlexCol>
              <Typography
                className="primary-text-color typo-label"
                variant="subtitle2"
              >
                Blocked
              </Typography>
              <Typography
                className="primary-text-color typo-label"
                variant="caption"
              >
                {filteredBlockedUser?.length} person
              </Typography>
            </FlexCol>
          </GridWithBoxConteiner>
          {userList.map((user: any, ind) => {
            return (
              <>
                <GridWithBoxConteiner key={ind}>
                  <FlexCol
                    className="custom_list"
                    onClick={() =>
                      navigate("/userlist", {
                        state: { name: user.name, list: user.id },
                      })
                    }
                  >
                    <Typography
                      className="primary-text-color typo-label"
                      variant="subtitle2"
                    >
                      {user.name}
                    </Typography>
                    <Typography
                      className="primary-text-color typo-label"
                      variant="caption"
                    >
                      {user.people} person
                    </Typography>
                  </FlexCol>
                  <Box
                    sx={DeleteBtnWrapper}
                    onClick={() => {
                      onSelect(user);
                    }}
                  >
                    <DeleteIcon />
                  </Box>
                </GridWithBoxConteiner>
              </>
            );
          })}
          {/* <Routes>
          <Route
            path="/"
            element={isLargeScreen ? <></> : <Submenu title="Lists" username="" routes={[]} />}
          />
          Main routers
          <Route path="/bookmarks/all-bookmarks" element={<ProfileSettings />} />
        </Routes> */}
          {/* </Grid> */}
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={PopupStyle}>
            <Box sx={PopupInnerContant}>
              <Typography component="h4">Create New List</Typography>
              <Box component={"form"}>
                <TextField
                  onChange={handleChange}
                  label="Enter List Name"
                  type="text"
                  name="name"
                  value={user.name}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
              <Box className="SaveBTN">
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Save</Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Lists;
