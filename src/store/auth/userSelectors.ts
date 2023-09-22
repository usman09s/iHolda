import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { getMonthAndYear } from 'utils/helpers';

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

export const profileImageSelector = createSelector(userSelector, user => user.userImage);

export const userCommonInformationSelector = createSelector(userSelector, user => ({
  id: user.user?.id,
  phone: user.phone || '',
  avatar: user.userImage || '',
  username: user.username || '',
  invitedBy: user.user?.invited_by?.user?.username,
  joinedMonthAndYear: getMonthAndYear(user.user?.created_at || ''),
}));
