import { Box, Divider, Stack, Typography, useMediaQuery } from "@mui/material";
import { AppDispatch, RootState } from "frontend/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _axios from "frontend/api/axios";
import { fetchAllChatsList } from "frontend/redux/slices/messages";
import { Avatar } from "@mui/material";

const NotificationsContainer = () => {
  const [userChats, setUserChats] = useState<any>([]);
  const [chatListLoader, setChatListLoader] = useState(true);
  let pageData = useSelector((state: RootState) => state?.messages?.chatList);
  let userId: any = JSON.parse(localStorage.getItem("userData"));
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    console.log("pageData ----------------- ", pageData);

    console.log("userId --- ", userId);
    let data = pageData.filter((data: any) => {
      return data?.latest_message?.reciever?.id === userId.id;
    });
    console.log("data ----------------- ", data);
    fetchUserChat();
  }, []);

  const fetchUserChat = async () => {
    let allMessages = [];
    for (let i = 0; i < pageData.length; i++) {
      const { data } = await _axios.get(
        `api/chat/get-chat-by-user/${pageData[i].id}/`
      );
      console.log("data ---- ", data);

      allMessages.push(...data.data)
      setUserChats(allMessages);
      setChatListLoader(false);
    }
  };
  return (
    <Stack sx={useMediaQuery("(min-width:900px)") ? { margin: "2% 0%" } : {marginTop:"5%"}}>
      {console.log("userChats ---- ",userChats)}
      <Typography variant="h2" component="h2">
        Notifications
      </Typography>
      <Divider />
      <Box  sx={{margin:"2%"}}>
        <Box  sx={{margin:"2% 0%"}}>
          <Typography variant="h4">Latest</Typography>
          <Divider />
          <Box>
            <Box sx={{display:"flex" , margin:"1% 0%" , alignItems:"center" , }}>
              <Avatar/>
              <Typography sx={{margin:"0% 1%"}}>New user has started following you</Typography>
            </Box>
            <Box sx={{display:"flex" , margin:"1% 0%" , alignItems:"center" , }}>
              <Avatar/>
              <Typography sx={{margin:"0% 1%"}}>New user has started following you</Typography>
            </Box>
            <Box sx={{display:"flex" , margin:"1% 0%" , alignItems:"center" , }}>
              <Avatar/>
              <Typography sx={{margin:"0% 1%"}}>New user has started following you</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{margin:"2% 0%"}}>
          <Typography variant="h4">Latest</Typography>
          <Box>
            <Box sx={{display:"flex" , margin:"1% 0%" , alignItems:"center" , }}>
              <Avatar/>
              <Typography sx={{margin:"0% 1%"}}>New user has started following you</Typography>
            </Box>
            <Box sx={{display:"flex" , margin:"1% 0%" , alignItems:"center" , }}>
              <Avatar/>
              <Typography sx={{margin:"0% 1%"}}>New user has started following you</Typography>
            </Box>
            <Box sx={{display:"flex" , margin:"1% 0%" , alignItems:"center" , }}>
              <Avatar/>
              <Typography sx={{margin:"0% 1%"}}>New user has started following you</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{margin:"2% 0%"}}>
          <Typography variant="h4">Earlier</Typography>
          <Box>
            <Box sx={{display:"flex" , margin:"1% 0%" , alignItems:"center" , }}>
              <Avatar/>
              <Typography sx={{margin:"0% 1%"}}>New user has started following you</Typography>
            </Box>
            <Box sx={{display:"flex" , margin:"1% 0%" , alignItems:"center" , }}>
              <Avatar/>
              <Typography sx={{margin:"0% 1%"}}>New user has started following you</Typography>
            </Box>
            <Box sx={{display:"flex" , margin:"1% 0%" , alignItems:"center" , }}>
              <Avatar/>
              <Typography sx={{margin:"0% 1%"}}>New user has started following you</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default NotificationsContainer;
