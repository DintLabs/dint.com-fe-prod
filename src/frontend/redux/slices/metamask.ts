import { createSlice } from '@reduxjs/toolkit';

type MetamaskState = {
  stopLoadingMetamask: boolean;
};

const initialState: MetamaskState = {
  stopLoadingMetamask: true
};

const slice = createSlice({
  name: 'metamask',
  initialState,
  reducers: {
    setNewHomeSliceChanges(state, action) {
      return { ...state, ...action.payload };
    }
  }
});

// Reducer
export default slice.reducer;
export const { setNewHomeSliceChanges } = slice.actions;
