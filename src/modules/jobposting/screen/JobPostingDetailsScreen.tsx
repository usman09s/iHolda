import { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Button from 'components/Button';
import Header from 'components/Header/Header';
import { text } from 'theme/text';

import AddMediaSection from '../components/AddMediaSection';
import AddTaskSection from '../components/AddTaskSection';
import JobDetailItem from '../components/JobDetailMenuItem';
import JobLocation from '../components/JobLocation';
import JobPayment from '../components/JobPayment';
import JobPostingSelectOptionModal from '../components/JobPostingSelectOptionModal';
import NumberOfWorkers from '../components/NumberOfWorkers';
import StartDateAndTime from '../components/StartDateAndTime';
import WorkDuration from '../components/WorkDuration';
import { JobPostingStackParamList } from '../JobPostingStackNavigator';

const JobPostingDetailsScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const { params } = useRoute<RouteProp<JobPostingStackParamList, 'JobPostingDetails'>>();
  const { navigate } = useNavigation<NavigationProp<JobPostingStackParamList>>();
  const [visible, setVisible] = useState(false);
  const [modalContentType, setModalContentType] = useState('');

  const onPressJobDetailItem = (type: string) => {
    setModalContentType(type);
    setVisible(true);
  };

  return (
    <View className="bg-white flex-1">
      <View className="px-4 mb-2">
        <Header
          showBackIcon
          centerComponent={
            <Text className={text({ type: 'r15', class: 'text-black' })}>
              {`${params.jobType} Job Details`}
            </Text>
          }
        />
      </View>
      <ScrollView>
        <TextInput
          textAlignVertical="top"
          verticalAlign="top"
          textAlign="left"
          multiline
          numberOfLines={2}
          placeholder="People needed for drainage cleanup"
          className="border-[0.3px] mx-4 rounded-lg p-4 border-black-o-30 min-h-[100px] align-text-top text-20 mb-2"
        />
        <JobDetailItem
          onPressJobDetailItem={() => onPressJobDetailItem('pay')}
          title="Pay"
          value="500Cfa"
        />
        <JobDetailItem
          onPressJobDetailItem={() => onPressJobDetailItem('location')}
          title="Location"
          value="Buea"
        />
        <JobDetailItem
          onPressJobDetailItem={() => onPressJobDetailItem('time')}
          title="Time"
          value="Asap"
        />
        <JobDetailItem
          onPressJobDetailItem={() => onPressJobDetailItem('workDuration')}
          title="Work Duration"
          value="1 Hour"
        />
        <JobDetailItem
          onPressJobDetailItem={() => onPressJobDetailItem('noOfWorkers')}
          title="No. of workers"
          value="4"
        />
        <AddTaskSection />
        <AddMediaSection />
      </ScrollView>
      <View style={{ marginBottom: bottom || 16 }}>
        <Button
          title="Post"
          customContainer="py-2 self-center px-20 mt-2"
          onPress={() => navigate('JobPostingSuccess')}
        />
      </View>
      <JobPostingSelectOptionModal
        visible={visible}
        onPressDone={() => setVisible(false)}
        onClose={() => setVisible(false)}>
        {modalContentType === 'pay' && <JobPayment />}
        {modalContentType === 'workDuration' && <WorkDuration />}
        {modalContentType === 'location' && <JobLocation />}
        {modalContentType === 'time' && <StartDateAndTime />}
        {modalContentType === 'noOfWorkers' && <NumberOfWorkers />}
      </JobPostingSelectOptionModal>
    </View>
  );
};

export default JobPostingDetailsScreen;
