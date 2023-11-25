import Header from 'components/Header/Header';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { View, Text } from 'react-native';

export const DirectPaymentScreen = ({ navigation }: any) => {
  return (
    <View className="flex-1">
      <View className="px-6">
        <Header
          showBackIcon
          centerComponent={<Text className="text-gray-500 font-semibold mt-2">Direct payment</Text>}
        />
      </View>
      <View className="justify-around flex-1 py-6">
        <Text className="text-center text-4xl font-semibold">
          800<Text className="font-light">CFA</Text>
        </Text>
        <View className="jusify-center mb-10">
          <Text className="text-center text-xl text-gray-500">Payment account</Text>
          <Text className="bg-gray-300 text-center text-black text-5xl font-semibold py-5 my-2">
            679391340
          </Text>
          <Text className="text-center text-gray-400 font-semibold">
            Account Provider : <Text className="text-gray-500">MTN</Text>
          </Text>
        </View>
        <CustomReferenceButton
          title="Done"
          customContainerClass={'bg-black border-0 py-3 mx-10 mb-12'}
          customTextClass={'text-white'}
          onPress={() => navigation.navigate('SaleComplete')}
        />
      </View>
    </View>
  );
};
