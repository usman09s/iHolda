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
    deletePaymentAccount: (state, action) => {
      const accountValue = action.payload;
      if (
        state.cartpoSettings &&
        state.cartpoSettings.setting &&
        state.cartpoSettings.setting.paymentMethod
      ) {
        const paymentAccountArray = state.cartpoSettings.setting.paymentMethod;
        const indexToDelete = paymentAccountArray.filter(item => item.account !== accountValue);
        if (indexToDelete !== -1) {
          console.log(indexToDelete);
          const updatedPaymentAccount = [...indexToDelete];
          state.cartpoSettings.setting.paymentMethod = updatedPaymentAccount;
        }
      }
    },
    setPaymentAccount: (state, action) => {
      if (state.cartpoSettings && state.cartpoSettings.setting) {
        state.cartpoSettings.setting.paymentMethod = action.payload;
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
