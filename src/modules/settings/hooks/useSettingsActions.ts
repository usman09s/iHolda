import { useSelector, useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import Api from 'services/Api';
import * as Clipboard from 'expo-clipboard';
import { clearUser, selectUser, setUser } from 'store/userDataSlice';
import * as Location from 'expo-location';
import { useState } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import wretch from 'wretch';
import { ActionCreators } from 'redux-undo';
import { setInvitees } from 'store/settings/inviteeSlice';
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';

export const useSettingActions = () => {
  const userData = useSelector(selectUser);
  const [profileImage, setProfileImage] = useState();
  const [cityCountry, setCityCountry] = useState<any>('');
  const [lat, setLat] = useState<any>(userData?.location?.coordinates[0]);
  const [lng, setLng] = useState<any>(userData?.location?.coordinates[1]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      aspect: [1, 1],
      quality: 1,
    }).catch(() => null);

    if (!result?.canceled) {
      await setProfileImage(result.assets[0].uri);
      handleUpdateSetting();
    }
  };

  const handleBioChange = value => {
    const updatedUserData = {
      ...userData,
      bio: value,
    };
    dispatch(setUser(updatedUserData));
  };

  const handleSubmit = async values => {
    const { oldPassword, newPassword, confirmPassword } = values;
    const result = await Api.changePassword({
      oldPassword: parseInt(oldPassword),
      newPassword: parseInt(newPassword),
      confirmPassword: parseInt(confirmPassword),
    });
    if (result.message === 'Password updated successfully') {
      Toast.show({
        type: 'success',
        text1: 'Password changed successfully',
      });
      navigation.goBack();
    } else {
      Toast.show({
        type: 'error',
        text1: 'Unexpected error occured',
      });
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
      ...userData,
      location: { coordinates: [location.coords.latitude, location.coords.longitude] },
    };
    dispatch(setUser(updatedUserData));
    handleUpdateSetting();
    getCityCountry();
  };

  const getCityCountry = async () => {
    const name = await Location.reverseGeocodeAsync({
      latitude: lat,
      longitude: lng,
    });
    console.log(name);
    await setCityCountry(`${name[0].city}, ${name[0].country}`);
    const updatedUserData = {
      ...userData,
      address: cityCountry,
    };
    await dispatch(setUser(updatedUserData));
    handleUpdateSetting();
  };

  const handleReferralCopy = async () => {
    await Clipboard.setStringAsync(userData.referralCode);
  };

  const handleDeleteAccount = async () => {
    const result = await Api.deleteAccount();
    console.log(result);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      }),
    );
  };

  const handleNamePress = async values => {
    const trimmedName = values.name.trim();
    const updatedUserData = {
      ...userData,
      firstName: trimmedName,
    };
    dispatch(setUser(updatedUserData));
    // handleUpdateSetting();
    navigation.goBack();
  };

  const handleUpdateSetting = async () => {
    const formData = new FormData();
    formData.append('firstName', userData.firstName);
    formData.append('lastName', userData.lastName);
    formData.append('bio', userData.bio);
    formData.append('address', userData.address);
    formData.append('userName', userData.userName);
    formData.append('location[type]', 'Point');
    formData.append('location[coordinates][0]', userData.location.coordinates[0]);
    formData.append('location[coordinates][1]', userData.location.coordinates[1]);
    formData.append('socialLinks[0][platform]', userData.socialLinks[0].platform);
    formData.append('socialLinks[0][link]', userData.socialLinks[0].link);
    formData.append('socialLinks[1][platform]', userData.socialLinks[1].platform);
    formData.append('socialLinks[1][link]', userData.socialLinks[1].link);
    formData.append('socialLinks[2][platform]', userData.socialLinks[2].platform);
    formData.append('socialLinks[2][link]', userData.socialLinks[2].link);
    formData.append('socialLinks[3][platform]', userData.socialLinks[3].platform);
    formData.append('socialLinks[3][link]', userData.socialLinks[3].link);
    formData.append('socialLinks[4][platform]', userData.socialLinks[4].platform);
    formData.append('socialLinks[4][link]', userData.socialLinks[4].link);
    formData.append('socialLinks[5][platform]', userData.socialLinks[5].platform);
    formData.append('socialLinks[5][link]', userData.socialLinks[5].link);
    console.log(profileImage, 'kjkjkjkj');
    {
      profileImage &&
        formData.append('photo', {
          uri: profileImage,
          name: 'photo.jpg',
          type: 'image/jpeg',
        });
    }
    try {
      const response = await wretch('http://ihold.yameenyousuf.com/api/user')
        .headers({ 'Content-Type': 'multipart/form-data' })
        .put(formData)
        .json();
      console.log('API Response:', response.data);
      dispatch(setUser(response.data.user));
      Toast.show({
        type: 'success',
        text1: 'Profile Updated Successfully',
      });
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const handleUsernamePress = async values => {
    const trimmedUsername = values.username.trim();
    console.log(values);
    const updatedUserData = {
      ...userData,
      userName: trimmedUsername,
    };
    dispatch(setUser(updatedUserData));
    await handleUpdateSetting();
  };

  const handleAddPaymentAccount = async values => {
    const paymentAccountData = {
      number: values.number,
      default: 'mtn',
      confirmNumber: values.confirmNumber,
    };
    const updatedUserData = {
      ...userData,
      linkedPaymentAccounts: [...userData.linkedPaymentAccounts, paymentAccountData],
    };

    try {
      const result = await Api.setPaymentAccount(paymentAccountData);
      if (result.message === 'payment account added') {
        navigation.goBack();
        dispatch(setUser(updatedUserData));
      }
    } catch (error) {
      console.error('API Error:', error);
      navigation.goBack();
    }
  };

  const handleGetInvitees = async () => {
    try {
      const response = await wretch('http://ihold.yameenyousuf.com/api/user/invitees')
        .get()
        .json(result => {
          console.log(result, 'klililhdsl');
          return result;
        });
      const invitedInvitees = response.filter(invitee => invitee.status === 'invited');
      const pendingInvitees = response.filter(invitee => invitee.status === 'pending');
      dispatch(setInvitees({ invitedInvitees, pendingInvitees }));
      console.log('Invitees:', response);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const logout = async () => {
    const requestBody = {
      fcmToken: '12345678',
    };

    try {
      const response = await wretch('http://ihold.yameenyousuf.com/api/auth/logout')
        .post(requestBody)
        .json();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      });
      dispatch(clearUser());
      dispatch(setInvitees({}));
      SecureStore.deleteItemAsync('tokensAndQueryId');
      return true;
    } catch (error) {
      console.error('An error occurred during logout:', error);
      return false;
    }
  };

  return {
    pickImage,
    handleBioChange,
    handleSubmit,
    handleReferralCopy,
    handleLocationPress,
    cityCountry,
    handleUpdateSetting,
    getCityCountry,
    handleDeleteAccount,
    handleNamePress,
    handleUsernamePress,
    profileImage,
    handleAddPaymentAccount,
    handleGetInvitees,
    logout,
  };
};
