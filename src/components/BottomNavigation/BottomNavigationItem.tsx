import { Pressable, View } from 'react-native';
import { getHitSlop, width } from 'utils/helpers';

const BottomNavigationItem = ({
  icon,
  onPress,
}: {
  onPress: () => void;
  icon: React.ReactNode;
}) => (
  <Pressable
    onPress={onPress}
    style={{ width: (width - 32) / 4 }}
    className="justify-center items-center"
    hitSlop={getHitSlop({ value: 15, left: 20, right: 20 })}>
    <View className="h-6 w-6 mb-1">{icon && icon}</View>
  </Pressable>
);

export default BottomNavigationItem;
