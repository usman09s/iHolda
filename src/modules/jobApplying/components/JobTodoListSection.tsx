import { Text, View } from 'react-native';
import { text } from 'theme/text';

const JobTodoListSection = () => (
  <View className="mx-4 mt-8">
    <View className="border-b-2 border-black-o-10 mb-6 py-2">
      <Text className={text({ type: 'b20', class: 'text-black-o-40' })}>Todo list</Text>
    </View>
    <View className="mx-4 flex-row items-center bg-gray-100 justify-between  p-3 rounded-lg">
      <View className="flex-row items-center">
        <View className="bg-gray-200 rounded-md w-6 h-6 justify-center items-center mr-2">
          <Text className={text({ type: 'm15' })}>1</Text>
        </View>
        <Text className={text({ type: 'm15' })}>Clean up the drainage property</Text>
      </View>
    </View>
    <View className="mt-4 mx-4 flex-row items-center bg-gray-100 justify-between  p-3 rounded-lg">
      <View className="flex-row items-center">
        <View className="bg-gray-200 rounded-md w-6 h-6 justify-center items-center mr-2">
          <Text className={text({ type: 'm15' })}>2</Text>
        </View>
        <Text className={text({ type: 'm15' })}>Clear the grass around it</Text>
      </View>
    </View>
    <View className="mt-4 mx-4 flex-row items-center bg-gray-100 justify-between  p-3 rounded-lg">
      <View className="flex-row items-center">
        <View className="bg-gray-200 rounded-md w-6 h-6 justify-center items-center mr-2">
          <Text className={text({ type: 'm15' })}>3</Text>
        </View>
        <Text className={text({ type: 'm15' })}>Clear the grass around it</Text>
      </View>
    </View>
  </View>
);

export default JobTodoListSection;
