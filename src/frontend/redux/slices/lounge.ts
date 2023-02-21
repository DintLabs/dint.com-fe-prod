import { createSlice } from "@reduxjs/toolkit";
import { IUserOwnStories } from "frontend/types/lounge";
import axios from "../../api/axios";

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
