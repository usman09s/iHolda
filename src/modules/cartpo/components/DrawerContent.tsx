import CustomProfileAvatar from 'components/CustomProfileAvatar';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BadgeIcon, DiscountIcon, UsersIcon } from '../../../../assets/referralGift';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectCartpoSettings } from '../../../store/cartpo/calculateSlice';
import { getImageLink } from 'modules/moments/helpers/imageHelpers';

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
  const restaurantData = useSelector(selectCartpoSettings);
  return (
    <View className="my-12 mx-6">
      <View className="flex-row items-center mb-6">
        <CustomProfileAvatar
          name={
            restaurantData?.setting?.shop?.name
              ? restaurantData.setting.shop.name
              : 'Restaurant name'
          }
          size={50}
          photo={getImageLink(restaurantData.setting.shop.photos[0].mediaId)}
        />
        <Text className="text-base font-bold ml-3">
          {restaurantData?.setting?.shop?.name
            ? restaurantData.setting.shop.name
            : 'Restaurant name'}
        </Text>
      </View>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          className="flex-row items-center mt-5 pb-3"
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
