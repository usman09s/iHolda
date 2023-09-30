import { FlatList, NativeScrollEvent, NativeSyntheticEvent, Text, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { NavigationProp } from '@react-navigation/native';
import Button from 'components/Button';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { text } from 'theme/text';

import AgreementSection from '../components/AgreementSection';
import JobInfoSection from '../components/JobInfoSection';
import JobPostingHeader from '../components/JobPostingHeader';
import JobTodoListSection from '../components/JobTodoListSection';
import { JobApplyingStackParamList } from '../JobApplyingStackNavigator';

const PrivateJobDetailsScreen = () => {
  const scrollY = useSharedValue(0);
  const { navigate, goBack } = useAppNavigation<NavigationProp<JobApplyingStackParamList>>();

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (event.nativeEvent.contentOffset.y < 0) {
      return;
    }

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
              <View className="mt-4 mx-4">
                <View className="border-b-[0.3px] border-black-o-20 flex-row justify-between py-3">
                  <Text className={text({ type: 'm14' })}>Pay</Text>
                  <Text className={text({ type: 'r14' })}>5000Cfa</Text>
                </View>
                <View className="border-b-[0.3px] border-black-o-20 flex-row justify-between py-3 mt-1">
                  <Text className={text({ type: 'm14' })}>Location</Text>
                  <Text className={text({ type: 'r14' })}>Buea</Text>
                </View>
                <View className="border-b-[0.3px] border-black-o-20 flex-row justify-between py-3 mt-1">
                  <Text className={text({ type: 'm14' })}>Time</Text>
                  <Text className={text({ type: 'r14' })}>Asap</Text>
                </View>
                <View className="border-b-[0.3px] border-black-o-20 flex-row justify-between py-3 mt-1">
                  <Text className={text({ type: 'm14' })}>Work Duration</Text>
                  <Text className={text({ type: 'r14' })}>1 Hour</Text>
                </View>
                <View className="border-b-[0.3px] border-black-o-20 flex-row justify-between py-3 mt-1">
                  <Text className={text({ type: 'm14' })}>No. of workers needed</Text>
                  <Text className={text({ type: 'r14' })}>1</Text>
                </View>
              </View>
            </JobInfoSection>
            <JobTodoListSection />
            <AgreementSection />
            <View className="mt-4 mb-16 mx-16">
              <Button
                title="Quick Apply"
                customContainer="rounded-md bg-darkBlue py-2.5"
                onPress={() => navigate('JobApplySuccess')}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default PrivateJobDetailsScreen;
