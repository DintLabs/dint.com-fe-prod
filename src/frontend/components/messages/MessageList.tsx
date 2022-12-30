import { Box } from '@mui/material';
import _axios from 'frontend/api/axios';
import { RootState } from 'frontend/redux/store';
import { getLocalTime } from 'frontend/utils';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../common/skeletons/UserListItemSkeleton';

import MessageItem from './MessageItem';

type MessageListProp = {
  messages: { id: number; reciever: any; sender: any; content: string; created_at: any }[];
  loggedInUser: any;
  selectedUser: any;
  userChats: any;
  chatListLoader: boolean;
};

const MessageList = (props: MessageListProp) => {
  const [renderMesssages, setRenderMessages] = useState<any>([]);
  // const { messagesList } = useSelector((state: RootState) => state.messages);

  // const [userChats, setUserChats] = useState<any>([]);

  useEffect(() => {
    fetchMessages();
  }, [props.messages]);
  
  // // const filterData = (allChatsList: any, selectedUser: any) => {
  // //   let res = [];
  // //   res = allChatsList?.filter((el: any) => {
    
  // //       return el.close_friend === el.id;
      
  // //   });
  // //   setUserChats(res);
  // //   return res;
  // // };

  // // useEffect(() => {
  // //   filterData(allChatsList, selectedUser);
  // // }, [allChatsList, selectedUser]);

  // console.log("chatlist---", messagesList)
  // console.log("selectuser---", props.selectedUser)

  // const fetchUserChat = async () => {
  //   try {
  //     const { data } = await _axios.get(`api/chat/get-chat-by-user/${props.selectedUser.id}`);

  //     setUserChats(data.data);
  //   } catch (err: any) {
  //     console.error("err ===>", err.message);
  //   }
  // };
  // useEffect(() => {
  //   fetchUserChat();
  // }, []);

  // console.log("chats---", userChats)

  const fetchMessages = () => {
    setTimeout(() => {
      setRenderMessages(
        renderMesssages.concat(
          props.messages.slice(renderMesssages.length, renderMesssages.length + 8)
        )
      );
    }, 500);
  };

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
        {props.chatListLoader ? (<>
              <Loader/>
            </>):(
        props.userChats.map((message: any, index: any) => {
          return (
            <MessageItem
              key={message.id}
              message={message.content}
              messageId={message.id}
              isSender={props.loggedInUser.id === message.sender.id}
              time={getLocalTime(message.created_at).format('hh:mm a')}
            />
          );
        }))}
      </div>
    </Box>
    </>
  );
};

export default MessageList;
