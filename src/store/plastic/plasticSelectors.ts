import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

type PlasticRootState = Pick<RootState, 'plastic'>;

export const plasticSelector = (state: PlasticRootState) => state.plastic;

export const plasticSizeSelector = (state: RootState) => state.plastic.plasticSizes || [];

export const plasticCountTotalSelector = createSelector(plasticSizeSelector, plasticSizes => {
  let sum = 0;

  plasticSizes.forEach(plastic => {
    sum += plastic.count;
  });

  return sum;
});
