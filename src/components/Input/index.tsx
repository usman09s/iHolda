import React from 'react';
import { Pressable, TextInput, TextInputProps } from 'react-native';
import Icons from 'components/Icons';
import colors from 'theme/colors';

type Props = {
  customInputClass?: string;
  onPressLeftIcon?: () => void;
  onPressRightIcon?: () => void;
  leftIcon?: React.ReactNode | JSX.Element;
  rightIcon?: React.ReactNode | JSX.Element;
};

const Input = ({
  leftIcon,
  rightIcon,
  onPressLeftIcon,
  onPressRightIcon,
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
    {rightIcon && (
      <Pressable
        onPress={onPressRightIcon}
        className="absolute items-center mr-4 right-0 top-0 bottom-0  justify-center z-10">
        {rightIcon}
      </Pressable>
    )}
  </>
);

export default Input;
