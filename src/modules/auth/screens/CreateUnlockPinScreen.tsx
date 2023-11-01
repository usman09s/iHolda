import { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, LayoutAnimation, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Button from 'components/Button';
import ErrorModal from 'components/ErrorModal';
import Input from 'components/Input';
import { useKeyboardVisible } from 'hooks/useKeyboardVisible';
import { useMutation } from 'react-query';
import Api from 'services/Api';
import { text } from 'theme/text';
import { parseApiError } from 'utils/helpers';

import { AuthStackParamList } from '../AuthStackNavigator';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import { userSelector } from 'store/auth/userSelectors';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { setTokensAndQueryId } from 'store/auth/userSlice';
import { setQrCode } from 'store/plastic/userPlasticSlice';
import CustomErrorModal from 'components/ErrorModal/errorModal';

const CreateUnlockPinScreen = () => {
  LayoutAnimation.linear();
  const isVisibleKeyboard = useKeyboardVisible();
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();
  const [pin, setPin] = useState('');
  const [rePin, setRePin] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [errorText, setErrorText] = useState();
  const { mutate, isLoading, error } = useMutation(Api.authRegister);
  const disabledButton = !pin || !rePin || pin !== rePin;
  const userInfo = useSelector(userSelector);
  const dispatch = useAppDispatch();

  const onConfirm = () => {
    mutate(
      {
        password: pin.toString(),
        userName: userInfo.username,
        phone: userInfo.phone,
        countryCode: userInfo.countryCode,
        fcmToken: '1234567',
      },
      {
        onSuccess: result => {
          if (result.message === 'Register successful') {
            dispatch(setQrCode(result.data.user.userQrCode));
            console.log(result.data.userQrCode, 'dwhceonewoncoi');
            // dispatch(setTokensAndQueryId({ accessToken: result.data.accessToken }));
            navigate('EnterReferralCode');
          }
        },
        onError: data => {
          console.log(data, 'chehiohe');
          const errorMessageObject = JSON.parse(data.message);
          const errorMessage = errorMessageObject.message;
          setErrorText(errorMessage);
          setModalVisible(true);
        },
      },
    );
  };

  return (
    <View className="flex-1 bg-blue justify-center px-7">
      <KeyboardAvoidingView behavior="position">
        <View className="mb-20">
          <Text
            className={text({
              type: isVisibleKeyboard ? 'b32' : 'b44',
              class: 'text-white mb-10',
            })}>
            Create your unlock pin
          </Text>
          <Input
            maxLength={4}
            placeholder="Pin"
            onChangeText={setPin}
            keyboardType="number-pad"
            customInputClass="text-white mb-7 py-5 text-18"
          />
          <Input
            maxLength={4}
            placeholder="Re-enter"
            onChangeText={e => {
              setRePin(e);
            }}
            keyboardType="number-pad"
            customInputClass="text-white py-5 text-18"
          />
        </View>
        <View style={{ height: isVisibleKeyboard ? 0 : 28 }} />
        <Button
          title="Confirm"
          onPress={onConfirm}
          isLoading={isLoading}
          disabled={disabledButton}
          customContainer={disabledButton ? 'opacity-50 mb-4' : 'mb-4'}
        />
      </KeyboardAvoidingView>
      <CustomErrorModal
        errorText={errorText}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        buttonTitle="CLOSE"
      />
      {/* <ErrorModal errorText={parseApiError(error)} /> */}
    </View>
  );
};

export default CreateUnlockPinScreen;
