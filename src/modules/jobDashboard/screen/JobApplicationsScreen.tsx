import { useRef, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import PagerView, { PagerViewOnPageScrollEvent } from 'react-native-pager-view';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Header from 'components/Header/Header';

import AppliedUserItem from '../components/AppliedUserItem';
import JobTabs from '../components/JobTabs';
import { JobDashboardStackParamList } from '../JobDashboardStackNavigator';

const JobApplicationsScreen = () => {
  const [index, setIndex] = useState(0);
  const pagerViewRef = useRef<PagerView>(null);
  const { navigate } = useNavigation<NavigationProp<JobDashboardStackParamList>>();

  const onPressTabItem = (value: number) => () => {
    setIndex(value);
    pagerViewRef.current?.setPage(value);
  };

  const goToProfile = () => {
    navigate('ProfileStack', { screen: 'OtherUserProfile' });
  };

  const onPageScroll = (e: PagerViewOnPageScrollEvent) => {
    setIndex(e.nativeEvent.position);
  };

  return (
    <View className="flex-1 bg-white">
      <View className="px-4">
        <Header customTopHeight={0} title="Applications" showBackIcon />
      </View>
      <JobTabs
        activeIndex={index}
        onPressTabItem={onPressTabItem}
        tabs={['Applied', 'Shortlisted ❤️️']}
      />
      <PagerView
        className="flex-1"
        initialPage={index}
        ref={pagerViewRef}
        onPageScroll={onPageScroll}>
        <FlatList
          className="mt-6"
          data={[1, 2, 3, 4]}
          renderItem={({}) => (
            <Pressable onPress={goToProfile}>
              <AppliedUserItem />
            </Pressable>
          )}
        />
        <FlatList
          className="mt-6"
          data={[1]}
          renderItem={({}) => (
            <Pressable onPress={goToProfile} className="px-4">
              <AppliedUserItem />
            </Pressable>
          )}
        />
      </PagerView>
    </View>
  );
};

export default JobApplicationsScreen;
