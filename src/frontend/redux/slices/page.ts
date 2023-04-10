import { createSlice } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { viewPageActions } from './viewPage';

type PageState = {
  pageData: any;
  isLoading: boolean;
};

const initialState: PageState = {
  pageData: null,
  isLoading: false,
};

const slice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setLoading(state, action) {
      return { ...state, isLoading: action.payload };
    },
    getPageData(state, action) {
      return { ...state, pageData: action.payload };
    },
    updatePageData(state, action) {
      return {
        ...state,
        pageData: {
          ...state?.pageData,
          ...action.payload
        }
      };
    }
  }
});

export default slice.reducer;
export const pageActions = slice.actions;

export const getPageByUserId = (userId: number) => {
  return async (dispatch: any) => {
    dispatch(slice.actions.setLoading(true));
    const { data } = await axios.get(`api/page/list_by_user_id/${userId}/`);
    dispatch(slice.actions.setLoading(false));
    dispatch(slice.actions.getPageData(data.data[0]));
  };
};

export const createPage = (payload: any) => async (dispatch: any) => {
  try {
    return axios.post('api/page/create/', payload).then((res: any) => {
      if (res.status === 200) {
        dispatch(slice.actions.getPageData(res.data.data));
        return true;
      }
      return false;
    });
  } catch (error) {
    console.error(error);
  }
};

export const updatePage = (pageId: number | any, payload: any) => async (dispatch: any) => {
  try {
    return axios.put(`api/page/update/${pageId}/`, payload).then((res: any) => {
      if (res.status === 200 && res?.data?.code === 200) {
        dispatch(slice.actions.updatePageData(res.data.data));
        dispatch(viewPageActions.updatePageData({ page_name: res?.data?.data?.page_name }));
        return true;
      }
      return false;
    });
  } catch (error) {
    console.error(error);
  }
};
