import { ScrollView, Text, View } from 'react-native';
import { text } from 'theme/text';
import { width } from 'utils/helpers';

import AssignedJobTaskItem from '../components/AssignedJobTaskItem';
import JobStatusAction from '../components/JobStatusAction';

type Props = {
  activeTaskItem: number;
  onHandleOpenTaskDetail: (value: number) => () => void;
};

const ToDoSection = ({ activeTaskItem, onHandleOpenTaskDetail }: Props) => (
  <ScrollView
    style={{ width: width - 32 }}
    contentContainerStyle={{ paddingBottom: 24 }}
    className="mx-4 bg-saffron mt-6 rounded-t-3xl p-4">
    <View>
      <Text className={text({ type: 'm13', class: 'mb-4' })}>To do (10)</Text>
    </View>
    <AssignedJobTaskItem
      status="todo"
      isOpened={activeTaskItem === 0}
      openTaskItem={onHandleOpenTaskDetail(0)}
    />
    <AssignedJobTaskItem
      status="todo"
      isOpened={activeTaskItem === 1}
      openTaskItem={onHandleOpenTaskDetail(1)}
    />
    <AssignedJobTaskItem
      status="todo"
      isOpened={activeTaskItem === 2}
      openTaskItem={onHandleOpenTaskDetail(2)}
    />
    <AssignedJobTaskItem
      status="todo"
      isOpened={activeTaskItem === 3}
      openTaskItem={onHandleOpenTaskDetail(3)}
    />
    <AssignedJobTaskItem
      status="todo"
      isOpened={activeTaskItem === 4}
      openTaskItem={onHandleOpenTaskDetail(4)}
    />
    <JobStatusAction isJobOwner />
    <JobStatusAction />
  </ScrollView>
);

export default ToDoSection;
