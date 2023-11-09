import { View } from 'react-native';
import Animated, { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import Button from 'components/Button';
import Icons from 'components/Icons';
import { text } from 'theme/text';
import { units } from 'utils/helpers';
import { useNavigation } from '@react-navigation/native';

type Props = { top: number; isCurrentUser: boolean; activeY: SharedValue<number> };

const ScrolledHeaderRight = ({ top, activeY, isCurrentUser }: Props) => {
  const navigation = useNavigation();
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      activeY.value >= units.vh * 40 ? units.vh * 40 : activeY.value,
      [0, units.vh * 40],
      [1, 0],
    ),
  }));

  return (
    <Animated.View className="flex-1 items-end pr-6 absolute right-0" style={animatedStyle}>
      <View className="w-full" style={{ marginTop: units.vh * 3 + top }}>
        <Button
          title={isCurrentUser ? 'Settings' : 'Follow'}
          type="solid"
          customContainer="rounded-md self-center py-1 px-3 bg-white border-b1 border-black-o-20"
          customTextClass={text({ type: 'r12', class: 'text-black h-4' })}
          onPress={() => navigation.navigate('AcceptReferenceStack')}
        />

        <View className="justify-around items-center mt-4">
          <Icons.TiktokIcon />
          <View style={{ height: units.vh * 2 }} />
          <Icons.InstagramIcon />
          <View style={{ height: units.vh * 2 }} />
          <Icons.SnapchatIcon />
          <View style={{ height: units.vh * 2 }} />
          <Icons.WebsiteIcon />
        </View>
      </View>
    </Animated.View>
  );
};

export default ScrolledHeaderRight;
