import { createSlice } from '@reduxjs/toolkit';

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
      state.userTransactions = action.payload;
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
    deletePaymentAccount: (state, action) => {
      const discountIdToDelete = action.payload;
      console.log(discountIdToDelete, 'popopopo');
      state.cartpoSettings.setting.paymentMethod =
        state.cartpoSettings.setting.paymentMethod.filter(
          discount => discount.account !== discountIdToDelete,
        );
    },
    setPaymentAccount: (state, action) => {
      if (state.cartpoSettings && state.cartpoSettings.setting) {
        state.cartpoSettings.setting.paymentMethod = action.payload;
      }
    },
    setDiscount: (state, action) => {
      if (state.cartpoSettings && state.cartpoSettings.setting) {
        state.cartpoSettings.setting.discounts = action.payload;
      }
    },
    setSelectedDiscount: (state, action) => {
      state.selectedDiscount = action.payload;
    },
    deleteDiscount: (state, action) => {
      const discountIdToDelete = action.payload;
      console.log(discountIdToDelete, 'popopopo');
      state.cartpoSettings.setting.discounts = state.cartpoSettings.setting.discounts.filter(
        discount => discount._id !== discountIdToDelete,
      );
    },
    updateDiscount: (state, action) => {
      const { updatedDetails } = action.payload;
      const selectedDiscount = state.cartpoSettings.setting.discounts.find(
        discount => discount._id === state.selectedDiscount,
      );

      if (selectedDiscount) {
        Object.assign(selectedDiscount, updatedDetails);
      }
    },
    setShopData: (state, action) => {
      state.cartpoSettings.shop = action.payload;
    },
    setMenuData: (state, action) => {
      console.log(action.payload, 'actionpayload');
      if (
        state.cartpoSettings &&
        state.cartpoSettings.setting.shop &&
        state.cartpoSettings.setting.shop.menu
      ) {
        state.cartpoSettings.setting.shop.menu = action.payload;
      }
    },
    deleteMenuItem: (state, action) => {
      const itemIdToDelete = action.payload;
      state.cartpoSettings.setting.shop.menu = state.cartpoSettings.setting.shop.menu.filter(
        item => item._id !== itemIdToDelete,
      );
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
  deletePaymentAccount,
  setPaymentAccount,
  setWalletBalance,
  setCalculatorAmount,
  setSelectedDiscount,
  deleteDiscount,
  setSelectedPayment,
  setDiscount,
  setShopData,
  setMenuData,
  setSelectedMenuItem,
  deleteMenuItem,
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
