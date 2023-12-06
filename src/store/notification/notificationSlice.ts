import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    data: [],
    selectedNotification: null,
  },
  reducers: {
    setNotifications: (state, action) => {
      state.data = action.payload;
    },
    selectNotification: (state, action) => {
      state.selectedNotification = action.payload;
    },
  },
});

export const { setNotifications, selectNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
