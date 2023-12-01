import { Image, Text, View } from 'react-native';
import Button from 'components/Button';
import { text } from 'theme/text';

type Props = {
  title: string;
  subTitle: string;
  postThumbnail: string;
  showFollowBack?: boolean;
  avatars: {
    user1: string;
    user2: string;
  };
};

const CommonActivity = ({ title, subTitle, avatars, postThumbnail, showFollowBack }: Props) => (
  <View className="flex-row items-center mb-7">
    <View className="flex-row">
      <View className="rounded-full bg-gray-400 justify-center items-center">
        <Image source={{ uri: avatars.user1 }} className="w-11 h-11 rounded-full" />
      </View>
    </View>
    <View className="ml-4 flex-1">
      <Text numberOfLines={2} className={text({ type: 'b15' })} style={{ color: '#606060' }}>
        {title}
      </Text>
      <Text className={text({ type: 'r12', class: ' mt-1.5' })}>
        {subTitle} <Text className={text({ type: 'm12', class: 'text-red-500' })}>30s</Text>
      </Text>
    </View>
    <View>
      {showFollowBack ? (
        <Button
          title="Follow back"
          customContainer="bg-lightBlue px-2 py-1.5 rounded-md"
          customTextClass={text({ type: 'r12', class: 'text-black' })}
        />
      ) : (
        <Image source={{ uri: postThumbnail }} className="w-10 h-10 rounded-md" />
      )}
    </View>
  </View>
);

export default CommonActivity;
