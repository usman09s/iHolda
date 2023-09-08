import { Image, Text, View } from 'react-native';
import { Bottle } from 'components/Images';
import { text } from 'theme/text';

type Props = {
  name: string;
  avatar: string;
  totalPlasticCount: string | number;
};

const UpcomingDropOffItem = ({ name, avatar, totalPlasticCount }: Props) => (
  <View className="flex-row justify-between mb-5 bg-gray-100 py-3 px-5 mx-7 rounded-xl">
    <View className="flex-row items-center">
      <Image
        source={{ uri: avatar || 'https://i.pravatar.cc/150?img=3' }}
        className="w-8 h-8 rounded-3xl mr-3"
      />
      <Text className={text({ type: 'm16' })}>{name}</Text>
    </View>
    <View className="flex-row items-center">
      <Text className={text({ type: 'r18' })}>{totalPlasticCount}x</Text>
      <Image source={Bottle} className="h-9" resizeMode="contain" />
    </View>
  </View>
);

export default UpcomingDropOffItem;
