import { createSlice } from '@reduxjs/toolkit';
import { FollowerDataInterface, UserDataInterface } from 'frontend/interfaces/reduxInterfaces';

import axios from '../../api/axios';
import { AppDispatch } from '../store';
import { pageActions } from './page';

type UserState = {
  userData: UserDataInterface | null;
  follower: FollowerDataInterface | null;
  following: FollowerDataInterface | null;
};

const initialState: UserState = {
  userData: null,
  follower: null,
  following: null
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserData(state, action) {
      const actionpayload =  action.payload
      const userDataValue = { ...state.userData , ...actionpayload }
      return { ...state, userData: userDataValue };
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setFollowerList: (state, action) => {
      state.follower = action.payload;
    },
    setFollowingList: (state, action) => {
      state.following = action.payload;
    }
  }
});

export default slice.reducer;

export const { setUserData } = slice.actions;

export const fetchUserData = () => async (dispatch: AppDispatch) => {
  try {
    const token = localStorage.getItem('apiToken');
    if (token) {
      return axios.get(`api/user/get-page-profile-by-token/`).then((res: any) => {
        if (res.status === 200) {
          dispatch(slice.actions.getUserData(res.data.data));
          dispatch(pageActions.getPageData(res?.data?.data?.user_page?.[0]));
          return true;
        }
        return false;
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getFollowerList = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await axios.get('api/connection/get-follower-list/');

    if (data.code === 200) {
      dispatch(slice.actions.setFollowerList(data.data));
    }
  } catch (err: any) {
    console.error('err ===>', err.message);
  }
};

export const getFollowingList = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await axios.get('api/connection/get-following-list/');

    if (data.code === 200) {
      dispatch(slice.actions.setFollowingList(data.data));
    }
  } catch (err: any) {
    console.error('err ===>', err.message);
  }
};

export const fetchUserDataByUsername =
  (payload: { custom_username: string }) => async (dispatch: AppDispatch) => {
    try {
      return axios.post(`api/user/get-profile-by-username/`, payload).then((res: any) => {
        if (res.status === 200 && res?.data?.code === 200) {
          return true;
        }
        return false;
      });
    } catch (error) {
      console.error(error);
    }
  };
