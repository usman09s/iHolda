import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { text } from 'theme/text';
import { getHitSlop, units } from 'utils/helpers';

type Props = {
  image: string;
  count: number;
  onPressIncrease: () => void;
  onPressDecrease: () => void;
};

const PlasticItem = ({ image, count = 0, onPressDecrease, onPressIncrease, id }: Props) => {
  console.log(id);
  console.log(count);
  return (
    <View className="bg-blue mr-5 rounded-3xl overflow-hidden" style={styles.container}>
      <View className="mt-0" style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          className="self-center"
          source={image}
          style={{
            width: units.vw * 20,
            height: units.vh * 20,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15,
          }}
        />
      </View>
      <View style={styles.textContainer}>
        <View
          className="border-b1 self-center px-4 py-2 rounded-xl border-black-o-50 mb-2 justify-center items-center"
          style={styles.h8}>
          <Text className={text({ type: 'l20', class: 'text-center text-white' })}>{count}</Text>
        </View>
        <View
          className="flex-row bg-yellowishOrange justify-around w-full"
          style={[styles.h8, { marginTop: units.vh * 3 }]}>
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
            <Text className={text({ class: 'text-black text-[40px] leading-10' })}>+</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: units.vw * 56, height: units.vh * 44 },
  imageContainer: { height: units.vh * 24, paddingTop: units.vh * 1, marginTop: units.vh * 1 },
  textContainer: { height: units.vh * 16 },
  h8: { height: units.vh * 8 },
});

export default PlasticItem;
