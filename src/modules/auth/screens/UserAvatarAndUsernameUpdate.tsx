import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { NavigationProp } from '@react-navigation/native';
import Button from 'components/Button';
import ErrorModal from 'components/ErrorModal';
import Icons from 'components/Icons';
import Input from 'components/Input';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { useKeyboardVisible } from 'hooks/useKeyboardVisible';
import usePickImageAndUpload from 'hooks/usePickImage';
import { useMutation } from 'react-query';
import Api from 'services/Api';
import { setUserImageAndUsername } from 'store/auth/userSlice';
import colors from 'theme/colors';
import { text } from 'theme/text';
import { parseApiError, units } from 'utils/helpers';

import { AuthStackParamList } from '../AuthStackNavigator';
import { useAnimatedComponentStyle } from '../hooks/useAnimatedComponentStyle';
import Header from 'components/Header/Header';

const UserAvatarAndUsernameUpdate = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const { navigate } = useAppNavigation<NavigationProp<AuthStackParamList>>();
  const { pickImage, pickedImage, pickingLoading } = usePickImageAndUpload();
  const uploadImage = useMutation(Api.uploadImage, {});
  const updateUsername = useMutation(Api.updateUsername, {});
  const isVisibleKeyboard = useKeyboardVisible();
  console.log(pickedImage);
  const { Spacing, customSizeAnimatedStyle } = useAnimatedComponentStyle({
    customSize: 176,
  });

  const errorMessage = useMemo(
    () =>
      parseApiError(uploadImage.error) ||
      parseApiError(updateUsername.error) ||
      parseApiError(updateUsername.error, 'username'),
    [uploadImage.error, updateUsername.error],
  );

  const onUsernameChange = newUsername => {
    if (!newUsername.startsWith('@')) {
      setUsername(`@${newUsername}`);
    } else {
      setUsername(newUsername);
    }
  };

  const onContinue = async () => {
    const cleanedUsername = username.replace('@', '');
    dispatch(
      setUserImageAndUsername({
        username: cleanedUsername,
        image: pickedImage,
      }),
    );

    navigate('EnterReferralCode');

    // await uploadImage
    //   .mutateAsync({ image: pickedImage })
    //   .then(async () => {
    //     await updateUsername
    //       .mutateAsync({ username })
    //       .then(() => {
    //         navigate('CreateUnlockPin');
    //       })
    //       .catch(() => null);
    //   })
    //   .catch(() => null);
  };

  const isContinueButtonDisabled = !username || /\s/.test(username) || !pickedImage;
  LayoutAnimation.easeInEaseOut();

  return (
    <View
      className="flex-1 bg-blue justify-center px-7"
      style={{ justifyContent: isVisibleKeyboard ? 'flex-end' : 'center' }}>
      <View style={{ bottom: 60 }}>
        <Header showBackIcon backIconColor="white" />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.select({
          ios: 'position',
          android: undefined,
        })}>
        <View className="w-full">
          <View>
            <Text className={text({ type: 'b20', class: 'text-center mb-6 text-white' })}>
              Profile picture
            </Text>
            <Pressable
              onPress={pickImage}
              style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
              <Animated.View
                className="border-4 border-dustGray rounded-full overflow-hidden bg-altoGray  w-44 h-44 self-center justify-center items-center"
                style={customSizeAnimatedStyle}>
                {!pickedImage && (
                  <Animated.View
                    style={customSizeAnimatedStyle}
                    className={isVisibleKeyboard ? 'p-4' : 'p-10'}>
                    <Icons.AvatarEditIcon width={'100%'} height={'100%'} />
                  </Animated.View>
                )}
                {pickingLoading && (
                  <ActivityIndicator
                    size={'large'}
                    color={'white'}
                    className="absolute z-10 bg-black-o-40 w-44 h-44"
                  />
                )}
                {pickedImage && (
                  <Animated.View style={customSizeAnimatedStyle}>
                    <Image
                      className="w-full h-full"
                      resizeMode="contain"
                      source={{ uri: pickedImage }}
                    />
                  </Animated.View>
                )}
              </Animated.View>
            </Pressable>
          </View>
          <Spacing />
          <View>
            <Text className={text({ type: 'l20', class: 'text-white text-center mb-4' })}>
              Username
            </Text>
            <Input
              onChangeText={onUsernameChange}
              value={username}
              placeholder="e.g bayuga"
              customInputClass="text-20"
              placeholderTextColor={colors['white-o-60']}
            />
          </View>
          <View style={{ marginBottom: isVisibleKeyboard ? units.vh * 5 : 80 }} />
          <Button
            title="Continue"
            onPress={onContinue}
            type="borderedSolid"
            extraStyles={{ borderWidth: 5, borderColor: 'white', width: 190 }}
            disabled={isContinueButtonDisabled}
            isLoading={updateUsername.isLoading || uploadImage.isLoading}
            customContainer={`self-center mt-4 ${isContinueButtonDisabled && 'opacity-50'}`}
          />
        </View>
        <View style={{ marginBottom: isVisibleKeyboard ? units.vh * 6.5 : 0 }} />
        <Spacing />
      </KeyboardAvoidingView>
      <ErrorModal errorText={errorMessage} />
    </View>
  );
};

export default UserAvatarAndUsernameUpdate;
