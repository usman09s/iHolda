import { Image, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from 'theme/colors';
import { text } from 'theme/text';
import { units } from 'utils/helpers';

type FeedItemDetailsBarProps = {
  userFirst: {
    avatar: string;
    username: string;
    emotion?: string;
  };
  userSecond: {
    avatar: string;
    username: string;
    emotion?: string;
  };
  caption: string;
  subText: string;
};

const FeedItemDetailsBar = ({
  userFirst,
  userSecond,
  caption,
  subText,
}: FeedItemDetailsBarProps) => (
  <View className="absolute bottom-0 w-full">
    <LinearGradient
      colors={[
        colors['black-o-01'],
        colors['black-o-10'],
        colors['black-o-50'],
        colors['black-o-60'],
      ]}
      locations={[0, 0.1, 0.6, 1]}
      className="items-center justify-between  z-20 px-6 pb-3 pt-2">
      <View className="mr-12">
        <View className="flex-row items-center pl-6">
          <Text className="rotate-30">{userFirst.emotion}</Text>
          <Text className="-rotate-30 right-1.5">{userSecond.emotion}</Text>
        </View>
        <View className="flex-row mb-3">
          <View className="rounded-full border-[3px] border-saffron bg-gray-400 justify-center items-center">
            <Image source={{ uri: userFirst.avatar }} className="w-11 h-11 rounded-full" />
          </View>
          <View className="rounded-full  right-4 border-[3px] border-green-400  bg-gray-400">
            <Image source={{ uri: userSecond.avatar }} className="w-11 h-11 rounded-full" />
          </View>
        </View>
        <Text className={text({ type: 'b20', class: 'text-white' })} numberOfLines={2}>
          {userFirst.username}
          <Text className={text({ type: 'r20', class: 'text-white text-center mt-6' })}>
            {' and '}
          </Text>
          {userSecond.username}
        </Text>
        {!!caption && (
          <Text numberOfLines={4} className={text({ type: 'r15', class: 'text-white mt-1' })}>
            {caption}
          </Text>
        )}
      </View>
      {!!subText && (
        <Text
          numberOfLines={1}
          style={{ paddingBottom: units.vh * 2 }}
          className={text({
            type: 'r15',
            class: 'text-white text-center mt-6 px-7 ',
          })}>
          {subText}
        </Text>
      )}
    </LinearGradient>
  </View>
);

export default FeedItemDetailsBar;
