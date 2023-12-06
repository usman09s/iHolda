import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Userpic } from 'react-native-userpic';
import { CustomSettingOption } from '../components/CustomSettingOption';
import { CustomEditProfileOption } from '../components/CustomEditProfileOption';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import CustomHeader from 'components/Header/CustomHeader';
import { useDispatch, useSelector } from 'react-redux';
import { useSettingActions } from '../hooks/useSettingsActions';
import { selectUser } from 'store/userDataSlice';
import { useFocusEffect } from '@react-navigation/native';
import CustomProfileAvatar from 'components/CustomProfileAvatar';
import { getImageLink } from 'modules/moments/helpers/imageHelpers';

export const EditProfileScreen = ({ navigation }: any) => {
  const userData = useSelector(selectUser);
  const {
    pickImage,
    handleBioChange,
    handleLocationPress,
    cityCountry,
    profileImage,
    handleUpdateSetting,
    getCityCountry,
  } = useSettingActions();

  useFocusEffect(() => {
    getCityCountry();
  });

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View className="flex-1 px-6">
        <CustomHeader showBackIcon title="Edit profile" />
        <View className="flex-1 justify-between mb-20">
          <TouchableOpacity className="mt-8 mb-2" onPress={pickImage}>
            <CustomProfileAvatar
              photo={userData.photo ? getImageLink(userData.photo.mediaId) : profileImage}
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
                rightComponentTitle={`@${userData.userName}`}
                onPress={() => navigation.navigate('Username')}
              />
              <CustomEditProfileOption
                option="Name"
                rightComponentTitle={userData.firstName ? userData.firstName : `N/A`}
                onPress={() => navigation.navigate('Name')}
              />
              <CustomEditProfileOption
                option="Location"
                rightComponentTitle={`${cityCountry !== '' ? cityCountry : 'none'}`}
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
