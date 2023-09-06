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

const PlasticQRCodeScreen = () => {
  const { params } = useRoute<RouteProp<PlasticStackParamList, 'PlasticQRCode'>>();
  const { dispatch } = useNavigation<NavigationProp<PlasticStackParamList>>();

  return (
    <ScrollView className="bg-milkWhite">
      <View className="px-7 flex-1">
        <Header title="Go to drop off location" />
        <Text className={text({ type: 'l13', class: 'mb-2 mt-12' })}>
          Your drop off location is {params.plasticInformation.id}
        </Text>
        <DropOffLocationItem
          onPressLocation={() => null}
          location={params.plasticInformation.dropoff_location}
        />
        <Pressable
          onPress={() => {
            dispatch(StackActions.pop(2));
          }}>
          <Text className={text({ type: 'r12', class: 'text-right' })}>Change</Text>
        </Pressable>
        <Text className={text({ type: 'l13', class: 'mt-12 mb-7 text-center' })}>
          Present your QR code at drop off location{' '}
        </Text>
        <View style={{ width: width - 32, height: width - 32 }} className="self-center">
          <Image
            resizeMode="stretch"
            className="w-full h-full border-[10px] rounded-xl self-center"
            source={{ uri: params?.plasticInformation?.qr_code }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default PlasticQRCodeScreen;
