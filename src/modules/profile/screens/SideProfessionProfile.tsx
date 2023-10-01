import { Image, Text, View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { text } from 'theme/text';

import AgreementSection from '../components/profession/AgreementSection';
import ProfessionProfileHeader from '../components/profession/ProfessionProfileHeader';
import ProfessionTodoListSection from '../components/profession/ProfessionTodoListSection';
import SideProfessionBottomAction from '../components/profession/SideProfessionBottomAction';
import SideProfessionReview from '../components/profession/SideProfessionReview';
import Rating from '../components/Rating';

const SideProfessionProfileScreen = () => {
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
        renderItem={({}) => (
          <View>
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
                    <Rating point={4.5} />
                    <Text className={text({ type: 'r10', class: 'text-black-o-50 ml-1' })}>
                      (24 reviews)
                    </Text>
                  </View>
                </View>
              </View>
              <View className="mt-8 mx-2">
                <View className="mx-2">
                  <Text className={text({ type: 'b16' })}>Service description</Text>
                  <Text className={text({ type: 'r14', class: 'mt-3' })}>
                    I am trusted shoe mender in Buea for expert shoe repair and restoration. From
                    fixing worn soles to reviving your favorite leather shoes, I provide quality
                    craftsmanship
                  </Text>
                </View>
                <View className="flex-row border-b-[0.4px] border-black-o-20 px-2 py-4 justify-between mt-6">
                  <Text className={text({ type: 'm14' })}>Fee/Session</Text>
                  <Text className={text({ type: 'r14' })}>5000Cfa</Text>
                </View>
                <View className="flex-row border-b-[0.4px] border-black-o-20 px-2 py-4 justify-between">
                  <Text className={text({ type: 'm14' })}>Time/ Session </Text>
                  <Text className={text({ type: 'r14' })}>1 Hour</Text>
                </View>
                <View className="flex-row border-b-[0.4px] border-black-o-20 px-2 py-4 justify-between">
                  <Text className={text({ type: 'm14' })}>Location</Text>
                  <Text className={text({ type: 'r14' })}>Buea</Text>
                </View>
                <View className="flex-row border-b-[0.4px] border-black-o-20 px-2 py-4 justify-between">
                  <Text className={text({ type: 'm14' })}>Available</Text>
                  <Text className={text({ type: 'r14' })}>Now</Text>
                </View>
                <ProfessionTodoListSection />
                <SideProfessionReview />
                <AgreementSection />
                <SideProfessionBottomAction />
              </View>
            </View>
          </View>
        )}
        ListHeaderComponent={
          <ProfessionProfileHeader
            scrollY={activeY}
            goBack={goBack}
            onSave={() => null}
            title="Shoe mender"
            location="in Buea"
          />
        }
      />
    </View>
  );
};

export default SideProfessionProfileScreen;
