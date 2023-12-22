import { View, Text, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

export const CustomSettingOption = ({
  option,
  onPress,
  extraContainerStyles,
  customContainerClass,
}: any) => {
  return (
    <TouchableOpacity
      className={`flex-row justify-between items-center py-4 ${customContainerClass}`}
      style={[{ borderBottomWidth: 0.2, borderColor: 'gray' }, extraContainerStyles]}
      onPress={onPress && onPress}>
      <Text className="text-black text-md font-semibold">{option}</Text>
      <Entypo name="chevron-small-right" size={25} color="gray" />
    </TouchableOpacity>
  );
};
