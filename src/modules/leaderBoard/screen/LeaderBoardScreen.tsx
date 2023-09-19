import { useState } from 'react';
import { Text, View } from 'react-native';
import Header from 'components/Header/Header';
import { text } from 'theme/text';

import LeaderBoardTabItem from '../components/LeaderBoardTabItem';
import Meetups from '../containers/Meetups';
import TeamUp from '../containers/Teamup';

const LeaderBoardScreen = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <View className="bg-black flex-1">
      <Header
        centerComponent={
          <Text className={text({ type: 'm18', class: 'text-white' })}>Leaderboard</Text>
        }
      />
      <View className="flex-row justify-between items-center border-b-b1 border-white-o-30">
        <LeaderBoardTabItem
          title="Community points"
          isSelected={tabIndex === 0}
          onPressTabItem={() => setTabIndex(0)}
        />
        <LeaderBoardTabItem
          title="Meetups"
          isSelected={tabIndex === 1}
          onPressTabItem={() => setTabIndex(1)}
        />
        <LeaderBoardTabItem
          title="Teamup"
          isSelected={tabIndex === 2}
          onPressTabItem={() => setTabIndex(2)}
        />
      </View>
      {tabIndex === 2 && <TeamUp />}
      {tabIndex !== 2 && <Meetups />}
    </View>
  );
};

export default LeaderBoardScreen;
