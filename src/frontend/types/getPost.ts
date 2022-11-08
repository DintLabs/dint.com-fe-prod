class IGetPost {
  id: number;

  type: string;

  content: string;

  total_likes: number | null;

  total_comments: [] | null;

  created_at: string;

  updated_at: string | null;

  deleted_at: string | null;

  is_active: boolean;

  is_deleted: boolean;

  can_delete: boolean;

  user: number;

  constructor(
    id: number,
    type: string,
    content: string,
    total_likes: number | null,
    total_comments: [] | null,
    created_at: string,
    updated_at: string | null,
    deleted_at: string | null,
    is_active: boolean,
    is_deleted: boolean,
    can_delete: boolean,
    user: number
  ) {
    this.id = id;
    this.type = type;
    this.content = content;
    this.total_likes = total_likes;
    this.total_comments = total_comments;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
    this.is_active = is_active;
    this.is_deleted = is_deleted;
    this.updated_at = updated_at;
    this.can_delete = can_delete;
    this.user = user;
  }
}

export default IGetPost;
