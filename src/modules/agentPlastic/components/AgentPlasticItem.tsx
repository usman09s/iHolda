import { Image, Pressable, Text, View } from 'react-native';
import { text } from 'theme/text';
import { getHitSlop } from 'utils/helpers';

type Props = {
  image: string;
  count: number;
  totalPrice: number;
  onPressIncrease: () => void;
  onPressDecrease: () => void;
};

const AgentPlasticItem = ({
  image,
  count,
  totalPrice,
  onPressDecrease,
  onPressIncrease,
}: Props) => (
  <View className="flex-row items-center justify-evenly p-2 rounded-xl border-[0.3px] border-black bg-cultured mb-4">
    <View className="bg-blue flex-row rounded-lg ml-2">
      <Image
        resizeMode="contain"
        className="h-28 w-20 my-2"
        source={{
          uri: image,
        }}
      />
      <View style={{ backgroundColor: '#EFF9FF' }} className="justify-center items-center px-5">
        <View className="border-[0.3px] border-black-o-50 rounded-xl w-12">
          <Text className={text({ type: 'l24', class: 'p-2 text-center' })}>{count}</Text>
        </View>
      </View>
      <View className="w-12">
        <Pressable
          onPress={onPressIncrease}
          hitSlop={getHitSlop({ value: 5, top: 20 })}
          className="flex-1 justify-center items-center h-1/2">
          <Text className={text({ type: 'l48', class: 'text-black' })}>+</Text>
        </Pressable>
        <View className="border-l-4 border-white border-b-b1 " />
        <Pressable
          onPress={onPressDecrease}
          className="flex-1 justify-center items-center h-14"
          hitSlop={getHitSlop({ value: 5, top: 20 })}>
          <View className="w-6 h-1 bg-black" />
        </Pressable>
      </View>
    </View>
    <View className="flex-1">
      <Text className={text({ type: 'l16', class: 'text-center text-black-o-70' })}>
        {totalPrice}Cfa
      </Text>
    </View>
  </View>
);

export default AgentPlasticItem;
