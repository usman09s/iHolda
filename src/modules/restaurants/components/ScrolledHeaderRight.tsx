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
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

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
        <View className="justify-around items-end bottom-8 right-2">
          {/* Linking.openURL(this.state.url).catch(err => console.error("Couldn't load page", err)); */}

          <View style={{ height: units.vh * 2 }} />
          <TouchableOpacity>
            <Icons.ShareIcon />
          </TouchableOpacity>
          <View style={{ height: units.vh * 2 }} />
          <TouchableOpacity>
            <Icons.BookmarkIcon />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', gap: 20 }}>
          <View style={{ alignItems: 'center' }}>
            <View
              style={{
                backgroundColor: '#3cc03c',
                height: 40,
                width: 40,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Ionicons name="call" color={'#FFF'} size={18} />
            </View>
            <Text style={{ color: 'white' }}>Call</Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <View
              style={{
                backgroundColor: '#0684fa',
                height: 40,
                width: 40,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome5 name="directions" color={'#FFF'} size={20} />
            </View>
            <Text style={{ color: 'white' }}>Direction</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default RestaurantScrolledHeaderRight;
