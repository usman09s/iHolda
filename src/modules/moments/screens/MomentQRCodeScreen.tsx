import { ActivityIndicator, Image, LayoutChangeEvent, ScrollView, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Header from 'components/Header/Header';
import Icons from 'components/Icons';
import { useQuery } from 'react-query';
import Api from 'services/Api';
import { text } from 'theme/text';
import QRCode from 'react-native-qrcode-svg';

import { MomentsStackParamList } from '../MomentsStackNavigator';
import { useState } from 'react';
import { getImageLink } from '../helpers/imageHelpers';

const MomentsQRCodeScreen = () => {
  const [viewHeight, setViewHeight] = useState(0);
  const { goBack } = useNavigation<NavigationProp<MomentsStackParamList>>();
  const { data, isLoading } = useQuery('currentUserProfile', Api.getUserProfile0);

  const profilePhoto = data?.data.user.photo.mediaId;
  const qrCode = data?.data.user.userQrCode;
  const username = data?.data.user.userName;

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setViewHeight(width);
  };

  return (
    <ScrollView className="bg-black px-7 pb-6 flex-1" contentContainerStyle={{ flex: 1 }}>
      <Header
        showBackIcon
        backIconColor="white"
        onPressRight={goBack}
        rightComponent={<Icons.ScanQrCodeIcon />}
      />
      <View className="bg-white  rounded-2xl px-7 py-6 mt-16">
        <View className="flex-row items-center">
          {profilePhoto ? (
            <Image className="h-14 w-14 rounded-full mr-2" source={{ uri: getImageLink(profilePhoto) }} />
          ) : null}
          <Text className={text({ type: 'b16' })}>{username}</Text>
          <Icons.SmallVerifiedCircleIcon className="mb-2" />
        </View>
        <View onLayout={handleLayout} className="w rounded-xl mt-4 w-full">
          {isLoading ? <ActivityIndicator size={'small'} /> : <QRCode size={viewHeight} value={qrCode} />}
        </View>

        <View className="mt-3">
          <Text className={text({ type: 'r15', class: 'text-center text-black-o-50' })}>
            Scan the QR code to meet me on iHolda
          </Text>
          <Text className={text({ type: 'b18', class: 'text-center text-black-o-50 mt-4' })}>
            iHolda
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default MomentsQRCodeScreen;
