import { Image, Text, TouchableOpacity, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Header from 'components/Header/Header';
import Icons from 'components/Icons';
import Input from 'components/Input';
import { useAppNavigation } from 'hooks/useAppNavigation';
import colors from 'theme/colors';
import { text } from 'theme/text';

import { FeedStackParamList } from '../FeedStackNavigator';

const FeedMomentsSearchScreen = () => {
  const navigation = useNavigation();
  const {} = useAppNavigation<NavigationProp<FeedStackParamList>>();

  const handlePressUser = () => {
    navigation.navigate('ProfileStack', { screen: 'Profile', params: { isCurrentUser: false } });
  };

  return (
    <View className="bg-white flex-1 px-7">
      <Header showBackIcon title="Moments" />
      <Text className={text({ type: 'r10', class: 'text-center px-7 mt-2 ' })}>
        View past moments your friends have shared with others
      </Text>
      <View className="my-4">
        <Input
          onChangeText={() => null}
          placeholderTextColor={colors['black-o-30']}
          placeholder="Search a user, user-A & user-B or location"
          customInputClass="border-b1 text-black border-black-o-20 py-3"
          rightIcon={<Icons.MagnitudeIcon color={colors['black-o-80']} />}
        />
      </View>
      <View className="bg-cultured px-4 py-3 rounded-xl flex-row mt-5 items-center">
        <View className="flex-row items-center">
          <View className="rounded-full border-[3px] border-saffron bg-gray-400 justify-center items-center">
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=33' }}
              className="w-10 h-10 rounded-full"
            />
          </View>
          <View className="rounded-full  right-4 border-[3px] border-green-400  bg-gray-400">
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=33' }}
              className="w-10 h-10 rounded-full"
            />
          </View>
        </View>
        <View>
          <Text className={text({ type: 'b16' })}>Bayuga and Ornela post</Text>
          <Text className={text({ type: 'r10' })}>Moments</Text>
        </View>
      </View>
      <TouchableOpacity
        className="bg-cultured px-4 py-3 rounded-xl flex-row mt-4"
        onPress={handlePressUser}>
        <View className="rounded-full border-[3px] border-transparent">
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=33' }}
            className="w-10 h-10 rounded-full mr-4"
          />
        </View>
        <View>
          <Text className={text({ type: 'b16' })}>Bayuga</Text>
          <Text className={text({ type: 'r10' })}>User</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FeedMomentsSearchScreen;
