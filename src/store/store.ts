import { configureStore } from '@reduxjs/toolkit';

import agentPlasticSlice from './agentPlastic/agentPlasticSlice';
import userSlice from './auth/userSlice';
import plasticSlice from './plastic/plasticSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    plastic: plasticSlice,
    agentPlastic: agentPlasticSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
