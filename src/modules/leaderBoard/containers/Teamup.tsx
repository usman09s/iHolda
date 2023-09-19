import { useState } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';
import { units } from 'utils/helpers';

import LeaderBoardTeamUpHeader from '../components/LeaderBoardTeamUpHeader';
import LeaderBoardTeamUpItem from '../components/LeaderBoardTeamUpItem';

const TeamUp = () => {
  const [isVisible, setIsVisible] = useState(true);
  const currenUserIndex = 12;

  const numbersArray = Array.from({ length: 50 }, (_, index) => index + 4);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIsVisible(event.nativeEvent.contentOffset.y < units.vh * (currenUserIndex - 4) * 9.5);
  };

  return (
    <View className="flex-1">
      <FlatList
        data={numbersArray}
        onScroll={onScroll}
        keyExtractor={item => item.toString()}
        stickyHeaderIndices={[currenUserIndex - 3]}
        ListHeaderComponent={<LeaderBoardTeamUpHeader />}
        contentContainerStyle={{ backgroundColor: 'white' }}
        renderItem={({ index }) => <LeaderBoardTeamUpItem index={index} />}
      />
      {isVisible && (
        <View className="bg-green-100">
          <LeaderBoardTeamUpItem index={currenUserIndex - 4} customContainerClass="bg-green-100" />
        </View>
      )}
    </View>
  );
};

export default TeamUp;
