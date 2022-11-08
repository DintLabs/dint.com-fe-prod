import { Box } from '@mui/material';
import { getLocalTime } from 'frontend/utils';

import React, { useEffect, useState } from 'react';

import MessageItem from './MessageItem';

type MessageListProp = {
  messages: { id: number; reciever: any; sender: any; content: string; created_at: any }[];
  loggedInUser: any;
};

const MessageList = (props: MessageListProp) => {
  const [renderMesssages, setRenderMessages] = useState<any>([]);

  useEffect(() => {
    fetchMessages();
  }, [props.messages]);

  const fetchMessages = () => {
    console.log('new messages fetched');
    setTimeout(() => {
      setRenderMessages(
        renderMesssages.concat(
          props.messages.slice(renderMesssages.length, renderMesssages.length + 8)
        )
      );
    }, 500);
  };

  return (
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
        {props.messages.map((message, index) => {
          return (
            <MessageItem
              key={message.id}
              message={message.content}
              messageId={message.id}
              isSender={props.loggedInUser.id === message.sender.id}
              time={getLocalTime(message.created_at).format('hh:mm a')}
            />
          );
        })}
      </div>
    </Box>
  );
};

export default MessageList;
