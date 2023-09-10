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
