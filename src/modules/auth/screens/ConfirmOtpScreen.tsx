import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from 'components/Button';
import { useSelector } from 'react-redux';
import { userPhoneSelector } from 'store/auth/userSelectors';
import { text } from 'theme/text';
import { getHitSlop } from 'utils/helpers';

const ConfirmOtpScreen = () => {
  const phone = useSelector(userPhoneSelector);
  const { goBack } = useNavigation();

  return (
    <View className="flex-1 bg-blue justify-center px-7">
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
      <Button
        title="Continue"
        onPress={() => null}
        type="borderedSolid"
        customContainer="self-center"
      />
    </View>
  );
};

export default ConfirmOtpScreen;
