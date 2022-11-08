import { createSlice } from '@reduxjs/toolkit';
import { child, get, getDatabase, ref, update } from 'firebase/database';
import { databaseInstance } from 'frontend/contexts/FirebaseInstance';
import { addEvent, getEvents } from 'frontend/services/eventService';

import { IEvent, IVenue } from 'frontend/types/event';
import { dispatch } from '../store';

type IAdminState = {
  isLoading: boolean;
  isLoadingEvents: boolean;
  isVenueLoading: boolean;
  lstEvent: IEvent[];
  lstVanue: IVenue[];
  error: any;
};

const initialState: IAdminState = {
  isLoading: false,
  isLoadingEvents: false,
  isVenueLoading: false,
  lstEvent: [],
  lstVanue: [],
  error: false
};

const slice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    handleEventsLoading(state, action) {
      state.isLoadingEvents = action.payload;
    },
    startVanueLoading(state) {
      state.isVenueLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
      state.isVenueLoading = false;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.isVenueLoading = false;
      state.error = action.payload;
    },
    setAdminSliceChanges(state, action) {
      return { ...state, ...action.payload };
    }
  }
});

// Reducer
export default slice.reducer;
export const { setAdminSliceChanges } = slice.actions;

export function fetchAdminEvents() {
  return async (dispatch: any) => {
    try {
      dispatch(slice.actions.handleEventsLoading(true));
      const result = await getEvents();
      dispatch(slice.actions.handleEventsLoading(false));
      if (result.success) {
        dispatch(slice.actions.setAdminSliceChanges({ lstEvent: result.data }));
      }
    } catch (error) {
      console.error(error);

      dispatch(slice.actions.handleEventsLoading(false));
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function fetchVanues() {
  return async (dispatch: any) => {
    try {
      dispatch(slice.actions.startVanueLoading());
      const dbRef = ref(getDatabase());
      const snapshot = await get(child(dbRef, `venues/`));

      if (snapshot.exists()) {
        const vanues = Object.keys(snapshot.val());
        const lstVanues: any = [];
        for (let j = 0; j < vanues.length; j++) {
          lstVanues.push(snapshot.val()[vanues[j]]);
        }

        dispatch(
          slice.actions.setAdminSliceChanges({ lstVanue: lstVanues, isVenueLoading: false })
        );
      }
    } catch (error) {
      console.error(error);

      dispatch(slice.actions.hasError(error));
    }
  };
}

export async function updateAdminEvent(IO: IEvent, selectedEventName: string) {
  try {
    dispatch(slice.actions.startLoading());
    await update(ref(databaseInstance, `events/${selectedEventName}`), { ...IO });
  } catch (error) {
    console.error(error);
    alert(`error in update${error}`);
    dispatch(slice.actions.hasError(error));
  }
}

export async function crateEvent(IO: IEvent) {
  try {
    dispatch(slice.actions.startLoading());
    await addEvent(IO);
  } catch (error) {
    console.error(error);
    dispatch(slice.actions.hasError(error));
  }
}
