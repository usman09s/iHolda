import React from 'react';
import { Pressable, TextInput, TextInputProps } from 'react-native';
import Icons from 'components/Icons';
import colors from 'theme/colors';

type Props = {
  customInputClass?: string;
  onPressLeftIcon: () => void;
  leftIcon: React.ReactNode | JSX.Element;
};

const Input = ({
  leftIcon,
  onPressLeftIcon,
  customInputClass,
  placeholderTextColor,
  ...rest
}: Props & TextInputProps) => (
  <>
    {leftIcon && (
      <Pressable
        onPress={onPressLeftIcon}
        className="absolute items-center ml-4 top-0 bottom-0  justify-center z-10">
        <Icons.TakePhotoIcon />
      </Pressable>
    )}

    <TextInput
      placeholderTextColor={placeholderTextColor || colors['white-o-70']}
      className={
        'border-b1 px-7 py-3 rounded-full border-white text-white font-Medium ' +
        customInputClass +
        ` ${leftIcon && 'pl-12'}`
      }
      cursorColor={colors.white}
      {...rest}
    />
  </>
);

export default Input;
