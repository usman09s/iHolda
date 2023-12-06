import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  invitedInvitees: [],
  pendingInvitees: [],
};

const inviteeSlice = createSlice({
  name: 'invitee',
  initialState,
  reducers: {
    setInvitees: (state, action) => {
      state.invitedInvitees = action.payload.invitedInvitees;
      state.pendingInvitees = action.payload.pendingInvitees;
    },
  },
});

export const { setInvitees } = inviteeSlice.actions;
export const selectInvitedInvitees = state => state.invitee.invitedInvitees;
export const selectPendingInvitees = state => state.invitee.pendingInvitees;

export default inviteeSlice.reducer;
