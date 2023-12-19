import Header from 'components/Header/Header';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { text } from 'theme/text';
import StatusBarItem from '../components/StatusBarItem';
import { height } from 'utils/helpers';
import { selectUser } from 'store/userDataSlice';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

export const RequestReferenceSummaryScreen = ({ navigation }: any) => {
  const userData = useSelector(selectUser);
  const referenceUsers = userData?.basicVerification?.referenceUsers;
  const isSmallScreen = height < 700;
  const areAllUsersRejected =
    referenceUsers && referenceUsers.every(user => user.status === 'rejected');
  const areAllUsersAccepted =
    referenceUsers && referenceUsers.every(user => user.status === 'accepted');

  const handleToastShow = () => {
    if (areAllUsersAccepted) {
      Toast.show({
        type: 'success',
        text1: 'You are already a verified user.',
        visibilityTime: 1800,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Please wait for all the users to respond.',
        text2: 'You already have a basic verification pending.',
        visibilityTime: 1800,
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="px-6">
        <Header
          showBackIcon
          centerComponent={
            <Text className={text({ type: 'm16', class: 'mt-2 text-lg' })}>Verification</Text>
          }
        />
      </View>
      <View className={`mt-16 ${isSmallScreen ? 'mb-8' : 'mb-16'}`}>
        <Text className={'text-7xl text-center font-bold tracking-tighter'}>1O%</Text>
        <Text className={text({ type: 'b18', class: 'text-center text-black mx-6' })}>
          Complete
        </Text>
      </View>
      <View className={`px-4 ${isSmallScreen ? 'pb-8' : ''}`}>
        <StatusBarItem status={'completed'} title={'Registration'} />
        <StatusBarItem
          status={
            userData.basicVerification !== null && userData.basicVerification.isVerified === false
              ? 'pending'
              : 'completed'
          }
          title={'Basic verification'}
          onPress={() => {
            if (areAllUsersRejected || userData.basicVerification === null) {
              navigation.navigate('BasicVerificationOne');
            } else {
              handleToastShow();
            }
          }}
        />
        <StatusBarItem title={'Community verification'} />
        <StatusBarItem title={'ID verification'} />
        <StatusBarItem title={'After 1 year anniversary assessment'} />
      </View>
    </ScrollView>
  );
};
