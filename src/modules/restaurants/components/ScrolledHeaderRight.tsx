import { View, Text, Linking } from 'react-native';
import Animated, { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import Button from 'components/Button';
import Icons from 'components/Icons';
import { text } from 'theme/text';
import { units } from 'utils/helpers';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { userSelector } from 'store/auth/userSelectors';

type Props = { top: number; isCurrentUser: boolean; activeY: SharedValue<number> };

const RestaurantScrolledHeaderRight = ({ top, activeY, isCurrentUser }: Props) => {
  const navigation = useNavigation();
  const { user } = useSelector(userSelector);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      activeY.value >= units.vh * 40 ? units.vh * 40 : activeY.value,
      [0, units.vh * 40],
      [1, 0],
    ),
  }));

  return (
    <Animated.View
      className="flex-1 items-end pr-6 absolute right-0 bottom-5"
      style={animatedStyle}>
      <View className="w-full" style={{ marginTop: units.vh * 3 + top }}>
        <View className="justify-around items-center bottom-0">

          <View style={{ height: units.vh * 2 }} />
          <TouchableOpacity>
            <Icons.HeartIcon />
          </TouchableOpacity>
          <View style={{ height: units.vh * 2 }} />
          <TouchableOpacity>
            <Icons.ShareIcon />
          </TouchableOpacity>
          <View style={{ height: units.vh * 2 }} />
          <TouchableOpacity>
            <Icons.BookmarkIcon />
          </TouchableOpacity>
        </View>

        
      </View>
    </Animated.View>
  );
};

export default RestaurantScrolledHeaderRight;
