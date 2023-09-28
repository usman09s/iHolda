import { Pressable, Text, View } from 'react-native';
import Icons from 'components/Icons';
import { text } from 'theme/text';

const AddTaskSection = () => (
  <View className="px-4 mt-8">
    <View className="flex-row mb-6 items-end">
      <Text className={text({ type: 'r18' })}>Add Task</Text>
      <Text className={text({ type: 'r10', class: 'text-red-600 ml-1 mb-0.5' })}>
        {'(optional)'}
      </Text>
    </View>
    <View className="flex-row items-center bg-gray-100 justify-between  p-3 rounded-lg">
      <View className="flex-row items-center">
        <View className="bg-gray-200 rounded-md w-6 h-6 justify-center items-center mr-2">
          <Text className={text({ type: 'm15' })}>1</Text>
        </View>
        <Text className={text({ type: 'm15' })}>Arrive at work location</Text>
      </View>
      <Pressable>
        <Icons.DeleteCrossIcon />
      </Pressable>
    </View>
    <View
      className="flex-row items-center justify-between p-3 rounded-xl mt-2 "
      style={{
        borderStyle: 'dashed',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#C4C4C4',
      }}>
      <View className="flex-row items-center">
        <View className="bg-gray-200 rounded-md w-6 h-6 justify-center items-center mr-2">
          <Text className={text({ type: 'm15', class: 'text-blue' })}>+</Text>
        </View>
        <Text className={text({ type: 'm15', class: 'text-blue' })}>Add a new task</Text>
      </View>
    </View>
  </View>
);

export default AddTaskSection;
