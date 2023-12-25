import { KeyboardAvoidingView, View } from 'react-native';
import Animated from 'react-native-reanimated';
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
import CustomErrorModal from 'components/ErrorModal/errorModal';

const SignInScreen = () => {
  const { params } = useRoute<RouteProp<AuthStackParamList, 'SignIn'>>();
  const sendCodeMutation = useMutation(Api.sendCodeForForgotPin);
  const {
    pin,
    setPin,
    onSignIn,
    isLoading,
    errorMessage,
    animatedTextStyle,
    sendCodeErrorMessage,
    showConfirmationModal,
    animatedSpaceHeightStyle,
    setShowConfirmationModal,
    onPressConfirmOtpConfirmationModal,
    errorText,
    modalVisible,
    setModalVisible,
  } = useSignInActions();

  return (
    <Animated.View
      className={'flex-1 bg-blue justify-center px-7 pt-10'}
      style={{ paddingTop: 40 }}>
      <View>
        <Animated.Text
          className={text({ type: 'b44', class: 'text-white' })}
          style={animatedTextStyle}>
          Enter your pin
        </Animated.Text>
      </View>
      <Animated.View className="h-20" style={animatedSpaceHeightStyle} />
      <Input
        value={pin}
        maxLength={4}
        onChangeText={setPin}
        placeholder="Enter Pin"
        keyboardType="number-pad"
        customInputClass="text-white py-5 text-18 text-center"
      />
      <Animated.View className="h-20" style={animatedSpaceHeightStyle} />
      <Button
        type="solid"
        title="Login"
        onPress={onSignIn}
        isLoading={isLoading}
        disabled={isLoading || pin.length !== 4}
      />
      <Animated.View className="h-20" style={animatedSpaceHeightStyle} />
      <Button
        type="ghost"
        title="forgot pin?"
        onPress={() => setShowConfirmationModal(true)}
        customTextClass={text({ type: 'r20', class: 'text-white mb-4' })}
      />
      <ErrorModal errorText={errorMessage} />
      <OtpPhoneConfirmationModal
        phoneNumber={params.phone}
        visible={showConfirmationModal}
        errorText={sendCodeErrorMessage || ''}
        isLoading={sendCodeMutation.isLoading}
        onPressConfirm={onPressConfirmOtpConfirmationModal}
        onCloseModal={() => setShowConfirmationModal(false)}
      />
      <CustomErrorModal
        errorText={errorText}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        buttonTitle="CLOSE"
      />
    </Animated.View>
  );
};

export default SignInScreen;
