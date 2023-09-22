export type CommunityRankItemType = {
  points: string;
  position: number;
  prev_points: string;
  community_points: string;
  prev_virtual_money: string;
  rank: number;
  user: User;
  virtual_money: string;
};

export type RankItemType = {
  point: string;
  avatar: string;
  position: number;
  username: string;
  userId: string | number;
  pointStatus: 'UP' | 'DOWN' | 'STABLE';
};

export type User = {
  friends: [];
  id: number;
  invited_by: InvitedBy;
  location_name: string;
  user: UserDetails;
  user_profile_image: UserProfileImage;
};

export type InvitedBy = {
  date_of_birth: string;
  email: string;
  first_name: string;
  gender: string;
  id: number;
  is_active: boolean;
  is_online: boolean;
  last_name: string;
  phone: string;
  query_id: string;
  username: string;
};

export type UserDetails = {
  date_of_birth: string;
  email: string;
  first_name: string;
  gender: string;
  id: number;
  is_active: boolean;
  is_online: boolean;
  last_name: string;
  phone: string;
  query_id: string;
  username: string;
};

export type UserProfileImage = {
  id: number;
  image: string;
  uploaded_at: string;
};
