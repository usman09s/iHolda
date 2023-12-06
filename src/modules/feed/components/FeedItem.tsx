import {
  Image,
  View,
  ToastAndroid,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp } from '@react-navigation/native';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { AuthStackParamList } from 'modules/auth/AuthStackNavigator';
import { units, wW } from 'utils/helpers';

import BorderedText from '../components/BorderedText';
import FeedItemIndex from '../components/FeedItemIndex';

import FeedItemActionBar from './FeedItemActionBar';
import FeedItemDetailsBar from './FeedItemDetailsBar';
import { useMutation } from 'react-query';
import Api from 'services/Api';
import Commentsui from './CommentsUi';
import { getImageLink, getVideoLink } from 'modules/moments/helpers/imageHelpers';
import { useState } from 'react';
import MomentCameraHeader from 'modules/moments/components/MomentCameraHeader';
import { ResizeMode, Video } from 'expo-av';
import AppVideo from 'components/AppVideo';

interface Props {
  image: string;
  username1?: string;
  username2?: string;
  userpic1?: string;
  useTabHeight?: boolean;
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
  gotoDetailOnPress?: boolean;
  data?: any;
  canGoBack?: () => boolean;
  username?: string;
  bookmarks: number;
  shares: number;
  userId1: string;
  userId2: string;
}

const FeedItem = ({
  username,
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
  useTabHeight = true,
  gotoDetailOnPress = false,
  data,
  canGoBack = () => false,
  bookmarks,
  shares,
  userId1,
  userId2,
}: Props) => {
  const { top } = useSafeAreaInsets();
  const { mutate } = useMutation(Api.sharePost);
  const { mutate: bookmark } = useMutation(Api.bookMarkPost);
  const [commentModal, setCommentModal] = useState(false);
  const [activeIndex0, setActiveIndex0] = useState(0);

  const { navigate, goBack } = useAppNavigation<NavigationProp<any>>();

  return (
    <View style={{ flex: 1 }}>
      <Commentsui
        likes={likes}
        useTabHeight={useTabHeight}
        visible={commentModal}
        setVisible={() => setCommentModal(prev => !prev)}
        text=""
      />
      {canGoBack() && username !== undefined && (
        <MomentCameraHeader goBack={goBack} matchedUserUsername={username} />
      )}
      <View
        className="absolute z-40 flex-row space-x-2 self-center items-center"
        style={{ paddingTop: top + (canGoBack() ? 50 : 30) }}>
        <FeedItemIndex indexCount={media.length} activeIndex={activeIndex0} />
      </View>
      <View
        className="absolute z-20 flex-row self-center items-center right-10"
        style={{ top: units.vh * 20 }}>
        <BorderedText size={50}>{activeIndex0 + 1}</BorderedText>
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
        <View className="flex-1 h-full">
          <FlatList
            data={media}
            keyExtractor={(_, i) => i.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={ev => {
              setActiveIndex0(
                Math.round(ev.nativeEvent.contentOffset.x / Dimensions.get('screen').width),
              );
            }}
            renderItem={({ item }) => {
              return (
                <TouchableWithoutFeedback
                  onPress={() =>
                    !gotoDetailOnPress ? null : navigate('FeedDetailView', { item: data })
                  }>
                  {item.mediaType.includes('video') ? (
                    <AppVideo
                      // useNativeControls
                      isLooping
                      //TODO: uncomment this:
                      // shouldPlay={true}
                      resizeMode={ResizeMode.CONTAIN}
                      // className="h-full w-full"
                      style={{
                        width: canGoBack() ? wW - 10 : wW,
                        height: Dimensions.get('screen').height,
                        // marginTop: 10
                      }}
                      source={{
                        uri: getVideoLink(item.mediaId),
                      }}
                    />
                  ) : (
                    <Image
                      resizeMode="cover"
                      // className="h-full w-full"
                      style={{
                        width: canGoBack() ? wW - 10 : wW,
                        height: Dimensions.get('screen').height,
                        // marginTop: 10
                      }}
                      source={{
                        uri: getImageLink(item.mediaId),
                      }}
                    />
                  )}
                </TouchableWithoutFeedback>
              );
            }}
          />
        </View>
      )}

      <FeedItemDetailsBar
        userId1={userId1}
        userId2={userId2}
        navigate={navigate}
        paddingBottom={canGoBack() ? 30 : 12}
        userFirst={{
          emotion: '😄',
          username: username1 || '@userFirst',
          avatar: userpic1 || 'https://i.pravatar.cc/150?img=33',
        }}
        userSecond={{
          emotion: '😍',
          username: username2 || '',
          avatar: userpic2 || '',
        }}
        subText={subText}
        caption={caption}
      />
      <FeedItemActionBar
        bookmarks={bookmarks}
        shares={shares}
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
        onPressComment={() => setCommentModal(prev => !prev)}
        onPressBookmark={() =>
          bookmark(
            { postId: id },
            {
              onSuccess(data) {
                ToastAndroid.showWithGravity(
                  'Post bookmarked',
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER,
                );
              },
            },
          )
        }
      />
    </View>
  );
};

export default FeedItem;
