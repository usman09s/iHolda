import CustomHeader from 'components/Header/CustomHeader';
import { View, Text } from 'react-native';
import CustomInputButton from '../components/CustomInputButton';

export const RestaurantPaymentMethodScreen = () => {
  return (
    <View className="px-6">
      <CustomHeader
        showBackIcon
        centerComponent={<Text className="text-[12] font-bold">Payment method</Text>}
      />
      <View className="my-10">
        <CustomInputButton placeholder={'Tap to add payment method'} index={1} />
        <CustomInputButton placeholder={'Tap to add payment method'} index={2} />
        <CustomInputButton placeholder={'Tap to add payment method'} index={3} />
        <CustomInputButton placeholder={'Tap to add payment method'} index={4} />
      </View>
    </View>
  );
};
