import { Image, Text, View, TouchableOpacity } from 'react-native';
import BorderedText from 'modules/feed/components/BorderedText';
import { text } from 'theme/text';
import { width } from 'utils/helpers';
import { UserMoment } from '../types';
import { getImageLink, getVideoLink } from '../../moments/helpers/imageHelpers';
import { ResizeMode,  } from 'expo-av';
import VideoPlayer from 'expo-video-player';

type Props = { index: number; item: UserMoment; onPress?: (val: any) => void };

const ProfilePostItem = ({ index, item, onPress }: Props) => {
  const media = item?.post?.userQuiz ? [item?.post?.userQuiz.recording] : item.post?.media;

  return (
    <TouchableOpacity
      onPress={() => onPress && onPress(item)}
      style={[
        {
          height: width / 2.4,
          width: width / 3,
          marginRight: 2,
          marginBottom: 2,
          overflow: 'hidden',
        },
      ]}>
      {!media[0] ? <View className="h-full w-full bg-gray-300" /> : null}
      {media[0]?.mediaType?.includes('image') ? (
        <Image
          className="h-full w-full"
          source={{
            uri: getImageLink(media[0]?.mediaId),
          }}
        />
      ) : (
        <VideoPlayer
          videoProps={{
            shouldPlay: false,
            resizeMode: ResizeMode.COVER,
            source: {
              uri: getVideoLink(media[0]?.mediaId),
            },
            className: 'h-full w-full',
          }}
        />
      )}
      <View className="absolute w-10 z-20 right-4 top-2 items-center justify-center">
        <BorderedText size={30}>{item.post.media.length}</BorderedText>
        <Text className={text({ type: 'b12', class: 'text-white text-center' })}>Slides</Text>
      </View>
      <View className="absolute z-20 bottom-0 left-0 pl-2 py-2 w-full flex-row overflow-hidden items-center bg-black-o-20">
        <View className="flex-row items-center">
          <View className={`rounded-full border-2 border-saffron ${item.users[1] ? '' : 'mr-2'}`}>
            <View className="rounded-full border-2 border-white">
              <Image
                source={{ uri: getImageLink(item.users[0]?.user.photo?.mediaId ?? '') }}
                className="rounded-full h-6 w-6 "
              />
            </View>
          </View>
          {item.users[1] ? (
            <View className="overflow-hidden rounded-full border-2 border-green-500 right-2">
              <View className="overflow-hidden rounded-full border-2 border-white ">
                <Image
                  source={{ uri: getImageLink(item.users[1]?.user?.photo?.mediaId ?? '') }}
                  className=" rounded-full h-6 w-6"
                />
              </View>
            </View>
          ) : null}
        </View>
        <Text numberOfLines={1} className={text({ type: 'b10', class: 'w-1/2 text-white' })}>
          with
          <Text style={{ textTransform: 'capitalize' }}>
            {' '}
            {item.users[1] ? item.users[1]?.user.userName : 'Yourself'}
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProfilePostItem;
