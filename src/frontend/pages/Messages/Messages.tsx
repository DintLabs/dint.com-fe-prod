import React, { SyntheticEvent, useCallback, useContext, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { Stack } from "@mui/system";

import {
  BsSearch,
  BsPlusLg,
  BsFilterLeft,
  BsFillPencilFill,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ChatSection from "frontend/components/messages/ChatSection";
import UserListItem from "frontend/components/messages/UserListItem";
import { AppDispatch, RootState, useDispatch } from "frontend/redux/store";
import { useParams } from "react-router";
import NewMessage from "frontend/components/messages/NewMessage";
import UserListItemSkeleton from "frontend/components/common/skeletons/UserListItemSkeleton";
import { fetchAllChatsList } from "../../redux/slices/messages";
import { ThemeContext } from "../../contexts/ThemeContext";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Tab } from "@mui/material";
import { Tabs } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import _axios from "frontend/api/axios";

const users = [
  {
    id: 1,
    name: "test",
    profile: null,
    caption: "hello there",
  },
  {
    id: 2,
    name: "Darshan",
    profile: null,
    caption: "Bye",
  },
  {
    id: 3,
    name: "Test3",
    profile: null,
    caption: "hi",
  },
  {
    id: 4,
    name: "Test2",
    profile: null,
    caption: "See you soon",
  },
  {
    id: 5,
    name: "Test2",
    profile: null,
    caption: "See you soon",
  },
  {
    id: 6,
    name: "Test2",
    profile: null,
    caption: "See you soon",
  },
  {
    id: 7,
    name: "Test2",
    profile: null,
    caption: "See you soon",
  },
  {
    id: 8,
    name: "Test2",
    profile: null,
    caption: "See you soon",
  },
  {
    id: 9,
    name: "Test2",
    profile: null,
    caption: "See you soon",
  },
  {
    id: 10,
    name: "Test2",
    profile: null,
    caption: "See you soon",
  },
  {
    id: 11,
    name: "Test2",
    profile: null,
    caption: "See you soon",
  },
  {
    id: 12,
    name: "Test2",
    profile: null,
    caption: "See you soon",
  },
  {
    id: 13,
    name: "Test2",
    profile: null,
    caption: "See you soon",
  },
  {
    id: 14,
    name: "test",
    profile: null,
    caption: "hello there",
  },
  {
    id: 15,
    name: "Darshan",
    profile: null,
    caption: "Bye",
  },
  {
    id: 16,
    name: "Test3",
    profile: null,
    caption: "hi",
  },
  {
    id: 17,
    name: "Test2",
    profile: null,
    caption: "See you soon",
  },
  {
    id: 18,
    name: "Test2",
    profile: null,
    caption: "See you soon",
  },
  {
    id: 19,
    name: "Test2",
    profile: null,
    caption: "See you soon",
  },
  {
    id: 20,
    name: "Test2",
    profile: null,
    caption: "See you soon",
  },
  {
    id: 21,
    name: "Test2",
    profile: null,
    caption: "See you soon",
  },
  {
    id: 22,
    name: "Test2",
    profile: null,
    caption: "See you soon",
  },
  {
    id: 23,
    name: "Test2",
    profile: null,
    caption: "See you soon",
  },
  {
    id: 24,
    name: "Test2",
    profile: null,
    caption: "See you soon",
  },
  {
    id: 25,
    name: "Test2",
    profile: null,
    caption: "See you soon",
  },
  {
    id: 26,
    name: "Test2",
    profile: null,
    caption: "See you soon",
  },
];

const Messages = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();
  const theme = useTheme();

  const { userData } = useSelector((state: RootState) => state.user);
  const allChatsList = useSelector(
    (state: RootState) => state.messages.chatList
  );

  const [selectedUser, setSelectedUser] = useState({ id: -1 });
  const [renderUsers, setRenderUsers] = useState<any>([]);

  const [isAddNewModalOpen, setIsAddNewModalOpen] = React.useState(false);
  const [chatListLoader, setChatListLoader] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState<any>();
  const [newMessage, setNewMessage] = useState<any>([]);

  //  User search related states
  const [isUserSearchOpen, setIsUserSearchOpen] = useState<boolean>(false);
  const [userSearchText, setUserSearchText] = useState<string>("");
  const [value , setValue] = useState(0)
  const [unseenMessages , setUnseenMessages] = useState([])

  const { toggle } = useContext(ThemeContext);

  useEffect(() => {
    setLoggedInUser(userData);
  }, [userData]);

  const handleModalOpen = () => {
    setIsAddNewModalOpen(true);
    navigate("/lounge/messages/newMessage");
  };
  const handleModalClose = () => {
    setIsAddNewModalOpen(false);
    navigate("/lounge/messages");
  };

  // fetching all the chats for logged in user
  useEffect(() => {
    dispatch(fetchAllChatsList()).then((res) => {
      if (res) {
        setChatListLoader(false);
      } else {
        setChatListLoader(false);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (params && "uid" in params && params.uid !== undefined) {
      const paramsNumber = +params.uid;
      const selectedUserData = allChatsList.find(
        (user: any) => user.id === paramsNumber
      );

      if (selectedUserData) {
        setSelectedUser(selectedUserData);
      }
    }
  }, [params, allChatsList]);

  const fetchNext = useCallback(() => {
    console.log("fetch post calls");

    setTimeout(() => {
      setRenderUsers(
        renderUsers.concat(
          users.slice(renderUsers.length, renderUsers.length + 10)
        )
      );
    }, 10000000);
  }, [renderUsers]);


  useEffect(() => {
    fetchNext();
  }, [fetchNext]);

  // to auto focus user serach field
  useEffect(() => {
    if (isUserSearchOpen) {
      document.getElementById("user-search-input")?.focus();
    }
  }, [isUserSearchOpen]);

  useEffect(()=>{
    const getUnseenMessages =async()=>{
      await _axios.get('/api/chat/get-unseen-message/').then((res:any)=>{
        setUnseenMessages(res.data.data)
       }).catch((err:any) =>{console.log(err)})
    }
    getUnseenMessages()
  },[])

  const handleUserSearchOpen = () => {
    setIsUserSearchOpen(true);
  };

  const handleUserSearchClose = () => {
    setIsUserSearchOpen(false);
  };

  const handleClickAwayListener = () => {
    if (userSearchText.trim().length === 0) {
      handleUserSearchClose();
    }
  };

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
        <Stack sx={useMediaQuery("(min-width:899px)")?{
        display:"none"
      }:{ padding:"1% 2%" ,marginTop: '60px' , justifyContent:"space-between" , display:"flex" , flexDirection:"row" }}>
        <Typography sx={{ color:toggle ? "white" : ""}}><ArrowBackIcon onClick={()=>navigate(-1)}/>Dint</Typography>

        <Box>
        <MoreHorizIcon sx={{ color:toggle ? "white" : "black"}} />
        <PostAddIcon sx={{ color:toggle ? "white" : "black"}} onClick={handleModalOpen}  className="cursor-pointer"/>
        </Box>
      </Stack>
       <Stack
        direction="row"
        className="messages-container"
        sx={useMediaQuery("(min-width:899px)") ? {
          margin:"1% 0%" ,
          border:`1px solid #D5D5D5`
          // borderLeft: `1px solid ${theme.palette.grey[700]}`,
          // borderRight: `1px solid ${theme.palette.grey[700]}`,
        } : {border:"0px" ,padding:"1% 2%"}}>
        {/* {/ users list /} */}
        <Box
          className="user-list"
          sx={
            window.innerWidth < 900
              ? params.uid
                ? { width: 0 }
                : { width: "100%" }
              : { width: "35%" , borderRight:"1px solid grey"}
          }>
          {/* {/ messsage header /} */}
          <ClickAwayListener onClickAway={handleClickAwayListener}>
            <Stack
              className="message-header"
              direction="row"
              spacing={1}
              justifyContent="space-between"
              alignItems="center"
              sx={useMediaQuery("(min-width:899px)") ? { p: { xs: 0.5, md: 1, xl: 2 } } : {display:"none"}}
              component="div">
              {isUserSearchOpen ? (
                <TextField
                  id="user-search-input"
                  value={userSearchText}
                  onChange={(e) => {
                    setUserSearchText(e.target.value);
                  }}
                  fullWidth
                  size="small"
                  sx={{
                    "& legend": { display: "none" },
                    "& fieldset": { top: 0 },
                    "& .MuiInputBase-input": {
                      color: toggle ? "white" : "#161C24",
                    },
                  }}
                />
              ) : (
                <Typography
                  sx={{width:"100%" , textAlign:'center' , color:toggle ? "white" : ""}}
                  className="capitalize-text notranslate"
                  variant="subtitle1">
                  Dint
                  {/* <ExpandMoreIcon /> */}
                </Typography>
              )}
              <Stack direction="row" spacing={2} alignItems="center">
                <IconButton sx={{ color:toggle ? "white" : "black"}} size="small" onClick={handleUserSearchOpen}>
                  <BsSearch className="cursor-pointer" />
                </IconButton>
                <IconButton size="small" onClick={handleModalOpen}>
                  {/* <BsPlusLg className="primary-text-color cursor-pointer" /> */}
                  <PostAddIcon sx={{ color:toggle ? "white" : "black" }} className="cursor-pointer"/>
                </IconButton>
                {isAddNewModalOpen && (
                  <NewMessage
                    open={isAddNewModalOpen}
                    handleClose={handleModalClose}
                  />
                )}
              </Stack>
            </Stack>
          </ClickAwayListener>
          <Stack sx={useMediaQuery("(min-width:899px)")
                ?{display:"none"} :{margin:"1%"}} >
          <TextField
              value={''}
              fullWidth
              size="small"
              placeholder="Search"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{
                "& legend": { display: "none" },
                "& fieldset": { top: 0 },
                "& .MuiInputBase-input": {
                  color: toggle ? "white" : "#161C24",
                },
                background:toggle ? "black" :'#F7F6F6',
                borderRadius:"10px"
          }}/>
          <Stack direction="row">
            <Box sx={{ margin:"1%" ,maxWidth:"min-content",textAlign:"center", position:"relative"}}>
              <Avatar src={userData?.profile_image} sx={{ height:"60px" , width:"60px" , border:"4px solid #4AA081"}} />
              <AddIcon sx={{ background:"#4AA081",top:"0%" , left:"65%", position:"absolute" , borderRadius:"50px"}}/>
              <Typography sx={{ color:toggle ? "white" : ""}}>{userData?.display_name}</Typography>
            </Box>

            {allChatsList.map((user: any) => {
              return (
                <>
                  <Box key={user.id} sx={{margin:"1%" , textAlign:"center" , maxWidth:"min-content"}}>
                    <Avatar src={user.profile_image} sx={{ height:"60px" , width:"60px"}} />
                    <Typography sx={{ color:toggle ? "white" : ""}}>{user.display_name}</Typography>
                   </Box>
                </>
                )
            }
            )}
              </Stack>
          </Stack>

          <Divider sx={useMediaQuery("(min-width:899px)") ? {} :{display:"none"}} />
          <Stack
            // direction="row"
            spacing={1}
            // justifyContent="space-between"
            // alignItems="center"
            // sx={{ p: { xs: 0.5, md: 1, xl: 2 } }}
            >
            {useMediaQuery("(min-width:899px)") ?
            <Box
            sx={{
              '& .Mui-selected': {
                color: '#4aa081 !important'
              },
              '& .MuiTabs-indicator': {
                background:'#4aa081',
                borderRadius: '4px'
              }
            }}>
            <Typography sx={{ color:toggle ? "white" : "" , padding:"3%" , textAlign:"center" , fontWeight:"bold"}}>General</Typography>
              {/* <Tabs value={value} onChange={handleChange} sx={{width:"100%",justifyContent:"center" , color:"black"}}> */}
                {/* <Tab sx={{width:"33%"}}label={'Primary'}/> */}
                {/* <Tab sx={{width:"100%"}}label={'General'}/> */}
                {/* <Tab sx={{width:"33%"}}label={'Requests'}/> */}
              {/* </Tabs> */}
            </Box>
            :<Box sx={{display:"flex" , justifyContent:"left" , margin:'2%'}}>
              {/* <Typography sx={{padding:"3px 3%" , borderRadius:"20px" , background:"#EFEFEF"}}>Primary</Typography> */}
              <Typography sx={{ padding:"3px 3%" , borderRadius:"20px" ,background:"#EFEFEF"}}>General</Typography>
              <Typography onClick={handleModalOpen}  sx={{ color:toggle ? "white" : "" , padding:"3px 3%" ,margin:"0% 3%", borderRadius:"20px" ,border:"1px solid "}}>+ New Message</Typography>
              {/* <Typography sx={{padding:"3px 3%" , borderRadius:"20px" ,border:"1px solid black"}}>Requests</Typography> */}
            </Box>
          }
            {/* <Stack direction="row" spacing={2} alignItems="center">
              <IconButton size="small">
                <BsFilterLeft
                  className="secondary-text-color cursor-pointer"
                  fontSize={22}
                />
              </IconButton>
            </Stack> */}
          </Stack>
          <Divider sx={useMediaQuery("(min-width:899px)") ? {} :{display:"none"}} />


          {chatListLoader ? (
            <>
              <UserListItemSkeleton />
              <UserListItemSkeleton />
              <UserListItemSkeleton />
              <UserListItemSkeleton />
              <UserListItemSkeleton />
              <UserListItemSkeleton />
              <UserListItemSkeleton />
            </>
          ) : allChatsList.length === 0 ? (
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 5 }}
              className="secondary-text-color">
              Please add new user
            </Stack>
          ) : (
            <Box className="users">
              <Stack direction="column">
                {allChatsList.map((user: any) => (
                  <UserListItem
                    isSelected={selectedUser.id === user.id}
                    key={user.id}
                    id={user.id}
                    profile={user.profile_image}
                    name={user.display_name || user.custom_username}
                    // caption={newMessage?.chat_room === user.chat_room ? newMessage?.content : user?.latest_message?.content || ""}
                    caption={user?.latest_message?.content || ""}
                    newMessage={newMessage}
                    chatRoom={user.chat_room}
                    unseenMessages={unseenMessages}
                  />
                ))}
              </Stack>
            </Box>
          )}
        </Box>

        {/* {/ chat section /} */}
        <ChatSection
          selectedUser={selectedUser}
          loggedInUser={loggedInUser}
          setNewMessage={setNewMessage}
        />
      </Stack>
    </>
  );
};

export default Messages;
