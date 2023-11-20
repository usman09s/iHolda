import { createSlice, createSelector } from '@reduxjs/toolkit';

const cartpoSlice = createSlice({
  name: 'calculator',
  initialState: {
    selectedOption: 'direct',
  },
  reducers: {
    setSelectedOption: (state, action) => {
      state.selectedOption = action.payload;
    },
  },
});

export const { setSelectedOption } = cartpoSlice.actions;

export default cartpoSlice.reducer;

export const selectSelectedOption = state => state.calculator.selectedOption;
