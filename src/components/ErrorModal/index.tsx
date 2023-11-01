import { useEffect, useState } from 'react';
import {  Modal, Pressable, Text, View } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import Button from 'components/Button';
import Icons from 'components/Icons';
import { text } from 'theme/text';

type Props = {
  errorText?: string;
  showCutButton?: boolean;
  btnTxt?: string;
  onBtnPress?: () => void;
  onBackBtnPress?: () => void;
};

const ErrorModal = ({
  errorText,
  btnTxt = 'ok',
  onBtnPress,
  onBackBtnPress,
  showCutButton = true,
}: Props) => {
  const [visible, setVisible] = useState(!!errorText);

  const onClose = () => {
    if (onBackBtnPress) onBackBtnPress();
    setVisible(false);
  };

  useEffect(() => {
    if (!!errorText) {
      setVisible(true);
    }
  }, [errorText]);

  return (
    <Modal visible={visible} onRequestClose={onClose} transparent>
      <View className="flex-1 justify-center items-center px-7 bg-black-o-50">
        <Animated.View
          className="justify-center items-center p-4 bg-white rounded-xl py-8 w-full"
          entering={SlideInDown}>
          {showCutButton && (
            <Pressable onPress={onClose} className="self-end">
              <Icons.CrossIcon />
            </Pressable>
          )}
          <Icons.WarningIcon />
          <Text className={text({ type: 'r20', class: 'mt-4 mb-7' })}>{errorText}</Text>
          <Button
            title={btnTxt.toUpperCase()}
            customContainer="px-6"
            onPress={onBtnPress ?? onClose}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ErrorModal;
