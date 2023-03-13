import { createSlice } from '@reduxjs/toolkit';
import axios from '../../api/axios';

type MessagesState = {
  chatList: any[];
  messagesList: any[];
  searchedUserList: any[];
};

const initialState: MessagesState = {
  chatList: [],
  messagesList: [],
  searchedUserList: []
};

const slice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    getAllChatsList(state, action) {
      return { ...state, chatList: action.payload.data };
    },
    getAllMessagesList(state, action) {
      return { ...state, messagesList: action.payload.data };
    },
    addSendMessage(state, action) {
      return { ...state, messagesList: [action.payload.data, ...state.messagesList] };
    },
    getSearchedNewUsers(state, action) {
      return { ...state, searchedUserList: action.payload.data };
    },
    addNewUserInChat(state, action) {
      let updatedList;
      if (state.chatList.filter((user) => user.id === action.payload.id)) {
        updatedList = state.chatList.filter((user) => user.id !== action.payload.id);
        updatedList = [action.payload, ...updatedList];
      } else {
        updatedList = [action.payload, ...state.chatList];
      }
      return { ...state, chatList: updatedList };
    }
  }
});

// Reducer
export default slice.reducer;
export const messagesActions = slice.actions;

export const fetchAllChatsList = () => async (dispatch: any) => {
  try {
    return axios.get('api/chat/get-chat-list-by-token/').then((res: any) => {
      if (res.status === 200) {
        dispatch(slice.actions.getAllChatsList({ data: res.data.data }));
        return true;
      }
      return false;
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchMessageList = (userId: number) => async (dispatch: any) => {
  try {
    return axios.get(`api/chat/get-chat-by-user/${userId}`).then((res: any) => {
      if (res.status === 200) {
        dispatch(slice.actions.getAllMessagesList({ data: res.data.data }));
        return true;
      }
      return false;
    });
  } catch (error) {
    console.error(error);
  }
};

export const sendMessage =
  (payload: { reciever: string; sender: string; content: string, media:string }) => async (dispatch: any) => {
    try {
      return axios.post('api/chat/create-message/', payload).then((res: any) => {
        if (res.status === 200) {
          dispatch(
            slice.actions.addSendMessage({
              data: res.data.data
            })
          );
          return res.data.data;
        }
        return false;
      });
    } catch (error) {
      console.error(error);
    }
  };

export const searchNewUsers = (payload: { search: string }) => async (dispatch: any) => {
  try {
    return axios.get('api/chat/search_user', { params: payload }).then((res: any) => {
      if (res.status === 200) {
        dispatch(slice.actions.getSearchedNewUsers({ data: res.data.data }));
        return true;
      }
      return false;
    });
  } catch (error) {
    console.error(error);
  }
};
