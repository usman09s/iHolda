import { FlatList, ListRenderItem, Platform, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp } from '@react-navigation/native';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { useQuery } from 'react-query';
import Api from 'services/Api';
import { height, units, wH, wW } from 'utils/helpers';

import FeedHeader from '../components/FeedHeader';
import FeedItem from '../components/FeedItem';
import { FeedStackParamList } from '../FeedStackNavigator';

const FeedScreen = () => {
  const { navigate } = useAppNavigation<NavigationProp<FeedStackParamList>>();
  const { data } = useQuery('moments', Api.getMoments);
  const { top } = useSafeAreaInsets();

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
      <FlatList
        renderItem={renderItem}
        data={data || []}
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
      />
    </>
  );
};

export default FeedScreen;
