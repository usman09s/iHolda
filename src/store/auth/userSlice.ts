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

export const useSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserState>) => {
      state = action.payload;
      if (action.payload.user?.user_profile_image?.image) {
        state.userImage = action.payload.user?.user_profile_image.image;
      }

      if (action.payload.user?.user.username) {
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
  },
});

export const { setUserInfo, setUserImageAndUsername } = useSlice.actions;

export default useSlice.reducer;
