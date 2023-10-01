import { Image, Text, View } from 'react-native';
import Button from 'components/Button';
import { text } from 'theme/text';
import { units } from 'utils/helpers';

type Props = {
  type: 'open' | 'inProgress' | 'completed';
  onPressButton?: () => void;
};

const PostedJobItem = ({ type, onPressButton }: Props) => (
  <View
    className={`mb-4 shadow-lg ${type === 'completed' ? 'bg-gray-400' : 'bg-white'} rounded-3xl`}>
    <View className="overflow-hidden rounded-3xl">
      <Image
        className="w-full"
        style={{ height: units.vh * 16 }}
        source={{ uri: 'https://i.pravatar.cc/1024?img=33' }}
      />
      {type === 'inProgress' && (
        <View className="h-10 w-10 absolute bg-red-500  rounded-full items-center justify-center right-4 top-4">
          <Text className={text({ type: 'm20', class: 'text-white' })}>10</Text>
        </View>
      )}
      <View className="p-4">
        <Text className={text({ type: 'm20', class: 'mb-2' })}>Clean the drainange properly</Text>
        <Text className={text({ type: 'r14', class: 'leading-[20px]' })}>
          Clean drainage thoroughly to ensure efficient water flow. Follow cleaning guidelines and
          use appropriate tools and materials for a job
        </Text>
        <Button
          onPress={onPressButton}
          title={
            type === 'inProgress' ? 'View progress' : type === 'open' ? 'Applications' : 'Completed'
          }
          customContainer="mx-4 mt-4"
          rightIcon={
            type === 'open' ? (
              <View className="h-6 w-6 ml-4 bg-red-500  rounded-full items-center justify-center">
                <Text className={text({ type: 'm14', class: 'text-white' })}>10</Text>
              </View>
            ) : null
          }
        />
      </View>
    </View>
  </View>
);

export default PostedJobItem;
