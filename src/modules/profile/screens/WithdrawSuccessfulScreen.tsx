import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

export const WithdrawSuccessfulScreen = ({ navigation, route }: any) => {
  return (
    <View className="px-6 py-28 items-center justify-between flex-1">
      <View>
        <Text className="mb-8 text-black">Withdraw successful</Text>
        <Icon
          name="check-circle-fill"
          style={{ textAlign: 'center' }}
          color={'#01a201'}
          size={54}
        />
      </View>
      <View>
        <Text className="text-center text-2xl font-bold py-2">Amount</Text>
        <View
          className="w-80 h-20 rounded-full items-center justify-center"
          style={{ borderWidth: 1.5, borderColor: 'black' }}>
          <Text className="text-black text-center text-2xl font-bold">{route.params?.withdrawAmmount}cfa</Text>
        </View>
        <Text className="mx-3 pt-2 text-center">
          The amount withdrawn will be credited to the withdrawal account you have provided
        </Text>
      </View>
      <View className="mt-12">
        <CustomReferenceButton
          title={'Close'}
          customContainerClass={'bg-black border-0 px-12 ml-4 py-3'}
          customTextClass={'text-white text-sm py-0 my-0 font-normal'}
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
    </View>
  );
};
