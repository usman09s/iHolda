import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { text } from 'theme/text';

type Props = {
  errorText?: string;
  buttonTitle?: string;
  visible: boolean;
  onClose: any;
};

const CustomErrorModal = ({ errorText, visible, buttonTitle, onClose }: Props) => {
  return (
    <Modal visible={visible} onRequestClose={onClose} transparent>
      <View className="flex-1 justify-center items-center px-7 bg-black-o-50">
        <Animated.View
          className="justify-center items-center p-4 bg-white rounded-xl py-8 w-full"
          entering={SlideInDown}>
          <Text className={text({ type: 'r20', class: 'mt-4 mb-7' })}>{errorText}</Text>
          <TouchableOpacity
            onPress={onClose}
            style={{
              backgroundColor: '#dadada',
              paddingHorizontal: 10,
              borderRadius: 5,
              paddingVertical: 5,
            }}>
            <Text style={{ fontWeight: '500', color: 'black' }}>{buttonTitle}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default CustomErrorModal;
