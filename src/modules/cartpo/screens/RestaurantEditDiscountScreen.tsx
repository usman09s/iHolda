import CustomHeader from 'components/Header/CustomHeader';
import { Text, View } from 'react-native';
import CustomInputButton from '../components/CustomInputButton';

export const RestaurantEditDiscountScreen = () => {
  return (
    <View className="px-6">
      <CustomHeader showBackIcon centerComponent={<Text>Edit Discount</Text>} />
      <View className="my-10">
        <CustomInputButton placeholder={'Tap to add discount'} index={1} />
        <CustomInputButton placeholder={'Tap to add discount'} index={2} />
        <CustomInputButton placeholder={'Tap to add discount'} index={3} />
        <CustomInputButton placeholder={'Tap to add discount'} index={4} />
      </View>
    </View>
  );
};
