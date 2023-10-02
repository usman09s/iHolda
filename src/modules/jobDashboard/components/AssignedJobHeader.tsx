import { Image, Text, View } from 'react-native';
import Animated, { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from 'components/Header/Header';
import { text } from 'theme/text';
import { units } from 'utils/helpers';

const AssignedJobHeader = ({ scrollY }: { scrollY: SharedValue<number> }) => {
  const { top } = useSafeAreaInsets();

  const animatedStyle = useAnimatedStyle(() => {
    const value40 = units.vh * 40;
    const value = scrollY.value > value40 ? value40 : scrollY.value;

    return {
      height: interpolate(value, [value40, 0], [units.vh * 12, units.vh * 40], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }),
    };
  });

  const opacityStyle = useAnimatedStyle(() => {
    const value40 = units.vh * 40;
    const value = scrollY.value > value40 ? value40 : scrollY.value;

    return {
      opacity: interpolate(value, [value40, 0], [0, 1]),
    };
  });

  const opacity2Style = useAnimatedStyle(() => {
    const value40 = units.vh * 40;
    const value = scrollY.value > value40 ? value40 : scrollY.value;

    return {
      opacity: interpolate(value, [value40, 0], [1, 0]),
    };
  });

  return (
    <View>
      <View className="absolute z-40 px-4">
        <Header showBackIcon backIconColor="white" />
      </View>
      <Animated.Image
        source={{ uri: 'https://i.pravatar.cc/1024?img=5' }}
        style={[{ height: units.vh * 40, width: '100%' }, animatedStyle]}
      />
      <Animated.View
        style={[
          { height: units.vh * 40, width: '100%', paddingHorizontal: units.vw * 12 },
          animatedStyle,
          opacityStyle,
        ]}
        className="bg-black-o-60 absolute z-10 justify-center items-center">
        <Text className={text({ type: 'b24', class: 'text-white-o-60 text-center' })}>
          I needed a carpet cleaner in Buea Asap
        </Text>
        <Text className={text({ type: 'b14', class: 'text-white text-center mt-5' })}>
          by @bayuga
        </Text>
        <View className="flex-row  absolute" style={{ bottom: units.vh * 3, left: units.vw * 3 }}>
          <View className="overflow-hidden rounded-full w-12 h-12 border-[3px] border-white mr-2">
            <Image
              source={{ uri: 'https://i.pravatar.cc/1024?img=5' }}
              className="h-full w-full rounded-full"
            />
          </View>
          <View className="overflow-hidden rounded-full w-12 h-12 border-[3px] border-white">
            <Image
              source={{ uri: 'https://i.pravatar.cc/1024?img=6' }}
              className="h-full w-full rounded-full"
            />
          </View>
        </View>
      </Animated.View>
      <Animated.View
        className={'absolute z-30 self-center bottom-0 w-full h-full bg-black-o-60'}
        style={[opacity2Style, { paddingTop: top || 16 }]}>
        <Text className={text({ type: 'b16', class: 'text-white text-center' })}>
          I needed a carpet cleaner in Buea Asap
        </Text>
        <Text className={text({ type: 'b10', class: 'text-white text-center mt-5' })}>
          by @bayuga
        </Text>
      </Animated.View>
    </View>
  );
};
export default AssignedJobHeader;
