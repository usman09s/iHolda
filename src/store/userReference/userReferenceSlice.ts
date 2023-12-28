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
      const newSearchUsers = Array.isArray(action.payload)
        ? action.payload.filter(newUser => {
            return !state.searchUsers.some(existingUser => existingUser._id === newUser._id);
          })
        : [];

      state.searchUsers = [...state.searchUsers, ...newSearchUsers];
    },
    setSearchTextUsers: (state, action) => {
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
  deleteReferenceUser,
  setSearchTextUsers,
} = userReferenceSlice.actions;

export default userReferenceSlice.reducer;
