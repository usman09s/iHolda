import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { User } from 'types/AuthTypes';

export type UserState = {
  user?: User;
  phone: string;
  query_id: string;
  access_token: string;
  refresh_token: string;
};

const initialState: UserState = {
  phone: '',
  access_token: '',
  refresh_token: '',
  query_id: '',
};

export const useSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserState>) => {
      state = action.payload;

      return state;
    },
  },
});

export const { setUserInfo } = useSlice.actions;

export default useSlice.reducer;
