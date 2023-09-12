import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Header from 'components/Header/Header';
import Icons from 'components/Icons';
import { useQuery } from 'react-query';
import Api from 'services/Api';
import { text } from 'theme/text';

import { MomentsStackParamList } from '../MomentsStackNavigator';

const MomentsQRCodeScreen = () => {
  const { goBack } = useNavigation<NavigationProp<MomentsStackParamList>>();
  const { data, isLoading } = useQuery('currentUserProfile', Api.getUserProfile);

  return (
    <ScrollView className="bg-black px-7 pb-6 flex-1" contentContainerStyle={{ flex: 1 }}>
      <Header
        showBackIcon
        backIconColor="white"
        onPressRight={goBack}
        rightComponent={<Icons.ScanQrCodeIcon />}
      />
      <View className="bg-white  rounded-2xl px-7 py-6 mt-7">
        <View className="flex-row items-center">
          <Image
            className="h-14 w-14 rounded-full mr-2"
            source={{ uri: data?.user_profile_image.image }}
          />
          <Text className={text({ type: 'b16' })}>{data?.user.username}</Text>
          <Icons.SmallVerifiedCircleIcon className="mb-2" />
        </View>
        <View className="h-[300px] rounded-xl mt-4 ">
          {isLoading ? (
            <ActivityIndicator size={'small'} />
          ) : (
            <Image source={{ uri: data?.qr_code }} className="h-full w-full" resizeMode="contain" />
          )}
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
