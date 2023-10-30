import { useEffect, useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import Button from 'components/Button';
import Icons from 'components/Icons';
import { text as themeText } from 'theme/text';

type Props = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  btn1Txt?: string;
  btn2Txt?: string;
  text: string;
  onPressBtn1?: () => void;
  onPressBtn2?: () => void;
};

const AppModal = ({
  visible,
  setVisible,
  btn1Txt = "back",
  btn2Txt = "Accept",
  text,
  onPressBtn1,
  onPressBtn2,
}: Props) => {
  const onClose = () => setVisible(false);
  return (
    <Modal visible={visible} onRequestClose={onClose} transparent>
      <View className="flex-1 justify-center items-center px-7 bg-black-o-50">
        <Animated.View
          className="justify-center items-center p-4 bg-white rounded-xl py-5 w-full"
          entering={SlideInDown}>
          <Text
            className={themeText({ type: 'r14', class: 'mt-4 mb-7 text-center' })}
            style={{ color: 'grey' }}>
            {text}
          </Text>
          <View className="justify-between flex-row w-full px-6 pt-4">
            <Button
              type="ghost"
              title={btn1Txt?.toUpperCase()}
              customContainer="px-2 py-2 rounded-md bg-[#dadada]"
              customTextClass="text-xs font-medium"
              onPress={onPressBtn1}
            />
            <Button
              title={btn2Txt?.toUpperCase()}
              customContainer="px-2 py-2 rounded-md"
              customTextClass="text-xs"
              onPress={onPressBtn2}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default AppModal;
