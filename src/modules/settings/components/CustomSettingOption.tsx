import { View, Text, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

export const CustomSettingOption = ({ option, onPress }: any) => {
  return (
    <TouchableOpacity
      className="flex-row justify-between items-center py-4"
      style={{ borderBottomWidth: 0.2, borderColor: 'gray' }}>
      <Text className="text-black text-md font-semibold">{option}</Text>
      <Entypo name="chevron-small-right" size={25} color="gray" />
    </TouchableOpacity>
  );
};
