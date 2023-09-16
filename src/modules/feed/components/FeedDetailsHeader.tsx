import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationProp } from '@react-navigation/native';
import Icons from 'components/Icons';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { AuthStackParamList } from 'modules/auth/AuthStackNavigator';
import colors from 'theme/colors';
import { text } from 'theme/text';

const FeedDetailsHeader = () => {
  const { top } = useSafeAreaInsets();
  const { goBack } = useAppNavigation<NavigationProp<AuthStackParamList>>();

  return (
    <View className="flex-row items-center justify-between absolute z-20">
      <LinearGradient
        locations={[0, 0.2, 0.6, 1]}
        style={{ paddingTop: top, paddingBottom: top }}
        className="flex-row items-center justify-between  z-20 px-6 pb-3"
        colors={[
          colors['black-o-80'],
          colors['black-o-70'],
          colors['black-o-40'],
          colors['black-o-01'],
        ]}>
        <>
          <TouchableOpacity
            onPress={goBack}
            className="flex-1 justify-start items-start self-start">
            <Icons.CrossIcon color={'white'} />
          </TouchableOpacity>
          <View className="flex-1 justify-center items-center">
            <Text className={text({ type: 'r12', class: 'text-white text-center' })}>
              Moments shared with @bayuga
            </Text>
          </View>
          <View className="flex-1 items-end justify-center"></View>
        </>
      </LinearGradient>
    </View>
  );
};

export default FeedDetailsHeader;
