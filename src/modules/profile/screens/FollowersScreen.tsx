import { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import Header from 'components/Header/Header';
import { text } from 'theme/text';

import FolloweTabItem from '../components/FollowerTabItem';
import Api from 'services/Api';

const FollowersScreen = ({ route }: any) => {
  const [tabIndex, setTabIndex] = useState(route.params.index);
  const [data, setData] = useState<any>([]);

  async function getData() {
    const res = await Api.getFollowers();
    console.log('🚀 ~ file: FollowersScreen.tsx:15 ~ getData ~ res:', res);
    setData(res?.data?.data);
  }

  useEffect(() => {
    getData();
  }, [tabIndex]);

  return (
    <View className="bg-white flex-1">
      <View className="px-5">
        <Header
          showBackIcon
          centerComponent={
            <Text className={text({ type: 'm18', class: 'text-black' })}>User name</Text>
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
      </View>

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
