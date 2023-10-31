import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const initialState = {
  data: null,
  error: null,
  qrCode: null,
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
    setQrCode: (state, action) => {
      state.qrCode = action.payload;
    },
  },
});

const selectUserPlasticData = state => state.userPlastic.data;

const selectQrCode = state => state.userPlastic.qrCode;

export const selectQrCodeData = createSelector([selectQrCode], qrCode => qrCode);

export const selectUserPlasticDataState = createSelector([selectUserPlasticData], data => data);

export const { setPlasticSupplyData, setError, setQrCode } = userPlasticSlice.actions;

export default userPlasticSlice.reducer;
