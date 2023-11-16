import { View, Text, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

export const CustomEditProfileOption = ({ option, onPress, rightComponentTitle }: any) => {
  return (
    <TouchableOpacity
      className="flex-row justify-between items-center py-4"
      style={{ borderBottomWidth: 0.2, borderColor: 'gray' }}
      onPress={onPress}>
      <Text className="text-black text-base font-semibold pl-5">{option}</Text>
      <View className="flex-row items-center gap-1">
        <Text className="text-gray-500 text-base">{rightComponentTitle}</Text>
        <Entypo name="chevron-thin-right" size={15} color="gray" />
      </View>
    </TouchableOpacity>
  );
};
