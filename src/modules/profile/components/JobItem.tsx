import { Image, Text, View } from 'react-native';
import { text } from 'theme/text';
import { units } from 'utils/helpers';

const JobItem = ({ index = 0 }: { index: number }) => {
  const isOdd = index % 2 !== 0;
  const colors = {
    title: isOdd ? 'grayCool' : 'white',
    progress: isOdd ? 'primary600' : 'white',
    avatarBorder: isOdd ? 'primary600' : 'white',
    container: isOdd ? 'bg-teaGreen' : 'bg-purple',
    subTitle: isOdd ? 'grayCool400' : 'white-o-60',
    progressText: isOdd ? 'grayCool600' : 'white-o-70',
  };

  const avatarClass = `overflow-hidden rounded-full border-b1 border-${colors.avatarBorder}`;

  return (
    <View
      className={`${colors.container} p-4 self-start rounded-2xl mr-4`}
      style={{ width: units.vw * 40 }}>
      <View className="flex-row justify-between items-center">
        <Image
          source={{ uri: 'https://i.pravatar.cc/300?img=15' }}
          className={`h-8 w-8 rounded-full border-2 border-${colors.avatarBorder}`}
        />
        <View className="h-4 w-4 bg-green-500 rounded-full justify-center items-center mb-1">
          <Text className={text({ type: 'r12', class: 'text-white' })}>3</Text>
        </View>
      </View>
      <View>
        <Text
          numberOfLines={1}
          className={text({ type: 'm12', class: `text-${colors.title} mt-1` })}>
          Drainage Clean up in Buea
        </Text>
        <Text
          numberOfLines={1}
          className={text({ type: 'r12', class: `text-${colors.subTitle} mt-0.5` })}>
          by @jobowner
        </Text>
      </View>
      <View className="flex-row mt-6">
        <View className={`${avatarClass}`}>
          <Image source={{ uri: 'https://i.pravatar.cc/300?img=12' }} className="h-5 w-5" />
        </View>
        <View className={`${avatarClass}  right-2`}>
          <Image source={{ uri: 'https://i.pravatar.cc/300?img=13' }} className="h-5 w-5" />
        </View>
        <View className={`${avatarClass}  right-4`}>
          <Image source={{ uri: 'https://i.pravatar.cc/300?img=14' }} className="h-5 w-5" />
        </View>
        <View className={`${avatarClass}  right-6`}>
          <Image source={{ uri: 'https://i.pravatar.cc/300?img=15' }} className="h-5 w-5" />
        </View>
      </View>
      <View>
        <View className="h-1 w-full bg-white-o-40 rounded-full overflow-hidden mt-2">
          <View className={`h-1 bg-${colors.progress}`} style={{ width: '30%' }} />
        </View>
        <View className="flex-row justify-between mt-0.5">
          <Text className={text({ type: 'm10', class: `text-${colors.progressText} mt-1` })}>
            Progress
          </Text>
          <Text className={text({ type: 'm10', class: `text-${colors.progressText} mt-1` })}>
            70%
          </Text>
        </View>
      </View>
    </View>
  );
};

export default JobItem;
