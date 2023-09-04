import { useState } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Button from 'components/Button';
import ErrorModal from 'components/ErrorModal';
import Input from 'components/Input';
import { useMutation } from 'react-query';
import Api from 'services/Api';
import { text } from 'theme/text';
import { parseApiError } from 'utils/helpers';

import { AuthStackParamList } from '../AuthStackNavigator';

const CreateUnlockPinScreen = () => {
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();
  const [pin, setPin] = useState('');
  const [rePin, setRePin] = useState('');
  const { mutate, isLoading, error } = useMutation(Api.setPin);

  const disabledButton = !pin || !rePin || pin !== rePin;

  const onConfirm = () => {
    mutate(
      { pin: Number(pin) },
      {
        onSuccess: result => {
          if (result.status === 200) {
            navigate('EnterReferralCodeScreen');
          }
        },
      },
    );
  };

  return (
    <View className="flex-1 bg-blue justify-center px-7">
      <KeyboardAvoidingView behavior="position">
        <View className="mb-20">
          <Text className={text({ type: 'b44', class: 'text-white mb-10' })}>
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
            onChangeText={setRePin}
            keyboardType="number-pad"
            customInputClass="text-white mb-7 py-5 text-18"
          />
        </View>
        <Button
          title="Confirm"
          onPress={onConfirm}
          isLoading={isLoading}
          disabled={disabledButton}
          customContainer={disabledButton ? 'opacity-50 mb-4' : 'mb-4'}
        />
      </KeyboardAvoidingView>
      <ErrorModal errorText={parseApiError(error)} />
    </View>
  );
};

export default CreateUnlockPinScreen;
