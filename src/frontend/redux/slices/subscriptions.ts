import { createSlice } from '@reduxjs/toolkit';
import { SubscriptionsInterface } from 'frontend/interfaces/reduxInterfaces';
import axios from '../../api/axios';

const initialState: SubscriptionsInterface = {
  allSubscriptions: { data: [], total: 0 },
  activeSubscriptions: { data: [], total: 0 },
  expiredSubscriptions: { data: [], total: 0 }
};

const slice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {
    storeSubscriptions(state, action) {
      state.allSubscriptions.data = action?.payload?.all_subscriptions;
      state.activeSubscriptions.data = action?.payload?.active_subscriptions;
      state.expiredSubscriptions.data = action?.payload?.expired_subscriptions;
      state.allSubscriptions.total = action?.payload?.all_subscriptions?.length || 0;
      state.activeSubscriptions.total = action?.payload?.active_subscriptions?.length || 0;
      state.expiredSubscriptions.total = action?.payload?.expired_subscriptions?.length || 0;
    }
  }
});

export default slice.reducer;
export const subscriptionsActions = slice.actions;

// to get the list of all subscriptions plans for the user
export const getSubscriptionsForUser = (userId: number) => async (dispatch: any) => {
  try {
    return axios.post(`api/subscription/get-pages-by-subscriber-id/${userId}/`).then((res: any) => {
      if (res.status === 200 && res?.data?.code === 200) {
        dispatch(
          slice.actions.storeSubscriptions({
            all_subscriptions: res?.data?.data?.all_subscriptions,
            active_subscriptions: res?.data?.data?.active_subscriptions,
            expired_subscriptions: res?.data?.data?.expired_subscriptions
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
