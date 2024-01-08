import { useState, useEffect } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
  ActivityIndicator,
} from 'react-native';
import { units } from 'utils/helpers';

import LeaderBoardTeamUpHeader from '../components/LeaderBoardTeamUpHeader';
import LeaderBoardTeamUpItem from '../components/LeaderBoardTeamUpItem';
import { useCommunityRank } from '../hooks/useCommunityRank';
import colors from 'theme/colors';

const TeamUp = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { rankItems, winners, currentUser, isLoading } = useCommunityRank(true);
  const currenUserIndex = currentUser.position || 0;

  const numbersArray = Array.from({ length: 50 }, (_, index) => index + 4);

  // const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
  //   setIsVisible(event.nativeEvent.contentOffset.y < units.vh * (currenUserIndex - 4) * 9.5);
  // };

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
        data={rankItems?.filter(e => e.username && e.username2)}
        onScroll={onScroll}
        keyExtractor={item => item.toString()}
        stickyHeaderIndices={[currenUserIndex - 3]}
        ListHeaderComponent={<LeaderBoardTeamUpHeader winners={winners} />}
        contentContainerStyle={{ backgroundColor: 'white' }}
        renderItem={({ item, index }) => <LeaderBoardTeamUpItem {...item} index={index} />}
      />
      {isVisible && (
        <View className="bg-green-100">
          <LeaderBoardTeamUpItem
            index={currenUserIndex}
            avatar={currentUser.avatar}
            avatar2={currentUser.avatar2}
            username2={currentUser.username2}
            username={currentUser.username}
            point={currentUser.point}
            customContainerClass="bg-green-100"
          />
        </View>
      )}
    </View>
  );
};

export default TeamUp;
