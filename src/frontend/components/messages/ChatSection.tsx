import { useState, useContext } from 'react';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Avatar, Divider, IconButton, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { BsChatLeftTextFill } from 'react-icons/bs';
import { FiMoreVertical } from 'react-icons/fi';
import { MdSend } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router';
import { AiOutlineLeft } from 'react-icons/ai';

import { FlexRow } from 'frontend/reusable/reusableStyled';
import { sendMessage } from 'frontend/redux/slices/messages';
import { RootState, useDispatch, useSelector } from 'frontend/redux/store';
import MessageList from './MessageList';
import TipPopUp from '../tip/TipPopUp';
import { ThemeContext } from '../../contexts/ThemeContext';

type ChatSectionProps = {
  selectedUser: any;
  loggedInUser: any;
};

function ChatSection(props: ChatSectionProps) {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toggle } = useContext(ThemeContext);

  const [openPopUpTip, setOpenPopUpTip] = useState<boolean>(false);

  const { messagesList } = useSelector((state: RootState) => state.messages);

  const [messageContent, setMessageContent] = useState('');

  const sendMessageHandler = () => {
    if (messageContent.trim().length > 0 && props.selectedUser.id !== -1 && props.loggedInUser.id) {
      dispatch(
        sendMessage({
          reciever: props.selectedUser.id.toString(),
          sender: props.loggedInUser.id.toString(),
          content: messageContent.trim()
        })
      );
    }
    setMessageContent('');
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
                ? { width: '100%' }
                : { width: 0 }
              : { width: '60%' }
          }
        >
          {/* Header */}
          <Stack
            className="chat-header"
            direction="row"
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
            sx={{ p: { xs: 0.5, md: 1, xl: 2 } }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              {window.innerWidth < 900 ? (
                <AiOutlineLeft
                  className="primary-text-color"
                  onClick={() => {
                    navigate('/lounge/messages');
                  }}
                />
              ) : null}
              <Avatar src={props.selectedUser?.profile_image} />
              <Stack direction="column">
                <Typography className="primary-text-color">
                  {props.selectedUser?.display_name || props.selectedUser?.custom_username}
                </Typography>
                <Typography variant="caption" className="secondary-text-color">
                  {/* online */}
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
          {/* Message list */}

          <MessageList messages={messagesList} loggedInUser={props.loggedInUser} />

          {/* footer */}

          <Stack direction="row" className="message-input" sx={{ p: { xs: 1, md: 1, xl: 1 } }} style={{backgroundColor: toggle ? '#161C24' : '#dfe3e8'}}>
            <TextField
              value={messageContent}
              fullWidth
              size="small"
              placeholder="Enter message..."
              onChange={(e) => {
                setMessageContent(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.code === 'Enter') {
                  sendMessageHandler();
                }
              }}
              sx={{
                '& legend': { display: 'none' },
                '& fieldset': { top: 0 },
                '& .MuiInputBase-input': {
                  color: toggle ? 'white' : '#161C24'
                }
              }}
            />
            <FlexRow
              p="8px 0 8px 8px"
              onClick={() => handleClickOpen()}
              ai="center"
              cursor="pointer"
            >
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
          width="60%"
        >
          <BsChatLeftTextFill fontSize={50} />
          <Typography className="secondary-text-color">Select a user to chat</Typography>
        </Stack>
      ) : null}
    </>
  );
}

export default ChatSection;
