import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from 'theme/colors';
import { units } from 'utils/helpers';

import CurrentUserItem from '../components/CurrentUserItem';
import LeaderBoardUserItem from '../components/LeaderBoardUserItem';
import LeaderBoardUsersHeader from '../components/LeaderBoardUsersHeader';
import { useCommunityRank } from '../hooks/useCommunityRank';

const Meetup = () => {
  const {} = useNavigation();
  const [isVisible, setIsVisible] = useState(true);
  const { rankItems, winners, currentUser, isLoading } = useCommunityRank();
  const currenUserIndex = currentUser.position || 0;

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (currenUserIndex < 7) {
      return;
    }

    setIsVisible(event.nativeEvent.contentOffset.y < units.vh * (currenUserIndex - 6) * 9.5);
  };

  useEffect(() => {
    if (currenUserIndex < 7) {
      setIsVisible(false);
    }
  }, [currenUserIndex]);

  if (isLoading) {
    return <ActivityIndicator color={colors.saffron} className="flex-1 self-center" />;
  }

  return (
    <View className="flex-1">
      <FlatList
        data={rankItems}
        onScroll={onScroll}
        className="flex-1"
        ListEmptyComponent={<ActivityIndicator />}
        stickyHeaderIndices={[currenUserIndex - 3]}
        keyExtractor={(item, i) => i?.toString()}
        contentContainerStyle={{ backgroundColor: 'white' }}
        renderItem={({ item, index }) => <LeaderBoardUserItem {...item} index={index} />}
        ListHeaderComponent={<LeaderBoardUsersHeader winners={winners} />}
      />
      {isVisible && (
        <View className="bg-green-100">
          <CurrentUserItem
            index={currenUserIndex}
            avatar={currentUser.avatar}
            username={currentUser.username}
          />
        </View>
      )}
    </View>
  );
};

export default Meetup;
