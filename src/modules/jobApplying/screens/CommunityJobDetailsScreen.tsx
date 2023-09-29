import { ScrollView, View } from 'react-native';
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
  const { navigate, goBack } = useAppNavigation<NavigationProp<JobApplyingStackParamList>>();

  return (
    <View className="flex-1 bg-white">
      <ScrollView>
        <JobPostingHeader goBack={goBack} onSave={() => null} />
        <JobInfoSection>
          <JobLocationSection />
          <JobSpecificInfoSection />
        </JobInfoSection>
        <JobTodoListSection />
        <AgreementSection />
        <View className="mt-4 mb-4 mx-16">
          <Button
            title="Quick Apply"
            customContainer="rounded-md bg-darkBlue py-2.5"
            onPress={() => navigate('JobApplySuccess')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CommunityJobDetailsScreen;
