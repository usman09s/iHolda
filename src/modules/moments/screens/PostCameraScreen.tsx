import { useRef, useState } from 'react';
import { Image, Platform, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Camera, CameraType } from 'expo-camera';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Header from 'components/Header/Header';
import Icons from 'components/Icons';
import { text } from 'theme/text';
import { height, width } from 'utils/helpers';

import MeetupAndJobButtons from '../components/MeetupAndJobButtons';
import PostCameraTabItem from '../components/PostCameraTabItem';
import { MomentsStackParamList } from '../MomentsStackNavigator';

const PostCameraScreen = () => {
  const [cameraType, setCameraType] = useState<CameraType>(CameraType.back);
  const { navigate } = useNavigation<NavigationProp<MomentsStackParamList>>();
  const { bottom } = useSafeAreaInsets();
  const cameraRef = useRef<Camera>(null);
  const ratio = Platform.select({
    ios: '4:3',
    android: '2:1',
  });

  const cameraToggle = () => {
    setCameraType(value => (value === CameraType.front ? CameraType.back : CameraType.front));
  };

  return (
    <View className="flex-1 bg-black justify-between">
      <Camera
        ratio={ratio}
        ref={cameraRef}
        autoFocus={false}
        type={cameraType}
        className="w-full h-full z-40"
      />
      <View
        className="flex-1 absolute z-50 justify-between px-6"
        style={{ width: width, height: height, paddingBottom: bottom || 16 }}>
        <Header
          showBackIcon
          backIconColor="white"
          onPressRight={cameraToggle}
          rightComponent={<Icons.SwitchCameraIcon />}
        />
        <View>
          <View className="flex-row self-end">
            <PostCameraTabItem>Photo</PostCameraTabItem>
            <PostCameraTabItem isActive>Video</PostCameraTabItem>
            <PostCameraTabItem>Text</PostCameraTabItem>
          </View>
          <View className="flex-row justify-between items-center mt-9">
            <View className="items-center">
              <Icons.MicrophoneIcon />
              <Text className={text({ type: 'm12', class: 'text-white mt-1.5' })}>Upload</Text>
            </View>
            <Pressable
              className="bg-white w-20 h-20 rounded-[40px] items-center justify-center"
              onPress={() => navigate('PostPreview')}>
              <View className="bg-saffron w-16 h-16 rounded-[32px] border-[3px]" />
            </Pressable>
            <View className="items-center">
              <Image
                source={{ uri: 'https://i.pravatar.cc/150?img=33' }}
                className="w-10 h-10 border-2 border-white rounded-md"
              />
              <Text className={text({ type: 'm12', class: 'text-white mt-1.5' })}>Upload</Text>
            </View>
          </View>
          <View className="mt-5">
            <MeetupAndJobButtons isAbsolute={false} flow="post" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostCameraScreen;
