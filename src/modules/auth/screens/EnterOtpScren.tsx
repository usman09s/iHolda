import { useState } from 'react';
import { KeyboardAvoidingView, Pressable, ScrollView, Text, View } from 'react-native';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Button from 'components/Button';
import ErrorModal from 'components/ErrorModal';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { useMutation } from 'react-query';
import Api from 'services/Api';
import { useTimer } from 'store/auth/useTimer';
import { text } from 'theme/text';
import { getHitSlop, parseApiError } from 'utils/helpers';

import { AuthStackParamList } from '../AuthStackNavigator';
import OTPInput from '../components/OTPInput';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { userSelector } from 'store/auth/userSelectors';
import { horizontalScale, verticalScale } from '../../../utils/helpers';

const EnterOptScreen = () => {
  const [otp, setOtp] = useState('');
  const { goBack } = useNavigation();
  const { params } = useRoute<RouteProp<AuthStackParamList, 'EnterOtp'>>();
  const { navigate } = useAppNavigation<NavigationProp<AuthStackParamList>>();
  const { remainingTime, resetTimer } = useTimer({ duration: 30, onTimeout: () => null });
  const userInfo = useSelector((state: RootState) => state.user);

  const { error, isLoading, mutate } = useMutation(Api.resetPinCodeConfirm, {
    onSuccess: result => {
      if (result.message === 'OTP verified successfully') {
        navigate('ResetPin', { phone: params.phone });
      }
    },
  });

  const enterOtpMutationErrorMessage = parseApiError(error as { message: string });

  const onPressContinue = () => {
    console.log(otp);
    mutate({
      code: otp,
      phoneNumber: params?.phone,
    });
  };

  return (
    <View
      className="flex-1 bg-blue justify-center"
      style={{ paddingHorizontal: horizontalScale(12) }}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginTop: verticalScale(120) }}>
        <View className="mb-20">
          <Text className={text({ type: 'b44', class: 'text-white' })}>
            Confirm{'\n'}sms OTP code
          </Text>
          <View className="flex-row items-center">
            <Text className={text({ type: 'l13', class: 'text-white opacity-80 mr-2' })}>
              sent to {params?.phone}{' '}
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
            {params?.otp} is showed for only dev mode
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
      </ScrollView>
      <ErrorModal errorText={enterOtpMutationErrorMessage} />
    </View>
  );
};

export default EnterOptScreen;
