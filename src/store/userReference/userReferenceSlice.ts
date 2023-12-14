import { createSlice } from '@reduxjs/toolkit';

const userReferenceSlice = createSlice({
  name: 'user',
  initialState: {
    gender: null,
    verificationData: {},
    referenceUsers: [],
    searchUsers: [],
  },
  reducers: {
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setVerificationData: (state, action) => {
      state.verificationData = action.payload;
    },
    setReferences: (state, action) => {
      if (action.payload === null) {
        state.referenceUsers = [];
      } else {
        const { index, data } = action.payload;
        if (state.referenceUsers.length === 2) {
          state.referenceUsers[index] = data;
        } else {
          state.referenceUsers.push(data);
        }
      }
    },
    setSearchUsers: (state, action) => {
      state.searchUsers = action.payload;
    },
    deleteReferenceUser: (state, action) => {
      const indexToRemove = action.payload;
      if (indexToRemove >= 0 && indexToRemove < state.referenceUsers.length) {
        state.referenceUsers.splice(indexToRemove, 1);
      }
    },
  },
});

export const {
  setGender,
  setVerificationData,
  setReferences,
  setSearchUsers,
  deleteReferenceUser, // Add the deleteReferenceUser action
} = userReferenceSlice.actions;

export default userReferenceSlice.reducer;
