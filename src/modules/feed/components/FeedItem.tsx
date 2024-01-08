import { Image, View, ToastAndroid, FlatList, Dimensions } from 'react-native';
import { useCallback, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { AuthStackParamList } from 'modules/auth/AuthStackNavigator';
import { units, wW } from 'utils/helpers';
import { Audio, AVPlaybackStatus } from 'expo-av';
import DoubleClick from 'react-native-double-tap';

import BorderedText from '../components/BorderedText';
import FeedItemIndex from '../components/FeedItemIndex';

import FeedItemActionBar from './FeedItemActionBar';
import FeedItemDetailsBar from './FeedItemDetailsBar';
import { useMutation } from 'react-query';
import Api from 'services/Api';
import Commentsui from './CommentsUi';
import { getAudioLink, getImageLink, getVideoLink } from 'modules/moments/helpers/imageHelpers';
import { useRef, useState } from 'react';
import MomentCameraHeader from 'modules/moments/components/MomentCameraHeader';
import { ResizeMode } from 'expo-av';
import AppVideo from 'components/AppVideo';
import { useSelector } from 'react-redux';
import { userSelector } from 'store/auth/userSelectors';
import VideoPlayer from 'expo-video-player';

interface Props {
  image: string;
  username1?: string;
  username2?: string;
  userpic1?: any;
  useTabHeight?: boolean;
  userpic2?: any;
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
  onPressLike: (index: number) => void;
  index: number;
  currentIndex: number;
  isFocused: boolean;
  audio?: string;
  users: any;
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
  onPressLike,
  index,
  currentIndex,
  isFocused,
  audio,
  users,
}: Props) => {
  // console.log('🚀 ~ file: FeedItem.tsx:98 ~ index:', index);
  // console.log('🚀 ~ file: FeedItem.tsx:98 ~ currentIndex:', currentIndex);

  const { top } = useSafeAreaInsets();
  const { mutate } = useMutation(Api.sharePost);
  const { user } = useSelector(userSelector);
  const [liked, setLiked] = useState<boolean>(data?.likes?.includes(user?._id));
  const [bookmarked, setBookmarked] = useState<boolean>(data?.bookmarked ?? false);
  const { mutate: bookmark } = useMutation(Api.bookMarkPost);
  const { mutate: likePost } = useMutation(Api.likeUnlikePost);
  const [commentModal, setCommentModal] = useState(false);
  const [activeIndex0, setActiveIndex0] = useState(0);

  const isItemFocused = useIsFocused();

  const indexRef = useRef(index);
  indexRef.current = index;

  const currentIndexRef = useRef(currentIndex);
  currentIndexRef.current = currentIndex;

  const isFocusedRef = useRef(isFocused);
  isFocusedRef.current = isFocused;

  const { navigate, goBack } = useAppNavigation<NavigationProp<any>>();
  // const sound = new Audio.Sound();
  const sound = useRef(new Audio.Sound()); // Initialize the sound variable

  // Stop the current audio when the component unmounts or when the currentIndex changes
  async function unloadAudio() {
    try {
      if (!audio) return;

      if (sound.current && sound.current._loaded) {
        // console.log('🚀 ~ current index:', currentIndex);
        // console.log('🚀 ~ pausing index:', index);
        // console.log('🚀 ~ pausing audio:', audio);
        // console.log('');

        await sound.current.stopAsync();
      }
    } catch (error) {
      console.log('🚀 ~ unloadAudio ~ error:', error);
    }
  }

  async function playAudio() {
    try {
      if (!audio) return;

      const isAudiLoaded = sound.current._loaded;

      // if (sound.current._loaded) return await sound.current.playAsync();

      if (isFocused && isAudiLoaded) {
        await sound.current.playAsync();
      }
    } catch (error) {
      console.error('Error loading audio:', error);
    }
  }

  // Load and play audio when the component mounts or when the index changes
  async function loadAudio() {
    try {
      if (!audio) return;

      const isAudiLoaded = sound.current._loaded;
      if (isAudiLoaded) return;

      await sound.current.loadAsync(
        {
          uri: getAudioLink(audio),
        },
        {
          isLooping: true,
          shouldPlay: currentIndexRef.current === indexRef.current,
        },
      );

      sound.current.setOnPlaybackStatusUpdate(status => {
        if (!isFocusedRef.current || currentIndexRef.current !== indexRef.current) unloadAudio();
      });
    } catch (error) {
      console.error('Error loading audio:', error);
    }
  }

  useEffect(() => {
    // Load and unload audio based on currentIndex and index
    // console.log('🚀 ~ current index:', currentIndex);
    // console.log('🚀 ~ item index:', index);

    if (index < currentIndex + 3) {
      loadAudio();
    }

    if (currentIndex === index) {
      playAudio();
    } else unloadAudio();
  }, [currentIndex, isFocused]);

  // useEffect(() => {
  //   if (index < 3) {
  //     console.log('🚀 ~ current index:', currentIndex);
  //     console.log('🚀 ~ item index:', index);
  //     console.log('🚀 ~ item focused:', isItemFocused);

  //     console.log('-------------');
  //     console.log('-------------');
  //     console.log('-------------');
  //   }
  // }, [isItemFocused]);
  // useEffect(() => {
  //   loadAudio();
  // }, []);

  // useEffect(() => {
  //   if (!isFocused || currentIndex !== index) unloadAudio();
  // }, [isFocused, currentIndex]);

  // useFocusEffect(
  //   useCallback(() => {
  //     if (currentIndex === index) {
  //       if (audio) loadAudio();
  //     } else if (audio) {
  //       unloadAudio();
  //     }
  //   }, [currentIndex]),
  // );

  const checkVisible = (isVisible: boolean) => {
    console.log(`🚀 ~ index: ${index} ~ isVisible:`, isVisible);
  };

  return (
      <View style={{ flex: 1 , }}>
        {canGoBack() && username !== undefined && (
          <MomentCameraHeader goBack={goBack} matchedUserUsername={username} />
        )}
        <View
          className="absolute z-40 flex-row space-x-2 self-center items-center"
          style={{ paddingTop: top + (canGoBack() ? 50 : -15) }}>
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
                // console.log('🚀 ~ file: FeedItem.tsx:191 ~ item:', item);
                // const videoLink = getVideoLink(item.mediaId);
                return (
                  <DoubleClick
                    singleTap={() => {
                      // console.log("single tap");
                      console.log('Pressed');
                      !gotoDetailOnPress ? null : navigate('FeedDetailView', { item: users });
                    }}
                    doubleTap={() => {
                      console.log('double tap');
                      likePost(
                        { postId: id },
                        {
                          onSuccess(data) {
                            if (onPressLike) onPressLike(index);
                            setLiked(prev => !prev);
                          },
                        },
                      );
                    }}
                    delay={200}>
                    <>
                      {item.mediaType.includes('video') ? (
                        <VideoPlayer
                          videoProps={{
                            isLooping: true,
                            shouldPlay: isFocused && index === currentIndex,
                            resizeMode: ResizeMode.COVER,
                            source: {
                              uri: getVideoLink(item.mediaId),
                            },
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
                    </>
                  </DoubleClick>
                );
              }}
            />
          </View>
        )}
        <Commentsui
          likes={likes}
          useTabHeight={useTabHeight}
          visible={commentModal}
          setVisible={() => setCommentModal(prev => !prev)}
          text=""
        />
        <FeedItemDetailsBar
          users={users}
          userId1={userId1}
          userId2={userId2}
          navigate={navigate}
          paddingBottom={canGoBack() ? 30 : 12}
          userFirst={{
            emotion: '😄',
            username: username1 || '@userFirst',
            avatar: userpic1 || null,
          }}
          userSecond={{
            emotion: '😍',
            username: username2 || '',
            avatar: userpic2 || null,
          }}
          subText={subText}
          caption={caption}
        />
        <FeedItemActionBar
          liked={liked}
          bookmarked={bookmarked}
          bookmarks={bookmarks}
          shares={shares}
          likes={likes}
          comments={comments}
          onPressLike={() => {
            likePost(
              { postId: id },
              {
                onSuccess(data) {
                  // likes++;
                  if (onPressLike) onPressLike(index);
                  setLiked(prev => !prev);
                  // ToastAndroid.showWithGravity(
                  //   'Post bookmarked',
                  //   ToastAndroid.SHORT,
                  //   ToastAndroid.CENTER,
                  // );
                },
              },
            );
          }}
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
                  // ToastAndroid.showWithGravity(
                  //   'Post bookmarked',
                  //   ToastAndroid.SHORT,
                  //   ToastAndroid.CENTER,
                  // );
                  if (onPressLike) onPressLike(index);
                  setBookmarked(prev => !prev);
                },
              },
            )
          }
        />
      </View>
  );
};

export default FeedItem;
