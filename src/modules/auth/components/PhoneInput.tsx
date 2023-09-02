import { memo } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import Icons from 'components/Icons';
import { CountryCodeType } from 'types/AuthTypes';

type Props = {
  value: string;
  editable?: boolean;
  onPressCountryCode: () => void;
  selectedCountry: CountryCodeType;
  onChangeText: (value: string) => void;
};

const PhoneInput = ({
  value,
  onChangeText,
  selectedCountry,
  editable = true,
  onPressCountryCode,
}: Props) => (
  <View className="bg-transparent border-2 py-4 border-white rounded-full flex-row">
    <Pressable
      className="mr-4 ml-5 flex-row items-center active:opacity-50"
      onPress={onPressCountryCode}>
      <Text className="text-36 mr-1">{selectedCountry.emoji}</Text>
      <Icons.CaretDownIcon />
      <Text className="text-18 ml-1 text-white">{selectedCountry.phone}</Text>
    </Pressable>
    <TextInput
      value={value}
      editable={editable}
      returnKeyType="next"
      keyboardType="phone-pad"
      onChangeText={onChangeText}
      style={{ letterSpacing: 2 }}
      className="text-24 flex-1 text-white mr-6 "
    />
  </View>
);

export default memo(PhoneInput);
