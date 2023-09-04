import { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import Button from 'components/Button';
import ErrorModal from 'components/ErrorModal';
import Input from 'components/Input';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { useMutation } from 'react-query';
import Api from 'services/Api';
import { setUserInfo } from 'store/auth/userSlice';
import { text } from 'theme/text';
import { parseApiError } from 'utils/helpers';

import { AuthStackParamList } from '../AuthStackNavigator';
import OtpPhoneConfirmationModal from '../components/OtpPhoneConfirmationModal';

const SignInScreen = () => {
  const [pin, setPin] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const dispatch = useAppDispatch();
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
          dispatch(setUserInfo(result));
          reset({
            index: 0,
            routes: [{ name: 'BottomTabs' }],
          });
        },
        onError: err => {
          if (err?.message?.includes('waiting list')) {
            navigate('EnterReferralCode');
          }
        },
      },
    );
  };

  return (
    <View className="flex-1 bg-blue justify-center px-7">
      <KeyboardAvoidingView behavior="position">
        <View className="mb-20">
          <Text className={text({ type: 'b44', class: 'text-white' })}>Enter your pin</Text>
        </View>
        <Input
          maxLength={4}
          placeholder="Enter Pin"
          onChangeText={setPin}
          keyboardType="number-pad"
          customInputClass="text-white py-5 text-18 mb-20 text-center"
        />
        <Button
          type="solid"
          title="Login"
          onPress={onSignIn}
          isLoading={isLoading}
          disabled={isLoading || pin.length !== 4}
        />
        <Button
          type="ghost"
          title="forgot pin?"
          customContainer="mt-12"
          onPress={() => setShowConfirmationModal(true)}
          customTextClass={text({ type: 'r20', class: 'text-white mb-4' })}
        />
      </KeyboardAvoidingView>
      <ErrorModal errorText={errorMessage} />
      <OtpPhoneConfirmationModal
        phoneNumber={params.phone}
        isLoading={sendCodeMutation.isLoading}
        onPressConfirm={() => {
          sendCodeMutation.mutate(
            { phoneNumber: params.phone },
            {
              onSuccess: () => {
                navigate('EnterOtp', { phone: params.phone });
              },
            },
          );
        }}
        visible={showConfirmationModal}
        errorText={sendCodeErrorMessage}
        onCloseModal={() => setShowConfirmationModal(false)}
      />
    </View>
  );
};

export default SignInScreen;
