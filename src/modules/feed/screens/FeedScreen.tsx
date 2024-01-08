import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StatusBar,
  View,
  ViewToken,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, useIsFocused } from '@react-navigation/native';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { useQuery } from 'react-query';
import Api from 'services/Api';
import colors from 'theme/colors';
import { height, units, wH, wW, windowSizes } from 'utils/helpers';
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
import SwiperFlatList from 'react-native-swiper-flatlist';

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

  const { height: newHeight } = useWindowDimensions();
  // console.log("🚀 ~ file: FeedScreen.tsx:58 ~ FeedScreen ~ kdj:", kdj)

  const ITEM_HEIGHT = newHeight - units.vh * 8;
  // console.log("🚀 ~ file: FeedScreen.tsx:61 ~ FeedScreen ~ height:", height)
  // units.vh * 8
  const onRefresh = () => {
    // setRefreshing(true);
    refetch().finally(() => {
      setRefreshing(false);
    });
  };

  const renderItem = ({ item, index }: any) => {
    const imageUri = getImageLink(item.media[0]?.mediaId);

    const isMet = item?.met?._id;
    const isQuizUserdata =
      item?.userQuiz !== undefined && typeof item?.userQuiz?.users[0] !== 'string';

    const quizUsers = isQuizUserdata ? item?.userQuiz?.users?.map((el: any) => ({ user: el })) : [];
    const metUsers = isMet ? item.met?.users.map((el: any) => ({ user: el })) : [];

    const users = isMet
      ? metUsers
      : isQuizUserdata
        ? quizUsers
        : item?.users
          ? item?.users
          : [{ user: item.user }];
    const itemMedia = isMet ? item?.media ?? [] : item?.media;

    return !itemMedia && !item?.userQuiz ? null : (
      <Pressable
        key={item._id}
        // onPress={() => navigate('FeedDetailView', {item})}
        style={{
          width: wW,
          height: Platform.select({
            ios: wH - units.vh * 8,
            android: ITEM_HEIGHT,
          }),
          // marginTop: top,
        }}>
        <FeedItem
          users={users}
          isFocused={isFocused}
          currentIndex={currentIndex}
          index={index}
          shares={item.shareCount}
          bookmarks={item.bookmarkCount}
          gotoDetailOnPress={users?.length > 1 ? true : false}
          likes={item.likes?.length}
          onPressLike={() => refetch()}
          comments={item.comments?.length}
          id={item._id}
          caption={item.text ?? ''}
          subText={item.subText ?? ''}
          image={imageUri}
          media={item?.userQuiz ? [item.userQuiz.recording] : itemMedia}
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

  // const onViewCallBack = useCallback(viewableItems => {
  //   console.log(viewableItems);
  //   // Use viewable items in state or as intended
  // }, []); // any dependencies that require the function to be "redeclared"

  // const viewConfigRef = useRef({
  //   waitForInteraction: true,
  //   viewAreaCoveragePercentThreshold: 100,
  // });

  return (
    <>
      <View style={{ height: StatusBar.currentHeight, backgroundColor: 'black' }} />
      <FeedHeader />
      {isLoading ||
        (refreshing && (
          <View className="absolute self-center z-40 flex-1 justify-center items-center h-full bg-black-o-30 w-full">
            <ActivityIndicator color={colors.saffron} size={'large'} />
          </View>
        ))}
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
        }}>
        {/* <SwiperFlatList
          vertical
          data={data?.result?.posts ?? []}
          renderItem={renderItem}
          keyExtractor={item => item?._id}
          onChangeIndex={e => {
            console.log('🚀 ~ file: FeedScreen.tsx:211 ~ FeedScreen ~ e:', e);
          }}
        /> */}
              
        <FlatList
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
          // removeClippedSubviews
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
              setIndex(Math.round(newIndex));
            }
          }}
          pagingEnabled
          decelerationRate="fast"
          snapToAlignment="start"
          refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={false} />}
        />
      </View>
    </>
  );
};

export default FeedScreen;
