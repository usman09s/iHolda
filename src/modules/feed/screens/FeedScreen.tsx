import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Platform,
  Pressable,
  RefreshControl,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp } from '@react-navigation/native';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { useQuery } from 'react-query';
import Api from 'services/Api';
import colors from 'theme/colors';
import { height, units, wH, wW } from 'utils/helpers';

import FeedHeader from '../components/FeedHeader';
import FeedItem from '../components/FeedItem';
import JobFeedItem from '../components/JobFeedItem';
import { FeedStackParamList } from '../FeedStackNavigator';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Post } from 'types/PostsTypes';
import { getImageLink } from 'modules/moments/helpers/imageHelpers';

const FeedScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const {} = useAppNavigation<NavigationProp<FeedStackParamList>>();
  const { data, refetch, isLoading } = useQuery('feeds', Api.getFeed);
  const { top } = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();

  const onRefresh = () => {
    setRefreshing(true);
    refetch().finally(() => {
      setRefreshing(false);
    });
  };

  const renderItem = ({ item }: { item: Post; index: number }) => {
    const imageUri = getImageLink(item.media[0]);
    console.log(imageUri);

    return (
      <Pressable
        style={{
          width: wW,
          height: Platform.select({
            ios: wH - units.vh * 8,
            android: height - top - tabBarHeight + 10,
          }),
        }}>
        <FeedItem likes={item.likes?.length} comments={item.comments?.length} id={item._id} caption={item.text} subText={item.subText} image={imageUri} />
      </Pressable>
    );
  };

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
        <FlatList
          data={data?.result.posts}
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
