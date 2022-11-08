import { createSlice } from '@reduxjs/toolkit';
import { CommonInterface } from 'frontend/interfaces/reduxInterfaces';

const initialState: CommonInterface = {
  isLoading: false
};

const slice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    }
  }
});

// Reducer
export default slice.reducer;
export const commonSliceActions = slice.actions;
