import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { DeleteLinkIcon } from '../../../../assets/referralGift';
import { selectUser, setUser } from 'store/userDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { CustomSocialLink } from '../components/CustomSocialLink';
import CustomHeader from 'components/Header/CustomHeader';
import Toast from 'react-native-toast-message';
import { useSettingActions } from '../hooks/useSettingsActions';
import { userSelector } from 'store/auth/userSelectors';

function isValidURL(str: string): boolean {
  if (!str) return false;
  if (
    /^(http(s):\/\/.)[-a-zA-Z0-9@:%.\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.~#?&//=]*)$/g.test(
      str,
    )
  ) {
    console.log('YES');
    return true;
  } else {
    console.log('NO');
    return false;
  }
}

export const SocialMediaScreen = () => {
  const [isTextInputVisible, setIsTextInputVisible] = useState([false, false, false]);
  const [linkInput, setLinkInput] = useState(['', '', '', '', '', '']);
  const [inputError, setInputError] = useState([false, false, false, false, false, false]);
  const [activeLink, setActiveLink] = useState(null);
  const dispatch = useDispatch();
  const userData = useSelector(userSelector)?.user;
  const { handleUpdateSetting } = useSettingActions();
  console.log(userData?.socialLinks);

  const toggleLinkInput = index => {
    if (activeLink !== null && activeLink !== index) {
      Toast.show({
        type: 'error',
        text1: 'Please fill the previous input first',
      });
      return;
    }

    setIsTextInputVisible(prevVisible => {
      const newVisible = [...prevVisible];
      newVisible[index] = true;
      return newVisible;
    });
    setActiveLink(index);
  };

  const handleLinkInputChange = (index, text) => {
    setLinkInput(prevLinks => {
      const newLinks = [...prevLinks];
      newLinks[index] = text;
      return newLinks;
    });
    setInputError(prevErrors => {
      const newErrors = [...prevErrors];
      newErrors[index] = false;
      return newErrors;
    });
  };

  const openSocialMediaApp = (platform, socialLink) => {
    let webURL;
    const isFullURL =
      socialLink.startsWith('http') ||
      socialLink.startsWith('https') ||
      socialLink.startsWith('www');

    switch (platform) {
      case 'facebook':
        webURL = isFullURL ? socialLink.link : `https://www.facebook.com/${socialLink}`;
        break;
      case 'instagram':
        webURL = isFullURL ? socialLink.link : `https://www.instagram.com/${socialLink}`;
        break;
      case 'twitter':
        webURL = isFullURL ? socialLink.link : `https://twitter.com/${socialLink}`;
        break;
      case 'tiktok':
        webURL = isFullURL ? socialLink.link : `https://www.tiktok.com/@${socialLink}`;
        break;
      case 'youtube':
        webURL = isFullURL ? socialLink.link : `https://www.youtube.com/${socialLink}`;
        break;
      case 'website':
        webURL = isFullURL ? socialLink.link : `http://${socialLink}`;
        break;
      default:
        console.error('Unsupported platform:', platform);
        return;
    }
    console.log(webURL);
    if (webURL) {
      Linking.openURL(webURL).catch(err => {
        console.error('An error occurred while opening the link:', err);
      });
    }
  };

  const handleLinkAccount = async index => {
    const link = linkInput[index];
    if (!isValidURL(link)) {
      setInputError(prevErrors => {
        const newErrors = [...prevErrors];
        newErrors[index] = true;
        return newErrors;
      });
      Toast.show({
        type: 'error',
        text1: 'Invalid URL. Please enter a valid URL.',
      });
      return;
    }
    const updatedUserData = {
      ...userData,
      socialLinks: userData.socialLinks.map((socialLink, i) => ({
        ...socialLink,
        link: i === index ? link : socialLink.link,
      })),
    };
    setIsTextInputVisible(prevVisible => {
      const newVisible = [...prevVisible];
      newVisible[index] = false;
      return newVisible;
    });
    await handleUpdateSetting(updatedUserData);
    Toast.show({
      type: 'success',
      text1: 'Link updated successfully',
    });
    setActiveLink(null);
  };

  const handleDeleteLink = async platform => {
    const updatedSocialLinks = userData.socialLinks.map(link =>
      link.platform === platform ? { ...link, link: '' } : link,
    );
    const updatedUserData = {
      ...userData,
      socialLinks: updatedSocialLinks,
    };
    Toast.show({
      type: 'success',
      text1: 'Link deleted successfully',
    });
    handleUpdateSetting(updatedUserData);
  };

  return (
    <View className="px-6">
      <CustomHeader
        showBackIcon
        centerComponent={<Text style={{ fontSize: 16, fontWeight: '500' }}>Add Social media</Text>}
      />
      <View style={{ paddingHorizontal: 2, paddingTop: 8 }}>
        {userData.socialLinks.map((socialLink, index) => (
          <View key={index}>
            <CustomSocialLink
              title={socialLink.platform.charAt(0).toUpperCase() + socialLink.platform.slice(1)}
              rightComponent={
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {isTextInputVisible[index] ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        height: 40,
                        paddingHorizontal: 10,
                        borderRadius: 30,
                        borderColor: inputError[index] ? 'red' : 'gray',
                        borderWidth: 1,
                      }}>
                      <TextInput
                        placeholder="Paste link"
                        onChangeText={text => handleLinkInputChange(index, text)}
                        value={linkInput[index]}
                        style={{ width: 100 }}
                      />
                      <TouchableOpacity
                        onPress={() => handleLinkAccount(index)}
                        style={{ justifyContent: 'center', width: 'auto', paddingLeft: 7 }}>
                        <FontAwesome5 size={20} name="check-circle" />
                      </TouchableOpacity>
                    </View>
                  ) : socialLink.link !== '' ? (
                    <View className="flex-row items-center">
                      <TouchableOpacity
                        className="justify-center"
                        onPress={() => openSocialMediaApp(socialLink.platform, socialLink.link)}>
                        <FontAwesome5
                          size={20}
                          name={socialLink.platform === 'website' ? 'globe' : socialLink.platform}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleDeleteLink(socialLink.platform)}
                        style={{ justifyContent: 'center', width: 'auto', paddingLeft: 7 }}>
                        <DeleteLinkIcon />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() => toggleLinkInput(index)}
                      style={{ justifyContent: 'center', width: 'auto' }}>
                      <Text style={{ fontSize: 16, fontWeight: '500', marginTop: 2 }}>
                        Link Account
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              }
            />
          </View>
        ))}
      </View>
    </View>
  );
};
