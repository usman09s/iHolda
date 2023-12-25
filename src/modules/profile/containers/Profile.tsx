import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import ProfileDescriptionAndStats from '../components/ProfileDescriptionAndStats';
import ProfilePostItem from '../components/ProfilePostItem';
import ProfilePostTabs from '../components/ProfilePostTabs';
import { useQuery } from 'react-query';
import Api from 'services/Api';
import { useEffect, useState } from 'react';
import { UserMoment } from '../types';

interface Props {
  followers: string;
  impression: string;
  metPeople: string;
  onPressMet?: any;
  metsUserId?: string;
  userName?: string;
  description: string;
}

const Profile = ({
  followers = '100k',
  impression = '190k',
  metPeople = '19 people',
  metsUserId,
  onPressMet,
  userName,
  description,
}: Props) => {
  const [data, setData] = useState<{ data: { data: UserMoment[] } }>();
  const [activeIndex, setActiveIndex] = useState(0);

  const getMets = async (getBookmarks: number) => {
    if (getBookmarks === 1) return;
    console.log('🚀 ~ file: Profile.tsx:43 ~ getMets ~ getBookmarks:', getBookmarks);
    try {
      setActiveIndex(getBookmarks);
      setData({ data: { data: [] } });
      const response = await fetch(
        `${Api.baseUrl}${getBookmarks ? 'user/bookmarks' : 'met'}?${
          metsUserId ? `userId=${metsUserId}` : ''
        }`,
        {
          method: 'GET',
          headers: Api._getAuthorization(Api.token),
        },
      );
      if (response.status !== 200) return;

      const data = await response.json();
      console.log(
        '🚀 ~ file: Profile.tsx:41 ~ getMets ~ data:',
        getBookmarks === 2 ? { data: { data: data?.data?.posts } } : data,
      );

      setData(getBookmarks === 2 ? { data: { data: data?.data?.posts } } : data);
    } catch (error) {
      console.log('🚀 ~ getRatings ~ error:', error);
    }
  };

  useEffect(() => {
    getMets(0);
  }, []);

  return (
    <Animated.FlatList
      key={0}
      numColumns={3}
      windowSize={3}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      className={'flex-1 z-40 bg-white'}
      data={data?.data?.data}
      ListHeaderComponent={
        <>
          <ProfileDescriptionAndStats
            userName={userName}
            userId={metsUserId}
            followers={followers}
            impression={impression}
            metPeople={metPeople}
            description={description}
          />
          <View className="border-[0.5px] border-black-o-10" />
          <ProfilePostTabs activeIndex={activeIndex} onPressTabItem={i => getMets(i)} />
        </>
      }
      renderItem={({ item, index }) => (
        <ProfilePostItem onPress={onPressMet} item={item} index={index} />
      )}
    />
  );
};
export default Profile;
