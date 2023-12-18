import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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
import { getImageLink, getVideoLink } from 'modules/moments/helpers/imageHelpers';
import { useSelector } from 'react-redux';
import { userSelector } from 'store/auth/userSelectors';
import { ResizeMode } from 'expo-av';
import Antdesign from '@expo/vector-icons/AntDesign';
import VideoPlayer from 'expo-video-player';

type Categories =
  | { slug: 'all'; name: 'All' }
  | { slug: 'video'; name: 'Videos' }
  | { slug: 'restaurant'; name: 'Restaurant' }
  | { slug: 'user'; name: 'People' };

const categories: Categories[] = [
  { slug: 'all', name: 'All' },
  { slug: 'video', name: 'Videos' },
  { slug: 'user', name: 'People' },
  { slug: 'restaurant', name: 'Restaurant' },
];

const FeedMomentsSearchScreen = () => {
  const navigation: any = useNavigation();
  // TODO: add types
  const [searchResult, setSearchResult] = useState<any>([]);
  const [searchType, setSearchType] = useState<Categories>(categories[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTxt, setSearchTxt] = useState('');
  const [page, setPage] = useState(1);
  const {} = useAppNavigation<NavigationProp<FeedStackParamList>>();
  const { user } = useSelector(userSelector);

  // const handlePressUser = () => {
  //   navigation.navigate('ProfileStack', { screen: 'Profile', params: { isCurrentUser: false } });
  // };

  async function getData(url = '') {
    const response = await fetch(url, {
      method: 'GET',
    });
    return { ...(await response.json()), status: response.status };
  }

  const search = async (query: boolean = false, specificPage?: number) => {
    if (specificPage) setPage(specificPage);

    const url =
      Api.baseUrl +
      `met/all?type=${searchType.slug}&page=1&limit=100` +
      (searchTxt ? '&search=' + searchTxt.toLowerCase() : '');
    console.log('🚀 ~ file: FeedMomentsSearchScreen.tsx:64 ~ search ~ url:', url);
    const res = await getData(url);
    console.log('🚀 ~ file: FeedMomentsSearchScreen.tsx:44 ~ search ~ res:', res);

    // if (!query || page === 1) setPage(prevState => prevState + 1);
    if (searchType.slug === 'video') setSearchResult(res.data?.metUsers);
    if (searchType.slug === 'user') setSearchResult(res.data?.users);
    if (searchType.slug === 'restaurant') setSearchResult(res.data?.restaurants);
    if (searchType.slug === 'all')
      setSearchResult([...res.data?.users?.slice(0, 3), ...res.data?.metUsers]);
    setIsLoading(false);

    // if (specificPage || query) setSearchResult(res.data);
    // else setSearchResult(prevState => prevState.concat(res.data));
  };

  const followUnfollowUser = async (userId: string, followed: boolean, userIndex: number) => {
    try {
      await Api.followUnFollowUseer(userId, followed);

      // const userIndex = searchResult.findIndex((d: any) => d._id == userId);

      const followers = followed
        ? searchResult[userIndex].followers.filter((f: string) => f !== user?._id)
        : [...searchResult[userIndex].followers, user?._id];

      searchResult[userIndex] = { ...searchResult[userIndex], followers };

      setSearchResult([...searchResult]);
    } catch (error) {
      // // console.log('🚀 ~ followUnfollowUser ~ error:', error);
    }
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

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  const searchList = (page?: number) => {
    setIsLoading(true);

    search(true, page);
  };

  useEffect(() => {
    searchList();
  }, [searchTxt]);

  useEffect(() => {
    searchList(1);
  }, [searchType.slug]);

  return (
    <View className="bg-white flex-1">
      <View className="px-4">
        <Header
          showBackIcon
          centerComponent={
            <View className="my-4 flex-1 border border-[#cecece] ml-4 mt-5 rounded-3xl py-1 px-5 flex-row items-center">
              <TextInput
                value={searchTxt}
                onChangeText={setSearchTxt}
                placeholder="bayuga"
                className="flex-1"
              />
              <Icons.MagnitudeIcon color={'#cecece'} />
            </View>
          }
        />
      </View>

      <View className="flex-row">
        <FlatList
          data={categories}
          horizontal
          keyExtractor={e => e.slug}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: c, index }) => (
            <TouchableOpacity
              onPress={() => setSearchType(c)}
              className={
                (searchType.slug === c.slug ? 'bg-[#ffde71] ' : 'border border-[#808080]') +
                'flex-grow-0 py-1 px-4 rounded-[50px] mx-3'
              }
              style={
                searchType.slug === c.slug
                  ? {
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.22,
                      shadowRadius: 2.22,

                      elevation: 3,
                      marginLeft: index === 0 ? 57 : 12,
                    }
                  : {
                      marginLeft: index === 0 ? 57 : 12,
                    }
              }>
              <Text className={text({ type: 'm16', class: 'text-center' })}>{c.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={{ height: 20 }} />

      <ScrollView>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View
            className={`flex-row ${searchType.slug === 'restaurant' ? 'px-3' : ''} justify-between`}
            style={{ flexWrap: 'wrap' }}>
            {searchResult?.map((item: any, index: number) => {
              // const isUser = item?.users && item?.users[0]?.metCount !== undefined;
              const isUser = !item?.post;
              const isRestaurant = item?.merchant;
              const isFollowed = isUser ? item?.followers?.includes(user?._id) : false;

              // if (index === 0) console.log(item);

              if (isUser && !item.userName && !isRestaurant) return null;
              else
                return isRestaurant ? (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('RestaurentDetail', {item});
                    }}
                    // className="flex-1 mx-2 mb-1 ml-4 bg-black w-full"
                    className={`${index === 0 ? 'w-[100%]' : 'w-[49%]'} mt-2 pl-0`}>
                    <ImageBackground
                      source={{
                        uri: getImageLink(item?.coverImage?.mediaId),
                      }}
                      resizeMode="cover"
                      className="rounded-3xl overflow-hidden w-[100%] h-[240px] items-end justify-end">
                      <View
                        style={{
                          marginRight: 30,
                          marginBottom: 20,
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 5,
                        }}>
                        <Antdesign name="hearto" color={'#fff'} size={20} />
                        <Text className={text({ type: 'r12', class: 'text-white' })}>112</Text>
                      </View>
                    </ImageBackground>
                    <View className="flex-row justify-between mt-1 px-1">
                      <Text className={text({ type: 'r13', class: 'font-bold' })}>{item.name}</Text>
                      <View className="flex-row items-center gap-3">
                        <Antdesign name="star" color={'#ffc859'} size={15} />

                        <Text className={text({ type: 'r13', class: 'font-bold' })}>5.0</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ) : isUser ? (
                  <View className="p-2 flex-row items-center px-4 w-full">
                    <Image
                      source={{
                        uri: item?.photo?.mediaId
                          ? getImageLink(item?.photo?.mediaId)
                          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg23bqTJ8NSFQ6vjY81zv-2Av8fZY6Zls9gg&usqp=CAU',
                      }}
                      resizeMode={item?.photo?.mediaId ? 'cover' : 'contain'}
                      style={{ width: 40, height: 40, borderRadius: 50, marginHorizontal: 10 }}
                    />
                    <View style={{ flex: 1 }}>
                      <Text className="font-semibold">{item.userName}</Text>
                      <Text className="text-gray-500">Met {item?.metPeopleCount} people</Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() => followUnfollowUser(item?._id, isFollowed, index)}
                        className={isFollowed ? 'bg-[#eeeeee]' : 'bg-[#52c3ff]'}
                        style={{ paddingVertical: 5, paddingHorizontal: 15, borderRadius: 5 }}>
                        <Text style={{ fontSize: 13 }}>{isFollowed ? 'Following' : 'Follow'}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : index === 0 && searchType.slug === categories[0].slug ? null : (
                  <View className="w-[44%] mx-2 mb-1 ml-4">
                    {item.post?.media[0]?.mediaType?.includes('video') ? (
                      <VideoPlayer
                        videoProps={{
                          shouldPlay: false,
                          resizeMode: ResizeMode.COVER,
                          source: {
                            uri: getVideoLink(item.post?.media[0]?.mediaId),
                          },
                          className: 'rounded-md w-[100%] h-[240px]',
                        }}
                      />
                    ) : (
                      <Image
                        source={{
                          uri: getImageLink(item.post?.media[0]?.mediaId),
                        }}
                        resizeMode="cover"
                        className="rounded-md w-[100%] h-[240px]"
                      />
                    )}
                    <Text className={text({ type: 'r12' })}>{item.metTitle}</Text>
                    <View className="flex-row justify-between mt-1">
                      <Text className={text({ type: 'r12' })} style={{ fontWeight: 'bold' }}>
                        @{item?.users ? item.users[0]?.userName : ''}
                      </Text>
                      <Text className={text({ type: 'r12' })}>
                        {item.post?.likes?.length} likes
                      </Text>
                    </View>
                  </View>
                );
            })}
          </View>
        )}
      </ScrollView>

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
