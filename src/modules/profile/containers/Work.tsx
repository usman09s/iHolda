import { FlatList, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { text } from 'theme/text';
import { height } from 'utils/helpers';

import JobItem from '../components/JobItem';
import JobPostAvatarGroup from '../components/JobPostAvatarGroup';
import PastJobItem from '../components/PastJobItem';
import { ProfileStackParamList } from '../ProfileStackNavigator';

const Work = () => {
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
      <View className="mt-8">
        <Text className={text({ type: 'r16', class: 'mb-3 px-6 ' })}>Past jobs</Text>
        <FlatList
          data={[1, 2, 3, 4, 5]}
          renderItem={() => <PastJobItem />}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 24 }}
        />
      </View>
    </View>
  );
};

export default Work;
