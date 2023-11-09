import Header from 'components/Header/Header';
import { View, Text, ScrollView } from 'react-native';
import { text } from 'theme/text';
import StatusBarItem from '../components/StatusBarItem';

export const RequestReferenceSummaryScreen = ({ navigation }: any) => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="px-6">
        <Header showBackIcon={true} title="Verification" />
      </View>
      <View className="mt-16 mb-16">
        <Text className={'text-7xl text-center font-bold'}>10%</Text>
        <Text className={text({ type: 'b18', class: 'text-center text-black mx-6 ' })}>
          Complete
        </Text>
      </View>
      <View className="px-4">
        <StatusBarItem status={'completed'} title={'Registration'} />
        <StatusBarItem
          status={'pending'}
          title={'Basic verification'}
          onPress={() => navigation.navigate('BasicVerificationOne')}
        />
        <StatusBarItem status={'pending'} title={'Community verification'} />
        <StatusBarItem status={'pending'} title={'ID verification'} />
        <StatusBarItem status={'pending'} title={'After 1 year anniversary assessment'} />
      </View>
    </ScrollView>
  );
};
