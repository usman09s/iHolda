import { TextInput, TextInputProps } from 'react-native';

type Props = {
  customInputClass?: string;
};

const Input = ({ customInputClass, ...rest }: Props & TextInputProps) => (
  <TextInput
    className={'border-b1 px-7 py-3 rounded-full border-white text-white ' + customInputClass}
    {...rest}
  />
);

export default Input;
