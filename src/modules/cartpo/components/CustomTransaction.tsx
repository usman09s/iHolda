import { View, Text } from 'react-native';

export const CustomTransaction = ({
  avatarComponent,
  topText,
  bottomText,
  time,
  amount,
  type,
}: any) => {
  return (
    <View className="flex-row justify-between items-center bg-[#e1e1e1] py-3 px-4 rounded-xl my-1">
      <View className="flex-row">
        {avatarComponent}
        <View className="flex-column gap-1 justify-center">
          <Text className="text-13 text-black font-semibold">{topText}</Text>
          <Text className="text-10 text-gray-500">{bottomText}</Text>
        </View>
      </View>
      <View className="flex-column gap-1 items-end">
        <Text
          className={`text-sm font-semibold ${
            type === 'positive' ? 'text-green-600' : 'text-red-600'
          }`}>
          {amount} CFA
        </Text>
        <Text className="text-xs text-gray-500">{time}</Text>
      </View>
    </View>
  );
};
