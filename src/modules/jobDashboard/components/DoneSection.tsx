import { ScrollView, Text, View } from 'react-native';
import { text } from 'theme/text';
import { width } from 'utils/helpers';

import AssignedJobTaskItem from '../components/AssignedJobTaskItem';
import JobStatusAction from '../components/JobStatusAction';

type Props = {
  activeTaskItem: number;
  onHandleOpenTaskDetail: (value: number) => () => void;
};

const DoneSection = ({ activeTaskItem, onHandleOpenTaskDetail }: Props) => (
  <ScrollView
    style={{ width: width - 32 }}
    contentContainerStyle={{ paddingBottom: 24 }}
    className="mx-4 bg-green-500 mt-6 rounded-t-3xl p-4">
    <View>
      <Text className={text({ type: 'm13', class: 'mb-4' })}>Done (10)</Text>
    </View>
    <AssignedJobTaskItem
      status="done"
      isOpened={activeTaskItem === 5}
      openTaskItem={onHandleOpenTaskDetail(5)}
    />
    <AssignedJobTaskItem
      status="done"
      isOpened={activeTaskItem === 6}
      openTaskItem={onHandleOpenTaskDetail(6)}
    />
    <AssignedJobTaskItem
      status="done"
      isOpened={activeTaskItem === 7}
      openTaskItem={onHandleOpenTaskDetail(7)}
    />
    <AssignedJobTaskItem
      status="done"
      isOpened={activeTaskItem === 8}
      openTaskItem={onHandleOpenTaskDetail(8)}
    />
    <AssignedJobTaskItem
      status="done"
      isOpened={activeTaskItem === 9}
      openTaskItem={onHandleOpenTaskDetail(9)}
    />
    <JobStatusAction isJobOwner />
    <JobStatusAction />
  </ScrollView>
);

export default DoneSection;
