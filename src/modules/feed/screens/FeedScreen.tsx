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
import { FeedStackParamList } from '../FeedStackNavigator';

const FeedScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { navigate } = useAppNavigation<NavigationProp<FeedStackParamList>>();
  const { data, refetch, isLoading } = useQuery('moments', Api.getMoments);
  const { top } = useSafeAreaInsets();

  const onRefresh = () => {
    setRefreshing(true);
    refetch().finally(() => {
      setRefreshing(false);
    });
  };

  const renderItem: ListRenderItem<number> = ({ item }) => (
    <Pressable
      onPress={() => navigate('FeedDetails')}
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
        data={data || []}
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
