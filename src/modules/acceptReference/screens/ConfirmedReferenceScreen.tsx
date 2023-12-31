import Header from 'components/Header/Header';
import { View, Text } from 'react-native';
import { text } from 'theme/text';
import Octicons from 'react-native-vector-icons/Octicons';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { height } from 'utils/helpers';

export const ConfirmedReferenceScreen = ({ navigation, route }: any) => {
  const isSmallScreen = height < 700;
  const { type } = route.params;
  return (
    <View className="px-6 flex-1">
      <Header
        showBackIcon
        centerComponent={
          <Text className={text({ type: 'm16', class: 'mt-2 text-lg' })}>Complete</Text>
        }
      />
      <View className={`flex-1 items-center justify-between ${isSmallScreen ? 'my-20' : 'my-28'}`}>
        {type === 'accept' ? (
          <Text className="text-black text-4xl font-bold">All Done!!</Text>
        ) : (
          <Text className="text-black text-4xl font-bold">Denied</Text>
        )}
        {type === 'accept' ? (
          <Octicons name="check-circle-fill" color="#00d34e" size={100} />
        ) : (
          <Octicons name="x-circle-fill" color="#c2000d" size={100} />
        )}
        {type === 'accept' ? (
          <Text className="text-center mx-4 text-black">
            Thanks for verifying @username reference
          </Text>
        ) : (
          <Text className="text-center mx-4 text-black">You rejected @username's reference</Text>
        )}
        <CustomReferenceButton
          title={'Close'}
          customContainerClass={'bg-black border-0 px-10 ml-4 py-2'}
          customTextClass={'text-white text-sm py-0 my-0 font-normal'}
          onPress={() => navigation.navigate('BottomTabs', { screen: 'ActivityStack' })}
        />
      </View>
    </View>
  );
};
