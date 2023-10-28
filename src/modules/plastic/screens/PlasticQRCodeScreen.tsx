import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import {
  NavigationProp,
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Header from 'components/Header/Header';
import { text } from 'theme/text';
import { width } from 'utils/helpers';

import DropOffLocationItem from '../components/DropOffLocationItem';
import { PlasticStackParamList } from '../PlasticStackNavigator';
import QRCode from 'react-native-qrcode-svg';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserPlasticDataState } from 'store/plastic/userPlasticSlice';

const PlasticQRCodeScreen = () => {
  const { params } = useRoute<RouteProp<PlasticStackParamList, 'PlasticQRCode'>>();
  const userPlasticData = useSelector(selectUserPlasticDataState);
  const { dispatch } = useNavigation<NavigationProp<PlasticStackParamList>>();
  console.log(userPlasticData.plasticQrCode);
  const [id, setId] = useState(userPlasticData.plasticQrCode);

  return (
    <ScrollView className="bg-milkWhite">
      <View className="px-7 flex-1">
        <Header title="Go to drop off location" />
        <Text className={text({ type: 'l13', class: 'mb-2 mt-12' })}>
          Your drop off location is
        </Text>
        <DropOffLocationItem onPressLocation={() => console.log('Something')} />
        <Pressable
          onPress={() => {
            dispatch(StackActions.pop(2));
          }}>
          <Text className={text({ type: 'r12', class: 'text-right' })}>Change</Text>
        </Pressable>
        <Text className={text({ type: 'l13', class: 'mt-12 mb-7 text-center' })}>
          Present your QR code at drop off location{' '}
        </Text>
        <View className="self-center">
          {/* <Image
            resizeMode="stretch"
            className="w-full h-full border-[7px] rounded-xl self-center"
            source={{ uri: params?.plasticInformation?.qr_code }}
          /> */}
          <QRCode value={id} size={300} />
        </View>
      </View>
    </ScrollView>
  );
};

export default PlasticQRCodeScreen;
