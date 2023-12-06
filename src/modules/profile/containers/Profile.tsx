import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import ProfileDescriptionAndStats from '../components/ProfileDescriptionAndStats';
import ProfilePostItem from '../components/ProfilePostItem';
import ProfilePostTabs from '../components/ProfilePostTabs';
import { useQuery } from 'react-query';
import Api from 'services/Api';

interface Props {
  followers: string;
  impression: string;
  metPeople: string;
  onPressMet?: any;
  metsUserId?: string;
}

const Profile = ({
  followers = '100k',
  impression = '190k',
  metPeople = '19 people',
  metsUserId,
  onPressMet
}: Props) => {
  const { data } = useQuery('usermoments', () => Api.getUserMoments(metsUserId));

  return (
    <Animated.FlatList
      key={0}
      numColumns={3}
      windowSize={3}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      className={'flex-1 z-40 bg-white'}
      data={data?.data.data}
      ListHeaderComponent={
        <>
          <ProfileDescriptionAndStats
            followers={followers}
            impression={impression}
            metPeople={metPeople}
            description=""
          />
          <View className="border-[0.5px] border-black-o-10" />
          <ProfilePostTabs activeIndex={0} onPressTabItem={() => () => null} />
        </>
      }
      renderItem={({ item,index }) => <ProfilePostItem onPress={onPressMet} item={item} index={index} />}
    />
  );
};
export default Profile;
