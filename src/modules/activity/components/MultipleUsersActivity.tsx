import { Image, Text, View, TouchableOpacity } from 'react-native';
import { text } from 'theme/text';

type Props = {
  title: string;
  subTitle: string;
  momentThumbnail: string;
  lastUserUsername: string;
  avatars: {
    user1: string;
    user2: string;
  };
  time?: any;
  onPress?: any;
};

const MultipleUsersActivity = ({
  title,
  subTitle,
  avatars,
  momentThumbnail,
  lastUserUsername,
  time,
  onPress,
}: Props) => (
  <TouchableOpacity className="flex-row items-center mb-7" onPress={onPress}>
    <View className="flex-row">
      <View className="rounded-full border-[3px] border-white bg-gray-400 justify-center items-center">
        <Image source={{ uri: avatars.user1 }} className="w-8 h-8 rounded-full" />
      </View>
      <View className="rounded-full  right-7 border-[3px] border-white bg-gray-400 top-2.5 ">
        <Image source={{ uri: avatars.user2 }} className="w-8 h-8 rounded-full" />
      </View>
    </View>
    <View className="flex-1 right-4">
      <Text numberOfLines={2} className={text({ type: 'b15' })}>
        {title}
      </Text>
      <Text className={text({ type: 'r12', class: 'mt-1.5 mr-1.5' })}>
        {subTitle} <Text className={text({ type: 'b12' })}>{lastUserUsername}</Text>
        <Text className={text({ type: 'm12', class: 'text-red-500' })}> {time ? time : '30s'}</Text>
      </Text>
    </View>
    <View>
      {momentThumbnail ? <Image source={{ uri: momentThumbnail }} className="w-10 h-10 rounded-md" />: null}
    </View>
  </TouchableOpacity>
);

export default MultipleUsersActivity;
