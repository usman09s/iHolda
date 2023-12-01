import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Header from 'components/Header/Header';
import Icons from 'components/Icons';
import Input from 'components/Input';
import { useAppNavigation } from 'hooks/useAppNavigation';
import colors from 'theme/colors';
import { text } from 'theme/text';

import { FeedStackParamList } from '../FeedStackNavigator';
import { useEffect, useState } from 'react';
import Api from 'services/Api';

const FeedMomentsSearchScreen = () => {
  const navigation = useNavigation();
  // TODO: add types
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTxt, setSearchTxt] = useState('');
  const [page, setPage] = useState(1);
  const {} = useAppNavigation<NavigationProp<FeedStackParamList>>();

  const handlePressUser = () => {
    navigation.navigate('ProfileStack', { screen: 'Profile', params: { isCurrentUser: false } });
  };

  async function getData(url = '') {
    const response = await fetch(url, {
      method: 'GET',
    });
    setIsLoading(false);
    return { ...(await response.json()), status: response.status };
  }

  const search = async (query: boolean = false) => {
    const res = await getData(
      Api.baseUrl +
        'met/all?page=' +
        page +
        '&limit=10' +
        (searchTxt ? '&search=' + searchTxt : ''),
    );
    console.log(
      '🚀 ~ file: FeedMomentsSearchScreen.tsx:42 ~ search ~ Api.baseUrl',
      Api.baseUrl +
        'met/all?page=' +
        page +
        '&limit=10' +
        (searchTxt ? '&search=' + searchTxt : ''),
    );

    if (!query || page === 1) setPage(prevState => prevState + 1);
    setSearchResult(prevState => prevState.concat(res.data));
  };

  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <View>
        <TouchableOpacity activeOpacity={0.9}>
          {isLoading ? <ActivityIndicator style={{ marginLeft: 8 }} /> : null}
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    // met/all?page=1&search=Tes&limit=10
    setIsLoading(true);

    search(true);
  }, [searchTxt]);

  return (
    <View className="bg-white flex-1 px-7">
      <Header showBackIcon title="Moments" />
      <Text className={text({ type: 'r10', class: 'text-center px-7 mt-8 ' })}>
        View past moments your friends have shared with others
      </Text>
      <View className="my-4">
        <Input
          value={searchTxt}
          onChangeText={setSearchTxt}
          placeholderTextColor={colors['black-o-30']}
          placeholder="Search a user, user-A & user-B or location"
          customInputClass="border-b1 text-black border-black-o-20 py-3"
          rightIcon={<Icons.MagnitudeIcon color={colors['black-o-80']} />}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={searchResult}
          keyExtractor={e => e._id}
          onEndReachedThreshold={0.01}
          onEndReached={() => search()}
          // ListFooterComponent={renderFooter}
          renderItem={({ item }) => {
           
            return  item?.type == 'met' ? (
              <View className="bg-cultured px-4 py-3 rounded-xl flex-row mb-5 items-center">
                <View className="flex-row items-center">
                  <View className="rounded-full border-[3px] border-saffron bg-gray-400 justify-center items-center">
                    <Image
                      source={{ uri: item?.users[0]?.photo}}
                      className="w-10 h-10 rounded-full"
                    />
                  </View>
                  <View className="rounded-full  right-4 border-[3px] border-green-400  bg-gray-400">
                    <Image
                      source={{ uri: item?.users[1]?.photo }}
                      className="w-10 h-10 rounded-full"
                    />
                  </View>
                </View>
                <View>
                  <Text className={text({ type: 'b16' })}>{item?.users[0]?.userName} and {item?.users[1]?.userName} post</Text>
                  <Text className={text({ type: 'r10' })}>Moments</Text>
                </View>
              </View>
            ) :!item.userName ? null : (
              <TouchableOpacity
                className="bg-cultured px-4 py-3 rounded-xl flex-row mb-4"
                onPress={handlePressUser}>
                <View className="rounded-full border-[3px] border-transparent">
                  <Image source={{ uri: item.photo }} className="w-10 h-10 rounded-full mr-4" />
                </View>
                <View>
                  <Text className={text({ type: 'b16' })}>{item.userName}</Text>
                  <Text className={text({ type: 'r10' })}>
                    {item?.type === 'met' ? 'Moments' : 'User'}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}

      {/* <View className="bg-cultured px-4 py-3 rounded-xl flex-row mt-5 items-center">
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
      </View> */}
    </View>
  );
};

export default FeedMomentsSearchScreen;
