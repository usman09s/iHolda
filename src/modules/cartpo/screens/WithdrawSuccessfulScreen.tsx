import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import { height } from 'utils/helpers';

export const WithdrawSuccessfulScreen = ({ navigation }: any) => {
  const isSmallScreen = height < 700;
  return (
    <View
      className={`px-6 items-center justify-between flex-1 ${isSmallScreen ? 'py-20' : 'py-24'}`}>
      <View>
        <Text className="mb-8">Withdrawal successful</Text>
        <Icon
          name="check-circle-fill"
          style={{ textAlign: 'center' }}
          color={'#00a301'}
          size={54}
        />
      </View>
      <View>
        <Text className="text-center text-2xl font-bold py-2">Amount</Text>
        <View
          className="w-80 h-20 rounded-full items-center justify-center"
          style={{ backgroundColor: '#004655' }}>
          <Text className="text-white text-center text-2xl font-bold">2500cfa</Text>
        </View>
        <Text className="mx-4 pt-2 text-center">
          2500cfa will be credited to the withdrawal account you have provided.
        </Text>
      </View>
      <View className="mt-12">
        <CustomReferenceButton
          title={'Close'}
          customContainerClass={'bg-black border-0 px-12 ml-4 py-3'}
          customTextClass={'text-white text-sm py-0 my-0 font-normal'}
          onPress={() => navigation.navigate('BottomTabs', { screen: 'ActivityStack' })}
        />
      </View>
    </View>
  );
};
