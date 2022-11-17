import { UserDataInterface } from "./reduxInterfaces";

export interface PostCommentInterface {
  id: number;
  user: UserDataInterface | number;
  comment: string;
  room_type: string | null;
  created_at: string | Date;
  updated_at: string | Date;
  deleted_at: string | Date | null;
  is_active: boolean;
  is_deleted: boolean;
  can_delete: boolean;
  post: number;
  page: any; // will add interface once BE will send response
}

export interface LikePostInterface {
  id: number;
  user: UserDataInterface | number;
  created_at: string | Date;
  updated_at: string | Date;
  deleted_at: string | Date | null;
  is_active: boolean;
  is_deleted: boolean;
  can_delete: boolean;
  post: number;
}

export interface UnlikePostInterface {
  id: number;
  user: UserDataInterface | number;
  created_at: string | Date;
  updated_at: string | Date;
  deleted_at: string | Date | null;
  is_active: boolean;
  is_deleted: boolean;
  can_delete: boolean;
  post: number;
}

export interface BookmarkPostInterface {
  id: number;
  user: UserDataInterface | number;
  created_at: string | Date;
  updated_at: string | Date;
  deleted_at: string | Date | null;
  is_active: boolean;
  is_deleted: boolean;
  can_delete: boolean;
  post: number;
}

export interface PostInterface {
  id: number;
  user: UserDataInterface;
  like_post: LikePostInterface[];
  unlike_post: UnlikePostInterface[];
  post_comment: PostCommentInterface[];
  type: string;
  content: string;
  media: string | null;
  total_likes: number | null;
  total_comments: number | null;
  created_at: string | Date;
  updated_at: string | Date;
  deleted_at: string | Date | null;
  is_active: boolean;
  is_deleted: boolean;
  can_delete: boolean;
  page: number | null;
  is_bookmarked: boolean;
  bookmarks_count: number | null;
}
