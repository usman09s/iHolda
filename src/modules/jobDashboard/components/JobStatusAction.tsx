import { View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Button from 'components/Button';

import { AssignedJobStackParamList } from '../AssignedJobStackNavigator';

const JobStatusAction = ({ isJobOwner }: { isJobOwner?: boolean }) => {
  const { navigate } = useNavigation<NavigationProp<AssignedJobStackParamList>>();
  const navigateToScreen = () => {
    navigate(isJobOwner ? 'JobApprovedSuccess' : 'JobCompletedSuccess');
  };

  return (
    <View className={'bg-white rounded-2xl p-6 mb-4 overflow-hidden'}>
      <Button
        onPress={navigateToScreen}
        title={isJobOwner ? 'Approve & close' : 'Complete job'}
        customContainer={`bg-${isJobOwner ? 'darkBlue' : 'black'} rounded-xl mx-6`}
      />
    </View>
  );
};

export default JobStatusAction;
