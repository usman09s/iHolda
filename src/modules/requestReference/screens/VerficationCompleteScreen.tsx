import Header from 'components/Header/Header';
import { View, Text } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import { CustomReferenceButton } from '../components/CustomReferenceButton';
import { height } from 'utils/helpers';
import { text } from 'theme/text';

export const VerificationCompleteScreen = ({ navigation }: any) => {
  const isSmallScreen = height < 700;
  return (
    <View className="px-6 flex-1">
      <Header
        showBackIcon
        centerComponent={
          <Text className={text({ type: 'm16', class: 'mt-2 text-lg' })}>Complete</Text>
        }
      />
      <View className={`flex-1 items-center justify-between ${isSmallScreen ? 'my-16' : 'my-28'}`}>
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
