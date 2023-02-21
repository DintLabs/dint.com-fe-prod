import { Box, Divider, Stack, Typography, useMediaQuery } from "@mui/material";
import { AppDispatch, RootState } from "frontend/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _axios from "frontend/api/axios";
import { fetchAllChatsList } from "frontend/redux/slices/messages";
import { Avatar } from "@mui/material";

const NotificationsContainer = () => {
  const [ notifications , setNotifications ] = useState([]);
  let userId: any = JSON.parse(localStorage.getItem("userData"));
  const dispatch: AppDispatch = useDispatch();

  useEffect(()=>{
    const getUnseenMessages =async()=>{
      await _axios.get('/api/chat/get-unseen-message/').then((res:any)=>{
          setNotifications(res.data.data)
       }).catch((err:any) =>{console.log(err)})
    }
    getUnseenMessages()
  },[])
  return (
    <Stack sx={useMediaQuery("(min-width:900px)") ? { margin: "2% 0%" } : {marginTop:"5%"}}>

      <Typography variant="h2" component="h2">
        Notifications
      </Typography>
      <Divider />
      <Box  sx={{margin:"2%"}}>
        <Box  sx={{margin:"2% 0%"}}>
          <Typography variant="h4">Latest</Typography>
          <Divider />
          <Box>
            {notifications.length > 0 ? notifications.map((notif) => {
              return (<Box sx={{display:"flex" , margin:"1% 0%" , alignItems:"center" , }}>
              <Avatar/>
              <Typography sx={{margin:"0% 1%"}}>{notif.sender?.display_name} has send you a message</Typography>
            </Box>)
            }) : <Typography sx={{margin:"auto",textAlign:"center" , padding:"5%"}}>You have no new notifications</Typography>}
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default NotificationsContainer;
