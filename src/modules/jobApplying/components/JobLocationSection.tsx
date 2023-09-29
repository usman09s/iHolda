import { Image, Text, View } from 'react-native';
import Icons from 'components/Icons';
import { Map } from 'components/Images';
import { text } from 'theme/text';

const JobLocationSection = () => (
  <View className="p-4 bg-[#fbfbfb]">
    <View className="flex-row justify-between">
      <View>
        <Text className={text({ type: 'b16', class: 'mb-2.5' })}>Location</Text>
        <Text className={text({ type: 'r14' })}>UB Junction, Buea, SW, CMR</Text>
      </View>
      <View className="flex-row items-center">
        <Text className={text({ type: 'r12', class: 'mr-1' })}>Direction</Text>
        <Icons.Direction />
      </View>
    </View>
    <View className="mt-2.5">
      <Image source={Map} resizeMode="cover" className="h-40 w-full" />
    </View>
  </View>
);

export default JobLocationSection;
