import { Modal, SafeAreaView, Text, View } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import Button from 'components/Button';
import { text } from 'theme/text';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const LocationClosedPopup = ({ visible, onClose }: Props) => (
  <Modal statusBarTranslucent visible={visible} onRequestClose={onClose} transparent>
    <View
      className=" flex-1 justify-end overflow-hidden"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <Animated.View className="bg-white rounded-t-2xl p-10 pt-5" entering={SlideInDown}>
        <SafeAreaView>
          <View className="rounded-full h-2 w-12 bg-black-o-80 self-center mb-5" />
          <Text className={text({ type: 'b18', class: 'text-center mb-4' })}>
            This location is currently {'\n'}closed
          </Text>
          <Text className={text({ type: 'r12', class: 'text-center' })}>
            Select another location to drop off your plastics
          </Text>
          <Button
            title="FIND ANOTHER"
            onPress={onClose}
            customContainer="bg-yellowishOrange rounded-md mt-8"
            customTextClass="text-16"
          />
        </SafeAreaView>
      </Animated.View>
    </View>
  </Modal>
);

export default LocationClosedPopup;
