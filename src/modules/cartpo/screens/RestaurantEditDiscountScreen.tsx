import CustomHeader from 'components/Header/CustomHeader';
import { Text, View } from 'react-native';
import CustomInputButton from '../components/CustomInputButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartpoSettings, setSelectedDiscount } from 'store/cartpo/calculateSlice';

export const RestaurantEditDiscountScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const restaurantData = useSelector(selectCartpoSettings);
  return (
    <View className="px-6">
      <CustomHeader showBackIcon centerComponent={<Text>Edit Discount</Text>} />
      <View className="my-10">
        <CustomInputButton
          placeholder={
            restaurantData.setting.discounts[0]
              ? restaurantData.setting.discounts[0].percentage + '%'
              : 'Tap to add discount'
          }
          index={1}
          onPress={() => {
            if (restaurantData.setting.discounts[0]) {
              dispatch(setSelectedDiscount(restaurantData.setting.discounts[0]));
            }
            navigation.navigate('RestaurantAddDiscount');
          }}
        />
        <CustomInputButton
          placeholder={
            restaurantData.setting.discounts[1]
              ? restaurantData.setting.discounts[1].percentage + '%'
              : 'Tap to add discount'
          }
          index={2}
          onPress={() => {
            if (restaurantData.setting.discounts[1]) {
              dispatch(setSelectedDiscount(restaurantData.setting.discounts[1]));
            }
            navigation.navigate('RestaurantAddDiscount');
          }}
        />
        <CustomInputButton
          placeholder={
            restaurantData.setting.discounts[2]
              ? restaurantData.setting.discounts[2].percentage + '%'
              : 'Tap to add discount'
          }
          index={3}
          onPress={() => {
            if (restaurantData.setting.discounts[2]) {
              dispatch(setSelectedDiscount(restaurantData.setting.discounts[2]));
            }
            navigation.navigate('RestaurantAddDiscount');
          }}
        />
        <CustomInputButton
          placeholder={
            restaurantData.setting.discounts[3]
              ? restaurantData.setting.discounts[3].percentage + '%'
              : 'Tap to add discount'
          }
          index={4}
          onPress={() => {
            if (restaurantData.setting.discounts[3]) {
              dispatch(setSelectedDiscount(restaurantData.setting.discounts[3]));
            }
            navigation.navigate('RestaurantAddDiscount');
          }}
        />
      </View>
    </View>
  );
};
