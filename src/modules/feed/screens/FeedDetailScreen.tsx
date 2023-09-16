import { FlatList, Image, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp } from '@react-navigation/native';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { text } from 'theme/text';
import { units } from 'utils/helpers';

import FeedDetailsHeader from '../components/FeedDetailsHeader';
import FeedItem from '../components/FeedItem';
import { FeedStackParamList } from '../FeedStackNavigator';

const FeedDetailsScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const {} = useAppNavigation<NavigationProp<FeedStackParamList>>();

  return (
    <View className="flex-1 items-center bg-black px-4" style={{ paddingTop: top }}>
      <View
        className="overflow-hidden border-[2px] border-white w-full rounded-3xl flex-1"
        style={{ overflow: 'hidden' }}>
        <FeedDetailsHeader />
        <FeedItem
          image={
            'https://images.pexels.com/photos/7433003/pexels-photo-7433003.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load'
          }
        />
      </View>
      <View
        style={{ height: units.vh * 15, marginBottom: bottom + 8 }}
        className="justify-center items-center flex-row my-2">
        <FlatList
          horizontal
          data={[1, 2, 3, 4, 5]}
          renderItem={({ item }) => (
            <View>
              <View
                style={{ height: units.vh * 12 }}
                className="border-2 border-white rounded-2xl overflow-hidden mr-2 flex-col">
                <Image
                  resizeMode="cover"
                  className="w-20 rounded-2xl"
                  style={{ height: units.vh * 14 }}
                  source={{
                    uri: 'https://images.pexels.com/photos/18271819/pexels-photo-18271819/free-photo-of-kent-tatil-sokak-bina.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
                  }}
                />
                <View className="absolute z-10 h-full w-full justify-center items-center bg-black-o-10">
                  <Text className={text({ type: 'r18', class: 'text-white' })}>{item}</Text>
                </View>
              </View>
              <View>
                <Text className={text({ type: 'r10', class: 'text-white-o-80 text-center mt-1' })}>
                  1 day ago
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default FeedDetailsScreen;
