import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import Button from 'components/Button';
import ErrorModal from 'components/ErrorModal';
import Icons from 'components/Icons';
import Input from 'components/Input';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppNavigation } from 'hooks/useAppNavigation';
import usePickImageAndUpload from 'hooks/usePickImage';
import { useMutation } from 'react-query';
import Api from 'services/Api';
import { setUserImageAndUsername } from 'store/auth/userSlice';
import colors from 'theme/colors';
import { text } from 'theme/text';
import { parseApiError } from 'utils/helpers';

import { AuthStackParamList } from '../AuthStackNavigator';

const UserAvatarAndUsernameUpdate = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const { navigate } = useAppNavigation<NavigationProp<AuthStackParamList>>();
  const { pickImage, pickedImage, pickingLoading } = usePickImageAndUpload();
  const uploadImage = useMutation(Api.uploadImage, {});
  const updateUsername = useMutation(Api.updateUsername, {});

  const errorMessage = useMemo(
    () =>
      parseApiError(uploadImage.error) ||
      parseApiError(updateUsername.error) ||
      parseApiError(updateUsername.error, 'username'),
    [uploadImage.error, updateUsername.error],
  );

  const onContinue = async () => {
    dispatch(
      setUserImageAndUsername({
        username,
        image: pickedImage,
      }),
    );
    await uploadImage
      .mutateAsync({ image: pickedImage })
      .then(async () => {
        await updateUsername
          .mutateAsync({ username })
          .then(() => {
            navigate('CreateUnlockPin');
          })
          .catch(() => null);
      })
      .catch(() => null);
  };

  const isContinueButtonDisabled = !username || !pickedImage;

  return (
    <View className="flex-1 bg-blue justify-center px-7">
      <KeyboardAvoidingView
        behavior={Platform.select({
          ios: 'position',
          android: undefined,
        })}
        className=" justify-between content-between">
        <View className="mb-20 w-full">
          <View>
            <Text className={text({ type: 'b2o', class: 'text-center mb-6 text-white' })}>
              Profile picture
            </Text>
            <Pressable
              onPress={pickImage}
              style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
              <View className="border-4 border-dustGray rounded-full overflow-hidden bg-altoGray  w-44 h-44 self-center justify-center items-center">
                {!pickedImage && <Icons.AvatarEditIcon />}
                {pickingLoading && (
                  <ActivityIndicator
                    size={'large'}
                    color={'white'}
                    className="absolute z-10 bg-black-o-40 w-44 h-44"
                  />
                )}
                {pickedImage && <Image className="w-44 h-44" source={{ uri: pickedImage }} />}
              </View>
            </Pressable>
          </View>
          <View className="my-20">
            <Text className={text({ type: 'l20', class: 'text-white text-center mb-4' })}>
              Username
            </Text>
            <Input
              onChangeText={setUsername}
              placeholder="like @bayuga"
              customInputClass="text-20"
              placeholderTextColor={colors['white-o-60']}
            />
          </View>
          <Button
            title="Continue"
            onPress={onContinue}
            type="borderedSolid"
            disabled={isContinueButtonDisabled}
            isLoading={updateUsername.isLoading || uploadImage.isLoading}
            customContainer={`self-center mt-4 ${isContinueButtonDisabled && 'opacity-50'}`}
          />
        </View>
      </KeyboardAvoidingView>
      <ErrorModal errorText={errorMessage} />
    </View>
  );
};

export default UserAvatarAndUsernameUpdate;
