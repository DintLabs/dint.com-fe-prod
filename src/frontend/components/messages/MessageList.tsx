import React from 'react';
import { Box } from '@mui/material';
import { getLocalTime } from 'frontend/utils';
import Loader from '../common/skeletons/UserListItemSkeleton';
import MessageItem from './MessageItem';

type MessageListProp = {
  loggedInUser: any;
  userChats: any;
  chatListLoader: boolean;
};

const MessageList = ({ chatListLoader, userChats, loggedInUser }: MessageListProp) => {
  return (
    <>
    <Box
      className="message-list"
      sx={{ height: window.innerWidth >= 900 ? '100%' : 'full', overflowY: 'scroll' }}
    >
      <div
        id="messageListScrollabelDiv"
        style={{
          height: '100%',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column-reverse'
        }}
      >
        {chatListLoader
          ? <Loader/>
          : userChats.map((message: any, index: any) => {
          return (
            <MessageItem
              key={`${message.id}_${index}`}
              messageSender = {message.sender.custom_username}
              senderImage={message.sender?.profile_image}
              receiverImage={message.reciever?.profile_image}
              message={message.content}
              media = {message.media}
              messageId={message.id}
              isSender={loggedInUser.id === message.sender.id}
              time={getLocalTime(message.created_at).format('hh:mm a')}
            />
          );
        })}
      </div>
    </Box>
    </>
  );
};

export default MessageList;
