import { memo } from 'react';
import { Modal, Text, View } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import Button from 'components/Button';
import { text } from 'theme/text';

type Props = {
  visible: boolean;
  countryCode: string;
  phoneNumber: string;
  onCloseModal: () => void;
  onPressYes: () => void;
};

const PhoneConfirmationModal = ({
  visible,
  onPressYes,
  countryCode,
  phoneNumber,
  onCloseModal,
}: Props) => (
  <Modal statusBarTranslucent visible={visible} onRequestClose={onCloseModal} transparent>
    <View
      className=" flex-1 justify-center items-center px-4 overflow-hidden"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <Animated.View
        entering={SlideInDown}
        className="bg-white my-20 w-full rounded-2xl overflow-hidden px-7 pt-4">
        <Text className={text({ type: 'r20', isCenter: true, class: 'm-6' })}>
          Is this Number correct?
        </Text>
        <Text className={text({ type: 'r32', isCenter: true })}>
          {countryCode} {phoneNumber}
        </Text>
        <View className="flex-row justify-between mb-7 mt-10">
          <Button
            title="CHANGE"
            type="ghost"
            onPress={onCloseModal}
            customTextClass={text({ type: 'm20' })}
          />
          <Button
            title="YES"
            type="ghost"
            onPress={onPressYes}
            customTextClass={text({ type: 'm20' })}
          />
        </View>
      </Animated.View>
    </View>
  </Modal>
);

export default memo(PhoneConfirmationModal);
