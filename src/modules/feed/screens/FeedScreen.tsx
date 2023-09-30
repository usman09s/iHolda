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

const FeedScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const {} = useAppNavigation<NavigationProp<FeedStackParamList>>();
  const { data, refetch, isLoading } = useQuery('moments', Api.getMoments);
  const { top } = useSafeAreaInsets();

  const onRefresh = () => {
    setRefreshing(true);
    refetch().finally(() => {
      setRefreshing(false);
    });
  };

  const renderItem: ListRenderItem<object> = ({ item }) =>
    item?.type === 'job' ? (
      <Pressable
        style={{
          width: wW,
          height: Platform.select({
            ios: wH - units.vh * 8,
            android: height - top - units.vh * 8,
          }),
        }}>
        <JobFeedItem type={item.jobType} image="https://i.pravatar.cc/980?img=33" />
      </Pressable>
    ) : (
      <Pressable
        style={{
          width: wW,
          height: Platform.select({
            ios: wH - units.vh * 8,
            android: height - top - units.vh * 8,
          }),
        }}>
        <FeedItem image={item.file} />
      </Pressable>
    );

  return (
    <>
      <FeedHeader />
      {(isLoading || refreshing) && (
        <View className="absolute self-center z-40 flex-1 justify-center items-center h-full bg-black-o-30 w-full">
          <ActivityIndicator color={colors.saffron} size={'large'} />
        </View>
      )}
      <FlatList
        data={
          [
            { id: 1, type: 'job', jobType: 'private' },
            { id: 2, type: 'job', jobType: 'community' },
            ...(data || []),
          ] || []
        }
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
    </>
  );
};

export default FeedScreen;
