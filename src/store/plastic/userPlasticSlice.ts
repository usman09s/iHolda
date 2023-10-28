import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const initialState = {
  data: null,
  error: null,
};

const userPlasticSlice = createSlice({
  name: 'userPlastic',
  initialState,
  reducers: {
    setPlasticSupplyData: (state, action) => {
      state.data = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

const selectUserPlasticData = state => state.userPlastic.data;

export const selectUserPlasticDataState = createSelector([selectUserPlasticData], data => data);

export const { setPlasticSupplyData, setError } = userPlasticSlice.actions;

export default userPlasticSlice.reducer;
