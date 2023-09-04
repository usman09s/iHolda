import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Button from 'components/Button';
import ErrorModal from 'components/ErrorModal';
import Input from 'components/Input';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import Api from 'services/Api';
import { userImageSelector } from 'store/auth/userSelectors';
import colors from 'theme/colors';
import { text } from 'theme/text';
import { parseApiError } from 'utils/helpers';

import { AuthStackParamList } from '../AuthStackNavigator';

const EnterReferralCodeScreen = () => {
  const [referralCode, setReferralCode] = useState('');
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();
  const { mutate, error } = useMutation(Api.setReferralCode);
  const userImage = useSelector(userImageSelector);

  const onContinue = () => {
    mutate(
      { referralCode },
      {
        onSuccess: () => {
          navigate('ReferralCodeSuccessful');
        },
      },
    );
  };

  return (
    <View className="flex-1 bg-blue px-7 justify-evenly">
      <Text className={text({ type: 'm18', class: 'text-white text-center' })}>Referral code</Text>
      <KeyboardAvoidingView
        behavior={Platform.select({
          android: undefined,
          ios: 'position',
        })}>
        <View className="flex-row self-center mb-20">
          <Image
            source={{ uri: userImage }}
            className="w-28 h-28 rounded-3xl border-4 border-white -rotate-30"
          />
          <View className="w-28 h-28 rounded-3xl border-4 border-white rotate-30 -left-8 top-2 bg-blue justify-center items-center">
            <Text className="text-white text-36">?</Text>
          </View>
        </View>
        <Input
          onChangeText={setReferralCode}
          placeholder="Enter referral code"
          customInputClass="text-20 mb-16 mx-7"
          placeholderTextColor={colors['white-o-60']}
        />
        <View>
          <Button
            title="Continue"
            customContainer="self-center"
            type="borderedSolid"
            onPress={onContinue}
          />
          <Button
            title="Skip"
            type="ghost"
            customContainer="self-center mb-4"
            onPress={() => navigate('UserWaitList')}
            customTextClass={text({ type: 'm18', class: 'text-white-o-70 mt-8' })}
          />
        </View>
      </KeyboardAvoidingView>
      <ErrorModal errorText={parseApiError(error)} />
    </View>
  );
};

export default EnterReferralCodeScreen;
