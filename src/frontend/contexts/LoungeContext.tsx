import React, { createContext, useContext, useState } from "react";

import _axios from "frontend/api/axios";
import { DEFAULT_POSTS_PAGINATION, postTypes } from "frontend/data";
import { PostInterface } from "frontend/interfaces/postInterface";
import {
  ContextInterface,
  PaginationPostsInerface,
} from "frontend/interfaces/contextInterface";
import { convertPostDates } from 'frontend/utils/date';

const useLoungeController = (): ContextInterface => {
  const [counts, setCounts] = useState({
    all_posts: 0,
    text_posts: 0,
    image_posts: 0,
    video_posts: 0,
  });

  const [posts, setPostsLocal] = useState<PostInterface[]>([]);
  const [textPosts, setTextPostsLocal] = useState<PostInterface[]>([]);
  const [photoPosts, setPhotoPostsLocal] = useState<PostInterface[]>([]);
  const [videoPosts, setVideoPostsLocal] = useState<PostInterface[]>([]);

  const [paginationPosts, setPaginationPosts] =
    useState<PaginationPostsInerface>({
      ...DEFAULT_POSTS_PAGINATION,
    });

  const [paginationTextPosts, setPaginationTextPosts] =
    useState<PaginationPostsInerface>({
      ...DEFAULT_POSTS_PAGINATION,
      post_type: postTypes.text.value,
    });

  const [paginationPhotoPosts, setPaginationPhotoPosts] =
    useState<PaginationPostsInerface>({
      ...DEFAULT_POSTS_PAGINATION,
      post_type: postTypes.image.value,
    });

  const [paginationVideoPosts, setPaginationVideoPosts] =
    useState<PaginationPostsInerface>({
      ...DEFAULT_POSTS_PAGINATION,
      post_type: postTypes.video.value,
    });

  const createPostsSetter = (
    localSetter: React.Dispatch<React.SetStateAction<PostInterface[]>>,
  ) => (
    setPostsPayload: ((prevPosts: PostInterface[]) => PostInterface[]) | PostInterface[],
  ) => {
    const postsToUpdate = typeof setPostsPayload === 'function'
      ? setPostsPayload(posts)
      : setPostsPayload;

    localSetter(convertPostDates(postsToUpdate));
  }

  const setPosts = createPostsSetter(setPostsLocal);
  const setTextPosts = createPostsSetter(setTextPostsLocal);
  const setPhotoPosts = createPostsSetter(setPhotoPostsLocal);
  const setVideoPosts = createPostsSetter(setVideoPostsLocal);

  const getUserPostCounts = async () => {
    const { data } = await _axios.get(`/api/lounge/fetch-post-counts/`);
    if (data?.code === 200) {
      setCounts(data?.data);
    }
  };

  const addNewPostToContext = (post: PostInterface) => {
    if (post.type === "text") {
      setTextPosts((prev) => (prev.length ? [post, ...prev] : prev));
    }
    if (post.type === "image") {
      setPhotoPosts((prev) => (prev.length ? [post, ...prev] : prev));
    }
    if (post.type === "video" && videoPosts.length) {
      setVideoPosts((prev) => (prev.length ? [post, ...prev] : prev));
    }
    setPosts((prev) => [post, ...prev]);

    getUserPostCounts();
  };

  const updatePost = (post: PostInterface) => {
    const newPosts = [...posts];
    const index = posts.findIndex((obj) => obj.id === post.id);
    if (index !== -1) {
      newPosts[index] = post;
      setPosts(newPosts);
    }
  };

  const resetPosts = () => {
    setPosts([]);
    setTextPosts([]);
    setPhotoPosts([]);
    setVideoPosts([]);

    const defaultPagination = (type: string): PaginationPostsInerface => ({
      ...DEFAULT_POSTS_PAGINATION,
      post_type: type,
    });

    setPaginationPosts(defaultPagination(postTypes.all.value));
    setPaginationTextPosts(defaultPagination(postTypes.text.value));
    setPaginationPhotoPosts(defaultPagination(postTypes.image.value));
    setPaginationVideoPosts(defaultPagination(postTypes.video.value));
  };

  return {
    counts,
    setCounts,
    posts,
    setPosts,
    photoPosts,
    setPhotoPosts,
    textPosts,
    setTextPosts,
    videoPosts,
    setVideoPosts,
    paginationPosts,
    setPaginationPosts,
    paginationTextPosts,
    setPaginationTextPosts,
    paginationPhotoPosts,
    setPaginationPhotoPosts,
    paginationVideoPosts,
    setPaginationVideoPosts,
    addNewPostToContext,
    getUserPostCounts,
    updatePost,
    resetPosts,
  };
};

const LoungeContext = createContext({} as ContextInterface);

export const LoungeProvider = ({ children }: { children: React.ReactNode }) => (
  <LoungeContext.Provider value={useLoungeController()}>
    {children}
  </LoungeContext.Provider>
);

export const useLounge = () => useContext(LoungeContext);
