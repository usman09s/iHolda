import CustomHeader from 'components/Header/CustomHeader';
import { Text, View } from 'react-native';
import CustomInputButton from '../components/CustomInputButton';

export const RestaurantEditDiscountScreen = ({ navigation }: any) => {
  return (
    <View className="px-6">
      <CustomHeader showBackIcon centerComponent={<Text>Edit Discount</Text>} />
      <View className="my-10">
        <CustomInputButton
          placeholder={'Tap to add discount'}
          index={1}
          onPress={() => navigation.navigate('RestaurantAddDiscount')}
        />
        <CustomInputButton
          placeholder={'Tap to add discount'}
          index={2}
          onPress={() => navigation.navigate('RestaurantAddDiscount')}
        />
        <CustomInputButton
          placeholder={'Tap to add discount'}
          index={3}
          onPress={() => navigation.navigate('RestaurantAddDiscount')}
        />
        <CustomInputButton
          placeholder={'Tap to add discount'}
          index={4}
          onPress={() => navigation.navigate('RestaurantAddDiscount')}
        />
      </View>
    </View>
  );
};
