import { Dispatch, SetStateAction } from "react";
import { PostInterface } from "./postInterface";

export interface CountInerface {
  all_posts: number;
  text_posts: number;
  image_posts: number;
  video_posts: number;
  subscriptions?: number;
}
export interface OrderInerface {
  column: number;
  dir: string;
}
export interface SearchInerface {
  value: string;
  regex: boolean;
}
export interface ColumnsInerface {
  data: string;
  name: string;
  searchable: boolean;
  orderable: boolean;
  search: SearchInerface;
}
export interface PaginationPostsInerface {
  post_type: string;
  draw: number;
  columns: ColumnsInerface[];
  order: OrderInerface[];
  start: number;
  length: number;
  hasNext: boolean;
  search: SearchInerface;
}

export interface ContextInterface {
  counts: CountInerface;
  setCounts: Dispatch<SetStateAction<CountInerface>>;
  posts: PostInterface[];
  setPosts: Dispatch<SetStateAction<PostInterface[]>>;
  photoPosts: PostInterface[];
  setPhotoPosts: Dispatch<SetStateAction<PostInterface[]>>;
  textPosts: PostInterface[];
  setTextPosts: Dispatch<SetStateAction<PostInterface[]>>;
  videoPosts: PostInterface[];
  setVideoPosts: Dispatch<SetStateAction<PostInterface[]>>;
  paginationPosts: PaginationPostsInerface;
  setPaginationPosts: Dispatch<PaginationPostsInerface>;
  paginationTextPosts: PaginationPostsInerface;
  setPaginationTextPosts: Dispatch<PaginationPostsInerface>;
  paginationPhotoPosts: PaginationPostsInerface;
  setPaginationPhotoPosts: Dispatch<PaginationPostsInerface>;
  paginationVideoPosts: PaginationPostsInerface;
  setPaginationVideoPosts: Dispatch<PaginationPostsInerface>;
  addNewPostToContext: (post: PostInterface) => void;
  updatePost: (post: PostInterface) => void;
  getUserPostCounts: () => void;
  resetPosts: () => void;
}
