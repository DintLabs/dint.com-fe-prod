export interface EventInterface {
  isLoading: boolean;
  lstEvent: any[];
  userEvents: any[];
  userVenues: any[];
  error: boolean;
}

export interface UserProfileInterface {
  isLoading: boolean;
}

export interface MarketplaceInterface {
  isLoading: boolean;
  isPurchaseLoading: boolean;
  account: string;
  error: boolean;
  lstPurchase: any[];
  lstMarketPlace: any[];
}

export interface AdminInterface {
  isLoading: boolean;
  isLoadingEvents: boolean;
  isVenueLoading: boolean;
  lstEvent: any[];
  lstVanue: any[];
  error: boolean;
}

export interface NewHomeInterface {
  selectedMenu: string;
  isLoading: boolean;
}

export interface MetamaskInterface {
  stopLoadingMetamask: boolean;
}

export interface FollowerDataInterface {
  id: number;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone_no: string | null;
  is_active: boolean;
  is_deleted: boolean;
  profile_image: string;
  display_name: string;
  custom_username: string;
  is_private: boolean;
}
export interface UserDataInterface {
  able_to_be_found: boolean;
  id: number;
  custom_username: string;
  profile_image: string;
  city?: string | null;
  display_name?: string;
  bio?: string | null;
  location?: string | null;
  website_url?: string | null;
  amazon_wishlist?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  discord?: string | null;
  banner_image?: string | null;
  is_followed?: any;
  is_private?: boolean;
  user_page?: string;
  is_online?: false | boolean;
  last_login?: string;
  email?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  is_active?: boolean;
  is_deleted?: boolean; 
  phone_no?: string | null;
  photoURL?: string | null;
  uid?: string | null;
}
export interface ConfineUserInterface {
  id: number;
  custom_username: string;
  profile_image: string;
  city?: string | null;
  display_name?: string;
  bio?: string | null;
  location?: string | null;
  website_url?: string | null;
  amazon_wishlist?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  discord?: string | null;
  banner_image?: string | null;
  is_followed?: any;
  is_private?: boolean;
  user_page?: string;

  email?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  is_active?: boolean;
  is_deleted?: boolean;
  phone_no?: string | null;
  photoURL?: string | null;
  uid?: string | null;

  user_block_type?: string | null;

}

export interface UserInterface {
  userData: UserDataInterface;
}

export interface MessageListInterface {
  id: number;
  reciever: any;
  sender: any;
  content: string;
  created_at: any;
}

export interface ChatListInterface {
  id: number;
  chat_room: number;
  last_login: string;
  is_superuser: boolean;
  name: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string;
  email_verified_at: string | null;
  password: string | null;
  remember_token: string | null;
  created_at: string;
  updated_at: string;
  phone_no: string | null;
  desription: string | null;
  fire_base_auth_key: string;
  custom_username: string;
  display_name: string;
  bio: string | null;
  location: string | null;
  website_url: string | null;
  amazon_wishlist: string | null;
  profile_image: string;
  banner_image: string;
  city: string | null;
  twitter: string | null;
  instagram: string | null;
  discord: string | null;
  is_private: boolean;
  is_active: boolean;
  is_deleted: boolean;
  deleted_at: string | null;
  otp_varification: boolean;
  otp: string | null;
  otp_send_time: null;
  groups: any[];
  user_permissions: any[];
}

export interface MessagesInterface {
  chatList: ChatListInterface[];
  messagesList: MessageListInterface[];
  searchedUserList: any[];
}

export interface PageInterface {
  page: any;
}

export interface ViewPageDataInterface {
  id: number;
  subscription_tier_page: any;
  page_subscription: any;
  campaign_page: any;
  trial_page: any;
  user: any;
  is_subscribed: boolean;
  page_name: string | null;
  title: string | null;
  description: string | null;
  type: string | null;
  cover_picture: string | null;
  subscribe_amount: number;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  is_active: boolean;
  is_deleted: boolean;
  can_delete: boolean;
}

export interface PostInterface {
  id: number;
  user: any;
  like_post: any;
  post_comment: any;
  type: string;
  content: string | null;
  media: string | null;
  total_likes: string | number | null;
  total_comments: string | number | null;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  is_active: boolean;
  is_deleted: boolean;
  can_delete: boolean;
  page: number | null;
}

export interface ViewPageInterface {
  pageData: ViewPageDataInterface;
  posts: {
    images: PostInterface[] | [];
    videos: PostInterface[] | [];
    totalImages: number | null;
    totalVideos: number | null;
  };
}

export interface SubscriptionsInterface {
  allSubscriptions: { data: any[]; total: number };
  activeSubscriptions: { data: any[]; total: number };
  expiredSubscriptions: { data: any[]; total: number };
}

export interface SubscribersInterface {
  allSubscribers: { data: any[]; total: number };
  activeSubscribers: { data: any[]; total: number };
  expiredSubscribers: { data: any[]; total: number };
}

export interface CommonInterface {
  isLoading: boolean;
}

export interface IRootStore {
  event: EventInterface;
  userProfile: UserProfileInterface;
  marketplace: MarketplaceInterface;
  admin: AdminInterface;
  newHome: NewHomeInterface;
  metamask: MetamaskInterface;
  user: UserInterface;
  messages: MessagesInterface;
  page: PageInterface;
  viewPage: ViewPageInterface;
  subscriptions: SubscriptionsInterface;
  subscribers: SubscribersInterface;
  common: CommonInterface;
}

export interface TabConfigObjectInterface {
  id: number;
  title: string;
  count: number;
  data: any[];
}
