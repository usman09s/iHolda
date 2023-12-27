import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import Antdesign from '@expo/vector-icons/AntDesign';

import { Text } from 'react-native';
import { text } from 'theme/text';
import Header from 'components/Header/Header';
import { useQuery } from 'react-query';
import Api from 'services/Api';
import { useSelector } from 'react-redux';
import { userSelector } from 'store/auth/userSelectors';
import { getImageLink } from 'modules/moments/helpers/imageHelpers';

const DiscountUserSelect = ({ route, navigation }: any) => {
  const { user } = useSelector(userSelector);
  const { data } = useQuery('userRecentMets', Api.getRecentMets);
  console.log("🚀 ~ file: DiscountUserSelect.tsx:16 ~ DiscountUserSelect ~ data:", data?.data.data)

  const restaurantId = route.params?.restaurantId;
  const qrCode = route.params?.qrCode;

  return (
    <ScrollView style={{ backgroundColor: '#fff', paddingTop: 20, paddingHorizontal: 20 }}>
      <Header showBackIcon title="Select user 2 " />

      <View className="h-10" />

      <Text className={text({ type: 'r12', class: 'mb-5 text-center' })}>
        These are friends which you recently met in the last 7 days. Select anyone of them to obtain
        a shopping discount.
      </Text>

      {data?.data?.data?.map((item: any, i: number) => (
        <View className="flex-row items-center mb-5">
          <Image
            source={{
              uri: getImageLink(item?.user?.photo?.mediaId),
            }}
            resizeMode="cover"
            className="h-14 w-14 rounded-full"
          />

          <Text className={text({ type: 'm18', class: 'ml-2 flex-1' })}>{item?.user.userName}</Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DiscountQrScreen', {
                restaurantId,
                qrCode,
                user: item?.user,
                restaurantData: route.params?.restaurantData,
                metId: item?.metId
              });
            }}
            className="bg-white border-2 rounded-full py-2 px-3">
            <Text className={text({ type: 'r15', class: 'text-black uppercase font-[700]' })}>
              Select
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default DiscountUserSelect;
