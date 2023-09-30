import { memo } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import Header from 'components/Header/Header';
import Icons from 'components/Icons';
import colors from 'theme/colors';
import { text } from 'theme/text';
import { getHitSlop, units } from 'utils/helpers';

type Props = {
  goBack: () => void;
  onSave: () => void;
  scrollY: SharedValue<number>;
};

const LG = Animated.createAnimatedComponent(LinearGradient);

const JobPostingHeader = ({ goBack, onSave, scrollY }: Props) => {
  const animatedImageAndContainerStyle = useAnimatedStyle(() => {
    const value24 = units.vh * 24;
    const value = scrollY?.value > value24 ? value24 : scrollY.value;

    return {
      height: interpolate(value, [0, value24], [units.vh * 50, units.vh * 12]),
    };
  });

  const opacityHeaderStyle = useAnimatedStyle(() => {
    const value24 = units.vh * 24;
    const value = scrollY?.value > value24 ? value24 : scrollY.value;

    return {
      opacity: interpolate(value, [units.vh * 16, value24], [0, 1]),
    };
  });

  const opacityBottomContainerStyle = useAnimatedStyle(() => {
    const value24 = units.vh * 24;
    const value = scrollY?.value > value24 ? value24 : scrollY.value;

    return {
      opacity: interpolate(value, [0, units.vh * 22], [1, 0]),
    };
  });

  return (
    <Animated.View className="z-10  w-full" style={animatedImageAndContainerStyle}>
      <LG
        colors={[
          colors['black-o-025'],
          colors['black-o-20'],
          colors['black-o-30'],
          colors['black-o-40'],
        ].reverse()}
        locations={[0, 0.1, 0.6, 1]}
        className="absolute w-full z-30 px-4 pb-4">
        <Header
          leftComponent={
            <Pressable
              onPress={goBack}
              hitSlop={getHitSlop({ value: 20 })}
              className="bg-white p-1.5 rounded-full w-10 h-10 justify-center items-center z-20">
              <Icons.ArrowLeftIcon />
            </Pressable>
          }
          centerComponent={
            <Animated.View className="mx-2 flex-shrink" style={opacityHeaderStyle}>
              <Text
                numberOfLines={2}
                className={text({ type: 'b24', class: 'text-white text-center' })}>
                Cleaner needed
              </Text>
              <Text className={text({ type: 'r16', class: 'text-white text-center' })}>
                in Buea
              </Text>
            </Animated.View>
          }
          rightComponent={
            <View className="bg-white p-1.5 rounded-full w-10 h-10 justify-center items-center">
              <Icons.HeartIcon color={'black'} />
            </View>
          }
        />
      </LG>
      <Animated.Image
        className={'w-full bg-black'}
        source={{ uri: 'https://i.pravatar.cc/1024?img=34' }}
        style={[{ width: '100%', height: units.vh * 50 }, animatedImageAndContainerStyle]}
      />
      <LG
        colors={[
          colors['black-o-025'],
          colors['black-o-20'],
          colors['black-o-30'],
          colors['black-o-40'],
        ]}
        locations={[0, 0.1, 0.6, 1]}
        className="items-center justify-between flex-row absolute w-full bottom-0 px-4 pb-2"
        style={opacityBottomContainerStyle}>
        <View>
          <Text className={text({ type: 'b24', class: 'text-white' })}>Cleaner needed</Text>
          <Text className={text({ type: 'r16', class: 'text-white' })}>in Buea</Text>
        </View>
        <Pressable onPress={onSave} className="items-center justify-center">
          <Icons.ShareIcon className="mb-4" />
          <Icons.BookmarkIcon />
        </Pressable>
      </LG>
    </Animated.View>
  );
};

export default memo(JobPostingHeader);
