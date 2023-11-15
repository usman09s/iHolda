import Header from 'components/Header/Header';
import { View, Text } from 'react-native';
import { CustomSocialLink } from '../components/CustomSocialLink';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const SocialMediaScreen = () => {
  return (
    <View className="px-6">
      <Header
        showBackIcon
        centerComponent={
          <Text style={{ fontSize: 16, fontWeight: '500', marginTop: 2 }}>Add Social media</Text>
        }
      />
      <View className="px-2 py-8">
        <CustomSocialLink
          title={'Instagram'}
          rightComponent={
            <View className="flex-row gap-3 items-center">
              <Ionicons size={22} name="logo-instagram" />
              <MaterialIcons name={'delete-outline'} size={24} color={'red'} />
            </View>
          }
        />
        <CustomSocialLink
          title={'Tiktok'}
          rightComponent={
            <View className="flex-row gap-3 items-center">
              <FontAwesome5 size={22} name="tiktok" />
              <MaterialIcons name={'delete-outline'} size={24} color={'red'} />
            </View>
          }
        />
        <CustomSocialLink
          title={'Youtube'}
          rightComponent={
            <View className="flex-row gap-3 items-center">
              <Ionicons size={22} name="logo-youtube" />
              <MaterialIcons name={'delete-outline'} size={24} color={'red'} />
            </View>
          }
        />
        <CustomSocialLink
          title={'Twitter'}
          rightComponent={<Text className="text-base">Link account</Text>}
        />
        <CustomSocialLink
          title={'Facebook'}
          rightComponent={<Text className="text-base">Link account</Text>}
        />
        <CustomSocialLink
          title={'Website'}
          rightComponent={<Text className="text-base">Link account</Text>}
        />
      </View>
    </View>
  );
};
