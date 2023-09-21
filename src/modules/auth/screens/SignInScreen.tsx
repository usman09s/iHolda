import { KeyboardAvoidingView, Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import Button from 'components/Button';
import ErrorModal from 'components/ErrorModal';
import Input from 'components/Input';
import { useMutation } from 'react-query';
import Api from 'services/Api';
import { text } from 'theme/text';

import { AuthStackParamList } from '../AuthStackNavigator';
import OtpPhoneConfirmationModal from '../components/OtpPhoneConfirmationModal';
import { useSignInActions } from '../hooks/useSignInActions';

const SignInScreen = () => {
  const { params } = useRoute<RouteProp<AuthStackParamList, 'SignIn'>>();
  const sendCodeMutation = useMutation(Api.sendCodeForForgotPin);
  const {
    pin,
    setPin,
    onSignIn,
    isLoading,
    errorMessage,
    sendCodeErrorMessage,
    onPressConfirmOtpConfirmationModal,
    showConfirmationModal,
    setShowConfirmationModal,
  } = useSignInActions();

  return (
    <View className="flex-1 bg-blue justify-center px-7">
      <KeyboardAvoidingView behavior="position">
        <View className="mb-20">
          <Text className={text({ type: 'b44', class: 'text-white' })}>Enter your pin</Text>
        </View>
        <Input
          value={pin}
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
        onPressConfirm={onPressConfirmOtpConfirmationModal}
        visible={showConfirmationModal}
        errorText={sendCodeErrorMessage || ''}
        onCloseModal={() => setShowConfirmationModal(false)}
      />
    </View>
  );
};

export default SignInScreen;
