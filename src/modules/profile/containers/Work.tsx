import { FlatList, Pressable, Text, View } from 'react-native';
import {
  NavigationProp,
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { userCommonInformationSelector, userSelector } from 'store/auth/userSelectors';
import { text } from 'theme/text';
import { height } from 'utils/helpers';

import JobItem from '../components/JobItem';
import JobPostAvatarGroup from '../components/JobPostAvatarGroup';
import MyServices from '../components/MyServices';
import PastJobItem from '../components/profession/PastJobItem';
import UserCommunityStatistic from '../components/UserCommunityStatistic';
import { ProfileStackParamList } from '../ProfileStackNavigator';
import { useQuery } from 'react-query';
import Api from 'services/Api';
import { useEffect, useState } from 'react';
import socketService from 'services/Socket';

const Work = () => {
  const { navigate } = useNavigation<NavigationProp<any>>();
  const [upcomingDropOff, setUpcomingDropOff] = useState<{ data: any[] } | null>(null);
  const { user } = useSelector(userSelector);

  const isFocused = useIsFocused();

  // const { data: upcomingDropOff, isLoading } = useQuery('upcommingDropOff', Api.getPlasticsFuture);

  const getPlasticCounts = (plastics: any) => {
    let count = 0;

    for (let i = 0; i < plastics.length; i++) {
      count += plastics[i].quantity;
    }

    return count;
  };

  const onUpcomingPlastics = (data: any) => setUpcomingDropOff(data.data);

  const onNewPlastic = (data: any) =>
    setUpcomingDropOff(prevDropOffs => ({ data: [data.plastic, ...(prevDropOffs?.data ?? [])] }));

  useEffect(() => {
    if (isFocused)
      socketService.emit('getUpcomingPlastics', {
        userId: user?._id,
      });
  }, [isFocused]);

  useEffect(() => {
    socketService.emit('getUpcomingPlastics', {
      userId: user?._id,
    });

    socketService.on(`getUpcomingPlastics/${user?._id}`, onUpcomingPlastics);
    socketService.on(`newPlastic/${user?._id}`, onNewPlastic);

    return () => {
      socketService.removeListener(`getUpcomingPlastics/${user?._id}`, onUpcomingPlastics);
      socketService.removeListener(`newPlastic/${user?._id}`, onNewPlastic);
    };
  }, []);

  return (
    <View className="flex-1 bg-white pt-6 " style={{ minHeight: height + 200 }}>
      <View className="mt-2">
        <Text className={text({ type: 'r16', class: 'mb-3 px-6 ' })}>Active jobs</Text>
        <FlatList
          horizontal
          data={upcomingDropOff?.data ?? []}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 24 }}
          renderItem={({ item, index }: any) => (
            <JobItem
              count={getPlasticCounts(item.plastics)}
              image={item.user?.photo?.mediaId}
              name={item.user?.userName}
              type={item?.isPlasticAgent ? 'Plastic Agent' : 'User'}
              onPress={() => navigate('PlasticActivityScreen')}
              index={index}
            />
          )}
        />
      </View>
      {upcomingDropOff?.data?.length === 0 ? (
        <Text className={text({ type: 'r12', class: 'mt-1 text-black-o-50 pl-6' })}>
          You have no active jobs.
        </Text>
      ) : null}
      {/* <Pressable
        className="bg-minionYellow py-3 p-6 rounded-3xl mx-6"
        onPress={() => navigate('JobDashboardStack', { screen: 'JobDashboard' })}>
        <View>
          <Text className={text({ type: 'b15' })}>New job requests</Text>
          <Text className={text({ type: 'r12', class: 'mt-1 text-black-o-50' })}>
            Click to view all new jobs
          </Text>
        </View>
        <JobPostAvatarGroup />
      </Pressable>
      <Pressable
        className="bg-lightBlue py-3 p-6 rounded-3xl mx-6 mt-6"
        onPress={() => navigate('JobDashboardStack', { screen: 'PostedJob' })}>
        <View>
          <Text className={text({ type: 'b15' })}>My Posted jobs</Text>
          <Text className={text({ type: 'r12', class: 'mt-1 text-black-o-50' })}>
            Click to view all new jobs
          </Text>
        </View>
        <JobPostAvatarGroup />
      </Pressable>
      <View className="mt-8">
        <Text className={text({ type: 'r16', class: 'mb-3 px-6 ' })}>Current jobs</Text>
        <FlatList
          horizontal
          data={[1, 2, 3]}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 24 }}
          renderItem={({ index }) => (
            <JobItem onPress={() => navigate('AgentPlasticStack')} index={index} />
          )}
        />
      </View>
      <View className="flex-row justify-between bg-gray-300 items-center py-4 mt-7">
        <Text className={text({ type: 'r14', class: 'px-6 ' })}>Your public job profile</Text>
        <Text className={text({ type: 'b16', class: 'px-6 underline' })}>Edit</Text>
      </View>
      <UserCommunityStatistic fullName={fullName} />
      <MyServices />
      <View className="mt-8">
        <Text className={text({ type: 'r16', class: 'mb-3 px-6 ' })}>Past jobs</Text>
        <FlatList
          data={[1, 2, 3, 4, 5]}
          renderItem={() => (
            <Pressable onPress={() => navigate('CompletedJobDetails')}>
              <PastJobItem />
            </Pressable>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 24 }}
        />
      </View> */}
    </View>
  );
};

export default Work;
