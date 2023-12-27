import Header from 'components/Header/Header';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { View, Text } from 'react-native';
import { height, units, verticalScale } from '../../../utils/helpers';
import { useSelector } from 'react-redux';
import {
  selectCalculatorAmount,
  selectCartpoSettings,
  selectPaymentValue,
  selectSelectedOption,
} from 'store/cartpo/calculateSlice';
import Toast from 'react-native-toast-message';

export const TotalDiscountScreen = ({ navigation, route }: any) => {
  const isSmallScreen = height < 700;
  const selectedOption = useSelector(selectSelectedOption);
  const calculatorAmount = useSelector(selectCalculatorAmount);
  const settingsData = useSelector(selectCartpoSettings);
  const discountPercentage = 50;
  const paymentAmount = parseFloat(calculatorAmount);
  const discountedAmount = (discountPercentage / 100) * paymentAmount;
  console.log(selectedOption);
  const totalAmountAfterDiscount = paymentAmount - discountedAmount;
  const handleNavigation = async () => {
    if (settingsData.setting?.paymentMethod[0].account) {
      try {
        const metId = route.params.metId;
        const response = await fetch('http://ihold.yameenyousuf.com/api/cartpo/discount', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: paymentAmount,
            type: selectedOption === 'direct' ? 'other' : 'cash',
            metId: metId || null,
          }),
        });
        const responseData = await response.json();
        console.log('API response:', responseData);
        if (responseData.message !== 'Topup balance is low') {
          if (selectedOption === 'cash') {
            navigation.navigate('SaleComplete');
          } else {
            navigation.navigate('DirectPayment');
          }
        } else {
          Toast.show({
            type: 'error',
            text1: 'Top up balance is low',
            text2: 'You must have the required amount to make the transaction',
          });
        }
      } catch (error) {
        console.error('API request failed:', error.message);
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'No Payment Account added',
        text2: 'You need to add payment account to make a transaction',
        visibilityTime: 1500,
      });
      return;
    }
  };

  return (
    <View className="flex-1 px-6">
      <Header showBackIcon />
      <View
        className={`flex-1 items-center justify-between`}
        style={{
          marginTop: verticalScale(50),
          marginBottom: isSmallScreen ? verticalScale(60) : verticalScale(90),
        }}>
        <View>
          <Text className="text-[36px] font-light text-center">Total</Text>
          <View
            style={{
              height: units.vw * 43,
              width: units.vw * 43,
              borderWidth: 6,
              borderColor: '#c8c9c9',
              borderRadius: 90,
              justifyContent: 'center',
              marginVertical: verticalScale(20),
            }}>
            <Text className="text-center text-[42px] font-bold text-green-500">
              {totalAmountAfterDiscount.toFixed(1)}
            </Text>
            <Text className="text-center text-3xl font-light text-green-500">CFA</Text>
          </View>
          <Text className="text-center">Discount({discountPercentage}%)</Text>
          <Text className="text-center text-red-600 text-3xl font-semibold mt-3">
            -{discountedAmount.toFixed(1)}CFA
          </Text>
        </View>
        <View className="mx-10 justify-center items-center">
          <Text className="text-center text-xs">
            This discount has been applied based on iHolda group discount buy
          </Text>
          <CustomReferenceButton
            title="Next"
            customTextClass={'font-light text-white'}
            customContainerClass={'bg-black border-0 w-44'}
            onPress={handleNavigation}
          />
        </View>
      </View>
    </View>
  );
};
