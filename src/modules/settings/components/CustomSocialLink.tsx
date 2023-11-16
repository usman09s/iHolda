import { View, Text } from 'react-native';

export const CustomSocialLink = ({ title, rightComponent }) => {
  return (
    <View className="flex-row justify-between my-2 items-center">
      <Text className="text-base font-semibold text-black">{title}</Text>
      {rightComponent}
    </View>
  );
};
