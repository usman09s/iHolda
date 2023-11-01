import { useState } from 'react';
import { KeyboardAvoidingView, Pressable, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Button from 'components/Button';
import ErrorModal from 'components/ErrorModal';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import Api from 'services/Api';
import { userPhoneSelector, userSelector } from 'store/auth/userSelectors';
import { useTimer } from 'store/auth/useTimer';
import { text } from 'theme/text';
import { VerifyOTPMessage } from 'types/AuthTypes';
import { getHitSlop } from 'utils/helpers';

import { AuthStackParamList } from '../AuthStackNavigator';
import OTPInput from '../components/OTPInput';

const ConfirmOtpScreen = () => {
  const [otp, setOtp] = useState('');
  const { goBack } = useNavigation();
  const phone = useSelector(userPhoneSelector);
  const { navigate } = useAppNavigation<NavigationProp<AuthStackParamList>>();
  const { remainingTime, resetTimer } = useTimer({ duration: 30, onTimeout: () => null });

  const { error, isLoading, mutate } = useMutation(Api.verifyOtp, {
    onSuccess: result => {
      if (result.message === VerifyOTPMessage.OTP_VERIFIED_USER_NOT_REGISTERED) {
        navigate('UserAvatarAndUsernameUpdate');
      }
    },
  });

  const confirmMutationErrorMessage = (error as { message: string })?.message;

  const onPressContinue = () => mutate({ otp });

  return (
    <View className="flex-1 bg-blue justify-center px-7">
      <KeyboardAvoidingView behavior="position">
        <View className="mb-20">
          <Text className={text({ type: 'b44', class: 'text-white' })}>
            Confirm{'\n'}sms OTP code
          </Text>
          <View className="flex-row items-center">
            <Text className={text({ type: 'l13', class: 'text-white opacity-80 mr-2' })}>
              sent to {phone}{' '}
            </Text>
            <Button
              type="ghost"
              title="Change"
              onPress={goBack}
              hitSlop={getHitSlop({ value: 15 })}
              customTextClass={text({ type: 'm13', class: 'underline text-white font-Medium' })}
            />
          </View>
        </View>
        <OTPInput onChangeOtp={setOtp} />
        <Pressable onPress={resetTimer} disabled={remainingTime !== '00'}>
          <Text className={text({ type: 'r15', class: 'text-center text-white mb-8' })}>
            Resend {remainingTime === '00' ? '' : `in ${remainingTime}`}
          </Text>
        </Pressable>
        {__DEV__ && (
          <Text className={text({ type: 'm13', class: 'text-white text-center mb-2' })}>
            {Api._otp} is showed for only dev mode
          </Text>
        )}
        <Button
          title="Continue"
          type="borderedSolid"
          extraStyles={{ borderWidth: 5, borderColor: 'white', width: 190 }}
          isLoading={isLoading}
          onPress={onPressContinue}
          disabled={isLoading || otp.length !== 6}
          customContainer={`self-center ${otp.length !== 6 && ' opacity-40'} `}
        />
      </KeyboardAvoidingView>
      <ErrorModal errorText={confirmMutationErrorMessage} />
    </View>
  );
};

export default ConfirmOtpScreen;
