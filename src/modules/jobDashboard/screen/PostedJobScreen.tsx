import { useRef, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import PagerView, { PagerViewOnPageScrollEvent } from 'react-native-pager-view';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Header from 'components/Header/Header';

import JobTabs from '../components/JobTabs';
import PostedJobItem from '../components/PostedJobItem';
import { JobDashboardStackParamList } from '../JobDashboardStackNavigator';

const PostedJobScreen = () => {
  const [index, setIndex] = useState(0);
  const pagerViewRef = useRef<PagerView>(null);
  const { navigate } = useNavigation<NavigationProp<JobDashboardStackParamList>>();

  const onPressTabItem = (value: number) => () => {
    setIndex(value);
    pagerViewRef.current?.setPage(value);
  };

  const goToJobDetails = () => {
    if (index === 2) {
      navigate('ProfileStack', { screen: 'CompletedJobDetails' });
    }
  };

  const onPageScroll = (e: PagerViewOnPageScrollEvent) => {
    setIndex(e.nativeEvent.position);
  };

  return (
    <View className="flex-1 bg-white">
      <View className="px-4">
        <Header customTopHeight={0} title="Posted Jobs" showBackIcon />
      </View>
      <JobTabs
        activeIndex={index}
        onPressTabItem={onPressTabItem}
        tabs={['Open jobs', 'In progress', 'Completed']}
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
            <Pressable onPress={goToJobDetails} className="px-4">
              <PostedJobItem type={'open'} onPressButton={() => navigate('JobApplications')} />
            </Pressable>
          )}
        />
        <FlatList
          className="mt-6"
          data={[1, 2, 3, 4]}
          renderItem={({}) => (
            <Pressable onPress={goToJobDetails} className="px-4">
              <PostedJobItem type={'inProgress'} />
            </Pressable>
          )}
        />
        <FlatList
          className="mt-6"
          data={[1, 2, 3, 4]}
          renderItem={({}) => (
            <Pressable onPress={goToJobDetails} className="px-4">
              <PostedJobItem type={'completed'} />
            </Pressable>
          )}
        />
      </PagerView>
    </View>
  );
};

export default PostedJobScreen;
