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
};

const initialState: UserState = {
  phone: '',
  access_token: '',
  refresh_token: '',
  query_id: '',
  userImage: '',
  username: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserState>) => {
      state = { ...state, ...action.payload };
      if (action.payload.user?.user_profile_image?.image) {
        state.userImage = action.payload.user?.user_profile_image.image;
      }

      if (action.payload.user?.user?.username) {
        state.username = action.payload.user?.user.username;
      }

      return state;
    },

    setUserImageAndUsername: (
      state,
      action: PayloadAction<{ username: string; image: string }>,
    ) => {
      state = { ...state, userImage: action.payload.image, username: action.payload.username };

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

export const { setUserInfo, setUserImageAndUsername, setTokensAndQueryId } = userSlice.actions;

export default userSlice.reducer;
