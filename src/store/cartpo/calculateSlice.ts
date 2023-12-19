import { createSlice } from '@reduxjs/toolkit';

const cartpoSlice = createSlice({
  name: 'calculator',
  initialState: {
    selectedOption: 'direct',
    calculatorAmount: '',
    phoneNumber: '',
    password: '1000',
    userData: [],
    userTransactions: [],
    cartpoSettings: [],
    walletBalance: [],
    selectedDiscount: [],
    selectedPayment: [],
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
      const selectedDiscount = state.cartpoSettings.discounts.find(
        discount => discount._id === state.selectedDiscount,
      );

      if (selectedDiscount) {
        Object.assign(selectedDiscount, updatedDetails);
      }
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
