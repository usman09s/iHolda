import CustomHeader from 'components/Header/CustomHeader';
import { View, Text } from 'react-native';
import CustomInputButton from '../components/CustomInputButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartpoSettings, setSelectedPayment } from 'store/cartpo/calculateSlice';
import { useFocusEffect } from '@react-navigation/native';

export const RestaurantPaymentMethodScreen = ({ navigation }: any) => {
  const settingsData = useSelector(selectCartpoSettings);
  const dispatch = useDispatch();
  const handlePressPaymentMethod = index => {
    if (settingsData.setting.paymentMethod[index]) {
      dispatch(setSelectedPayment(settingsData.setting.paymentMethod[index]));
      navigation.navigate('RestaurantAddPayment');
    } else {
      dispatch(setSelectedPayment([]));
      navigation.navigate('RestaurantAddPayment');
    }
  };

  useFocusEffect(() => {
    dispatch(setSelectedPayment([]));
  });

  return (
    <View className="px-6">
      <CustomHeader
        showBackIcon
        centerComponent={<Text className="text-[12] font-bold">Payment method</Text>}
      />
      <View className="my-10">
        {[0, 1, 2, 3].map(index => (
          <CustomInputButton
            key={index}
            placeholder={'Tap to add payment method'}
            index={index + 1}
            onPress={() => handlePressPaymentMethod(index)}
            text={
              settingsData.setting.paymentMethod[index]?.bank
                ? settingsData.setting.paymentMethod[index]?.bank
                : null
            }
          />
        ))}
      </View>
    </View>
  );
};
