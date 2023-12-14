import CustomHeader from 'components/Header/CustomHeader';
import { View, Text } from 'react-native';
import CustomInputButton from '../components/CustomInputButton';
import { useSelector } from 'react-redux';
import { selectCartpoSettings } from 'store/cartpo/calculateSlice';

export const RestaurantPaymentMethodScreen = ({ navigation }: any) => {
  const settingsData = useSelector(selectCartpoSettings);
  return (
    <View className="px-6">
      <CustomHeader
        showBackIcon
        centerComponent={<Text className="text-[12] font-bold">Payment method</Text>}
      />
      <View className="my-10">
        <CustomInputButton
          placeholder={'Tap to add payment method'}
          index={1}
          onPress={() =>
            navigation.navigate('RestaurantAddPayment', {
              accountData: settingsData.setting.paymentMethod[0]
                ? settingsData.setting.paymentMethod[0]
                : null,
            })
          }
          text={
            settingsData.setting.paymentMethod[0]?.accountType
              ? settingsData.setting.paymentMethod[0]?.accountType
              : null
          }
        />
        <CustomInputButton
          placeholder={'Tap to add payment method'}
          index={2}
          onPress={() =>
            navigation.navigate('RestaurantAddPayment', {
              accountData: settingsData.setting.paymentMethod[1]
                ? settingsData.setting.paymentMethod[1]
                : null,
            })
          }
          text={
            settingsData.setting.paymentMethod[1]?.bank
              ? settingsData.setting.paymentMethod[1]?.bank
              : null
          }
        />
        <CustomInputButton
          placeholder={'Tap to add payment method'}
          index={3}
          onPress={() =>
            navigation.navigate('RestaurantAddPayment', {
              accountData: settingsData.setting.paymentMethod[2]
                ? settingsData.setting.paymentMethod[2]
                : null,
            })
          }
          text={
            settingsData.setting.paymentMethod[2]?.bank
              ? settingsData.setting.paymentMethod[2]?.bank
              : null
          }
        />
        <CustomInputButton
          placeholder={'Tap to add payment method'}
          index={4}
          onPress={() =>
            navigation.navigate('RestaurantAddPayment', {
              accountData: settingsData.setting.paymentMethod[3]
                ? settingsData.setting.paymentMethod[3]
                : null,
            })
          }
          text={
            settingsData.setting.paymentMethod[3]?.bank
              ? settingsData.setting.paymentMethod[3]?.bank
              : null
          }
        />
      </View>
    </View>
  );
};
