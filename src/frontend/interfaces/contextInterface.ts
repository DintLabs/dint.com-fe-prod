import { SetStateAction } from "react";
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
  setCounts: React.Dispatch<SetStateAction<CountInerface>>;
  posts: PostInterface[];
  setPosts: React.Dispatch<PostInterface[]>;
  photoPosts: PostInterface[];
  setPhotoPosts: React.Dispatch<PostInterface[]>;
  textPosts: PostInterface[];
  setTextPosts: React.Dispatch<PostInterface[]>;
  videoPosts: PostInterface[];
  setVideoPosts: React.Dispatch<PostInterface[]>;
  paginationPosts: PaginationPostsInerface;
  setPaginationPosts: React.Dispatch<PaginationPostsInerface>;
  paginationTextPosts: PaginationPostsInerface;
  setPaginationTextPosts: React.Dispatch<PaginationPostsInerface>;
  paginationPhotoPosts: PaginationPostsInerface;
  setPaginationPhotoPosts: React.Dispatch<PaginationPostsInerface>;
  paginationVideoPosts: PaginationPostsInerface;
  setPaginationVideoPosts: React.Dispatch<PaginationPostsInerface>;
  addNewPostToContext: (post: PostInterface) => void;
  updatePost: (post: PostInterface) => void;
  getUserPostCounts: () => void;
}
