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

export const userImageSelector = (state: UserRootState) => state.user.user?.photo;

export const usernameSelector = (state: UserRootState) => state.user.user?.userName;

export const profileImageSelector = createSelector(userSelector, user => user.userImage);

export const userCommonInformationSelector = createSelector(userSelector, user => ({
  id: user.user?._id,
  phone: user.user?.phone || '',
  avatar: user.user?.photo || '',
  username: user.user?.userName || '',
  fullName:
    `${user.user?.firstName || ''} ${user.user?.lastName || ''}`.trim() ||
    user.user?.userName ||
    '',
  invitedBy: user.user?.invited_by?.user?.username || 'anon',
  joinedMonthAndYear: getMonthAndYear(user.user?.dateJoined || ''),
}));
