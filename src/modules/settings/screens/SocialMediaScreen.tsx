import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { DeleteLinkIcon } from '../../../../assets/referralGift';
import { selectUser, setUser } from 'store/userDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { CustomSocialLink } from '../components/CustomSocialLink';
import CustomHeader from 'components/Header/CustomHeader';
import Toast from 'react-native-toast-message';
import { useSettingActions } from '../hooks/useSettingsActions';

export const SocialMediaScreen = () => {
  const [isTextInputVisible, setIsTextInputVisible] = useState([false, false, false]);
  const [linkInput, setLinkInput] = useState(['', '', '', '', '', '']);
  const [inputError, setInputError] = useState([false, false, false, false, false, false]); // Initialize error state
  const [activeLink, setActiveLink] = useState(null); // Track the active TextInput
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);
  const { handleUpdateSetting } = useSettingActions();

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

  const handleLinkAccount = async index => {
    const link = linkInput[index];
    if (!link.trim()) {
      setInputError(prevErrors => {
        const newErrors = [...prevErrors];
        newErrors[index] = true;
        return newErrors;
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
    dispatch(setUser(updatedUserData));
    console.log(`Link Account pressed for index ${index}, link: ${link}`);
    setIsTextInputVisible(prevVisible => {
      const newVisible = [...prevVisible];
      newVisible[index] = false;
      return newVisible;
    });
    await handleUpdateSetting();
    Toast.show({
      type: 'success',
      text1: 'Link updated successfully',
    });
    setActiveLink(null);
  };

  const handleDeleteLink = async index => {
    const updatedUserData = {
      ...userData,
      socialLinks: userData.socialLinks.map((socialLink, i) => ({
        ...socialLink,
        link: i === index ? '' : socialLink.link,
      })),
    };
    dispatch(setUser(updatedUserData));
    await handleUpdateSetting();
    Toast.show({
      type: 'success',
      text1: 'Link deleted successfully',
    });
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
              title={socialLink.platform}
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
                  ) : // Check if a link exists for the current platform and show delete icon if available
                  socialLink.link !== '' ? (
                    <View className="flex-row items-center">
                      <TouchableOpacity className="justify-center">
                        <FontAwesome5
                          size={20}
                          name={socialLink.platform === 'website' ? 'globe' : socialLink.platform}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleDeleteLink(index)} // Implement delete link logic
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
