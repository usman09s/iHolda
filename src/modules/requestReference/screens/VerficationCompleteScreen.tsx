import Header from 'components/Header/Header';
import { View, Text, TextInput, FlatList } from 'react-native';
import { text } from 'theme/text';
import Octicons from 'react-native-vector-icons/Octicons';
import { CustomReferenceButton } from '../components/CustomReferenceButton';

export const VerificationCompleteScreen = ({ navigation }: any) => {
  return (
    <View className="px-6 flex-1">
      <Header showBackIcon title="Complete" />
      <View className="flex-1 items-center justify-between my-28">
        <Text className="text-black text-4xl font-bold">All Done!!</Text>
        <Octicons name="check-circle-fill" color="#00d34e" size={100} />
        <Text className="text-center mx-4 text-gray-500">
          Your information have now been submitted. The two friends you provided as reference will
          have to confirm your details
        </Text>
        <CustomReferenceButton title="Close" onPress={() => navigation.navigate('Summary')} />
      </View>
    </View>
  );
};
