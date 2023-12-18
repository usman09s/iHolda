import { useState } from 'react';
import { useMutation } from 'react-query';
import Api from 'services/Api';
import { useNavigation } from '@react-navigation/native';
import {
  selectPhoneNumber,
  setCartpoSettings,
  setPaymentAccount,
  setPhoneNumber,
  setUserData,
  setUserTransactions,
  setWalletBalance,
} from 'store/cartpo/calculateSlice';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import { VerifyOTPMessage } from 'types/AuthTypes';
import { selectCartpoSettings } from '../../../store/cartpo/calculateSlice';
import Toast from 'react-native-toast-message';

export const useCartpoActions = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const phoneNumberSelect = useSelector(selectPhoneNumber);
  const settingsData = useSelector(selectCartpoSettings);
  console.log(settingsData?.setting);
  const [cityCountry, setCityCountry] = useState();
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  const handleSubmit = async (values: any) => {
    let { phoneNumber } = values;
    phoneNumber = phoneNumber.substring(1);

    dispatch(setPhoneNumber(phoneNumber));
    try {
      const result = await Api.verifyPhoneBeforeRegister({
        phone: phoneNumber,
      });
      console.log(result, 'lklklklklklk');
      if (result.navigateTo === 'ConfirmOtp') {
        navigation.navigate(result.navigateTo, { otp: result.data.otp });
        return;
      }
      if (result.navigateTo === 'SignIn') {
        navigation.navigate('SignIn');
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const verifyOtp = async (values: any) => {
    try {
      const result = await Api.verifyOtp(values.otp); // Replace with your actual API call
      if (result.message === VerifyOTPMessage.OTP_VERIFIED_USER_NOT_REGISTERED) {
        navigation.navigate('CreatePin');
      } else {
        console.log('Result:', result);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePinSubmit = async (values: any) => {
    try {
      const result = await Api.registerMerchant({ phone: phoneNumberSelect, password: values.pin });
      if (result.message === 'Register successful') {
        dispatch(setUserData(result.data));
        navigation.reset({
          index: 0,
          routes: [{ name: 'CartpoTab' as never }],
        });
      } else {
        console.log('Result:', result);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLoginSubmit = async (values: any) => {
    try {
      const result = await Api.loginMerchant({ phone: phoneNumberSelect, password: values.pin });
      if (result.message === 'Login successful') {
        dispatch(setUserData(result.data));
        dispatch(setCartpoSettings([]));
        navigation.reset({
          index: 0,
          routes: [{ name: 'CartpoTab' }],
        });
      } else {
        console.log('Result:', result);
      }
    } catch (error) {
      const errorText = JSON.parse(error.message);
      if (errorText.message === 'User role mismatched') {
        Toast.show({
          type: 'error',
          text1: 'Please login with a Merchant Account',
        });
      } else if (errorText.message === 'Invalid password') {
        Toast.show({
          type: 'error',
          text1: 'Invalid password',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Unexpected error occurred',
        });
      }
    }
  };

  const handleLocationPress = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLat(location.coords.latitude);
    setLng(location.coords.longitude);
    const updatedUserData = {
      ...settingsData,
      location: { coordinates: [location.coords.latitude, location.coords.longitude] },
    };
    dispatch(setCartpoSettings(updatedUserData));
    getCityCountry();
  };

  const getCityCountry = async () => {
    const name = await Location.reverseGeocodeAsync({
      latitude: lat,
      longitude: lng,
    });
    console.log(name);
    setCityCountry(`${name[0].district}, ${name[0].city}, ${name[0].country}`);
  };

  const handleGetTransactions = async () => {
    try {
      const result = await Api.getTransactions(1);
      if (result.message === 'Login successful') {
        dispatch(setUserTransactions(result.data));
      } else {
        console.log('Result:', result);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleGetCartpoSettings = async () => {
    try {
      const result = await Api.getCartpoSettings();
      if (result.message === 'cartpo setting data') {
        dispatch(setCartpoSettings(result.data));
      } else {
        console.log('Result:', result);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleAddPayment = async values => {
    console.log(values);
    const paymentMethod = {
      account: values.account,
      bank: values.accountType,
      accountType: 'cash',
    };

    const result = await Api.updateCartpoSettings({
      paymentMethod: [...settingsData.setting.paymentMethod, paymentMethod],
    });
    console.log(result);
    dispatch(setPaymentAccount(result.data.paymentMethod));
    navigation.goBack();
  };

  const handleDeletePayment = async () => {
    console.log(settingsData.setting.paymentMethod, 'plplplplpl');
    const result = await Api.updateCartpoSettings({
      paymentMethod: settingsData.setting.paymentMethod,
    });
    navigation.goBack();
    Toast.show({
      type: 'success',
      text1: 'Payment Account Deleted',
    });
  };

  const handleGetWallet = async () => {
    const result = await Api.getWalletBalance();
    console.log(result, 'wallet');
    dispatch(setWalletBalance(result.data));
  };

  const handleWithdraw = async amount => {
    const result = await Api.withdrawBalance({ amount: amount });
    console.log(result.message, 'lklklk');
    Toast.show({
      type: 'error',
      text1: 'Wallet Balance is low',
    });
    // navigation.navigate('WithdrawSuccessful');
  };

  const handleSettingsSubmit = async values => {
    const formData = new FormData();
    formData.append('name', values.name || 'Restaurant Name');
    formData.append('description', values.about || 'this is description');
    formData.append('opening[days][0]', values.openingDays0 || 'Mon');
    formData.append('opening[days][1]', values.openingDays1 || 'Fri');
    formData.append('opening[from]', values.openHours || '8:00 AM');
    formData.append('opening[to]', values.closeHours || '8:00 PM');
    formData.append('address', cityCountry || 'abcd street');
    formData.append('location[type]', settingsData.location.type);
    formData.append('location[coordinates][0]', settingsData.location.coordinates[0]);
    formData.append('location[coordinates][1]', settingsData.location.coordinates[1]);
    if (values.coverImage) {
      formData.append('coverImage', values.coverImage);
    }
    if (values.featuredImages) {
      for (let i = 0; i < values.featuredImages.length; i++) {
        formData.append(`photos[${i}][mediaId]`, values.featuredImages[i].mediaId);
        formData.append(`photos[${i}][mediaType]`, 'jpeg');
      }
    }
    try {
      const response = await fetch('http://ihold.yameenyousuf.com/api/cartpo/shop', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return {
    handleSubmit,
    verifyOtp,
    handlePinSubmit,
    handleLoginSubmit,
    handleGetTransactions,
    handleGetCartpoSettings,
    handleLocationPress,
    handleSettingsSubmit,
    cityCountry,
    handleAddPayment,
    handleDeletePayment,
    handleGetWallet,
    handleWithdraw,
  };
};
