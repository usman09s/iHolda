import { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import Header from 'components/Header/Header';
import { text } from 'theme/text';

import FolloweTabItem from '../components/FollowerTabItem';
import Api from 'services/Api';
import { getImageLink } from 'modules/moments/helpers/imageHelpers';
import { useSelector } from 'react-redux';
import { userSelector } from 'store/auth/userSelectors';
import { useNavigation } from '@react-navigation/native';
import Input from 'components/Input';
import colors from 'theme/colors';
import Icons from 'components/Icons';

const FollowersScreen = ({ route }: any) => {
  const [tabIndex, setTabIndex] = useState<0 | 1 | 2>(route.params.index);
  const [data, setData] = useState<any[]>([]);
  const [dumyData, setDummyData] = useState<any[]>([]);
  const { user } = useSelector(userSelector);
  const otherUserId = route.params?.userId; // if undeffined then it is logged in user

  async function getData() {
    let res;
    if (tabIndex === 0) res = await Api.getFollowers(otherUserId);
    else if (tabIndex === 1) res = await Api.getMets(otherUserId);
    else res = await Api.getSuggestions();
    // console.log('🚀 ~ file: FollowersScreen.tsx:15 ~ getData ~ res:', res);
    setData(res?.data?.data);
    setDummyData(res?.data?.data);
  }

  const search = (q: string) => {
    if (!q && typeof q !== 'string') return;

    if (q.length < 1) return setData(dumyData);

    const filteredData = data.filter((d: any) => d.userName?.includes(q.toLowerCase()));

    setData(filteredData);
  };

  const followUnfollowUser = async (userId: string, followed: boolean) => {
    try {
      const res = await Api.followUnFollowUseer(userId, followed);
      // console.log("🚀 ~ file: FollowersScreen.tsx:45 ~ followUnfollowUser ~ res:", res)

      const userIndex = data.findIndex((d: any) => d._id == userId);

      const followers = followed
        ? data[userIndex].followers.filter((f: string) => f !== user?._id)
        : [...data[userIndex].followers, user?._id];

      data[userIndex] = { ...data[userIndex], followers };

      setData([...data]);
    } catch (error) {
      // console.log('🚀 ~ followUnfollowUser ~ error:', error);
    }
  };

  useEffect(() => {
    getData();
  }, [tabIndex]);

  return (
    <View className="bg-white flex-1">
      <View className="px-5">
        <Header
          showBackIcon
          centerComponent={
            <Text className={text({ type: 'm18', class: 'text-black' })}>{user?.userName}</Text>
          }
        />
      </View>
      <View className="flex-row justify-between items-center border-b-b1 border-white-o-30 mt-3">
        <FolloweTabItem
          title="Followers"
          isSelected={tabIndex === 0}
          onPressTabItem={() => setTabIndex(0)}
        />
        <FolloweTabItem
          title="Met"
          isSelected={tabIndex === 1}
          onPressTabItem={() => setTabIndex(1)}
        />
        <FolloweTabItem
          title="Suggesstions"
          isSelected={tabIndex === 2}
          onPressTabItem={() => setTabIndex(2)}
        />
      </View>

      <View style={{ height: 20 }} />

      <View className="my-4 mx-3">
        <Input
          style={{ backgroundColor: '#f4f4f4', textAlign: 'right', paddingRight: 50 }}
          // value={searchTxt}
          onChangeText={search}
          placeholderTextColor={colors['black-o-30']}
          placeholder="Search"
          customInputClass="text-black py-2"
          rightIcon={<Icons.MagnitudeIcon color={colors['black-o-80']} />}
        />
      </View>

      <FlatList
        data={data}
        keyExtractor={key => key._id}
        renderItem={({ item }) => {
          const isFollowed = item?.followers.includes(user?._id);

          if (!item.userName) return null;
          return (
            <View className="p-2 flex-row items-center px-4">
              <Image
                source={{
                  uri: item?.photo?.mediaId
                    ? getImageLink(item?.photo?.mediaId)
                    : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bsn.eu%2Fuser-icon-image-placeholder%2F&psig=AOvVaw3CU3e9gk1WGti5wlvQgzWM&ust=1702178296302000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPjImMKygYMDFQAAAAAdAAAAABAD',
                }}
                resizeMode="cover"
                style={{ width: 40, height: 40, borderRadius: 50, marginHorizontal: 10 }}
              />
              <View style={{ flex: 1 }}>
                <Text className="font-semibold">{item.userName}</Text>
                <Text className="text-gray-500">
                  {item.firstName} {item.lastName}
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => followUnfollowUser(item?._id, isFollowed)}
                  // onPress={() => followUnfollowUser("656571028ac948743d233af7", true)}
                  className={isFollowed ? 'bg-[#eeeeee]' : 'bg-[#52c3ff]'}
                  style={{ paddingVertical: 5, paddingHorizontal: 15, borderRadius: 5 }}>
                  <Text style={{ fontSize: 13 }}>{isFollowed ? 'Following' : 'Follow'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />

      {/* <View className="p-2 flex-row items-center px-4">
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg',
          }}
          resizeMode="cover"
          style={{ width: 40, height: 40, borderRadius: 50, marginHorizontal: 10 }}
        />
        <View style={{ flex: 1 }}>
          <Text className="font-semibold">bauga</Text>
          <Text className="text-gray-500">Full name here</Text>
        </View>
        <View>
          <TouchableOpacity
            className="bg-[#52c3ff]"
            style={{ paddingVertical: 5, paddingHorizontal: 15, borderRadius: 5 }}>
            <Text style={{ fontSize: 13 }}>Follow</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="p-2 flex-row items-center px-4">
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg',
          }}
          resizeMode="cover"
          style={{ width: 40, height: 40, borderRadius: 50, marginHorizontal: 10 }}
        />
        <View style={{ flex: 1 }}>
          <Text className="font-semibold">bauga</Text>
          <Text className="text-gray-500">Full name here</Text>
        </View>
        <View>
          <TouchableOpacity
            className="bg-[#52c3ff]"
            style={{ paddingVertical: 5, paddingHorizontal: 15, borderRadius: 5 }}>
            <Text style={{ fontSize: 13 }}>Follow</Text>
          </TouchableOpacity>
        </View>
      </View> */}

      {/* <FlatList
        data={data}
        renderItem={({ item, index }) => (
         
        )}
      /> */}

      {/* {tabIndex === 0 && <Community />} */}
      {/* {tabIndex === 1 && <Meetups />}
      {tabIndex === 2 && <TeamUp />} */}
    </View>
  );
};

export default FollowersScreen;
