import { useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import * as SecureStore from 'expo-secure-store';
import { NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { useKeyboardVisible } from 'hooks/useKeyboardVisible';
import { useMutation } from 'react-query';
import Api from 'services/Api';
import { setUserInfo } from 'store/auth/userSlice';
import { parseApiError } from 'utils/helpers';

import { AuthStackParamList } from '../AuthStackNavigator';

export const useSignInActions = () => {
  const dispatch = useAppDispatch();
  const [pin, setPin] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const { navigate, reset } = useAppNavigation<
    NavigationProp<
      AuthStackParamList & {
        BottomTabs: undefined;
      }
    >
  >();
  const { params } = useRoute<RouteProp<AuthStackParamList, 'SignIn'>>();
  const { mutate, isLoading, error } = useMutation(Api.signIn);
  const sendCodeMutation = useMutation(Api.sendCodeForForgotPin);
  const sharedValue = useSharedValue(44);
  const sharedSpaceHeightValue = useSharedValue(80);
  const isVisible = useKeyboardVisible();

  useEffect(() => {
    if (isVisible) {
      sharedValue.value = 24;
      sharedSpaceHeightValue.value = 40;
    } else {
      sharedValue.value = 44;
      sharedSpaceHeightValue.value = 80;
    }
  }, [isVisible]);

  const animatedTextStyle = useAnimatedStyle(() => ({
    fontSize: withTiming(sharedValue.value),
  }));

  const animatedSpaceHeightStyle = useAnimatedStyle(() => ({
    height: withTiming(sharedSpaceHeightValue.value),
  }));

  const sendCodeErrorMessage = useMemo(
    () => parseApiError(sendCodeMutation.error),
    [sendCodeMutation.error],
  );

  const errorMessage = useMemo(
    () => parseApiError(error) || parseApiError(error, 'non_field_errors'),
    [error],
  );

  const onSignIn = () => {
    mutate(
      {
        pin,
        phone: params.phone,
      },
      {
        onSuccess: result => {
          SecureStore.setItemAsync(
            'tokensAndQueryId',
            JSON.stringify({
              queryId: result.query_id,
              accessToken: result.access_token,
              refreshToken: result.refresh_token,
            }),
          );
          Api.setQueryIdValue(result.query_id);
          dispatch(setUserInfo(result));
          reset({
            index: 0,
            routes: [{ name: 'BottomTabs' }],
          });
        },
        onError: (err: { message: string }) => {
          if (err?.message?.includes('waiting list')) {
            const parsedUserInformation = JSON.parse(err.message)?.[1];
            const userData = parsedUserInformation?.[0] as {
              access_token: string;
              refresh_token: string;
              user: {
                query_id: string;
                username: string;
              };
            };
            const userImage = parsedUserInformation?.[2] as {
              image: { id: string; image: string; uploaded_at: string };
            };

            Api.setTokenValue(userData.access_token);
            Api.setQueryIdValue(userData.user.query_id);

            dispatch(
              setUserInfo({
                phone: params.phone,
                userImage: userImage.image.image,
                query_id: userData.user.query_id,
                username: userData.user.username,
                access_token: userData.access_token,
                refresh_token: userData.refresh_token,
              }),
            );
            if (userData.access_token) {
              navigate('EnterReferralCode');
            } else {
              Alert.alert('Informing', 'Please try again.');
            }
          }
        },
      },
    );
  };

  const onPressConfirmOtpConfirmationModal = () => {
    sendCodeMutation.mutate(
      { phoneNumber: params.phone },
      {
        onSuccess: () => {
          setShowConfirmationModal(false);
          navigate('EnterOtp', { phone: params.phone });
        },
      },
    );
  };

  return {
    pin,
    error,
    reset,
    mutate,
    setPin,
    navigate,
    onSignIn,
    isLoading,
    errorMessage,
    animatedTextStyle,
    sendCodeErrorMessage,
    showConfirmationModal,
    setShowConfirmationModal,
    animatedSpaceHeightStyle,
    onPressConfirmOtpConfirmationModal,
  };
};
