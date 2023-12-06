import { useNavigation } from '@react-navigation/native';
import CustomProfileAvatar from 'components/CustomProfileAvatar';
import { getImageLink } from 'modules/moments/helpers/imageHelpers';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/userDataSlice';

export const SettingsHeader = () => {
  const userData = useSelector(selectUser);
  console.log(userData, 'lklklklklklklk');
  const navigation = useNavigation();
  return (
    <View className="bg-blue items-center pt-10 pb-6">
      <View className="items-center justify-between px-6 flex-row w-full">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CartpoStack')}>
          <Ionicons name="qr-code-sharp" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <CustomProfileAvatar
        userName={userData.userName}
        photo={userData.photo && getImageLink(userData.photo.mediaId)}
        size={100}
        extraStyles={{ borderWidth: 5, borderColor: 'white' }}
      />
      <Text className="text-center color-white text-2xl font-semibold my-2">
        {userData.firstName ? userData.firstName : `@${userData.userName}`}
      </Text>
      <Text className="text-center color-white text-base font-normal">@{userData.userName}</Text>
      <CustomReferenceButton
        title={'Verify account'}
        onPress={() => navigation.navigate('RequestReferenceStack')}
        customContainerClass={'border-0 px-20 ml-4 py-2'}
        extraStyles={{ backgroundColor: 'rgba(101,190,229,255)' }}
        customTextClass={'text-white text-sm py-0 my-0 font-normal'}
      />
    </View>
  );
};
