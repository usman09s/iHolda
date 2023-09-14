import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { deepEqual } from 'utils/helpers';

type AgentPlasticRootState = Pick<RootState, 'agentPlastic'>;

export const agentPlasticSelector = (state: AgentPlasticRootState) => state.agentPlastic;

export const agentPlasticSizeSelector = (state: RootState) => state.agentPlastic.plasticSizes || [];

export const agentPlasticCountTotalSelector = createSelector(
  agentPlasticSizeSelector,
  plasticSizes => {
    let sum = 0;

    plasticSizes.forEach(plastic => {
      sum += plastic.quantity;
    });

    return sum;
  },
);

export const addedPlasticSelector = createSelector(agentPlasticSelector, plastics =>
  plastics.plasticSizes
    .map(plastic => ({
      ...plastic,
      price: plastic.quantity * Number(plastic.price) || 0,
    }))
    .filter(plastic => plastic.quantity > 0),
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

export const scannedPlasticsSelector = createSelector(
  agentPlasticSelector,
  plastic => plastic.scannedPlastics,
);

export const isChangedPlasticSelector = createSelector(
  agentPlasticSelector,
  scannedPlasticsSelector,
  (plastic, scannedPlastics) => {
    if (!scannedPlastics?.sizes) {
      return true;
    }

    return !deepEqual(plastic.plasticSizes, scannedPlastics?.sizes);
  },
);

export const plasticsOwnerInformationSelector = createSelector(agentPlasticSelector, plastic => ({
  queryId: plastic.queryId,
  plasticId: plastic.plasticId,
  username: plastic.plasticOwner,
}));

export const queryIdSelector = createSelector(agentPlasticSelector, plastic => plastic.queryId);

export const plasticIdSelector = createSelector(agentPlasticSelector, plastic => plastic.plasticId);

export const upcomingDropOffs = createSelector(
  agentPlasticSelector,
  plastic => plastic.upcomingDropOffs,
);
