import { Image, View, ToastAndroid, Text, FlatList, Dimensions, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp } from '@react-navigation/native';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { AuthStackParamList } from 'modules/auth/AuthStackNavigator';
import { units } from 'utils/helpers';

import BorderedText from '../components/BorderedText';
import FeedItemIndex from '../components/FeedItemIndex';

import FeedItemActionBar from './FeedItemActionBar';
import FeedItemDetailsBar from './FeedItemDetailsBar';
import { useMutation } from 'react-query';
import Api from 'services/Api';
import Commentsui from './CommentsUi';
import { getImageLink } from 'modules/moments/helpers/imageHelpers';
import { useState } from 'react';

interface Props {
  image: string;
  username1?: string;
  username2?: string;
  userpic1?: string;
  userpic2?: string;
  caption: string;
  subText: string;
  id: string;
  likes: number;
  comments: number;
  media: {
    mediaId: string;
    mediaType: 'video' | 'image';
  }[];
}

const FeedItem = ({
  image,
  username1,
  username2,
  userpic1,
  userpic2,
  caption,
  subText,
  id,
  likes,
  comments,
  media,
}: Props) => {
  const { top } = useSafeAreaInsets();
  const { mutate, isLoading } = useMutation(Api.sharePost);
  const [activeIndex, setActiveIndex] = useState(0);

  const {} = useAppNavigation<NavigationProp<AuthStackParamList>>();

  return (
    <View style={{ flex: 1 }}>
      <Commentsui visible setVisible={() => null} text='' />
      <View
        className="absolute z-40 flex-row space-x-2 self-center items-center"
        style={{ paddingTop: top + 30 }}>
        <FeedItemIndex indexCount={media.length} activeIndex={activeIndex} />
      </View>
      <View
        className="absolute z-20 flex-row self-center items-center right-10"
        style={{ top: units.vh * 20 }}>
        <BorderedText size={50}>{activeIndex + 1}</BorderedText>
      </View>
      {media.length === 0 ? (
        <Image
          resizeMode="cover"
          className="w-full h-full"
          source={{
            uri: 'https://static.vecteezy.com/system/resources/thumbnails/006/299/377/original/free-download-raining-stock-clip-free-video.jpg',
          }}
        />
      ) : (
        <View className="flex-1">
          <FlatList
            data={media}
            keyExtractor={(_, i) => i.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={ev => {
              setActiveIndex(
                Math.round(ev.nativeEvent.contentOffset.x / Dimensions.get('screen').width),
              );
            }}
            renderItem={({ item }) => (
              <Image
                resizeMode="cover"
                // className="h-full"
                style={{
                  width: Dimensions.get('screen').width,
                  height: Dimensions.get('screen').height,
                }}
                source={{
                  uri: getImageLink(item.mediaId),
                }}
              />
            )}
          />
        </View>
      )}

      <FeedItemDetailsBar
        userFirst={{
          emotion: '😄',
          username: username1 || '@userFirst',
          avatar: userpic1 || 'https://i.pravatar.cc/150?img=33',
        }}
        userSecond={{
          emotion: '😍',
          username: username2 || '@userSecond',
          avatar: userpic2 || 'https://i.pravatar.cc/150?img=35',
        }}
        subText={subText}
        caption={caption}
      />
      <FeedItemActionBar
        bookmarks={0}
        shares={0}
        likes={likes}
        comments={comments}
        onPressLike={() => null}
        onPressShare={() => {
          mutate(
            { postId: id },
            {
              onSuccess(data) {
                ToastAndroid.showWithGravity(
                  'Post shared',
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER,
                );
              },
            },
          );
        }}
        onPressComment={() => null}
        onPressBookmark={() => null}
      />
    </View>
  );
};

export default FeedItem;
