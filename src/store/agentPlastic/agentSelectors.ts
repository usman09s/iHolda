import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

type AgentPlasticRootState = Pick<RootState, 'agentPlastic'>;

export const agentPlasticSelector = (state: AgentPlasticRootState) => state.agentPlastic;

export const agentPlasticSizeSelector = (state: RootState) => state.agentPlastic.plasticSizes || [];

export const agentPlasticCountTotalSelector = createSelector(
  agentPlasticSizeSelector,
  plasticSizes => {
    let sum = 0;

    plasticSizes.forEach(plastic => {
      sum += plastic.count;
    });

    return sum;
  },
);

export const addedPlasticSelector = createSelector(agentPlasticSelector, plastics =>
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

export const plasticIdSelector = createSelector(agentPlasticSelector, plastic => plastic.plasticId);
export const upcomingDropOffs = createSelector(
  agentPlasticSelector,
  plastic => plastic.upcomingDropOffs,
);
