import React from 'react';
import { Pressable, Text, TextInput, TextInputProps } from 'react-native';
import Icons from 'components/Icons';
import colors from 'theme/colors';
import { text } from 'theme/text';

type Props = {
  statusText?: string;
  customInputClass?: string;
  onPressLeftIcon?: () => void;
  onPressRightIcon?: () => void;
  leftIcon?: React.ReactNode | JSX.Element;
  rightIcon?: React.ReactNode | JSX.Element;
};

const Input = ({
  leftIcon,
  rightIcon,
  statusText,
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
    {!!statusText && (
      <Text className={text({ type: 'r10', class: 'text-gray-400 mb-1' })}>{statusText}</Text>
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
        className="absolute items-center mr-4 right-0 top-0 bottom-0  justify-center z-10"
        >
        {rightIcon}
      </Pressable>
    )}
  </>
);

export default Input;
