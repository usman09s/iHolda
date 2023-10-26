import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { User } from 'types/AuthTypes';

export type UserState = {
  user?: User;
  phone: string;
  query_id: string;
  username?: string;
  userImage?: string;
  access_token: string;
  refresh_token: string;
  countryCode: string;
};

const initialState: UserState = {
  phone: '',
  access_token: '',
  refresh_token: '',
  query_id: '',
  userImage: '',
  username: '',
  countryCode: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<User>) => {
      state = {
        ...state,
        user: action.payload,
      };
      return state;
    },

    setUserImageAndUsername: (
      state,
      action: PayloadAction<{ username: string; image: string }>,
    ) => {
      state = { ...state, userImage: action.payload.image, username: action.payload.username };

      return state;
    },

    setCountryCode: (state, action: PayloadAction<{ countryCode: string; phone: string }>) => {
      state = { ...state, countryCode: action.payload.countryCode, phone: action.payload.phone };

      return state;
    },

    setTokensAndQueryId: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string; queryId: string }>,
    ) => {
      state = {
        ...state,
        query_id: action.payload.queryId,
        access_token: action.payload.accessToken,
        refresh_token: action.payload.refreshToken,
      };

      return state;
    },
  },
});

export const { setUserInfo, setUserImageAndUsername, setTokensAndQueryId, setCountryCode } =
  userSlice.actions;

export default userSlice.reducer;
