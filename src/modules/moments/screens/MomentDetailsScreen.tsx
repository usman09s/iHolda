import { View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Header from 'components/Header/Header';

import { MomentsStackParamList } from '../MomentsStackNavigator';

const MomentDetailsScreen = () => {
  const {} = useNavigation<NavigationProp<MomentsStackParamList>>();

  return (
    <View className="flex-1">
      <View className="bg-black px-7 pb-6">
        <Header showBackIcon />
      </View>
    </View>
  );
};

export default MomentDetailsScreen;
