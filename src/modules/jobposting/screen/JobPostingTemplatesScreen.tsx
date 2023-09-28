import { useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Header from 'components/Header/Header';
import Icons from 'components/Icons';
import MeetupAndJobButtons from 'modules/moments/components/MeetupAndJobButtons';
import { text } from 'theme/text';
import { JobPostingType } from 'types/JobPostingTypes';

import JobPostingTemplatesTabs from '../components/JobPostingTemplatesTabs';
import CommunityJobTemplates from '../containers/CommunityJobTemplates';
import PrivateJobTemplates from '../containers/PrivateJobTemplates';
import { JobPostingStackParamList } from '../JobPostingStackNavigator';

const JobPostingTemplatesScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const pageViewRef = useRef<PagerView | null>(null);
  const { navigate } = useNavigation<NavigationProp<JobPostingStackParamList>>();

  const onPressTabItem = (value: number) => () => {
    setActiveIndex(value);
    pageViewRef.current?.setPage(value);
  };

  const navigateJobPostingDetails = () => {
    navigate('JobPostingDetails', {
      jobType: activeIndex === 1 ? JobPostingType.COMMUNITY : JobPostingType.PRIVATE,
    });
  };

  return (
    <View className="bg-black flex-1">
      <View className="px-4">
        <Header
          showBackIcon
          backIconColor="white"
          centerComponent={
            <JobPostingTemplatesTabs activeIndex={activeIndex} onPressTabItem={onPressTabItem} />
          }
        />
      </View>
      <Pressable
        onPress={navigateJobPostingDetails}
        className="bg-white-o-10 p-6 rounded-lg items-center mt-6 mx-4">
        <Icons.OutlineCameraIcon />
        <Text className={text({ type: 'r13', class: 'text-white text-center mt-1' })}>
          Create custom job
        </Text>
      </Pressable>
      <PagerView initialPage={0} className="flex-1" scrollEnabled={false} ref={pageViewRef}>
        <PrivateJobTemplates key={0} navigateJobPostingDetails={navigateJobPostingDetails} />
        <CommunityJobTemplates key={1} navigateJobPostingDetails={navigateJobPostingDetails} />
      </PagerView>
      <MeetupAndJobButtons flow="job" />
    </View>
  );
};

export default JobPostingTemplatesScreen;
