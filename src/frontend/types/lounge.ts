export interface IUserOwnStories {
  created_at: string;
  id: number;
  name: string;
  story: string;
  user: number;
  liked_story: any[];
  total_likes: number;
}
