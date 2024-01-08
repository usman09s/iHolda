import { Image, ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from 'components/Button';
import { useSelector } from 'react-redux';
import { userSelector } from 'store/auth/userSelectors';
import { text } from 'theme/text';
import { getImageLink } from 'modules/moments/helpers/imageHelpers';

const ReferralCodeSuccessfulScreen = ({ route }: any) => {
  const userData = route.params?.result?.data;

  const { navigate }: any = useNavigation();
  const userImage = useSelector(userSelector);

  return (
    <View className="flex-1 bg-blue justify-evenly px-7">
      <ScrollView className="flex-1" contentContainerStyle={{ flex: 1 }}>
        <View className="flex-1 justify-evenly ">
          <View>
            <Text className={text({ type: 'm48', class: 'text-center text-white-o-70 mb-8' })}>
              All Done!
            </Text>
            <View className="flex-row self-center mb-20">
              <View className="overflow-hidden border-white rounded-3xl border-4  -rotate-30 ">
                <Image
                  source={{
                    uri: userImage.userImage
                      ? userImage.userImage
                      : getImageLink(userImage.user?.photo?.mediaId),
                  }}
                  className="w-28 h-28"
                />
              </View>
              <View className="overflow-hidden border-white  rounded-3xl border-4   -left-8 top-2 rotate-30">
                <Image
                  source={{ uri: getImageLink(userData?.referralUser?.photo?.mediaId) }}
                  className="w-28 h-28"
                />
              </View>
            </View>
          </View>
          <View className="mb-5 bg-slate-300 py-5 px-2 rounded-2xl">
            <Text className={text({ class: 'text-black-o-80 text-center', type: 'r12' })}>
              @{userData?.referralUser?.userName} invited you so you both will receive
            </Text>
            <View className="mt-7 flex-row items-center">
              <View className="overflow-hidden rounded-full border-4 border-white">
                <Image
                  source={{ uri: getImageLink(userData?.referralUser?.photo?.mediaId) }}
                  className="w-14 h-14 "
                />
              </View>
              <View
                style={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,

                  elevation: 2,
                }}
                className="px-7 py-2 rounded-full bg-yellow-300 ml-4">
                <Text className={text({ type: 'b20' })}>500cfa</Text>
              </View>
            </View>
            <View className="mb-5 flex-row items-center justify-end">
              <View
                style={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,

                  elevation: 2,
                }}
                className="px-10 py-2 rounded-full bg-[#c3edc5] mr-4">
                <Text className={text({ type: 'b20', class: 'text-[#4e5f4f]' })}>25cp</Text>
              </View>
              <View className="overflow-hidden rounded-full border-4 border-white">
                <Image
                  source={{
                    uri: userImage.userImage
                      ? userImage.userImage
                      : getImageLink(userImage.user?.photo?.mediaId),
                  }}
                  className="w-14 h-14"
                />
              </View>
            </View>
          </View>
          <Button
            title="Close"
            customContainer="self-center"
            type="borderedSolid"
            extraStyles={{ borderWidth: 5, borderColor: 'white', width: 180 }}
            onPress={() => navigate('PlasticStack', {
              screen: 'Plastic',
              params: {
                shouldNotLoggedIn: true
              },
            })}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ReferralCodeSuccessfulScreen;
