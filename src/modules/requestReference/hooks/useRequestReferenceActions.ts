import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import Toast from 'react-native-toast-message';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import Api from 'services/Api';
import { userSelector } from 'store/auth/userSelectors';
import { setUserInfo } from 'store/auth/userSlice';
import { clearUser, selectUser, setUser } from 'store/userDataSlice';
import {
  setGender,
  setReferences,
  setSearchTextUsers,
  setSearchUsers,
  setVerificationData,
} from 'store/userReference/userReferenceSlice';

export const useRequestReferenceAction = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const userData = useSelector(userSelector)?.user;
  const searchUsersMutation = useMutation(Api.searchUsers);
  const userReferenceData = useSelector((state: any) => state.userReference.verificationData);
  const userGender = useSelector((state: any) => state.userReference.gender);
  const userReferences = useSelector((state: any) => state.userReference.referenceUsers);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const selectOption = (option: any) => {
    setSelectedOption(option);
  };

  const handleChangeText = (value: any) => {
    console.log(value);
    setPage(1);

    if (value === '') {
      dispatch(clearUser());
    }
    setSearchText(value);
    handleSearchUsers();
  };

  const handleSearchUsers = async () => {
    if (page === 1) {
      setLoading(true);
    }
    try {
      const result = await searchUsersMutation.mutateAsync({
        searchText: searchText,
        page,
      });

      if (searchText && searchText !== '') {
        dispatch(setSearchTextUsers(result));
      } else {
        dispatch(setSearchUsers(result));
      }
      setLoading(false);

      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const handleNavigation1 = () => {
    if (selectedOption !== null) {
      dispatch(setGender(selectedOption));
      navigation.navigate('BasicVerificationTwo');
    }
  };

  const handleNavigation2 = values => {
    dispatch(setVerificationData(values));
    dispatch(setReferences(null));
    navigation.navigate('BasicVerificationThree');
  };

  const handleAddReference1 = () => {
    const index = 0;
    if (index < userReferences.length) {
      navigation.navigate('AddReference', { index });
    } else if (userReferences.length < 2) {
      navigation.navigate('AddReference', { index });
    }
  };

  const handleAddReference2 = () => {
    const index = 1;
    if (index < userReferences.length) {
      navigation.navigate('AddReference', { index });
    } else if (userReferences.length < 2) {
      navigation.navigate('AddReference', { index });
    }
  };

  const handleFinalNavigation = async () => {
    try {
      const parts = userReferenceData.dob.split('/');
      if (parts.length === 3) {
        const modifiedDob = `${parts[2]}-${parts[1]}-${parts[0]}`;
        const verificationData = {
          gender: userGender,
          fullName: userReferenceData.fullName,
          dob: modifiedDob,
          email: userReferenceData.email,
          city: userReferenceData.city,
          country: userReferenceData.country,
          referenceUsers: userReferences.map((reference: any) => ({
            user: reference._id,
          })),
        };

        const updatedUserData = {
          ...userData,
          basicVerification: verificationData,
        };

        const verificationResult = await Api.basicVerification(verificationData);

        if (verificationResult.message === 'Basic verification updated successfully') {
          navigation.navigate('VerificationComplete');
          dispatch(setUserInfo(updatedUserData));
        } else {
          console.error('Basic verification failed.');
          Toast.show({
            type: 'error',
            text1: 'Not Enough CP',
            text2: 'You must have a minimum of 40 CP in your wallet',
          });
          return;
        }
      }
    } catch (error) {
      console.error('Error during basic verification:', error);
      Toast.show({
        type: 'error',
        text1: 'Not Enough CP',
        text2: 'You must have a minimum of 40 CP in your wallet',
      });
      return;
    }
  };

  const handleLoadMore = () => {
    console.log('Loading');
    setPage(page + 1);
    handleSearchUsers();
  };

  const updateReference = (data, index) => {
    dispatch(setReferences({ index, data }));
  };

  return {
    selectedOption,
    selectOption,
    handleNavigation1,
    handleNavigation2,
    handleAddReference1,
    handleAddReference2,
    searchText,
    handleChangeText,
    isLoading,
    handleFinalNavigation,
    handleSearchUsers,
    handleLoadMore,
    updateReference,
  };
};
