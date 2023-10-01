import { FlatList, Pressable, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { userCommonInformationSelector } from 'store/auth/userSelectors';
import { text } from 'theme/text';
import { height } from 'utils/helpers';

import JobItem from '../components/JobItem';
import JobPostAvatarGroup from '../components/JobPostAvatarGroup';
import MyServices from '../components/MyServices';
import PastJobItem from '../components/profession/PastJobItem';
import UserCommunityStatistic from '../components/UserCommunityStatistic';
import { ProfileStackParamList } from '../ProfileStackNavigator';

const Work = () => {
  const { fullName } = useSelector(userCommonInformationSelector);
  const { navigate } = useNavigation<NavigationProp<ProfileStackParamList>>();

  return (
    <View className="flex-1 bg-white pt-6 " style={{ minHeight: height + 200 }}>
      <View className="bg-minionYellow py-3 p-6 rounded-3xl mx-6">
        <View>
          <Text className={text({ type: 'b15' })}>New job requests</Text>
          <Text className={text({ type: 'r12', class: 'mt-1 text-black-o-50' })}>
            Click to view all new jobs
          </Text>
        </View>
        <JobPostAvatarGroup />
      </View>
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
      </View>
    </View>
  );
};

export default Work;
