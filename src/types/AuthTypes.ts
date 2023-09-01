export type User = {
  created_at: string;
  friends: [];
  id: number;
  image: Image;
  invited_by: InvitedBy;
  invitees: [];
  is_blood_donor: boolean;
  is_visible: boolean;
  iv: string;
  location?: object;
  location_name: string;
  momo_number: string;
  qr_code: string;
  referral_data?: string;
  updated_at: string;
  user: UserDetails;
  user_media: [];
  user_profile_image: UserProfileImage;
};

export type Image = {
  id: number;
  image: string;
  uploaded_at: string;
};

export type InvitedBy = {
  friends: [];
  id: number;
  invited_by: string;
  location_name: string;
  user: [];
  user_profile_image: [];
};

export type UserDetails = {
  date_joined: string;
  date_of_birth: string;
  date_updated: string;
  email: string;
  first_name: string;
  gender: string;
  id: number;
  is_active: boolean;
  is_online: boolean;
  is_referred: boolean;
  is_verified: boolean;
  last_login: string;
  last_logout: string;
  last_name: string;
  max_referrals: number;
  otp: number;
  phone: string;
  query_id: string;
  username: string;
};

export type UserProfileImage = {
  id: number;
  image: string;
  uploaded_at: string;
};

export type LoginResponse = {
  access_token: string;
  phone: string;
  query_id: string;
  refresh_token: string;
  status: number;
  user: User;
};

export type LoginParameters = {
  pin: string;
  phone: string;
};
