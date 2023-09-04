import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

type UserRootState = Pick<RootState, 'user'>;

export const userSelector = (state: UserRootState) => state.user;
export const userPhoneSelector = (state: UserRootState) => state.user.phone;

export const queryIdSelector = (state: UserRootState) => state.user.query_id;

export const tokensSelector = createSelector(userSelector, user => ({
  token: user.access_token,
  refreshToken: user.refresh_token,
}));

export const userImageSelector = (state: UserRootState) => state.user.userImage;
export const usernameSelector = (state: UserRootState) => state.user.username;
