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
import mime from 'mime';
import * as SecureStore from 'expo-secure-store';

export const useCartpoActions = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const phoneNumberSelect = useSelector(selectPhoneNumber);
  const settingsData = useSelector(selectCartpoSettings);
  const [cityCountry, setCityCountry] = useState();
  const [lat, setLat] = useState(settingsData?.setting?.shop?.location?.coordinates[1]);
  const [lng, setLng] = useState(settingsData?.setting?.shop?.location?.coordinates[0]);
  const [isLoading, setLoading] = useState(false);

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
      Toast.show({
        type: 'error',
        text1: 'Invalid Phone Number',
      });
      return;
    }
  };

  const verifyOtp = async (values: any) => {
    console.log(values.otp);
    try {
      const response = await fetch('http://ihold.yameenyousuf.com/api/otp/verify', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          otp: values.otp,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const result = await response.json();

      if (result.message === VerifyOTPMessage.OTP_VERIFIED_USER_NOT_REGISTERED) {
        navigation.navigate('CreatePin');
      } else {
        console.log('Result:', result);
      }
    } catch (error) {
      console.error('Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Invalid OTP',
      });
    }
  };

  const handlePinSubmit = async (values: any) => {
    try {
      const result = await Api.registerMerchant({ phone: phoneNumberSelect, password: values.pin });
      if (result.message === 'Register successful') {
        dispatch(setUserData(result.data));
        SecureStore.setItemAsync(
          'tokensAndQueryId',
          JSON.stringify({
            queryId: result.query_id,
            accessToken: result.access_token,
            refreshToken: result.refresh_token,
          }),
        );
        Api.setQueryIdValue(result.query_id);
        navigation.reset({
          index: 0,
          routes: [{ name: 'CartpoTab' as never }],
        });
      } else {
        console.log('Result:', result);
      }
    } catch (error) {
      const errorText = JSON.parse(error.message);
      Toast.show({
        type: 'error',
        text1: errorText.message,
      });
    }
  };

  const handleLoginSubmit = async (values: any) => {
    try {
      const result = await Api.loginMerchant({ phone: phoneNumberSelect, password: values.pin });
      if (result.message === 'Login successful') {
        dispatch(setUserData(result.data));
        dispatch(setCartpoSettings([]));
        SecureStore.setItemAsync(
          'tokensAndQueryId',
          JSON.stringify({
            queryId: result.query_id,
            accessToken: result.access_token,
            refreshToken: result.refresh_token,
          }),
        );
        Api.setQueryIdValue(result.query_id);
        navigation.reset({
          index: 0,
          routes: [{ name: 'CartpoTab' }],
        });
      } else {
        console.log('Result:', result);
      }
    } catch (error) {
      const errorText = JSON.parse(error.message);
      console.log(errorText);
      if (errorText.message === 'User role mismatched') {
        Toast.show({
          type: 'error',
          text1: 'Please login with a Merchant Account',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Invalid Pin',
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
      location: { coordinates: [location.coords.longitude, location.coords.latitude] },
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
    const apiUrl = 'http://ihold.yameenyousuf.com/api/cartpo/balance';
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {},
      });
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const result = await response.json();
      dispatch(setWalletBalance(result.data));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleWithdraw = async amount => {
    const result = await Api.withdrawBalance({ amount: parseInt(amount) });
    console.log(result.message, 'lklklk');
    if (result.ok) {
      navigation.navigate('WithdrawSuccessful', { amount });
    }
    Toast.show({
      type: 'error',
      text1: 'Unexpected Error Occurred',
    });
  };

  const handleSettingsSubmit = async values => {
    setLoading(true);
    console.log(values, 'values');
    if (!values.selectedDays) {
      Toast.show({
        type: 'error',
        text1: 'Please fill all of the required fields',
      });
      return;
    }
    if (!cityCountry && !values.address) {
      Toast.show({
        type: 'error',
        text1: 'Please enter your address',
      });
      return;
    }
    if (!values.openHours || !values.closeHours) {
      Toast.show({
        type: 'error',
        text1: 'Please enter opening and closing hours',
      });
      return;
    }
    const formData = new FormData();
    formData.append('name', values.name.trim());
    formData.append('description', values.about);
    values.selectedDays.forEach((day, index) => {
      formData.append(`opening[days][${index}]`, day);
    });
    formData.append('opening[from]', values.openHours);
    formData.append('opening[to]', values.closeHours);
    formData.append('address', cityCountry ? cityCountry : values.address);
    formData.append('phone', values.phoneNumber);
    formData.append('location[type]', 'Point');
    formData.append(
      'location[coordinates][0]',
      settingsData?.setting?.shop?.location?.coordinates[0]
        ? settingsData?.setting?.shop?.location?.coordinates[0]
        : lng,
    );
    formData.append(
      'location[coordinates][1]',
      settingsData?.setting?.shop?.location?.coordinates[1]
        ? settingsData?.setting?.shop?.location?.coordinates[1]
        : lat,
    );

    if (values.coverImage && values.coverImage.startsWith('file')) {
      const imageObject: any = {
        name: values.coverImage.split('/').pop(),
        type: mime.getType(values.coverImage),
        uri: values.coverImage,
      };
      formData.append(`coverImage`, imageObject);
    }

    if (values.featuredImages) {
      for (let i = 0; i < values.featuredImages.length; i++) {
        if (values.featuredImages[i].mediaId) {
          formData.append(`photos[${i}][mediaId]`, values.featuredImages[i].mediaId);
          formData.append(`photos[${i}][mediaType]`, values.featuredImages[i].mediaType || 'jpeg');
        } else {
          const imageUri = values.featuredImages[i];
          const imageObject = {
            name: imageUri.split('/').pop(),
            type: mime.getType(imageUri),
            uri: imageUri,
          };
          formData.append(`photos`, imageObject);
        }
      }
    }

    console.log(formData, 'FORM DATA');
    try {
      setLoading(false);
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
      handleGetCartpoSettings();
      navigation.goBack();
    } catch (error) {
      setLoading(false);
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
    isLoading,
  };
};
