import { createSlice } from '@reduxjs/toolkit';
import { getEvents, getUserEvents } from 'frontend/services/eventService';
import { getUserVenues } from 'frontend/services/venueService';
import { IEvent, IVenue } from 'frontend/types/event';

type IEventState = {
  isLoading: boolean;
  lstEvent: IEvent[];
  userEvents: IEvent[];
  userVenues: IVenue[];
  error: any;
};

const initialState: IEventState = {
  isLoading: false,
  lstEvent: [],
  userEvents: [],
  userVenues: [],
  error: false
};

const slice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSliceChanges(state, action) {
      return { ...state, ...action.payload };
    }
  }
});

// Reducer
export default slice.reducer;

export function fetchUserEvents(userId: string | number) {
  return async (dispatch: any) => {
    try {
      dispatch(slice.actions.startLoading());
      const result = await getUserEvents(userId);
      if (result.success)
        dispatch(slice.actions.setSliceChanges({ userEvents: result.data, isLoading: false }));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function fetchEvents() {
  return async (dispatch: any) => {
    try {
      dispatch(slice.actions.startLoading());
      const result = await getEvents();
      if (result.success)
        dispatch(slice.actions.setSliceChanges({ lstEvent: result.data, isLoading: false }));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function fetchUserVenues(userId: string | number) {
  return async (dispatch: any) => {
    try {
      dispatch(slice.actions.startLoading());
      const result = await getUserVenues(userId);
      if (result.success)
        dispatch(slice.actions.setSliceChanges({ userVenues: result.data, isLoading: false }));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
