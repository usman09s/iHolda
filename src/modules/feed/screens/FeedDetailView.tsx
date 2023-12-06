import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ListRenderItem,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp } from '@react-navigation/native';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { useQuery } from 'react-query';
import Api from 'services/Api';
import colors from 'theme/colors';
import { height, width, units, wH, wW } from 'utils/helpers';

import FeedHeader from '../components/FeedHeader';
import FeedItem from '../components/FeedItem';
import JobFeedItem from '../components/JobFeedItem';
import { FeedStackParamList } from '../FeedStackNavigator';
// import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Post } from 'types/PostsTypes';
import { getImageLink, getVideoLink } from 'modules/moments/helpers/imageHelpers';
import { text } from 'theme/text';
import { useSelector } from 'react-redux';
import { userSelector } from 'store/auth/userSelectors';
import { ResizeMode, Video } from 'expo-av';

const IMG_SIZE = 65;
const SPACING = 16 * 2;

const FeedDetailView = ({ route }: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState<any[]>([]);
  const {} = useAppNavigation<NavigationProp<FeedStackParamList>>();

  const user = useSelector(userSelector);
  const { item: item0 } = route.params;
  const thumbRef: any = useRef();
  const topRef: any = useRef();

  async function getTwoUserMet() {
    try {
      const response = await fetch(
        Api.baseUrl + `met?userId=${item0?.users[0]?.user?._id}&userId2=${item0?.users[1]?.user?._id}`,
        {
          method: 'GET',
        },
      );
      setIsLoading(false);

      if (response?.status !== 200) return;

      const res = await response.json();
      if (!res?.data?.data) return;

      setData(res.data.data);
      //       console.log('🚀 ~ file: FeedDetailView.tsx:67 ~ getTwoUserMet ~ res:', res.data.data);
    } catch (error) {
      console.log('~ getTwoUserMet ~ error:', error);
    }
  }

  const scollToIndex = (index: number) => {
    setActiveIndex(index);

    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });

    if (index * (IMG_SIZE + SPACING) - IMG_SIZE / 2 > width / 2) {
      thumbRef.current?.scrollToOffset({
        offset: index * (IMG_SIZE + SPACING) - width / 2 + IMG_SIZE / 2,
        animated: true,
      });
    } else {
      thumbRef.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };

  function getTimeDifference(dateString: string) {
    const currentDate = new Date();
    const providedDate = new Date(dateString);

    const timeDifferenceInSeconds = Math.floor(
      (currentDate.valueOf() - providedDate.valueOf()) / 1000,
    );

    if (timeDifferenceInSeconds <= 86400) {
      return 'Today';
    }

    if (timeDifferenceInSeconds <= 86400 * 2) {
      return 'Yesterday';
    }

    if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds}s`;
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutes}m`;
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return `${hours}H`;
    } else if (timeDifferenceInSeconds < 2592000) {
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      return `${days} days ago`;
    } else if (timeDifferenceInSeconds < 31536000) {
      const months = Math.floor(timeDifferenceInSeconds / 2592000);
      return `${months} month ago`;
    } else {
      const years = Math.floor(timeDifferenceInSeconds / 31536000);
      return `${years} year ago`;
    }
  }

  useEffect(() => {
    getTwoUserMet();
  }, []);

  return (
    <>
      {/* <FeedHeader /> */}
      {isLoading && (
        <View className="absolute self-center z-40 flex-1 justify-center items-center h-full bg-black-o-30 w-full">
          <ActivityIndicator color={colors.saffron} size={'large'} />
        </View>
      )}
      <View className="absolute top-0 left-0 w-full h-full bg-black">
        <FlatList
          ref={topRef}
          data={data}
          keyExtractor={(_, i) => i.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={ev => {
            // scollToIndex(Math.floor(ev.nativeEvent.contentOffset.x / width));
            setActiveIndex(Math.round(ev.nativeEvent.contentOffset.x / width));
          }}
          renderItem={({ item }) => (
            <View style={{ width, paddingHorizontal: 10 }}>
              <View className="flex-1 border-2 border-white rounded-3xl overflow-hidden mt-10">
                <FeedItem
                  shares={item.post.shareCount}
                  bookmarks={item.post.bookmarkCount}
                  username={item0?.users[1]?.user?.userName}
                  canGoBack={() => true}
                  useTabHeight={false}
                  likes={item.post.likes?.length}
                  comments={item.post.comments?.length}
                  id={item._id}
                  caption={item.post.text ?? ''}
                  subText={item.post.subText ?? ''}
                  username1={
                    item.users ? '@' + item.users[0].user.userName : '@' + item.user.userName
                  }
                  username2={item.users ? '@' + item.users[1].user.userName : ''}
                  userpic1={item.users ? item.users[0].user.photo : item.user.photo}
                  userpic2={item.users ? item.users[1].user.photo : ''}
                  userId1={item.users ? item.users[0].user._id : item.user._id}
                  userId2={item.users ? item.users[1].user._id : ''}
                  media={
                    item?.post?.userQuiz ? [item?.post?.userQuiz.recording] : item?.post?.media
                  }
                  image=""
                />
              </View>
            </View>
          )}
        />

        <View className="flex-row mt-3">
          <FlatList
            ref={thumbRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            keyExtractor={(e, i) => i.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => scollToIndex(index)} className="items-center">
                <View
                  className="w-[65] h-[80] bg-black border-2 rounded-xl ml-4 overflow-hidden justify-center items-center"
                  style={{ borderColor: activeIndex === index ? '#87ff28' : 'white' }}>
                  {item.post?.media[0]?.mediaType.includes('video') ? (
                    <Video
                      isLooping
                      shouldPlay={true}
                      resizeMode={ResizeMode.COVER}
                      className="w-full h-full absolute"
                      source={{
                        uri: getVideoLink(item.post?.media[0]?.mediaId),
                      }}
                    />
                  ) : (
                    <Image
                      resizeMode="cover"
                      // className="h-full w-full"
                      className="w-full h-full absolute"
                      source={{
                        uri: getImageLink(item.post?.media[0]?.mediaId),
                      }}
                    />
                  )}

                  <Text className={text({ type: 'r32', class: 'text-white' })}>{index + 1}</Text>
                </View>
                <Text className={text({ type: 'r12', class: 'text-white pl-4 mt-1' })}>
                  {getTimeDifference(item.post.createdAt)}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </>
  );
};

export default FeedDetailView;
