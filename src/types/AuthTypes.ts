import { AuthStackParamList } from 'modules/auth/AuthStackNavigator';

export type _User = {
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
  countryCode: string;
  fcmToken: string;
};

export type CountryCodeType = {
  name: string;
  phone: string;
  emoji: string;
};

export type SignUpResponse = {
  access_token: string;
  date_joined: string;
  date_of_birth?: string;
  date_updated: string;
  email?: string;
  first_name?: string;
  gender: string;
  id: number;
  is_active: boolean;
  is_online: boolean;
  is_referred: boolean;
  is_verified: boolean;
  last_login?: string;
  last_logout?: string;
  last_name?: string;
  max_referrals: number;
  otp: number;
  phone: string;
  query_id: string;
  refresh_token: string;
  username: string;
};

// NEW API
export type AuthStackParamKeys = keyof AuthStackParamList;

export type VerifyPhoneBeforeRegisterResponse = {
  message: string;
  data?: {
    otp: string;
  };
  navigateTo?: AuthStackParamKeys;
};

export enum VerifyPhoneBeforeRegisterMessage {
  OTP_GENERATED_SUCCESSFULLY = 'OTP generated successfully',
  PHONE_NUMBER_IS_EXIST = 'phone number is already registered',
}

export enum VerifyOTPMessage {
  OTP_VERIFIED_USER_NOT_REGISTERED = 'otp verified but user is not registered',
  OTP_NOT_FOUND = 'OTP not found',
}

export type VerifyOTPResponse = {
  message: string;
  navigateTo?: AuthStackParamList;
};

export type SignInResponseType = {
  message: string;
  data: SignInResponseDataType;
};

export type SignInResponseDataType = {
  isReferred: boolean;
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type User = {
  _id: string;
  userName: string;
  firstName: string;
  lastName: string;
  phone: string;
  dob: string;
  gender: string;
  photo: string;
  email: string;
  role: string;
  isActive: boolean;
  address: string;
  fcmTokens: string[];
  online: boolean;
  followers: string[];
  following: string[];
  bookmarks: string[];
  userQrCode: string;
  dateJoined: string;
  lastLogin: string;
  lastLogout: string;
  isReferred: boolean;
  referralCode: string;
  createdAt: string;
  updatedAt: string;
  location: Location;
  __v: number;
};

export type LocationType = {
  type: string;
  coordinates: number[];
};
