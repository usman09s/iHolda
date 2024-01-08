import { Image, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from 'theme/colors';
import { text } from 'theme/text';
import { units } from 'utils/helpers';
import { getImageLink } from 'modules/moments/helpers/imageHelpers';
import { useSelector } from 'react-redux';
import { userSelector } from 'store/auth/userSelectors';
import { useState } from 'react';
import Api from 'services/Api';

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
    } | null;
    username: string;
    emotion?: string;
  };
  caption: string;
  subText: string;
  navigate: any;
  userId1: string;

  userId2: string;
  users: any;
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
  users,
}: FeedItemDetailsBarProps) => {
  const { user } = useSelector(userSelector);
  const [isFollowed, setIsFollowed] = useState(false);
  const [isFollowed2, setIsFollowed2] = useState(false);
  const [numOfSubTextLines, setNumOfSubTextLines] = useState<number | undefined>(2);
  const followUnfollowUser = async (userId: string, userNum: number) => {
    try {
      await Api.followUnFollowUseer(userId, false);

      if (userNum === 1) setIsFollowed(true);
      else setIsFollowed2(true);
    } catch (error) {
      // console.log('🚀 ~ followUnfollowUser ~ error:', error);
    }
  };

  const isMe = (id: string) => id === user?._id;
  const isUser1AlreadyFollowed = users[0]?.user?.followers?.includes(user?._id);
  const isUser2AlreadyFollowed = users[1]?.user?.followers?.includes(user?._id);

  const renderTextWithBoldHashtags = (captiontext: string) => {
    if (!captiontext) return '';
    const words = captiontext.split(' ');

    return words.map((word, index) => {
      if (word.startsWith('#')) {
        // Make hashtags bold
        return (
          <Text key={index} style={{ fontWeight: '900' }}>
            {word}{' '}
          </Text>
        );
      } else {
        return <Text key={index}>{word} </Text>;
      }
    });
  };
  return (
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
        <View className="ml-2 mb-5">
          <View className="flex-row items-center pl-6">
            {userSecond.username ? <Text className="rotate-30">{userFirst.emotion}</Text> : null}
            {userSecond.username ? (
              <Text className="-rotate-30 right-1.5">{userSecond.emotion}</Text>
            ) : null}
          </View>
          <View className="flex-row mb-3">
            <TouchableOpacity
              onPress={() =>
                navigate(isMe(userId1) ? 'ProfileStack' : 'OtherUserProfileMain', {
                  userId: userId1,
                })
              }
              className="rounded-full border-[3px] border-saffron bg-gray-400 justify-center items-center">
              <Image
                source={{ uri: getImageLink(userFirst?.avatar?.mediaId) }}
                className="w-11 h-11 rounded-full"
              />
              {isMe(userId1) || isFollowed ? null : isUser1AlreadyFollowed ? null : (
                <TouchableOpacity
                  onPress={() => followUnfollowUser(userId1, 1)}
                  className="h-[20] w-[20] bg-[#05a9f4] absolute bottom-[-10] left-3 items-center justify-center rounded-full">
                  <Text className="text-white text-15">+</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
            {userSecond.username ? (
              <TouchableOpacity
                onPress={() =>
                  navigate(isMe(userId2) ? 'ProfileStack' : 'OtherUserProfileMain', {
                    userId: userId2,
                  })
                }
                className="rounded-full  right-4 border-[3px] border-green-400  bg-gray-400">
                <Image
                  source={{ uri: getImageLink(userSecond?.avatar?.mediaId) }}
                  className="w-11 h-11 rounded-full"
                />
                {isMe(userId2) || isFollowed2 ? null : isUser2AlreadyFollowed ? null : (
                  <TouchableOpacity
                    onPress={() => followUnfollowUser(userId2, 2)}
                    className="h-[20] w-[20] bg-[#05a9f4] absolute bottom-[-10] left-3 items-center justify-center rounded-full">
                    <Text className="text-white text-15">+</Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            ) : null}
          </View>
          <View className="flex-row">
            <TouchableOpacity
              onPress={() =>
                navigate(isMe(userId1) ? 'ProfileStack' : 'OtherUserProfileMain', {
                  userId: userId1,
                })
              }>
              <Text className={text({ type: 'r20', class: 'text-white text-center text-[15px]' })}>
                {userFirst.username}
              </Text>
            </TouchableOpacity>
            {userSecond?.username ? (
              <Text className={text({ type: 'r20', class: 'text-white text-center text-[15px]' })}>
                {' '}
                and{' '}
              </Text>
            ) : null}
            {userSecond?.username ? (
              <TouchableOpacity
                onPress={() =>
                  navigate(isMe(userId2) ? 'ProfileStack' : 'OtherUserProfileMain', {
                    userId: userId2,
                  })
                }>
                <Text
                  className={text({ type: 'r20', class: 'text-white text-center text-[15px]' })}>
                  {userSecond.username}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>

          {!!caption && (
            <Text
              numberOfLines={4}
              className={text({ type: 'r15', class: 'text-white mt-1 w-[70%]' })}
              style={{ fontSize: 13 }}>
              {renderTextWithBoldHashtags(caption)}
            </Text>
          )}
          {!!subText && (
            <TouchableWithoutFeedback
              onPress={() => setNumOfSubTextLines(prev => (prev ? undefined : 2))}>
              <Text
                numberOfLines={numOfSubTextLines}
                style={{
                  fontSize: 13,
                  marginTop: 8,
                  color: 'white',
                  width: '70%',
                  fontFamily: 'Regular',
                }}>
                {renderTextWithBoldHashtags(subText)}
              </Text>
            </TouchableWithoutFeedback>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

export default FeedItemDetailsBar;
