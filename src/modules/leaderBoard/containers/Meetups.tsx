import { useState } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { units } from 'utils/helpers';

import CurrentUserItem from '../components/CurrentUserItem';
import LeaderBoardUserItem from '../components/LeaderBoardUserItem';
import LeaderBoardUsersHeader from '../components/LeaderBoardUsersHeader';

const Meetups = () => {
  const {} = useNavigation();
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
        ListHeaderComponent={<LeaderBoardUsersHeader />}
        contentContainerStyle={{ backgroundColor: 'white' }}
        renderItem={({ index }) => <LeaderBoardUserItem index={index} />}
      />
      {isVisible && (
        <View className="bg-green-100">
          <CurrentUserItem
            username="bayuga"
            index={currenUserIndex}
            avatar="https://i.pravatar.cc/150?img=8"
          />
        </View>
      )}
    </View>
  );
};

export default Meetups;
