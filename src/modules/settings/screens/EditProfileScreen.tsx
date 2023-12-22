import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Userpic } from 'react-native-userpic';
import { CustomSettingOption } from '../components/CustomSettingOption';
import { CustomEditProfileOption } from '../components/CustomEditProfileOption';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import CustomHeader from 'components/Header/CustomHeader';
import { useDispatch, useSelector } from 'react-redux';
import { useSettingActions } from '../hooks/useSettingsActions';
import { useFocusEffect } from '@react-navigation/native';
import CustomProfileAvatar from 'components/CustomProfileAvatar';
import { getImageLink } from 'modules/moments/helpers/imageHelpers';
import { userSelector } from 'store/auth/userSelectors';

export const EditProfileScreen = ({ navigation }: any) => {
  const userData: any = useSelector(userSelector)?.user;
  const { pickImage, handleBioChange, handleLocationPress, handleUpdateSetting, cityCountry } =
    useSettingActions();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View className="flex-1 px-6">
        <CustomHeader showBackIcon title="Edit profile" />
        <View className="flex-1 justify-between mb-20">
          <TouchableOpacity className="mt-8 mb-2" onPress={pickImage}>
            <CustomProfileAvatar
              photo={
                userData?.photo && userData?.photo?.mediaId && getImageLink(userData.photo.mediaId)
              }
              userName={userData.userName}
              size={85}
              extraStyles={{ borderWidth: 3, borderColor: 'gray' }}
            />
            <Text className="text-center font-bold text-base">Edit picture</Text>
          </TouchableOpacity>
          <View className="mb-8">
            <Text className="ml-5 text-base font-semibold mb-1">Edit bio</Text>
            <TextInput
              placeholder="type to edit bio"
              placeholderTextColor={'#646464'}
              textAlignVertical="top"
              className="rounded-xl h-32 px-3 py-1 text-base"
              multiline
              value={userData.bio}
              onChangeText={value => handleBioChange(value)}
              style={{ borderWidth: 1, borderColor: '#aca4ac', color: 'black' }}
            />
            <View>
              <CustomEditProfileOption
                option="User name"
                rightComponentTitle={`@${userData.userName ? userData.userName : 'N/A'}`}
                onPress={() => navigation.navigate('Username')}
              />
              <CustomEditProfileOption
                option="Name"
                rightComponentTitle={userData.firstName ? userData.firstName : `N/A`}
                onPress={() => navigation.navigate('Name')}
              />
              <CustomEditProfileOption
                option="Location"
                rightComponentTitle={cityCountry ? cityCountry : userData.address || 'none'}
                onPress={handleLocationPress}
              />

              <CustomEditProfileOption
                option="Links"
                rightComponentTitle="none"
                onPress={() => navigation.navigate('SocialMedia')}
              />
            </View>
          </View>
          <View className="items-center">
            <CustomReferenceButton
              title="Save"
              onPress={handleUpdateSetting}
              customContainerClass={'bg-black px-0 py-2 w-60'}
              extraStyles={{ borderWidth: 0 }}
              customTextClass={'text-white'}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
