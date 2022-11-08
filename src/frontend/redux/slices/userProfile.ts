import { createSlice } from '@reduxjs/toolkit';

type UserProfileState = {
  isLoading: boolean;
};

const initialState: UserProfileState = {
  isLoading: false
};

const slice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    }
  }
});

// Reducer
export default slice.reducer;
