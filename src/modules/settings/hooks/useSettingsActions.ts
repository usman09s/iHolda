import { useSelector, useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import Api from 'services/Api';
import * as Clipboard from 'expo-clipboard';
import { clearUser, selectUser, setUser } from 'store/userDataSlice';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import wretch from 'wretch';
import { setInvitees } from 'store/settings/inviteeSlice';
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';
import { setUserInfo } from 'store/auth/userSlice';
import { userSelector } from 'store/auth/userSelectors';

export const useSettingActions = () => {
  const userData: any = useSelector(userSelector)?.user;
  const route = useRoute();
  const [cityCountry, setCityCountry] = useState<any>(userData.address);
  // const [lat, setLat] = useState<any>(userData?.location?.coordinates[0]);
  // const [lng, setLng] = useState<any>(userData?.location?.coordinates[1]);
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const pickImage = async () => {
    const result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      aspect: [1, 1],
      quality: 1,
    }).catch(() => null);

    if (!result?.canceled) {
      const image = result.assets[0].uri;
      handleUpdateSetting(null, image);
    }
  };

  const handleBioChange = value => {
    const updatedUserData = {
      ...userData,
      bio: value,
    };
    dispatch(setUserInfo(updatedUserData));
  };

  const handleSubmit = async (values: any) => {
    const { oldPassword, newPassword, confirmPassword } = values;
    try {
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
          text1: 'Unexpected error occurred',
        });
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Unexpected error occurred',
      });
    }
  };

  const handleLocationPress = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const updatedUserData = {
      ...userData,
      location: { coordinates: [location.coords.longitude, location.coords.latitude] },
    };
    dispatch(setUserInfo(updatedUserData));
    getCityCountry(location.coords.latitude, location.coords.longitude);
  };

  const getCityCountry = async (latitude: any, longitude: any) => {
    const name = await Location.reverseGeocodeAsync({
      latitude: latitude,
      longitude: longitude,
    });
    console.log(name);
    await setCityCountry(`${name[0].city}, ${name[0].country}`);
    const updatedUserData = {
      ...userData,
      address: cityCountry,
    };
    await dispatch(setUserInfo(updatedUserData));
  };

  const handleReferralCopy = async () => {
    await Clipboard.setStringAsync(userData.referralCode);
    Toast.show({
      type: 'success',
      text1: 'Referral Code Successfully Copied',
    });
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
    console.log(updatedUserData);
    await dispatch(setUserInfo(updatedUserData));
    if (userData.firstName === trimmedName) {
      handleUpdateSetting();
    }
    navigation.goBack();
  };

  const handleUpdateSetting = async (userLinks: any, image: any, username: any) => {
    const formData = new FormData();
    formData.append('firstName', userData.firstName);
    formData.append('lastName', userData.lastName);
    formData.append('bio', userData.bio);
    formData.append('address', cityCountry ? cityCountry : userData.address);
    formData.append('userName', username ? username : userData.userName);
    formData.append('location[type]', 'Point');
    formData.append('location[coordinates][0]', userData.location.coordinates[0]);
    formData.append('location[coordinates][1]', userData.location.coordinates[1]);
    formData.append(
      'socialLinks[0][platform]',
      userLinks && userLinks.socialLinks && userLinks.socialLinks[0]
        ? userLinks.socialLinks[0].platform
        : userData.socialLinks[0].platform,
    );
    formData.append(
      'socialLinks[0][link]',
      userLinks && userLinks.socialLinks && userLinks.socialLinks[0]
        ? userLinks.socialLinks[0].link
        : userData.socialLinks[0].link,
    );
    formData.append(
      'socialLinks[1][platform]',
      userLinks && userLinks.socialLinks && userLinks.socialLinks[1]
        ? userLinks.socialLinks[1].platform
        : userData.socialLinks[1].platform,
    );
    formData.append(
      'socialLinks[1][link]',
      userLinks && userLinks.socialLinks && userLinks.socialLinks[1]
        ? userLinks.socialLinks[1].link
        : userData.socialLinks[1].link,
    );
    formData.append(
      'socialLinks[2][platform]',
      userLinks && userLinks.socialLinks && userLinks.socialLinks[2]
        ? userLinks.socialLinks[2].platform
        : userData.socialLinks[2].platform,
    );
    formData.append(
      'socialLinks[2][link]',
      userLinks && userLinks.socialLinks && userLinks.socialLinks[2]
        ? userLinks.socialLinks[2].link
        : userData.socialLinks[2].link,
    );
    formData.append(
      'socialLinks[3][platform]',
      userLinks && userLinks.socialLinks && userLinks.socialLinks[3]
        ? userLinks.socialLinks[3].platform
        : userData.socialLinks[3].platform,
    );
    formData.append(
      'socialLinks[3][link]',
      userLinks && userLinks.socialLinks && userLinks.socialLinks[3]
        ? userLinks.socialLinks[3].link
        : userData.socialLinks[3].link,
    );
    formData.append(
      'socialLinks[4][platform]',
      userLinks && userLinks.socialLinks && userLinks.socialLinks[4]
        ? userLinks.socialLinks[4].platform
        : userData.socialLinks[4].platform,
    );
    formData.append(
      'socialLinks[4][link]',
      userLinks && userLinks.socialLinks && userLinks.socialLinks[4]
        ? userLinks.socialLinks[4].link
        : userData.socialLinks[4].link,
    );
    formData.append(
      'socialLinks[5][platform]',
      userLinks && userLinks.socialLinks && userLinks.socialLinks[5]
        ? userLinks.socialLinks[5].platform
        : userData.socialLinks[5].platform,
    );
    formData.append(
      'socialLinks[5][link]',
      userLinks && userLinks.socialLinks && userLinks.socialLinks[5]
        ? userLinks.socialLinks[5].link
        : userData.socialLinks[5].link,
    );
    {
      image &&
        formData.append('photo', {
          uri: image,
          name: 'photo.jpg',
          type: 'image/jpeg',
        });
    }
    console.log('FORM DATA', formData);
    try {
      const response = await wretch('http://ihold.yameenyousuf.com/api/user')
        .headers({ 'Content-Type': 'multipart/form-data' })
        .put(formData)
        .json();
      dispatch(setUserInfo(response.data.user));
      Toast.show({
        type: 'success',
        text1: 'Profile Updated Successfully',
      });
      if (route.name === 'EditProfile' || route.name === 'Username') {
        navigation.goBack();
      }
    } catch (error) {
      const errorText = JSON.parse(error.message);
      if (errorText.message === 'Username already exist') {
        Toast.show({
          type: 'error',
          text1: 'Username Already Exists',
          text2: 'This username already exists. Please try again',
        });
      } else if (
        errorText.message === '"bio" length must be less than or equal to 30 characters long'
      ) {
        Toast.show({
          type: 'error',
          text1: 'Bio length not correct',
          text2: 'Bio length must be less than 30 characters long',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Unexpected error occurred',
        });
      }
    }
  };

  const handleUsernamePress = async values => {
    const trimmedUsername = values.username.trim();
    const updatedUserData = {
      ...userData,
      userName: trimmedUsername,
    };
    await dispatch(setUserInfo(updatedUserData));
    handleUpdateSetting(null, null, trimmedUsername);
  };

  const handleAddPaymentAccount = async values => {
    const paymentAccountData = {
      number: values.number,
      default: 'mtn',
      confirmNumber: values.confirmNumber,
    };

    const allPaymentAccounts = [...userData.linkedPaymentAccounts, paymentAccountData];

    try {
      const result = await Api.setPaymentAccount({
        number: values.number,
        default: 'mtn',
        confirmNumber: values.confirmNumber,
        previousAccounts: userData.linkedPaymentAccounts,
      });

      if (result.message === 'payment account added') {
        dispatch(setUserInfo({ ...userData, linkedPaymentAccounts: allPaymentAccounts }));
        Toast.show({
          type: 'success',
          text1: 'Payment Account Added',
        });
        navigation.goBack();
      }
    } catch (error) {
      console.error('API Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Error Adding Payment Account',
      });
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
    setLoading(true);
    const requestBody = {
      fcmToken: '12345678',
    };
    try {
      const response = await wretch('http://ihold.yameenyousuf.com/api/auth/logout')
        .post(requestBody)
        .json();
      dispatch(clearUser());
      dispatch(setInvitees({}));
      SecureStore.deleteItemAsync('tokensAndQueryId');
      setLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      });
      return true;
    } catch (error) {
      setLoading(false);
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
    handleAddPaymentAccount,
    handleGetInvitees,
    isLoading,
    logout,
  };
};
