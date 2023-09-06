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

export const addedPlasticSelector = createSelector(plasticSelector, plastics =>
  plastics.plasticSizes
    .map(plastic => ({
      ...plastic,
      price: plastic.count * Number(plastic.price_per_plastic) || 0,
    }))
    .filter(plastic => plastic.count > 0),
);

export const addedPlasticTotalPriceSelector = createSelector(
  addedPlasticSelector,
  addedPlastics => {
    let price = 0;

    addedPlastics.forEach(plastic => {
      price += plastic.price;
    });

    return price;
  },
);

export const plasticIdSelector = createSelector(plasticSelector, plastic => plastic.plasticId);
