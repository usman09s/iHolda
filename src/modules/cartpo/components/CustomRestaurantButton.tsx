import { TouchableOpacity, Text } from 'react-native';

export const CustomRestaurantButton = ({ title, onPress, customButtonClass, customTextClass }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`bg-[#00d24f] w-32 py-2.5 rounded-full justify-center items-center ${customButtonClass}`}>
      <Text className={`text-white text-base ${customTextClass}`}>{title}</Text>
    </TouchableOpacity>
  );
};
