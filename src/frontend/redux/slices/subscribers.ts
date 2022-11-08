import { createSlice } from '@reduxjs/toolkit';
import { SubscribersInterface } from 'frontend/interfaces/reduxInterfaces';
import axios from '../../api/axios';

const initialState: SubscribersInterface = {
  allSubscribers: { data: [], total: 0 },
  activeSubscribers: { data: [], total: 0 },
  expiredSubscribers: { data: [], total: 0 }
};

const slice = createSlice({
  name: 'subscribers',
  initialState,
  reducers: {
    storeSubscribers(state, action) {
      state.allSubscribers.data = action?.payload?.all_subscribers;
      state.activeSubscribers.data = action?.payload?.active_subscribers;
      state.expiredSubscribers.data = action?.payload?.expired_subscribers;
      state.allSubscribers.total = action?.payload?.all_subscribers?.length || 0;
      state.activeSubscribers.total = action?.payload?.active_subscribers?.length || 0;
      state.expiredSubscribers.total = action?.payload?.expired_subscribers?.length || 0;
    }
  }
});

export default slice.reducer;
export const subscribersActions = slice.actions;

// to get list of all the subscribers of the page for the creator.
export const getSubscribersForPage = (pageId: number) => async (dispatch: any) => {
  try {
    return axios.post(`api/subscription/get-subscriber-by-page-id/${pageId}/`).then((res: any) => {
      if (res.status === 200 && res?.data?.code === 200) {
        dispatch(
          slice.actions.storeSubscribers({
            all_subscribers: res?.data?.data?.all_subscriptions,
            active_subscribers: res?.data?.data?.active_subscriptions,
            expired_subscribers: res?.data?.data?.expired_subscriptions
          })
        );
        return true;
      }
      return false;
    });
  } catch (error) {
    console.error(error);
  }
};
