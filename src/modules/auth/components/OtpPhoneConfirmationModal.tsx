import { Modal, Text, View } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import Button from 'components/Button';
import { text } from 'theme/text';

type Props = {
  visible: boolean;
  errorText: string;
  isLoading: boolean;
  phoneNumber: string;
  onCloseModal: () => void;
  onPressConfirm: () => void;
};

const OtpPhoneConfirmationModal = ({
  visible,
  isLoading,
  errorText,
  phoneNumber,
  onCloseModal,
  onPressConfirm,
}: Props) => (
  <Modal statusBarTranslucent visible={visible} onRequestClose={onCloseModal} transparent>
    <View
      className=" flex-1 justify-center items-center px-4 overflow-hidden"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <Animated.View
        entering={SlideInDown}
        className="bg-white my-20 w-full rounded-2xl overflow-hidden px-7 py-7">
        <Text className={text({ type: 'r18', class: 'text-center mb-7' })}>
          An OTP will be sent to this number:{' '}
          <Text className={text({ class: 'font-Medium' })}>{phoneNumber}</Text>
        </Text>
        {errorText && (
          <Text className={text({ type: 'r18', class: 'text-center mb-4 text-red-500' })}>
            Try again.
          </Text>
        )}
        <View className="flex-row w-full">
          <Button
            title="Close"
            type="solid"
            disabled={isLoading}
            onPress={onCloseModal}
            customContainer="flex-1 mr-4"
          />
          <Button
            type="solid"
            title="Confirm"
            disabled={isLoading}
            isLoading={isLoading}
            onPress={onPressConfirm}
            customContainer="flex-1"
          />
        </View>
      </Animated.View>
    </View>
  </Modal>
);

export default OtpPhoneConfirmationModal;
