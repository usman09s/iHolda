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
  <View
    style={{
      borderRadius: 40,
      borderColor: 'white',
      flexDirection: 'row',
      borderWidth: 2,
      paddingVertical: 14,
      backgroundColor: 'transparent',
    }}>
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
