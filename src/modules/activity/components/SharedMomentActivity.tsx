import { Image, Text, View } from 'react-native';
import { text } from 'theme/text';

type Props = {
  title: string;
  subTitle: string;
  momentThumbnail: string;
  avatars: {
    user1: string;
    user2: string;
  };
  time?: string;
};

const SharedMomentActivity = ({
  title,
  subTitle,
  avatars,
  momentThumbnail,
  time = '30s',
}: Props) => (
  <View className="flex-row items-center mb-7">
    <View className="flex-row">
      <View className="rounded-full border-[3px] border-saffron bg-gray-400 justify-center items-center">
        <View className="rounded-full border-[2px] border-white justify-center items-center">
          <Image source={{ uri: avatars.user1 }} className="w-10 h-10 rounded-full" />
        </View>
      </View>
      <View className="rounded-full  right-4 border-[3px] border-green-400  bg-gray-400">
        <View className="rounded-full border-[2px] border-white justify-center items-center">
          <Image source={{ uri: avatars.user2 }} className="w-10 h-10 rounded-full" />
        </View>
      </View>
    </View>
    <View className="ml-1 flex-1">
      <Text numberOfLines={2} className={text({ type: 'b15' })}>
        {title}
      </Text>
      <Text className={text({ type: 'r12', class: ' mt-1.5' })}>
        {subTitle} <Text className={text({ type: 'm12', class: 'text-red-500' })}>{time}</Text>
      </Text>
    </View>
    <View>
      <Image source={{ uri: momentThumbnail }} className="w-10 h-10 rounded-md" />
    </View>
  </View>
);

export default SharedMomentActivity;
