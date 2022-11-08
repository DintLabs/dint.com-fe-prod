import axios from '../../api/axios';
import { AppDispatch, dispatch } from '../store';

export const addLikeForPost = (userID: number, postID: number) => async (dispatch: AppDispatch) => {
  try {
    return axios.post(`api/posts/like/`, { user: userID, post: postID }).then((res: any) => {
      return res.data.data;
    });
  } catch (error) {
    console.error(error);
  }
};

export const postDelete = (postID: number) => async (dispatch: AppDispatch) => {
  try{
    return axios.delete(`api/posts/delete/${postID}/`, {}).then((res: any) => {
      return res.data.data;
    });
  } catch(error){
    console.error(error);
  }
}

export const addBookmarkForPost = ( postID: number) => async (dispatch: AppDispatch) => {
  try {
    return axios.post(`api/user/create-user-bookmarks/`, { post: postID }).then((res: any) => {
      return res.data.data;
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteBookmarkForPost = ( postID: number) => async (dispatch: AppDispatch) => {
  try {
    return axios.delete(`api/user/delete-user-bookmarks/${postID}/`, { post: postID }).then((res: any) => {
      return res.data;
    });
  } catch (error) {
    console.error(error);
  }
};

export const addCommentForPost =
  (userID: number, postID: number, comment: string) => async (dispatch: AppDispatch) => {
    try {
      return axios
        .post(`api/posts/comment/`, { user: userID, post: postID, comment })
        .then((res: any) => {
          return res.data.data;
        });
    } catch (error) {
      console.error(error);
    }
  };
