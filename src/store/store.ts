import { configureStore } from '@reduxjs/toolkit';

import agentPlasticSlice from './agentPlastic/agentPlasticSlice';
import userSlice from './auth/userSlice';
import momentsSlice from './moments/momentsSlice';
import plasticSlice from './plastic/plasticSlice';
import userPlasticSlice from './plastic/userPlasticSlice';
import cartpoSlice from './cartpo/calculateSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    moments: momentsSlice,
    plastic: plasticSlice,
    agentPlastic: agentPlasticSlice,
    userPlastic: userPlasticSlice,
    calculator: cartpoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
