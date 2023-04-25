import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  PostsCounts,
  PostInterface,
  GetPaginatedPostsResponse,
  LikePostInterface,
  PostCommentInterface,
} from 'frontend/interfaces/postInterface';
import { PaginationPostsInerface } from 'frontend/interfaces/contextInterface';
import { ActiveTabType, BaseApiResponse } from 'frontend/types/lounge';
import { DEFAULT_POSTS_PAGINATION } from 'frontend/data';
import { AppDispatch, RootState } from '../store';
import { AxiosResponse } from 'axios';
import _axios from '../../api/axios';
import { convertPostDates } from '../../utils/date';

const PAGE_SIZE = 6;

interface LoungeFeedState {
  posts: PostInterface[]
  isLoading: boolean;
  pagination: PaginationPostsInerface;
  counts: PostsCounts;
  activeTab: ActiveTabType;
}

const initialState: LoungeFeedState = {
  posts: [],
  activeTab: 'all',
  isLoading: false,
  pagination: DEFAULT_POSTS_PAGINATION,
  counts: {
    all_posts: 0,
    text_posts: 0,
    image_posts: 0,
    video_posts: 0,
  },
};

export const loungeFeedSlice = createSlice({
  name: 'loungeFeed',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      return { ...state, isLoading: action.payload };
    },
    setPosts(state, action: PayloadAction<PostInterface[]>) {
      return { ...state, isLoading: false, posts: action.payload };
    },
    setPagination(state, action: PayloadAction<PaginationPostsInerface>) {
      return { ...state, pagination: action.payload };
    },
    setActiveTab(state, action: PayloadAction<ActiveTabType>) {
      return { ...state, activeTab: action.payload };
    },
    setCounts(state, action: PayloadAction<PostsCounts>) {
      return { ...state, isLoading: false, counts: action.payload };
    },
    setLikes(state, action: PayloadAction<{ id: number, likes: LikePostInterface[] }>) {
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id !== action.payload.id) {
            return post;
          }

          return {
            ...post,
            like_post: action.payload.likes,
            total_likes: action.payload.likes.length,
          };
        }),
      };
    },
    setBookmarked(state, action: PayloadAction<{ id: number, bookmarked: boolean }>) {
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id !== action.payload.id) {
            return post;
          }

          return { ...post, is_bookmarked: action.payload.bookmarked };
        }),
      };
    },
    setComments(state, action: PayloadAction<{ id: number, comments: PostCommentInterface[] }>) {
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id !== action.payload.id) {
            return post;
          }

          return { ...post, post_comment: action.payload.comments };
        }),
      };
    },
  },
});

export function getPosts() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { loungeFeed } = getState();
    if (loungeFeed.isLoading || !loungeFeed.pagination.hasNext) return;

    dispatch(loungeFeedSlice.actions.setLoading(true));

    try {
      const pagination = {
        ...loungeFeed.pagination,
        post_type: loungeFeed.activeTab,
      };

      const { data }: AxiosResponse<GetPaginatedPostsResponse> = await _axios.post(
        `/api/lounge/pagination/list/`,
        pagination,
      );

      if (data?.data?.length) {
        const posts = pagination.start === 0
          ? convertPostDates(data.data)
          : [...loungeFeed.posts, ...convertPostDates(data.data)];

        dispatch(loungeFeedSlice.actions.setPosts(posts));
        dispatch(loungeFeedSlice.actions.setPagination({
          ...pagination,
          start: pagination.start + PAGE_SIZE,
          hasNext: pagination.start + PAGE_SIZE < data.recordsTotal,
        }));
      }
    } catch (error) {
      console.error(error);
      dispatch(loungeFeedSlice.actions.setLoading(false));
    }
  };
}

export function createPost(payload: any) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(loungeFeedSlice.actions.setLoading(true));

    try {
      const { data }: AxiosResponse<BaseApiResponse<PostInterface>> = await _axios.post(
        '/api/posts/create/',
        payload,
      );
      if (data.data) {
        const { loungeFeed } = getState();
        if (loungeFeed.activeTab === 'all' || data.data.type === loungeFeed.activeTab) {
          dispatch(loungeFeedSlice.actions.setPagination({
            ...loungeFeed.pagination,
            start: 0,
          }));
          dispatch(loungeFeedSlice.actions.setLoading(false));
          return dispatch(getPosts());
        }
      }
    } catch (error) {
      console.error(error);
      dispatch(loungeFeedSlice.actions.setLoading(false));
    }
  };
}

export function setActiveTab(activeTab: ActiveTabType) {
  return async (dispatch: AppDispatch) => {
    dispatch(loungeFeedSlice.actions.setLoading(false));
    dispatch(loungeFeedSlice.actions.setActiveTab(activeTab));
    dispatch(loungeFeedSlice.actions.setPagination({
      ...DEFAULT_POSTS_PAGINATION,
      post_type: activeTab,
    }));

    return dispatch(getPosts());
  }
}

export function loadPostCounts() {
  return async (dispatch: AppDispatch) => {
    dispatch(loungeFeedSlice.actions.setLoading(true));

    try {
      const { data }: AxiosResponse<BaseApiResponse<PostsCounts>> = await _axios.get(
        `/api/lounge/fetch-post-counts/`,
      );
      if (data?.code === 200) {
        dispatch(loungeFeedSlice.actions.setCounts(data.data));
      } else {
        dispatch(loungeFeedSlice.actions.setLoading(false));
      }
    } catch (error) {
      console.error(error);
      dispatch(loungeFeedSlice.actions.setLoading(false));
    }
  };
}

export function deletePost(postId: number) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      await _axios.delete(`api/posts/delete/${postId}/`, {});
      const { loungeFeed } = getState();
      dispatch(loungeFeedSlice.actions.setPosts(
        loungeFeed.posts.filter((post) => post.id !== postId)),
      );
    } catch (error) {
      console.error(error);
    }
  };
}

export function resetPosts() {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const { loungeFeed } = getState();
    dispatch(loungeFeedSlice.actions.setPosts([]));
    dispatch(loungeFeedSlice.actions.setPagination({
      ...DEFAULT_POSTS_PAGINATION,
      post_type: loungeFeed.activeTab,
    }));
  };
}

export function setLikes(id: number, likes: LikePostInterface[]) {
  return (dispatch: AppDispatch) => {
    dispatch(loungeFeedSlice.actions.setLikes({ id, likes }));
  };
}

export function setBookmarked(id: number, bookmarked: boolean) {
  return (dispatch: AppDispatch) => {
    dispatch(loungeFeedSlice.actions.setBookmarked({ id, bookmarked }));
  };
}

export function setComments(id: number, comments: PostCommentInterface[]) {
  return (dispatch: AppDispatch) => {
    dispatch(loungeFeedSlice.actions.setComments({ id, comments }));
  };
}

export function removePostFromList(id: number) {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const { loungeFeed } = getState();
    dispatch(loungeFeedSlice.actions.setPosts(
      loungeFeed.posts.filter((post) => post.id !== id)),
    );
  };
}

export default loungeFeedSlice.reducer;
