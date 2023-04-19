import { createSlice } from '@reduxjs/toolkit';

type NewHomeState = {
  selectedMenu: HOME_SIDE_MENU;
  isLoading: boolean;
};

export enum HOME_SIDE_MENU {
  LOUNGE = 'lounge',
  HOME = 'home',
  MESSAGES = 'messages',
  TOKEN = 'token',
  WALLET = 'wallet',
  WITHDRAWAL = 'withdraw',
  PROCESSWITHDRAWAL = 'processWithdraw',
  MY_PROFILE = 'profile',
  EVENTS = '/lounge/events',
  CREATE_EVENT = '/lounge/events/create',
  EVENT_TICKET = '/lounge/events/ticket',
  MY_EVENTS = '/lounge/my-events',
  FOLLOWERS = 'followers',
  ADD_POST = 'add-post',
  SUBSCRIPTIONS = 'subscriptions',
  LISTS = 'lists',
  ADD_PAYMENT = 'add-payment',
  SEARCH = 'search',
  MORE = 'more' ,
  NOTIFICATIONS = 'notifications'
}

const initialState: NewHomeState = {
  selectedMenu: HOME_SIDE_MENU.HOME,
  isLoading: false
};

const slice = createSlice({
  name: 'newHome',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    setNewHomeSliceChanges(state, action) {
      return { ...state, ...action.payload };
    }
  }
});

// Reducer
export default slice.reducer;
export const { setNewHomeSliceChanges } = slice.actions;
