import Header from 'components/Header/Header';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { View, Text } from 'react-native';
import { verticalScale } from '../../../utils/helpers';

export const TotalDiscountScreen = () => {
  return (
    <View className="flex-1 px-6">
      <Header showBackIcon />
      <View className="flex-1 items-center justify-center">
        <View style={{ marginBottom: '35%' }}>
          <Text className="text-[36px] font-light text-center">Total</Text>
          <View
            style={{
              height: 170,
              width: 170,
              borderWidth: 6,
              borderColor: 'gray',
              borderRadius: 85,
              justifyContent: 'center',
              marginVertical: verticalScale(20),
            }}>
            <Text className="text-center text-[42px] font-bold text-green-500">800</Text>
            <Text className="text-center text-3xl font-light text-green-500">CFA</Text>
          </View>
          <Text className="text-center">Discount(20%)</Text>
          <Text className="text-center text-red-600 text-3xl font-semibold mt-3">-200CFA</Text>
        </View>
        <View className="mx-10 justify-center items-center" style={{ marginTop: '15%' }}>
          <Text className="text-center text-xs">
            This discount has been applied based on iHolda group discount buy
          </Text>
          <CustomReferenceButton
            title="Next"
            customTextClass={'font-light text-white'}
            customContainerClass={'bg-black border-0 w-44'}
          />
        </View>
      </View>
    </View>
  );
};
