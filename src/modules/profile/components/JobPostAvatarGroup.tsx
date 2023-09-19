import { Image, Text, View } from 'react-native';
import { text } from 'theme/text';

const JobPostAvatarGroup = () => (
  <View className="flex-row items-center justify-between">
    <View className="flex-row mt-6">
      <View className="rounded-full border-2 border-white">
        <Image
          source={{ uri: 'https://i.pravatar.cc/300?img=12' }}
          className="rounded-full h-6 w-6 "
        />
      </View>
      <View className="overflow-hidden rounded-full border-2 border-white right-2">
        <Image
          source={{ uri: 'https://i.pravatar.cc/300?img=13' }}
          className=" rounded-full h-6 w-6"
        />
      </View>
      <View className="overflow-hidden rounded-full border-2 border-white right-4">
        <Image
          source={{ uri: 'https://i.pravatar.cc/300?img=14' }}
          className="rounded-full h-6 w-6"
        />
      </View>
      <View className="overflow-hidden rounded-full border-2 border-white right-6">
        <Image
          source={{ uri: 'https://i.pravatar.cc/300?img=15' }}
          className="rounded-full h-6 w-6"
        />
      </View>
    </View>
    <View className="bg-red-500 h-6 w-6 rounded-full justify-center items-center">
      <Text className={text({ type: 'm16', class: 'text-white' })}>4</Text>
    </View>
  </View>
);

export default JobPostAvatarGroup;
