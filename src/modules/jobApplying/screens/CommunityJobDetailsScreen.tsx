import { FlatList, NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { NavigationProp } from '@react-navigation/native';
import Button from 'components/Button';
import { useAppNavigation } from 'hooks/useAppNavigation';

import AgreementSection from '../components/AgreementSection';
import JobInfoSection from '../components/JobInfoSection';
import JobLocationSection from '../components/JobLocationSection';
import JobPostingHeader from '../components/JobPostingHeader';
import JobSpecificInfoSection from '../components/JobSpecificInfoSection';
import JobTodoListSection from '../components/JobTodoListSection';
import { JobApplyingStackParamList } from '../JobApplyingStackNavigator';

const CommunityJobDetailsScreen = () => {
  const scrollY = useSharedValue(0);
  const { navigate, goBack } = useAppNavigation<NavigationProp<JobApplyingStackParamList>>();

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.value = event.nativeEvent.contentOffset.y;
  };

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={[1]}
        onScroll={onScroll}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <JobPostingHeader goBack={goBack} onSave={() => null} scrollY={scrollY} />
        }
        ListFooterComponent={<View className="h-10" />}
        nestedScrollEnabled={false}
        className={'flex-1'}
        renderItem={() => (
          <View>
            <JobInfoSection>
              <JobLocationSection />
              <JobSpecificInfoSection />
            </JobInfoSection>
            <JobTodoListSection />
            <AgreementSection />
            <View className="mt-4 mb-4 mx-16">
              <Button
                title="Quick Apply"
                onPress={() => navigate('JobApplySuccess')}
                customContainer="rounded-md bg-darkBlue py-2.5"
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default CommunityJobDetailsScreen;
