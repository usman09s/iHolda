import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserWaitListScreen = () => {
  const {} = useNavigation();

  return (
    <View className="pt-10 bg-petrol flex-1 px-7 justify-center">
      <Text>UserWaitListScreen</Text>
    </View>
  );
};

export default UserWaitListScreen;
