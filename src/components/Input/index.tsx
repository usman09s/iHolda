import { TextInput, TextInputProps } from 'react-native';
import colors from 'theme/colors';

type Props = {
  customInputClass?: string;
};

const Input = ({ customInputClass, placeholderTextColor, ...rest }: Props & TextInputProps) => (
  <TextInput
    placeholderTextColor={placeholderTextColor || colors['white-o-70']}
    className={
      'border-b1 px-7 py-3 rounded-full border-white text-white font-Medium ' + customInputClass
    }
    cursorColor={colors.white}
    {...rest}
  />
);

export default Input;
