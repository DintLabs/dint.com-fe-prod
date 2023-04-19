import React, { useState, useContext, useEffect, memo } from "react";
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
import { FiMoreVertical } from "react-icons/fi";
import { MdSend } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import { AiOutlineLeft } from "react-icons/ai";

import { FlexRow } from "frontend/reusable/reusableStyled";
import { sendMessage } from "frontend/redux/slices/messages";
import { useDispatch } from "frontend/redux/store";
import MessageList from "./MessageList";
import TipPopUp from "../tip/TipPopUp";
import { ThemeContext } from "../../contexts/ThemeContext";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import NewMessage from "frontend/components/messages/NewMessage";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import AddChatMedia from "frontend/pages/Lounge/AddChatMedia";
import { HOME_SIDE_MENU, setNewHomeSliceChanges } from '../../redux/slices/newHome';

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

  const [isChatLoading, setIsChatLoading] = React.useState<boolean>(true);
  const [isSendLoading, setIsSendLoading] = React.useState<boolean>(false);

  const [openPopUpTip, setOpenPopUpTip] = useState<boolean>(false);

  const [userChats, setUserChats] = useState<any>([]);
  const [messageContent, setMessageContent] = useState("");
  const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false);
  const [openMedia, setOpenMedia] = useState(false);

  useEffect(() => {
    ws = new WebSocket(
      `${process.env.REACT_APP_WSS}/ws/chat/${props.selectedUser.chat_room}/`
    );

    ws.onmessage = function (e: any) {
      try {
        const { message, type } = JSON.parse(e.data);
        if (type === 'notification') { // skip notification event
          return;
        }

        if (userChats.every((e: any) => e.id !== message.id)) {
          setUserChats((prev: any) => [message, ...prev]);
          props.setNewMessage((prev: any) => [message, ...prev]);
        }
      } catch (error) {
        console.error('Error in ws.onmessage: ', error);
      }
    };

    if (props.selectedUser.id > 0) {
        _axios.get(`api/chat/get-chat-by-user/${props.selectedUser.id}`)
          .then(({ data }: { data: any }) => {
            setUserChats(data.data);
            setIsChatLoading(false);
          })
          .catch((error: Error) => {
            console.error('Error while loading chat:', error.message)
          });
    }

    return () => {
      ws.close();
    };
  }, [props.selectedUser]);

  const sendMessageHandler = async (attachedMediaUrl?: string) => {
    const hasMessage = messageContent.trim().length > 0 || attachedMediaUrl?.length;
    const chatSelected = props.selectedUser.id !== -1;
    const loggedIn = !!props.loggedInUser.id;

    if (loggedIn && chatSelected && hasMessage && !isSendLoading) {
      setIsSendLoading(true);

      const res = await dispatch(
        sendMessage({
          reciever: props.selectedUser.id.toString(),
          sender: props.loggedInUser.id.toString(),
          content: messageContent.trim(),
          media: attachedMediaUrl || '',
        })
      );
      if (res) {
        ws.send(JSON.stringify(res));
      }
    }

    setIsSendLoading(false);
    setMessageContent('');
  };

  const handleModalOpen = () => {
    setIsAddNewModalOpen(true);
    navigate("/lounge/messages/newMessage");
  };

  const handleModalClose = () => {
    setIsAddNewModalOpen(false);
    navigate("/lounge/messages");
  };

  const onOpenMedia = () => {
    setOpenMedia(!openMedia);
  };

  return (
    <>
      <TipPopUp
        user={props.selectedUser}
        onClose={() => setOpenPopUpTip(false)}
        open={openPopUpTip}
      />

      <AddChatMedia
        openMedia={openMedia}
        onOpenMedia={onOpenMedia}
        sendMessageHandler={sendMessageHandler}
      />

      {props?.selectedUser?.id !== -1 ? (
        <Box
          className="chat-section chat-container"
          sx={
            window.innerWidth < 900
              ? params.uid
                ? { width: "100%" }
                : { width: 0 }
              : { width: "65%" }
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
                <Typography
                  className={props.selectedUser?.display_name ? 'primary-text-color' : ''}
                  sx={{ cursor: 'pointer', color: '#4AA081' }}
                  onClick={() => {
                    dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.HOME }));
                    navigate(`/${props.selectedUser?.custom_username}`);
                  }}
                >
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
            loggedInUser={props.loggedInUser}
            chatListLoader={isChatLoading}
            userChats={userChats}
          />

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
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
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
            {/*<IconButton onClick={onOpenMedia}>*/}
            {/*  <PermMediaIcon />*/}
            {/*</IconButton>*/}

            <FlexRow
              p="8px 0 8px 8px"
              onClick={() => setOpenPopUpTip(true)}
              ai="center"
              cursor="pointer">
              <MonetizationOnIcon />
            </FlexRow>

            <IconButton onClick={() => sendMessageHandler()}>
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
          width="60%"
        >
          <IconButton
            sx={{
              color: toggle ? 'white' : '#161C24',
              border: '1px solid',
              padding: '2%',
            }}
          >
            <SendIcon sx={{ height: '3vw', width: '3vw', transform: 'rotate(-20deg)' }} />
          </IconButton>
          <Typography variant="h2" color={toggle ? 'white' : '#161C24'}>
           Your Messages
          </Typography>
          <Typography className="secondary-text-color">
            Send private message or photos to your friends
          </Typography>

          <Button
            onClick={handleModalOpen}
            sx={{
              background: '#EFEFEF',
              color: 'black',
              padding: '10px 20px',
            }}
          >
            Send Message
          </Button>

          {isAddNewModalOpen && (
            <NewMessage
              open={isAddNewModalOpen}
              handleClose={handleModalClose}
            />
          )}
        </Stack>
      ) : null}
    </>
  );
}

export default memo(ChatSection);
