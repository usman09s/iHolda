import { Image, Pressable, Text, View } from 'react-native';
import { text } from 'theme/text';
import { getHitSlop } from 'utils/helpers';

type Props = {
  image: string;
  count: number;
  onPressIncrease: () => void;
  onPressDecrease: () => void;
};

const PlasticItem = ({ image, count = 0, onPressDecrease, onPressIncrease }: Props) => (
  <View className="bg-blue w-48 mr-5 rounded-3xl justify-between overflow-hidden h-fit">
    <View className="mt-4">
      <Image resizeMode="contain" className="w-12 h-32 self-center" source={{ uri: image }} />
    </View>
    <View>
      <View className="border-b1 self-center p-2 rounded-xl border-black-o-50 mb-7">
        <Text className={text({ type: 'l20', class: 'text-center text-white' })}>{count}</Text>
      </View>
      <View className="flex-row bg-yellowishOrange justify-around w-full">
        <Pressable
          onPress={onPressDecrease}
          className="flex-1 justify-center items-center"
          hitSlop={getHitSlop({ value: 5, top: 20 })}>
          <View className="w-6 h-1 bg-black" />
        </Pressable>
        <View className="h-full  border-l-4 border-l-blue" />
        <Pressable
          onPress={onPressIncrease}
          hitSlop={getHitSlop({ value: 5, top: 20 })}
          className="flex-1 justify-center items-center">
          <Text className={text({ type: 'l48', class: 'text-black' })}>+</Text>
        </Pressable>
      </View>
    </View>
  </View>
);

export default PlasticItem;
