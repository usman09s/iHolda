import { Image, Text, View } from 'react-native';
import Animated, { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import Button from 'components/Button';
import { text } from 'theme/text';
import { units } from 'utils/helpers';
import { useNavigation } from '@react-navigation/native';

type Props = {
  top: number;
  avatar: string;
  username: string;
  isCurrentUser: boolean;
  activeY: SharedValue<number>;
};

const ScrolledHeader = ({ top, avatar, activeY, username, isCurrentUser }: Props) => {
  console.log(isCurrentUser, 'lklklklklkl');
  const navigation = useNavigation();
  const headerHeight = units.vh * 8;
  const animatedStyle = useAnimatedStyle(() => ({
    top: interpolate(
      activeY.value >= units.vh * 40 ? units.vh * 40 : activeY.value,
      [0, units.vh * 40],
      [-units.vh * 8 - top - 16, 0],
    ),
  }));

  return (
    <Animated.View
      className={'flex-row items-center space-x-2 bg-white w-full px-6 absolute z-20'}
      style={[
        {
          paddingBottom: 8,
          top: -headerHeight,
          paddingTop: top + 8,
          height: headerHeight + 16,
          justifyContent: 'space-between',
        },
        animatedStyle,
      ]}>
      <View className="flex-row items-center space-x-2">
        <Image className="h-10 w-10 rounded-full" source={{ uri: avatar }} />
        <Text className={text({ type: 'r13', class: 'text-black' })}>{username}</Text>
      </View>
      <View>
        <Button
          type="solid"
          title={isCurrentUser ? 'Settings' : 'Follow'}
          customContainer="rounded-md self-center py-1 px-3 bg-white border-b1 border-black-o-20"
          customTextClass={text({ type: 'r12', class: 'text-black h-4' })}
          onPress={() => {
            if (isCurrentUser === true) {
              navigation.navigate('SettingsStack');
            }
          }}
        />
      </View>
    </Animated.View>
  );
};

export default ScrolledHeader;
