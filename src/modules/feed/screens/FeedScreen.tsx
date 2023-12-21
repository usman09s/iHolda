import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  View,
  ViewToken,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, useIsFocused } from '@react-navigation/native';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { useQuery } from 'react-query';
import Api from 'services/Api';
import colors from 'theme/colors';
import { height, units, wH, wW } from 'utils/helpers';
import { Audio } from 'expo-av';

import FeedHeader from '../components/FeedHeader';
import FeedItem from '../components/FeedItem';
import JobFeedItem from '../components/JobFeedItem';
import { FeedStackParamList } from '../FeedStackNavigator';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Post } from 'types/PostsTypes';
import { getImageLink } from 'modules/moments/helpers/imageHelpers';
import { userAppInit } from 'hooks/useAppInit';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { setUser } from 'store/userDataSlice';

const FeedScreen = () => {
  const [currentIndex, setIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const { data, refetch, isLoading } = useQuery('feeds', Api.getFeed);
  const [voices, setSound] = useState<(Audio.Sound | undefined)[]>([]);

  const dispatch = useAppDispatch();
  const { top } = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();

  const { refetch: refetchUserData } = useQuery('getCurrentUserProfile', Api.getUserProfile0);

  const isFocused = useIsFocused();
  // const { status } = userAppInit();

  const getUpdatedUserData = async () => {
    await refetchUserData()
      .then(response => {
        dispatch(setUser(response?.data?.data.user));
      })
      .catch(err => console.log(err));
  };

  const ITEM_HEIGHT = height - top - tabBarHeight + 10;

  const onRefresh = () => {
    // setRefreshing(true);
    refetch().finally(() => {
      setRefreshing(false);
    });
  };

  const renderItem = ({ item, index }: any) => {
    const imageUri = getImageLink(item.media[0]?.mediaId);

    const isQuizUserdata =
      item?.userQuiz !== undefined && typeof item?.userQuiz?.users[0] !== 'string';

    const quizUsers = isQuizUserdata ? item?.userQuiz?.users?.map((el: any) => ({ user: el })) : [];

    const users = isQuizUserdata ? quizUsers : item?.users ? item?.users : [{ user: item.user }];

    return !item?.media?.length && !item?.userQuiz ? null : (
      <Pressable
        key={item._id}
        // onPress={() => navigate('FeedDetailView', {item})}
        style={{
          width: wW,
          height: Platform.select({
            ios: wH - units.vh * 8,
            android: ITEM_HEIGHT,
          }),
        }}>
        <FeedItem
          isFocused={isFocused}
          currentIndex={currentIndex}
          index={index}
          shares={item.shareCount}
          bookmarks={item.bookmarkCount}
          gotoDetailOnPress={item?.user ? false : true}
          likes={item.likes?.length}
          onPressLike={() => refetch()}
          comments={item.comments?.length}
          id={item._id}
          caption={item.text ?? ''}
          subText={item.subText ?? ''}
          image={imageUri}
          media={item?.userQuiz ? [item.userQuiz.recording] : item.media}
          data={item}
          username1={'@' + users[0]?.user?.userName}
          username2={users[1] ? '@' + users[1]?.user.userName : ''}
          userpic1={users[0]?.user?.photo}
          userpic2={users[1] ? users[1]?.user?.photo : ''}
          userId1={users[0]?.user?._id}
          userId2={users[1] ? users[1]?.user?._id : ''}

          audio={item?.audio?.mediaId}
        />
      </Pressable>
    );
  };

  useEffect(() => {
    if (isFocused) {
      refetch();
      getUpdatedUserData();
    }
  }, [isFocused]);

  return (
    <>
      <FeedHeader />
      {isLoading ||
        (refreshing && (
          <View className="absolute self-center z-40 flex-1 justify-center items-center h-full bg-black-o-30 w-full">
            <ActivityIndicator color={colors.saffron} size={'large'} />
          </View>
        ))}
      <View className="absolute top-0 left-0 w-full h-full">
        {/* <ScrollView>{data?.result?.posts?.map(renderItem)}</ScrollView> */}
        <FlatList
          // ref={flatlistRef}
          data={data?.result?.posts ?? []}
          className="bg-black"
          renderItem={renderItem}
          windowSize={Platform.select({
            ios: 8,
            android: 2,
          })}
          initialNumToRender={Platform.select({
            ios: 4,
            android: 2,
          })}
          maxToRenderPerBatch={Platform.select({
            ios: 4,
            android: 2,
          })}
          removeClippedSubviews
          viewabilityConfig={{
            minimumViewTime: 100,
            waitForInteraction: true,
            itemVisiblePercentThreshold: 50,
          }}
          onMomentumScrollEnd={({ nativeEvent }) => {
            const newIndex = nativeEvent.contentOffset.y / ITEM_HEIGHT;
            if (
              newIndex !== currentIndex &&
              newIndex < data?.result?.posts.length &&
              newIndex >= 0
            ) {
              // pauseSound()
              setIndex(Math.round(newIndex));
            }
          }}
          pagingEnabled
          decelerationRate="fast"
          snapToAlignment="start"
          refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={false} />}
          // onViewableItemsChanged={onViewCallBack}
          // viewabilityConfig={viewConfigRef.current}
        />
      </View>
    </>
  );
};

export default FeedScreen;
