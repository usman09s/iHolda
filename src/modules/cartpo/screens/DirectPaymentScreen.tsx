import Header from 'components/Header/Header';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { selectCalculatorAmount, selectCartpoSettings } from 'store/cartpo/calculateSlice';

export const DirectPaymentScreen = ({ navigation, route }: any) => {
  const settingsData = useSelector(selectCartpoSettings);
  const calculatorAmount = useSelector(selectCalculatorAmount);
  const discountPercentage = 50;
  const paymentAmount = parseFloat(calculatorAmount);
  const discountedAmount = (discountPercentage / 100) * paymentAmount;
  const totalAmountAfterDiscount = paymentAmount - discountedAmount;
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
          {totalAmountAfterDiscount}
          <Text className="font-light">CFA</Text>
        </Text>
        <View className="jusify-center mb-10">
          <Text className="text-center text-xl text-gray-500">Payment account</Text>
          <Text className="bg-gray-300 text-center text-black text-5xl font-semibold py-5 my-2">
            {settingsData.setting?.paymentMethod[0].account
              ? settingsData.setting?.paymentMethod[0].account
              : 'No Account Added'}
          </Text>
          <Text className="text-center text-gray-400 font-semibold">
            Account Provider :{' '}
            <Text className="text-gray-500">
              {settingsData.setting?.paymentMethod[0].accountType
                ? settingsData.setting?.paymentMethod[0].accountType
                : 'MTN'}
            </Text>
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
