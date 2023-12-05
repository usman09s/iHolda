import { configureStore } from '@reduxjs/toolkit';
import agentPlasticSlice from './agentPlastic/agentPlasticSlice';
import userSlice from './auth/userSlice';
import momentsSlice from './moments/momentsSlice';
import plasticSlice from './plastic/plasticSlice';
import userPlasticSlice from './plastic/userPlasticSlice';
import cartpoSlice from './cartpo/calculateSlice';
import userReferenceSlice from './userReference/userReferenceSlice';
import notificationSlice from './notification/notificationSlice';
import userDataSlice from './userDataSlice';
import undoable from 'redux-undo';
import inviteeSlice from './settings/inviteeSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    moments: momentsSlice,
    plastic: plasticSlice,
    agentPlastic: agentPlasticSlice,
    userPlastic: userPlasticSlice,
    calculator: cartpoSlice,
    userReference: userReferenceSlice,
    notification: notificationSlice,
    userData: userDataSlice,
    invitee: inviteeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
