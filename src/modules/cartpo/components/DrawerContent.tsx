import CustomProfileAvatar from 'components/CustomProfileAvatar';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BadgeIcon, DiscountIcon, UsersIcon } from '../../../../assets/referralGift';
import { useNavigation } from '@react-navigation/native';

const menuItems = [
  {
    icon: <Icon name="location-outline" size={25} color="#525763" />,
    label: 'Settings',
    route: 'RestaurantSettings',
  },
  { icon: <BadgeIcon />, label: 'Edit Menu', route: 'RestaurantEditMenu' },
  {
    icon: <Icon name="card-outline" size={25} color="#525763" />,
    label: 'Payment Methods',
    route: 'RestaurantPaymentMethod',
  },
  { icon: <DiscountIcon />, label: 'Discounts', route: 'RestaurantEditDiscount' },
  { icon: <UsersIcon />, label: 'Reviews' },
];

export const DrawerContent = () => {
  const navigation = useNavigation();
  return (
    <View className="my-12 mx-6">
      <View className="flex-row items-center mb-6">
        <CustomProfileAvatar name="Something" size={50} />
        <Text className="text-base font-bold ml-3">Restaurant name</Text>
      </View>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          className="flex-row items-center mt-3 py-1"
          style={{ borderBottomWidth: 0.2, borderColor: 'gray' }}
          onPress={() =>
            item.route ? navigation.navigate('CartpoStack', { screen: item.route }) : null
          }>
          {item.icon}
          <Text className="text-lg font-bold text-[#525763] ml-2">{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
