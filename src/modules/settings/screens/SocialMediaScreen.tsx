import Header from 'components/Header/Header';
import { View, Text, TouchableOpacity } from 'react-native';
import { CustomSocialLink } from '../components/CustomSocialLink';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import { DeleteLinkIcon } from '../../../../assets/referralGift';
import { useState } from 'react';

export const SocialMediaScreen = () => {
  const [deleteIcons, setDeleteIcons] = useState([true, true, true]);

  const toggleIcon = index => {
    setDeleteIcons(prevIcons => {
      const newIcons = [...prevIcons];
      newIcons[index] = !newIcons[index];
      return newIcons;
    });
  };
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
            <View className="flex-row items-center">
              <Ionicons size={20} name="logo-instagram" />
              <TouchableOpacity
                onPress={() => toggleIcon(0)}
                style={{ justifyContent: 'center', width: 30 }}>
                {deleteIcons[0] ? (
                  <DeleteLinkIcon />
                ) : (
                  <View style={{ alignItems: 'center', paddingLeft: 9 }}>
                    <Feather name="plus" size={20} />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          }
        />
        <CustomSocialLink
          title={'Tiktok'}
          rightComponent={
            <View className="flex-row items-center">
              <FontAwesome5 size={20} name="tiktok" />
              <TouchableOpacity
                onPress={() => toggleIcon(1)}
                style={{ justifyContent: 'center', width: 30 }}>
                {deleteIcons[1] ? (
                  <DeleteLinkIcon />
                ) : (
                  <View style={{ alignItems: 'center', paddingLeft: 9 }}>
                    <Feather name="plus" size={20} />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          }
        />
        <CustomSocialLink
          title={'Youtube'}
          rightComponent={
            <View className="flex-row items-center">
              <Ionicons size={20} name="logo-youtube" />
              <TouchableOpacity
                onPress={() => toggleIcon(2)}
                style={{ justifyContent: 'center', width: 30 }}>
                {deleteIcons[2] ? (
                  <DeleteLinkIcon />
                ) : (
                  <View style={{ alignItems: 'center', paddingLeft: 9 }}>
                    <Feather name="plus" size={20} />
                  </View>
                )}
              </TouchableOpacity>
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
