import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

type momentsRootState = Pick<RootState, 'moments'>;

export const momentsSelector = (state: momentsRootState) => state.moments;

export const allMomentsSelector = createSelector(momentsSelector, moments => moments.moments);

export const captionSelector = createSelector(momentsSelector, moments => moments.caption);

export const selectedMomentSelector = createSelector(
  momentsSelector,
  moments => moments.selectedMoment,
);

export const matchedUserSelector = createSelector(momentsSelector, moments => moments.matchedUser);
export const moodSelector = createSelector(momentsSelector, moments => moments.mood);
export const meetupIdSelector = createSelector(momentsSelector, moments => moments.meetupId);

export const postMomentsParamsSelector = createSelector(
  allMomentsSelector,
  captionSelector,
  meetupIdSelector,
  moodSelector,
  (moments, caption, meetupId = 0, mood) => ({
    caption,
    meetupId,
    moments: moments.map(moment => ({ file: moment.localUri, type: moment.type })),
    mood,
  }),
);
