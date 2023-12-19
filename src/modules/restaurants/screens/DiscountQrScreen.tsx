import {
  ActivityIndicator,
  FlatList,
  Image,
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { SlideInLeft } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, StackActions, useNavigation } from '@react-navigation/native';
import Button from 'components/Button';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import Api from 'services/Api';
import { matchedUserSelector } from 'store/moments/momentsSelectors';
import { text } from 'theme/text';
import { formatDateDifference, units, width } from 'utils/helpers';

import { MatchedUserType } from 'types/MomentsTypes';
import { getImageLink } from 'modules/moments/helpers/imageHelpers';
import { useState } from 'react';
import QRCode from 'react-native-qrcode-svg';

const DiscountQrScreen = ({ route }: any) => {
  const { top, bottom } = useSafeAreaInsets();
  const matchedUser = route?.params.user;
  const [viewHeight, setViewHeight] = useState(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setViewHeight(width);
  };

  const { data } = useQuery('currentUserProfile', Api.getUserProfile0);
  const { dispatch, reset } = useNavigation<NavigationProp<any>>();

  const navigateToRoot = () => {
    dispatch(StackActions.popToTop);
  };

  const onPressRestaurant = () => {
    // RestaurentDetail
    reset({
      index: 1,
      routes: [
        { name: 'BottomTabs' },
        { name: 'RestaurentDetail', params: { item: route.params?.restaurantData } },
      ],
    });
  };

  return (
    <ScrollView
      className="bg-black px-7 pb-6 flex-1"
      contentContainerStyle={{
        paddingTop: top + 16,
        paddingBottom: bottom === 0 ? 16 : bottom,
      }}>
      <Text className={text({ type: 'b44', class: 'text-white mt-10 text-center px-10 mb-3' })}>
        50% OFF
      </Text>
      <Text className={text({ type: 'r14', class: 'text-white text-center px-10 mb-3' })}>
        Scan this code at the restaurant to get 50% OFF with @{matchedUser.userName}
      </Text>
      <View className="flex-row self-center mb-2 mt-4">
        <View className="overflow-hidden border-white rounded-2xl border-4  -rotate-30 ">
          <Image
            source={{ uri: getImageLink(data?.data.user.photo.mediaId) }}
            className="w-16 h-16"
          />
        </View>
        <View className="overflow-hidden border-white  rounded-2xl border-4 -left-8 top-2 rotate-30">
          <Image
            source={{ uri: getImageLink(matchedUser?.photo?.mediaId) }}
            className="w-16 h-16"
          />
        </View>
      </View>

      <View className="bg-white  rounded-2xl px-3 py-6 mt-16 h-[350] mx-5">
        <View onLayout={handleLayout} className="w rounded-xl mt-4 w-full items-center">
          <QRCode size={viewHeight - 50} value={route.params?.qrCode} />
        </View>

        <View className="mt-3">
          <Text className={text({ type: 'r15', class: 'text-center text-black-o-50' })}>
            Scan the QR code to meet me on iHolda
          </Text>
        </View>
      </View>

      <Text className={text({ type: 'r13', class: 'text-center text-white-o-60 mt-5' })}>
        This code is valid for 24 hours and can be used only in the restaurant that you have
        selected.
      </Text>

      <Button
        title="Done"
        type="borderedSolid"
        onPress={onPressRestaurant}
        customContainer="self-center px-10 mt-16"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: { paddingLeft: units.vw * 12 },
  image: { height: units.vh * 30, width: '100%' },
});

export default DiscountQrScreen;
