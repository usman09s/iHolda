import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationProp } from '@react-navigation/native';
import Icons from 'components/Icons';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { AuthStackParamList } from 'modules/auth/AuthStackNavigator';
import colors from 'theme/colors';
import { text } from 'theme/text';
import { units } from 'utils/helpers';

const FeedHeader = () => {
  const { top } = useSafeAreaInsets();
  const { navigate } = useAppNavigation<NavigationProp<AuthStackParamList>>();

  return (
    <View className="flex-row items-center justify-between absolute z-50">
      <LinearGradient
        locations={[0, 0.2, 0.6, 1]}
        style={{ paddingTop: top + units.vh * 3 }}
        className="flex-row items-center justify-between px-4 pb-3"
        colors={[
          colors['black-o-80'],
          colors['black-o-70'],
          colors['black-o-40'],
          colors['black-o-01'],
        ]}>
        <>
          <TouchableOpacity
            onPress={() => navigate('PlasticStack')}
            className="flex-1 justify-start items-start self-start ">
            <Icons.PlasticLineIcon />
          </TouchableOpacity>
          <View className="flex-1 justify-center items-center">
            <Text className={text({ type: 'r15', class: 'text-white' })}>Feed</Text>
          </View>
          <View className="flex-1 items-end justify-center">
            <Pressable
              onPress={() => navigate('FeedMomentsSearch')}
              // onPress={() => navigate('RestaurentDetail')}
              className="w-11 h-11 rounded-full bg-black-o-30 justify-center items-center">
              <Icons.SearchIcon />
            </Pressable>
          </View>
        </>
      </LinearGradient>
    </View>
  );
};

export default FeedHeader;
