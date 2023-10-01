import { Image, Text, View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { text } from 'theme/text';

import EducationSection from '../components/profession/EducationSection';
import PastExperience from '../components/profession/PastExperience';
import PastJobs from '../components/profession/PastJobs';
import ProfessionalSkills from '../components/profession/ProfessionalSkills';
import ProfessionProfileHeader from '../components/profession/ProfessionProfileHeader';

const MainProfessionProfileScreen = () => {
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
        ListFooterComponent={<View className="h-10" />}
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
                </View>
              </View>
              <View className="mt-8 mx-4">
                <Text className={text({ type: 'b16' })}>About</Text>
                <Text className={text({ type: 'r14', class: 'mt-3' })}>
                  About Experienced accountant specializing in financial analysis, tax planning, and
                  audit. Committed to delivering precise financial insights and strategic guidance
                  for business growth. Let&apos;s connect and explore opportunities for
                  collaboration in the finance world. #Accounting #Finance #CPA
                </Text>
              </View>
              <ProfessionalSkills />
              <PastExperience />
              <EducationSection />
            </View>
            <PastJobs />
          </View>
        )}
        ListHeaderComponent={
          <ProfessionProfileHeader
            scrollY={activeY}
            goBack={goBack}
            onSave={() => null}
            title="Professional Accountant"
            subtitle="Available for employment"
            location="in Buea, Cameroon / Remote"
          />
        }
      />
    </View>
  );
};

export default MainProfessionProfileScreen;
