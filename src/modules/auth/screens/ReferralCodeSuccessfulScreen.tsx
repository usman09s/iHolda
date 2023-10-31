import { Image, ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from 'components/Button';
import { useSelector } from 'react-redux';
import { profileImageSelector } from 'store/auth/userSelectors';
import { text } from 'theme/text';

const ReferralCodeSuccessfulScreen = () => {
  const { navigate } = useNavigation();
  const userImage = useSelector(profileImageSelector);

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
                <Image source={{ uri: userImage }} className="w-28 h-28" />
              </View>
              <View className="overflow-hidden border-white  rounded-3xl border-4   -left-8 top-2 rotate-30">
                <Image source={{ uri: 'https://i.pravatar.cc/150?img=33' }} className="w-28 h-28" />
              </View>
            </View>
          </View>
          <View className="mb-5 bg-slate-300 py-5 px-2 rounded-2xl">
            <Text className={text({ class: 'text-black-o-80 text-center', type: 'r12' })}>
              @naturesbreath invited you so you both will receive
            </Text>
            <View className="mt-7 flex-row items-center">
              <View className="overflow-hidden rounded-full border-4 border-white">
                <Image
                  source={{ uri: 'https://i.pravatar.cc/150?img=33' }}
                  className="w-14 h-14 "
                />
              </View>
              <View className="px-7 py-2 rounded-full bg-yellow-300 ml-4">
                <Text className={text({ type: 'b20' })}>500cfa</Text>
              </View>
            </View>
            <View className="mb-5 flex-row items-center justify-end">
              <View className="px-10 py-2 rounded-full bg-yellow-300 mr-4">
                <Text className={text({ type: 'b20' })}>500cfa</Text>
              </View>
              <View className="overflow-hidden rounded-full border-4 border-white">
                <Image source={{ uri: userImage }} className="w-14 h-14" />
              </View>
            </View>
          </View>
          <Button
            title="Close"
            customContainer="self-center"
            type="borderedSolid"
            extraStyles={{ borderWidth: 5, borderColor: 'white', width: 180 }}
            onPress={() => navigate('PlasticStack')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ReferralCodeSuccessfulScreen;
