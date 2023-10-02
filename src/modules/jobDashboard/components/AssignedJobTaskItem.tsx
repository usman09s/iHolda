import { useEffect } from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  FadeInUp,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Button from 'components/Button';
import Icons from 'components/Icons';
import { text } from 'theme/text';
import { units, width } from 'utils/helpers';

type Props = {
  isOpened: boolean;
  status: 'todo' | 'done';
  openTaskItem: () => void;
};

const AssignedJobTaskItem = ({ status, isOpened, openTaskItem }: Props) => {
  const height = useSharedValue(100);

  useEffect(() => {
    if (isOpened) {
      height.value = withTiming(units.vh * 20);

      return;
    }
    height.value = withTiming(units.vh * 8);
  }, [isOpened]);

  const animatedStyle = useAnimatedStyle(() => ({
    minHeight: height.value,
  }));

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: interpolate(height.value, [units.vh * 8, units.vh * 18], [0, 1]),
    transform: [
      {
        translateY: interpolate(height.value, [units.vh * 8, units.vh * 20], [units.vh * 10, 0]),
      },
    ],
  }));

  return (
    <Animated.View className="bg-white rounded-2xl p-4 mb-4 overflow-hidden">
      <Animated.View style={[animatedStyle]}>
        <Pressable className="h-fit w-fit z-20" onPress={openTaskItem}>
          <View className="flex-row">
            <View className="h-2 w-2 rounded-full bg-green-500 top-1 mr-2" />
            <Text className={text({ type: 'm18' })}>Clean the drainange properly</Text>
          </View>
          {isOpened && (
            <Animated.View entering={FadeInUp}>
              <Text className={text({ type: 'r13', class: 'mt-4 ml-4 leading-[18px]' })}>
                Clean drainage thoroughly to ensure efficient water flow. Follow cleaning guidelines
                and use appropriate tools and materials for a job well done.
              </Text>
              <View className="flex-row flex-wrap justify-between mt-4">
                <Image
                  source={{ uri: 'https://i.pravatar.cc/1024?img=5' }}
                  style={{ height: units.vh * 24, width: (width - 112) / 2 }}
                />
                <Image
                  source={{ uri: 'https://i.pravatar.cc/1024?img=3' }}
                  style={{ height: units.vh * 24, width: (width - 112) / 2 }}
                />
              </View>
            </Animated.View>
          )}
          <View className="flex-row items-center mt-4 ml-4 justify-between">
            <Text className={text({ type: 'r13', class: '' })}>
              Job Type:{' '}
              <Text className={text({ type: 'm13', class: 'text-[#006CFF]' })}>Community</Text>
            </Text>
            {status === 'todo' && (
              <Animated.View className="flex-row items-center" style={opacityStyle}>
                <TouchableOpacity onPress={() => null}>
                  <Icons.AddImageIcon color={'black'} />
                </TouchableOpacity>
                <Button
                  title="Done"
                  onPress={() => null}
                  customTextClass={text({ type: 'm13' })}
                  customContainer="px-2 py-1 rounded-md bg-saffron ml-4"
                />
              </Animated.View>
            )}
          </View>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
};

export default AssignedJobTaskItem;
