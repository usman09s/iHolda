import { Image, Text, View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { text } from 'theme/text';

import ClientReview from '../components/job/ClientReview';
import JobPhotos from '../components/job/JobPhotos';
import ProfessionProfileHeader from '../components/profession/ProfessionProfileHeader';
import ProfessionTodoListSection from '../components/profession/ProfessionTodoListSection';
import SideProfessionBottomAction from '../components/profession/SideProfessionBottomAction';

const CompletedJobDetailsScreen = () => {
  const activeY = useSharedValue(0);
  const { goBack } = useNavigation();

  const scrollHandler = useAnimatedScrollHandler(event => {
    activeY.value = event.contentOffset.y <= 0 ? 0 : event.contentOffset.y;
  });

  return (
    <View className="flex-1 bg-white">
      <Animated.FlatList
        data={[1]}
        numColumns={3}
        className={'flex-1'}
        onScroll={scrollHandler}
        stickyHeaderIndices={[0]}
        nestedScrollEnabled={false}
        ListFooterComponent={<View className="h-0" />}
        renderItem={({}) => (
          <View className="flex-1">
            <View className="mt-5">
              <View className="flex-row items-center mx-4">
                <Image
                  source={{ uri: 'https://i.pravatar.cc/1024?img=34' }}
                  className="h-11 w-11 rounded-full border-2 border-blue"
                />
                <View className="ml-2">
                  <Text className={text({ type: 'm16' })}>Najela Claudette</Text>
                  <View className="flex-row">
                    <Text className={text({ type: 'r12', class: 'text-black-0-40' })}>
                      Service Provider
                    </Text>
                  </View>
                </View>
              </View>
              <View className="mt-0 mx-2">
                <View className="flex-row border-b-[0.4px] border-black-o-20 px-2 py-4 justify-between mt-6">
                  <Text className={text({ type: 'm14' })}>Payment</Text>
                  <Text className={text({ type: 'r14' })}>5000Cfa</Text>
                </View>
                <View className="flex-row border-b-[0.4px] border-black-o-20 px-2 py-4 justify-between">
                  <Text className={text({ type: 'm14' })}>Total worked time</Text>
                  <Text className={text({ type: 'r14' })}>1 Hour</Text>
                </View>
                <View className="flex-row border-b-[0.4px] border-black-o-20 px-2 py-4 justify-between">
                  <Text className={text({ type: 'm14' })}>Location</Text>
                  <Text className={text({ type: 'r14' })}>Buea</Text>
                </View>
                <View className="flex-row border-b-[0.4px] border-black-o-20 px-2 py-4 justify-between">
                  <Text className={text({ type: 'm14' })}>Date completed</Text>
                  <Text className={text({ type: 'r14' })}>04 Sept 2023</Text>
                </View>
              </View>

              <View className="h-[0.7px] w-full bg-black-o-10 mt-5" />
              <View className="mx-2">
                <ClientReview />
                <ProfessionTodoListSection title="Task completed" />
                <JobPhotos />
              </View>
              <SideProfessionBottomAction />
            </View>
          </View>
        )}
        ListHeaderComponent={
          <ProfessionProfileHeader
            title="Carpet cleaner"
            location="in Buea"
            scrollY={activeY}
            goBack={goBack}
            isPassive
            onSave={() => null}
          />
        }
      />
    </View>
  );
};

export default CompletedJobDetailsScreen;
