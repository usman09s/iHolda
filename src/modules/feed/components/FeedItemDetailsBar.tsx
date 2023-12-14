import { Image, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from 'theme/colors';
import { text } from 'theme/text';
import { units } from 'utils/helpers';
import { getImageLink } from 'modules/moments/helpers/imageHelpers';

type FeedItemDetailsBarProps = {
  paddingBottom?: number;
  userFirst: {
    avatar: {
      mediaId: string;
      mediaType: string;
    } | null;
    username: string;
    emotion?: string;
  };
  userSecond: {
    avatar: {
      mediaId: string;
      mediaType: string;
    }| null;
    username: string;
    emotion?: string;
  };
  caption: string;
  subText: string;
  navigate: any;
  userId1: string;

  userId2: string;
};

const FeedItemDetailsBar = ({
  userFirst,
  userSecond,
  caption,
  subText,
  navigate,
  paddingBottom = 12,
  userId1,
  userId2,
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
      className="justify-between  z-20 px-3 pt-2"
      style={{ paddingBottom: paddingBottom }}>
      <View className="ml-2">
        <View className="flex-row items-center pl-6">
          {userSecond.username ? <Text className="rotate-30">{userFirst.emotion}</Text> : null}
          {userSecond.username ? (
            <Text className="-rotate-30 right-1.5">{userSecond.emotion}</Text>
          ) : null}
        </View>
        <View className="flex-row mb-3">
          <TouchableOpacity
            onPress={() => navigate('OtherUserProfileMain', { userId: userId1 })}
            className="rounded-full border-[3px] border-saffron bg-gray-400 justify-center items-center">
            <Image source={{ uri: getImageLink(userFirst?.avatar?.mediaId) }} className="w-11 h-11 rounded-full" />
          </TouchableOpacity>
          {userSecond.username ? (
            <TouchableOpacity
              onPress={() => navigate('OtherUserProfileMain', { userId: userId2 })}
              className="rounded-full  right-4 border-[3px] border-green-400  bg-gray-400">
              <Image source={{ uri: getImageLink(userSecond?.avatar?.mediaId) }} className="w-11 h-11 rounded-full" />
            </TouchableOpacity>
          ) : null}
        </View>
        <View className="flex-row">
          <TouchableOpacity onPress={() => navigate('OtherUserProfileMain', { userId: userId1 })}>
            <Text className={text({ type: 'r20', class: 'text-white text-center' })}>
              {userFirst.username}
            </Text>
          </TouchableOpacity>
          {userSecond?.username ? (
            <Text className={text({ type: 'r20', class: 'text-white text-center' })}> and </Text>
          ) : null}
          {userSecond?.username ? (
            <TouchableOpacity onPress={() => navigate('OtherUserProfileMain', { userId: userId2 })}>
              <Text className={text({ type: 'r20', class: 'text-white text-center' })}>
                {userSecond.username}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {!!caption && (
          <Text numberOfLines={4} className={text({ type: 'r15', class: 'text-white mt-1' })}>
            {caption}
          </Text>
        )}
        {!!subText && (
          <Text
            numberOfLines={1}
            // style={{ paddingBottom: units.vh * 2 }}
            className={text({
              type: 'r15',
              class: 'text-white mt-2',
            })}>
            {subText}
          </Text>
        )}
      </View>
    </LinearGradient>
  </View>
);

export default FeedItemDetailsBar;
