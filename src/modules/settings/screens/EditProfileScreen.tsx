import Header from 'components/Header/Header';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { Userpic } from 'react-native-userpic';
import { CustomSettingOption } from '../components/CustomSettingOption';
import { CustomEditProfileOption } from '../components/CustomEditProfileOption';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';

export const EditProfileScreen = ({ navigation }: any) => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View className="flex-1 px-6">
        <Header
          showBackIcon
          centerComponent={<Text style={{ fontSize: 14, marginTop: 2 }}>Edit profile</Text>}
        />
        <View className="flex-1 justify-between mb-20">
          <View className="mt-8 mb-2">
            <Userpic
              source={{ uri: 'https://i.pravatar.cc/100?img=5' }}
              size={85}
              style={{ borderWidth: 5, borderColor: 'gray' }}
            />
            <Text className="text-center font-bold text-base">Edit picture</Text>
          </View>
          <View className="mb-8">
            <Text className="ml-5 text-base font-semibold mb-1">Edit bio</Text>
            <TextInput
              placeholder="type to edit bio"
              placeholderTextColor={'#646464'}
              textAlignVertical="top"
              className="rounded-xl h-32 px-3 py-1 text-base"
              multiline
              style={{ borderWidth: 1, borderColor: '#aca4ac', color: 'black' }}
            />
            <View>
              <CustomEditProfileOption
                option="User name"
                rightComponentTitle="@bayuga"
                onPress={() => navigation.navigate('NameUsername', { type: 'username' })}
              />
              <CustomEditProfileOption
                option="Name"
                rightComponentTitle="Betrand Bayuga"
                onPress={() => navigation.navigate('NameUsername', { type: 'name' })}
              />
              <CustomEditProfileOption option="Location" rightComponentTitle="none" />
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
              onPress={() => navigation.goBack()}
              customContainerClass={'bg-black border-2 px-0 py-2 w-60 border-white'}
              customTextClass={'text-white'}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
