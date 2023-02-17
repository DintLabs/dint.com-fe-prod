import { useState, useContext, useEffect, memo } from "react";
import _axios from "frontend/api/axios";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import {
  Avatar,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { BsChatLeftTextFill } from "react-icons/bs";
import { FiMoreVertical } from "react-icons/fi";
import { MdSend } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import { AiOutlineLeft } from "react-icons/ai";

import { FlexRow } from "frontend/reusable/reusableStyled";
import { sendMessage } from "frontend/redux/slices/messages";
import { RootState, useDispatch, useSelector } from "frontend/redux/store";
import MessageList from "./MessageList";
import TipPopUp from "../tip/TipPopUp";
import { ThemeContext } from "../../contexts/ThemeContext";
import { fetchAllChatsList } from "../../redux/slices/messages";
import SendIcon from '@mui/icons-material/Send';
import { Button } from "@mui/material";

let ws: any;

type ChatSectionProps = {
  selectedUser: any;
  loggedInUser: any;
  setNewMessage: any;
};

function ChatSection(props: ChatSectionProps) {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toggle } = useContext(ThemeContext);
  const [chatListLoader, setChatListLoader] = useState(true);


  const [openPopUpTip, setOpenPopUpTip] = useState<boolean>(false);

  const { messagesList } = useSelector((state: RootState) => state.messages);
  const [userChats, setUserChats] = useState<any>([]);
  const [messageContent, setMessageContent] = useState("");

  useEffect(() => {
    ws = new WebSocket(
      `wss://bedev.dint.com/ws/chat/${props.selectedUser.chat_room}/`
    );

    const fetchUserChat = async () => {
      if (props.selectedUser.id > 0) {
        try {
          const { data } = await _axios.get(
            `api/chat/get-chat-by-user/${props.selectedUser.id}`
          );

          setUserChats(data.data);
          setChatListLoader(false);
        } catch (err: any) {
          console.error("err ===>", err.message);
        }
      }
    };

    ws.onmessage = function (e: any) {
      const newdata = JSON.parse(e.data);
      setUserChats((prev: any) => [newdata.message, ...prev]);
      props.setNewMessage((prev: any) => [newdata.message, ...prev]);
    };
    fetchUserChat();

    return () => {
      ws.close(); 
    };
  }, [props.selectedUser]);

  const sendMessageHandler = async () => {
    if (
      messageContent.trim().length > 0 &&
      props.selectedUser.id !== -1 &&
      props.loggedInUser.id
    ) {
      const res = await dispatch(
        sendMessage({
          reciever: props.selectedUser.id.toString(),
          sender: props.loggedInUser.id.toString(),
          content: messageContent.trim(),
        })
      );
      if (res) {
        ws.send(JSON.stringify(res));
      }
    }
    setMessageContent("");
  };

  const handleClickOpen = () => {
    setOpenPopUpTip(true);
  };

  const handleClose = () => {
    setOpenPopUpTip(false);
  };



  return (
    <>
      <TipPopUp
        user={props.selectedUser}
        onClose={handleClose}
        setOpenPopUpTip={setOpenPopUpTip}
        onOpen={handleClickOpen}
        openPopUpTip={openPopUpTip}
      />
      {props?.selectedUser?.id !== -1 ? (
        <Box
          className="chat-section chat-container"
          sx={
            window.innerWidth < 900
              ? params.uid
                ? { width: "100%" }
                : { width: 0 }
              : { width: "60%" }
          }>
          {/* {/ Header /} */}
          <Stack
            className="chat-header"
            direction="row"
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
            sx={{ p: { xs: 0.5, md: 1, xl: 2 } }}>
            <Stack direction="row" spacing={1} alignItems="center">
              {window.innerWidth < 900 ? (
                <AiOutlineLeft
                  className="primary-text-color"
                  onClick={() => {
                    navigate("/lounge/messages");
                  }}
                />
              ) : null}
              <Avatar src={props.selectedUser?.profile_image} />
              <Stack direction="column">
                <Typography className="primary-text-color">
                  {props.selectedUser?.display_name ||
                    props.selectedUser?.custom_username}
                </Typography>
                <Typography variant="caption" className="secondary-text-color">
                  {/* {/ online /} */}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <IconButton size="small">
                <FiMoreVertical className="primary-text-color cursor-pointer" />
              </IconButton>
            </Stack>
          </Stack>
          <Divider />
          {/* {/ Message list /} */}

          <MessageList
            messages={messagesList}
            loggedInUser={props.loggedInUser}
            userChats={userChats}
            chatListLoader={chatListLoader}
          />

          {/* {/ footer /} */}

          <Stack
            direction="row"
            className="message-input"
            sx={{ p: { xs: 1, md: 1, xl: 1 } }}
            style={{ backgroundColor: toggle ? "#161C24" : "#dfe3e8" }}>
            <TextField
              value={messageContent}
              fullWidth
              size="small"
              placeholder="Enter message..."
              onChange={(e) => {
                setMessageContent(e.target.value);
              }}
              // onKeyDown={(e) => {
              //   if (e.code === "Enter") {
              //     sendMessageHandler();
              //   }
              // }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendMessageHandler();
                }
              }}
              sx={{
                "& legend": { display: "none" },
                "& fieldset": { top: 0 },
                "& .MuiInputBase-input": {
                  color: toggle ? "white" : "#161C24",
                },
              }}
            />
            <FlexRow
              p="8px 0 8px 8px"
              onClick={() => handleClickOpen()}
              ai="center"
              cursor="pointer">
              <MonetizationOnIcon />
            </FlexRow>
            <IconButton onClick={sendMessageHandler}>
              <MdSend />
            </IconButton>
          </Stack>
        </Box>
      ) : window.innerWidth > 900 ? (
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          className="chat-section"
          spacing={2}
          width="60%">
          {/* <BsChatLeftTextFill fontSize={50} /> */}
          <IconButton sx={{color:"black" , border:"1px solid" , padding:"2%"}}>
            <SendIcon sx={{height:"3vw" , width:"3vw" , transform:"rotate(-20deg)"}}/>
          </IconButton>
          <Typography variant="h2">
           Your Messages
          </Typography>
          <Typography className="secondary-text-color">
            Send private message or phots to your friends
          </Typography>
          <Button 
          sx={{
            background: '#EFEFEF',
            color: 'black',
            padding: '10px 20px',
          }} >
            Send Message
          </Button>
        </Stack>
      ) : null}
    </>
  );
}

export default memo(ChatSection);
