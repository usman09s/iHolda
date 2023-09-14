import { Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Button from 'components/Button';
import { useQuery } from 'react-query';
import Api from 'services/Api';

import { ProfileStackParamList } from '../ProfileStackNavigator';

const ProfileScreen = () => {
  const { navigate } = useNavigation<NavigationProp<ProfileStackParamList>>();
  const agentUser = useQuery('agentUser', Api.checkUserIsAgent);

  return (
    <View className="flex-1 justify-center items-center">
      <Text>Profile Screen</Text>
      {agentUser.data?.isAgent && (
        <Button
          title="Go to Agent"
          customContainer="px-8 mt-4"
          onPress={() => navigate('AgentPlasticStack')}
        />
      )}
    </View>
  );
};

export default ProfileScreen;
