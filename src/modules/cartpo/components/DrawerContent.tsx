import CustomProfileAvatar from 'components/CustomProfileAvatar';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BadgeIcon, DiscountIcon, UsersIcon } from '../../../../assets/referralGift';

const menuItems = [
  { icon: <Icon name="location-outline" size={25} color="#525763" />, label: 'Settings' },
  { icon: <BadgeIcon />, label: 'Edit Menu' },
  { icon: <Icon name="card-outline" size={25} color="#525763" />, label: 'Payment Methods' },
  { icon: <DiscountIcon />, label: 'Discounts' },
  { icon: <UsersIcon />, label: 'Reviews' },
];

export const DrawerContent = () => {
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
          style={{ borderBottomWidth: 0.2, borderColor: 'gray' }}>
          {item.icon}
          <Text className="text-lg font-bold text-[#525763] ml-2">{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
