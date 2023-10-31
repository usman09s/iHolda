import { useState } from 'react';
import { Image, KeyboardAvoidingView, LayoutAnimation, Platform, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Button from 'components/Button';
import ErrorModal from 'components/ErrorModal';
import Input from 'components/Input';
import { useKeyboardVisible } from 'hooks/useKeyboardVisible';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import Api from 'services/Api';
import { profileImageSelector, userImageSelector } from 'store/auth/userSelectors';
import colors from 'theme/colors';
import { text } from 'theme/text';
import { parseApiError } from 'utils/helpers';

import { AuthStackParamList } from '../AuthStackNavigator';
import CustomErrorModal from 'components/ErrorModal/errorModal';
import { selectQrCodeData } from 'store/plastic/userPlasticSlice';

const EnterReferralCodeScreen = () => {
  LayoutAnimation.easeInEaseOut();
  const [modalVisible, setModalVisible] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();
  const { mutate, error } = useMutation(Api.setReferralCode);
  const userImage = useSelector(profileImageSelector);
  const isVisibleKeyboard = useKeyboardVisible();

  const onContinue = () => {
    mutate(
      { referralCode },
      {
        onSuccess: result => {
          console.log(result);
          navigate('ReferralCodeSuccessful');
        },
        onError: error => {
          setModalVisible(true);
        },
      },
    );
  };

  return (
    <View className="flex-1 bg-blue px-7 justify-evenly">
      <KeyboardAvoidingView
        behavior={Platform.select({
          android: undefined,
          ios: 'position',
        })}>
        <Text className={text({ type: 'm18', class: 'text-white text-center mb-8' })}>
          Referral code
        </Text>
        <View className="flex-row self-center">
          <Image
            source={{ uri: userImage }}
            className={
              isVisibleKeyboard
                ? 'w-20 h-20 rounded-3xl border-4 border-white -rotate-30'
                : 'w-28 h-28 rounded-3xl border-4 border-white -rotate-30'
            }
          />
          <View
            className={
              isVisibleKeyboard
                ? 'w-20 h-20 rounded-3xl border-4 border-white rotate-30 -left-8 top-2 bg-blue justify-center items-center'
                : 'w-28 h-28 rounded-3xl border-4 border-white rotate-30 -left-8 top-2 bg-blue justify-center items-center'
            }>
            <Text className="text-white text-36">?</Text>
          </View>
        </View>
        <View style={{ height: isVisibleKeyboard ? 40 : 80 }} />
        <Input
          onChangeText={setReferralCode}
          placeholder="Enter referral code"
          customInputClass="text-20 mx-7"
          placeholderTextColor={colors['white-o-60']}
          keyboardType="numeric"
        />
        <View style={{ height: isVisibleKeyboard ? 32 : 64 }} />
        <View>
          <Button
            title="Confirm"
            customContainer="self-center"
            extraStyles={{ borderWidth: 5, borderColor: 'white', width: 200 }}
            onPress={onContinue}
          />
          <View style={{ height: isVisibleKeyboard ? 16 : 32 }} />
          <Button
            title="Skip"
            type="ghost"
            customContainer="self-center"
            onPress={() => navigate('UserWaitList')}
            customTextClass={text({ type: 'm18', class: 'text-white-o-70 ' })}
          />
          <View style={{ height: isVisibleKeyboard ? 0 : 16 }} />
        </View>
        <CustomErrorModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          errorText={'Incorrect Referral code!'}
          buttonTitle="CLOSE"
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default EnterReferralCodeScreen;
