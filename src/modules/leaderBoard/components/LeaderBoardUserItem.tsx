import { Image, Text, View } from 'react-native';
import Icons from 'components/Icons';
import { text } from 'theme/text';
import { units } from 'utils/helpers';

type Props = { index: number };

const LeaderBoardUserItem = ({ index }: Props) => (
  <View
    style={{ height: units.vh * 10 }}
    className="flex-row items-center justify-between pb-2 pt-2 border-b-[0.4px] border-black-o-20 mx-6 bg-white">
    <View className="flex-row items-center">
      <Text className={text({ type: 'm16', class: 'w-8' })}>{index + 4}</Text>
      <View className="border-4 border-saffron rounded-full self-center ml-4 mr-4">
        <Image
          className="h-10 w-10 rounded-full"
          source={{ uri: 'https://i.pravatar.cc/150?img=' + index }}
        />
      </View>
      <Text className={text({ type: 'm13' })}>Bayuga</Text>
    </View>
    <View className="justify-end items-end">
      <Text className={text({ type: 'b13', class: 'mb-2' })}>1124</Text>
      <Icons.TriangleUp />
    </View>
  </View>
);

export default LeaderBoardUserItem;
