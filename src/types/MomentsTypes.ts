import { User as LoginUser } from './AuthTypes';
import { SelectedQA } from './QuizTypes';

export type MomentType = {
  id: number;
  base64: string;
  localUri: string;
  type: 'VIDEO' | 'PHOTO';
};

// export type PostMomentsResponse = {
//   id: number;
//   user_profile_mood: string;
//   met_with: MetWith;
//   met_with_mood: string;
//   caption: string;
//   meeting_count: number;
//   _at: At;
//   location_name: string;
//   moments: [];
//   views: number;
//   viewed_by: [];
//   has_viewed: boolean;
//   likes: number;
//   liked_by: [];
//   forwards: number;
//   forwarded_by: [];
//   is_private: boolean;
//   created_time_ago: string;
//   total_moments: number;
// };

export type PostMomentsResponse = {
  data: { metBefore: boolean; user: LoginUser };
  message: string;
};

export type MetWith = {
  id: number;
  user: User;
  location_name: string;
  invited_by: InvitedBy;
  friends: Friend[];
  user_profile_image: UserProfileImage;
};

export type User = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  email: string;
  phone: string;
  query_id: string;
  is_active: boolean;
  is_online: boolean;
};

export type InvitedBy = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  email: string;
  phone: string;
  query_id: string;
  is_active: boolean;
  is_online: boolean;
};

export type Friend = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  email: string;
  phone: string;
  query_id: string;
  is_active: boolean;
  is_online: boolean;
};

export type UserProfileImage = {
  id: number;
  image: string;
  uploaded_at: string;
};

export type At = {
  latitude: number;
  longitude: number;
  address: Address;
};

export type Address = {
  neighbourhood: string;
  city: string;
  'ISO3166-2-lvl4': string;
  postcode: string;
  country: string;
  country_code: string;
};

export type MatchedUserType = {
  id: number;
  user: LoginUser;
  location_name: string;
  user_profile_image: UserProfileImage;
  metBefore: boolean;
};

export type GetMomentsResponseType = {
  created_at: string;
  file: string;
  file_type: string;
  has_viewed: boolean;
  id: number;
  user_profile: MomentsUserProfile;
};

export type MomentsUserProfile = {
  user: MomentsUser;
};

export type MomentsUser = {
  date_of_birth: string;
  email: string;
  first_name: string;
  gender: string;
  is_active: boolean;
  last_name: string;
  phone: string;
  query_id: string;
  username: string;
};

export type MomentsMoodParams = { matchedUser: MatchedUserType; selectedQA?: SelectedQA[] };

export type PostTypes = 'Video' | 'Audio' | 'Photo' | 'Text';

export type PostScreenParams = { postType: PostTypes; text: string };
