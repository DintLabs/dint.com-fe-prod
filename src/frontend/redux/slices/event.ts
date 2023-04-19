import { createSlice } from '@reduxjs/toolkit';
import {
  addEvent,
  editEvent,
  getEvents,
  getUserEvents,
  deleteEvent as deleteEventRequest,
} from 'frontend/services/eventService';
import { addVenue, getUserVenues } from 'frontend/services/venueService';
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
      return { ...state, isLoading: true };
    },
    hasError(state, action) {
      return { ...state, isLoading: false, error: action.payload };
    },
    setSliceChanges(state, action) {
      return { ...state, ...action.payload };
    },
    addEvent(state, action) {
      return {
        ...state,
        isLoading: false,
        lstEvent: [...state.lstEvent, action.payload],
        userEvents: [...state.userEvents, action.payload],
      };
    },
    updateEvent(state, action) {
      const { id, updates } = action.payload;
      const mapper = (event: IEvent) => {
        if (event.id === id) {
          const { user } = event;
          return { ...event, ...updates, user };
        }

        return event;
      }

      return {
        ...state,
        isLoading: false,
        lstEvent: state.lstEvent.map(mapper),
        userEvents: state.userEvents.map(mapper),
      };
    },
    deleteEvent(state, action) {
      return {
        ...state,
        isLoading: false,
        lstEvent: state.lstEvent.filter((event) => event.id !== action.payload),
        userEvents: state.userEvents.filter((event) => event.id !== action.payload),
      }
    },
    createVenue(state, action) {
      return {
        ...state,
        isLoading: false,
        userVenues: [...state.userVenues, action.payload],
      };
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

export function createEvent(payload: any, user: any) {
  return async (dispatch: any) => {
    dispatch(slice.actions.startLoading());

    try {
      const { data, success } = await addEvent(payload);
      if (success) {
        dispatch(slice.actions.addEvent({ ...data, user }));
      } else {
        dispatch(slice.actions.setSliceChanges({ isLoading: false }));
      }

      return { success };
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return { success: false };
    }
  };
}

export function updateEvent(id: number, updates: any) {
  return async (dispatch: any) => {
    dispatch(slice.actions.startLoading());

    try {
      const { success } = await editEvent(id, updates);
      if (success) {
        dispatch(slice.actions.updateEvent({ id, updates }));
      } else {
        dispatch(slice.actions.setSliceChanges({ isLoading: false }));
      }

      return { success };
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return { success: false };
    }
  };
}

export function deleteEvent(eventId: number) {
  return async (dispatch: any) => {
    dispatch(slice.actions.startLoading());

    try {
      const { success } = await deleteEventRequest(eventId);
      if (success) {
        dispatch(slice.actions.deleteEvent(eventId))
      } else {
        dispatch(slice.actions.setSliceChanges({ isLoading: false }));
      }

      return { success };
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return { success: false };
    }
  }
}

export function createVenue(payload: any, user: any) {
  return async (dispatch: any) => {
    dispatch(slice.actions.startLoading());

    try {
      const { success, data } = await addVenue(payload);
      if (success) {
        dispatch(slice.actions.createVenue({ ...data, user }));
      }

      return { success };
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return { success: false };
    }
  };
}
