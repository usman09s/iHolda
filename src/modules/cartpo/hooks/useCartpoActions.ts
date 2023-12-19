import { useState } from 'react';
import { useMutation } from 'react-query';
import Api from 'services/Api';
import { useNavigation } from '@react-navigation/native';
import {
  selectPhoneNumber,
  setCartpoSettings,
  setDiscount,
  setPaymentAccount,
  setPhoneNumber,
  setShopData,
  setUserData,
  setUserTransactions,
  setWalletBalance,
} from 'store/cartpo/calculateSlice';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import { VerifyOTPMessage } from 'types/AuthTypes';
import { selectCartpoSettings } from '../../../store/cartpo/calculateSlice';
import Toast from 'react-native-toast-message';
import wretch from 'wretch';

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
    console.log(values);
    try {
      const result = await Api.verifyOtp(values.otp);
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
      discounts: [...settingsData.setting.discounts],
    });
    console.log(result);
    dispatch(setPaymentAccount(result.data.paymentMethod));
    Toast.show({
      type: 'success',
      text1: 'Payment Account Added',
    });
    navigation.goBack();
  };

  const handleAddDiscount = async values => {
    console.log(values);
    const addDiscount = {
      percentage: values.discountPercentage,
      condition: values.discountCondition,
      people: values.minimumUsers,
    };

    const result = await Api.updateCartpoSettings({
      paymentMethod: [...settingsData.setting.paymentMethod],
      discounts: [...settingsData.setting.discounts, addDiscount],
    });
    console.log('API RESPONSE: ', result);
    dispatch(setDiscount(result.data.discounts));
    Toast.show({
      type: 'success',
      text1: 'Discount Added',
    });
    navigation.goBack();
  };

  const handleDeleteDiscount = async () => {
    const result = await Api.updateCartpoSettings({
      paymentMethod: [...settingsData.setting.paymentMethod],
      discounts: [...settingsData.setting.discounts],
    });
    navigation.goBack();
    console.log(result);
    Toast.show({
      type: 'success',
      text1: 'Discount Deleted',
    });
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
    console.log(values);

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.about);
    formData.append('opening[days][0]', 'Monday');
    formData.append('opening[days][1]', 'Friday');
    formData.append('opening[from]', values.openHours);
    formData.append('opening[to]', values.closeHours);
    formData.append('address', cityCountry);
    formData.append('phone', values.phoneNumber);

    if (settingsData && settingsData.setting && settingsData.setting.shop) {
      formData.append('location[type]', settingsData.setting.shop.location.type);
    } else {
      console.error('Error: settingsData.location.type is undefined');
      return;
    }

    if (
      settingsData &&
      settingsData.setting.shop &&
      Array.isArray(settingsData.setting.shop.location.coordinates) &&
      settingsData.setting.shop.location.coordinates.length === 2
    ) {
      formData.append(
        'location[coordinates][0]',
        settingsData.setting.shop.location.coordinates[0],
      );
      formData.append(
        'location[coordinates][1]',
        settingsData.setting.shop.location.coordinates[1],
      );
    } else {
      console.error('Error: Invalid or missing settingsData.location.coordinates');
      return;
    }

    if (values.coverImage && values.coverImage.startsWith('file')) {
      formData.append('coverImage', values.coverImage);
    }

    if (values.featuredImages) {
      for (let i = 0; i < values.featuredImages.length; i++) {
        if (values.featuredImages[i].mediaId) {
          formData.append(`photos[${i}][mediaId]`, values.featuredImages[i].mediaId);
          formData.append(`photos[${i}][mediaType]`, 'jpeg');
        }
      }
    }

    console.log(formData, 'FORM DATA');
    try {
      const response = await fetch('http://ihold.yameenyousuf.com/api/cartpo/shop', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API request failed:', response.status, errorData);
        return;
      }
      const result = await response.json();
      console.log('API Response:', result);
      dispatch(setShopData(result));
    } catch (error) {
      console.error('Error sending API request:', error.message);
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
    handleAddDiscount,
    handleDeleteDiscount,
  };
};
