import { createSlice } from '@reduxjs/toolkit';
import { PostInterface } from 'frontend/interfaces/postInterface';

interface InitialPostState {
  posts: PostInterface[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: InitialPostState = {
  posts: [],
  isLoading: false,
  error: null
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPostsList: (state, action) => {
      state.posts = action.payload;
    }
  }
});

export const { setPostsList } = postsSlice.actions;

export default postsSlice.reducer;
