import { createSelector, createSlice } from '@reduxjs/toolkit';

const cartpoSlice = createSlice({
  name: 'calculator',
  initialState: {
    selectedOption: 'direct',
    calculatorAmount: '',
    phoneNumber: '',
    password: '',
    userData: [],
    userTransactions: [],
    cartpoSettings: [],
    walletBalance: [],
    selectedDiscount: [],
    selectedPayment: [],
    selectedMenuItem: [],
    paymentValue: '',
    queryId: '',
    accessToken: '',
    refreshToken: '',
  },
  reducers: {
    setSelectedOption: (state, action) => {
      state.selectedOption = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setUserTransactions: (state, action) => {
      state.userTransactions = [...state.userTransactions, ...action.payload];
    },
    clearUserTransactions: state => {
      state.userTransactions = [];
    },
    setCartpoSettings: (state, action) => {
      state.cartpoSettings = action.payload;
    },
    setWalletBalance: (state, action) => {
      state.walletBalance = action.payload;
    },
    setCalculatorAmount: (state, action) => {
      state.calculatorAmount = action.payload;
    },
    setSelectedPayment: (state, action) => {
      state.selectedPayment = action.payload;
    },
    setSelectedMenuItem: (state, action) => {
      console.log(action.payload, 'redux');
      state.selectedMenuItem = action.payload;
    },
    setPaymentAccount: (state, action) => {
      console.log(action.payload, 'setPaymentAccount');
      if (state.cartpoSettings && state.cartpoSettings.setting) {
        state.cartpoSettings.setting.paymentMethod = action.payload;
      }
    },
    setDiscount: (state, action) => {
      console.log(action.payload);
      if (state.cartpoSettings && state.cartpoSettings.setting) {
        state.cartpoSettings.setting.discounts = action.payload;
      }
    },
    setSelectedDiscount: (state, action) => {
      state.selectedDiscount = action.payload;
    },
    setShopData: (state, action) => {
      state.cartpoSettings.shop = action.payload;
    },
    setMenuData: (state, action) => {
      if (
        state.cartpoSettings &&
        state.cartpoSettings.setting.shop &&
        state.cartpoSettings.setting.shop.menu
      ) {
        state.cartpoSettings.setting.shop.menu = action.payload;
      }
    },
    setPaymentValue: (state, action) => {
      state.paymentValue = action.payload;
    },
    deleteMenuItem: (state, action) => {
      const itemIdToDelete = action.payload;
      state.cartpoSettings.setting.shop.menu = state.cartpoSettings.setting.shop.menu.filter(
        item => item._id !== itemIdToDelete,
      );
    },

    setTokensAndQueryId: (state, action) => {
      state.queryId = action.payload.queryId;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const {
  setSelectedOption,
  setPhoneNumber,
  setPassword,
  setUserData,
  setUserTransactions,
  setCartpoSettings,
  setPaymentAccount,
  setWalletBalance,
  setCalculatorAmount,
  setSelectedDiscount,
  setSelectedPayment,
  setDiscount,
  setShopData,
  setMenuData,
  setSelectedMenuItem,
  deleteMenuItem,
  setTokensAndQueryId,
  updateDiscount,
  setPaymentValue,
  clearUserTransactions,
} = cartpoSlice.actions;

export default cartpoSlice.reducer;
export const selectSelectedOption = state => state.calculator.selectedOption;
export const selectPhoneNumber = state => state.calculator.phoneNumber;
export const selectPassword = state => state.calculator.password;
export const selectUserData = state => state.calculator.userData;
export const selectUserTransactions = state => state.calculator.userTransactions;
export const selectCartpoSettings = state => state.calculator.cartpoSettings;
export const selectWalletBalance = state => state.calculator.walletBalance;
export const selectCalculatorAmount = state => state.calculator.calculatorAmount;
export const selectSelectedDiscount = state => state.calculator.selectedDiscount;
export const selectSelectedPayment = state => state.calculator.selectedPayment;
export const selectSelectedMenuItem = state => state.calculator.selectedMenuItem;
export const queryIdSelector = state => state.calculator.userData.query_id;
export const selectPaymentValue = state => state.paymentValue;

export const tokensSelector = createSelector(selectUserData, user => ({
  token: user.access_token,
  refreshToken: user.refresh_token,
}));
