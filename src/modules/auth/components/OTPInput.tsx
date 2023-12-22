import { memo, useEffect, useRef } from 'react';
import { TextInput, View } from 'react-native';

const OTPInput = ({ onChangeOtp = () => null }: { onChangeOtp: (value: string) => void }) => {
  const otpOne = useRef<TextInput | null>(null);
  const otpTwo = useRef<TextInput | null>(null);
  const otpThree = useRef<TextInput | null>(null);
  const otpFour = useRef<TextInput | null>(null);
  const otpFive = useRef<TextInput | null>(null);
  const otpSix = useRef<TextInput | null>(null);
  const otp = useRef<(number | string)[]>([]);

  const refs = [otpOne, otpTwo, otpThree, otpFour, otpFive, otpSix];

  useEffect(() => {
    setTimeout(() => otpOne.current?.focus(), 300);
  }, []);

  const onKeyPress = (index: number, pressedKey: 'Backspace' | string | number) => {
    if (pressedKey !== 'Backspace' && index < refs.length - 1) {
      refs[index + 1].current?.focus();
    } else if (pressedKey === 'Backspace' && index > 0) {
      refs[index - 1].current?.focus();
    }
  };
  
  

  const onFocus = (index: number) => {
    refs[index].current?.clear();
    otp.current[index] = '';
    onChangeOtp(otp.current.join(''));
  };

  const onChangeText = (index: number, value: string) => {
    otp.current[index] = value;
    onChangeOtp(otp.current.join(''));
  };

  const inputClassName =
    'self-start w-14 h-14 rounded-full text-center text-white font-Medium text-20';

  return (
    <View className="flex-row justify-between mb-4">
      {refs.map((ref, index) => (
        <TextInput
          ref={ref}
          style={{ borderColor: 'white', borderWidth: 2 }}
          key={index}
          maxLength={1}
          selectionColor={'white'}
          keyboardType="number-pad"
          className={inputClassName}
          onFocus={() => onFocus(index)}
          onChangeText={value => onChangeText(index, value)}
          onKeyPress={event => onKeyPress(index, event.nativeEvent.key)}
        />
      ))}
    </View>
  );
};

export default memo(OTPInput);
