import { createSlice } from "@reduxjs/toolkit";
import { IUserOwnStories } from "frontend/types/lounge";
import axios from "frontend/api/axios";

type loungeState = {
  userOwnStories: IUserOwnStories[];
};

const initialState: loungeState = {
  userOwnStories: [],
};

const slice = createSlice({
  name: "lounge",
  initialState,
  reducers: {
    setUserOwnStories(state, action) {
      return { ...state, userOwnStories: action.payload };
    },
    deleteStory(state, action) {
      return {
        ...state,
        userOwnStories: state.userOwnStories.filter(
          (story) => story.id !== action.payload
        ),
      };
    },
  },
});

// Reducer
export default slice.reducer;
export const { setUserOwnStories } = slice.actions;

export const getUserOwnStories = () => async (dispatch: any) => {
  try {
    return axios.get(`api/user/get-stories-by-user/`).then((res: any) => {
      console.log(res.data.data);
      if (res?.data?.data) {
        dispatch(slice.actions.setUserOwnStories(res.data.data));
        return true;
      }
      return false;
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteStory = (id: number) => {
  return async (dispatch: any) => {
    try {
      const result = await axios.delete(`/api/user-stories/${id}/`);
      console.log(result);
      dispatch(slice.actions.deleteStory(id));
    } catch (error) {
      console.error(error);
    }
  };
};
