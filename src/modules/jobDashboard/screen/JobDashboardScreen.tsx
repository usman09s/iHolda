import { useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Header from 'components/Header/Header';

import JobItem from '../components/JobItem';
import JobTabs from '../components/JobTabs';
import { JobDashboardStackParamList } from '../JobDashboardStackNavigator';

const JobDashboardScreen = () => {
  const [index, setIndex] = useState(0);
  const { navigate } = useNavigation<NavigationProp<JobDashboardStackParamList>>();

  const onPressTabItem = (value: number) => () => setIndex(value);

  const goToJobDetails = () => {
    if (index === 2) {
      navigate('ProfileStack', { screen: 'CompletedJobDetails' });
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="px-4">
        <Header customTopHeight={0} title="Job Dashboard" showBackIcon />
      </View>
      <JobTabs
        activeIndex={index}
        onPressTabItem={onPressTabItem}
        tabs={['Request', 'Applied', 'Completed']}
      />
      <FlatList
        className="mt-6"
        data={[1, 2, 3, 4]}
        renderItem={({}) => (
          <Pressable onPress={goToJobDetails}>
            <JobItem />
          </Pressable>
        )}
      />
    </View>
  );
};

export default JobDashboardScreen;
