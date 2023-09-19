import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import ProfileDescriptionAndStats from '../components/ProfileDescriptionAndStats';
import ProfilePostItem from '../components/ProfilePostItem';
import ProfilePostTabs from '../components/ProfilePostTabs';

const Profile = () => (
  <Animated.FlatList
    key={0}
    numColumns={3}
    windowSize={3}
    initialNumToRender={5}
    maxToRenderPerBatch={5}
    className={'flex-1 z-40 bg-white'}
    data={new Array(50).fill('')}
    ListHeaderComponent={
      <>
        <ProfileDescriptionAndStats
          followers="100k"
          impression="190k"
          metPeople="19 people"
          description="Profile information are there."
        />
        <View className="border-[0.5px] border-black-o-10" />
        <ProfilePostTabs activeIndex={0} onPressTabItem={() => () => null} />
      </>
    }
    renderItem={({ index }) => <ProfilePostItem index={index} />}
  />
);

export default Profile;
