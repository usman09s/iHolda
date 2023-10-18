import { ImageBackground, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Header from 'components/Header/Header';
import { text } from 'theme/text';
import { wW } from 'utils/helpers';

import { useTimer } from '../hooks/useTimer';
import { MomentsStackParamList } from '../MomentsStackNavigator';

const MomentsQuizScreen = () => {
  const { navigate } = useNavigation<NavigationProp<MomentsStackParamList>>();
  const { bottom } = useSafeAreaInsets();
  const { counter } = useTimer();

  const optionW = (wW - 56) / 2;

  return (
    <View className="flex-1">
      <View className="flex-1">
        <ImageBackground
          source={{ uri: 'https://i.pravatar.cc/150?img=33' }}
          className="h-full w-full">
          <View className="px-6">
            <Header
              showBackIcon
              backIconColor="white"
              rightComponent={
                <View className="bg-white px-2.5 py-1">
                  <Text className={text({ type: 'b30', class: 'text-[#636363]' })}>{counter}</Text>
                </View>
              }
            />
          </View>
        </ImageBackground>
      </View>
      <View className="flex-1 pt-4 px-6 justify-between" style={{ marginBottom: bottom || 16 }}>
        <View>
          <Text className={text({ type: 'b30', class: 'text-center' })}>Question 1/5</Text>
          <Text className={text({ type: 'm15', class: 'mt-4 mb-8' })}>
            Who is the first Cameroon artist to hit 10M views on youtube?
          </Text>
          <View className="flex-wrap flex-row justify-between ">
            <View>
              <Text className={text({ class: 'text-center mb-1', type: 'r18' })}>A</Text>
              <View
                className="bg-fuchsia-700 py-3 rounded-full items-center"
                style={{ width: optionW }}>
                <Text className={text({ type: 'r18', class: 'text-white' })}>Francko</Text>
              </View>
            </View>
            <View>
              <Text className={text({ class: 'text-center mb-1', type: 'r18' })}>B</Text>
              <View
                className="bg-gray-600 py-3 rounded-full items-center"
                style={{ width: optionW }}>
                <Text className={text({ type: 'r18', class: 'text-white' })}>Francko</Text>
              </View>
            </View>
            <View className="mt-4">
              <Text className={text({ class: 'text-center mb-1', type: 'r18' })}>A</Text>
              <View
                className="bg-gray-600 py-3 rounded-full items-center"
                style={{ width: optionW }}>
                <Text className={text({ type: 'r18', class: 'text-white' })}>Francko</Text>
              </View>
            </View>
            <View className="mt-4">
              <Text className={text({ class: 'text-center mb-1', type: 'r18' })}>B</Text>
              <View
                className="bg-gray-600 py-3 rounded-full items-center"
                style={{ width: optionW }}>
                <Text className={text({ type: 'r18', class: 'text-white' })}>Francko</Text>
              </View>
            </View>
          </View>
        </View>
        <Pressable
          className="items-center w-full mt-4 justify-center"
          onPress={() => navigate('MomentsMood')}>
          <Text className={text({ type: 'm16' })}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MomentsQuizScreen;
