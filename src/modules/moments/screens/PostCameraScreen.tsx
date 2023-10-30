import { useEffect, useRef, useState } from 'react';
import { Image, Platform, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Camera, CameraType } from 'expo-camera';
import { NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native';
import Header from 'components/Header/Header';
import Icons from 'components/Icons';
import { text } from 'theme/text';
import { height, width } from 'utils/helpers';
import * as MediaLibrary from 'expo-media-library';
import { MediaTypeOptions } from 'expo-image-picker';

import MeetupAndJobButtons from '../components/MeetupAndJobButtons';
import PostCameraTabItem from '../components/PostCameraTabItem';
import { MomentsStackParamList } from '../MomentsStackNavigator';
import usePickImageAndUpload from 'hooks/usePickImage';
import { useSelfieActions } from '../hooks/useSelfieActions';
import { useDispatch, useSelector } from 'react-redux';
import { allMomentsSelector } from 'store/moments/momentsSelectors';
import { addMoment, resetState } from 'store/moments/momentsSlice';
import { PostTypes } from 'types/MomentsTypes';

const PostCameraScreen = () => {
  const [cameraType, setCameraType] = useState<CameraType>(CameraType.back);
  const [lastMedia, setLastMedia] = useState<string | null>(null);
  const [postTxt, setPostTxt] = useState('');
  const [postType, setPostType] = useState<PostTypes>('Video');

  const { navigate } = useNavigation<NavigationProp<MomentsStackParamList>>();
  const { bottom } = useSafeAreaInsets();
  const isFocused = useIsFocused();

  const moments = useSelector(allMomentsSelector);

  const [_, requestPermission] = MediaLibrary.usePermissions();
  const { pickImage, pickedImage, pickingLoading } = usePickImageAndUpload();
  const { ratio, cameraRef, isRecording, setMediaType, recordTimeCounter, onPressRecordButton } =
    useSelfieActions();
  const dispatch = useDispatch();

  const cameraToggle = () => {
    setCameraType(value => (value === CameraType.front ? CameraType.back : CameraType.front));
  };

  async function getLastMediaFromGallery() {
    try {
      requestPermission();

      const { assets } = await MediaLibrary.getAssetsAsync({
        first: 1,
        sortBy: MediaLibrary.SortBy.creationTime,
        mediaType: [MediaLibrary.MediaType.photo, MediaLibrary.MediaType.video],
      });

      if (assets.length > 0) {
        const lastMedia = assets[0];
        // `lastMedia.uri` contains the URI of the last media item.
        console.log('Last media URI:', lastMedia.uri);
        setLastMedia(lastMedia.uri);
      } else {
        console.log('No media found in the gallery.');
      }
    } catch (error) {
      console.error('Error retrieving media:', error);
    }
  }

  const handleProceed = () => {
    if (postType === 'Text' && !postTxt.length) return;
    setTimeout(() => {
      navigate('PostPreview', { postType, text: postTxt });
    }, 100);
  };

  useEffect(() => {
    console.log(moments.length);
    if (!moments.length) return;

    handleProceed();
  }, [moments]);

  useEffect(() => {
    console.log(pickedImage);
    if (!pickedImage) return;

    dispatch(
      addMoment({
        type:
          postType === 'Photo'
            ? 'PHOTO'
            : postType === 'Video'
            ? 'VIDEO'
            : pickedImage.type === 'image'
            ? 'PHOTO'
            : pickedImage.type === 'video'
            ? 'VIDEO'
            : 'PHOTO',
        localUri: pickedImage.uri,
        base64: pickedImage?.base64 || '',
      }),
    );

    handleProceed();
  }, [pickedImage]);

  useEffect(() => {
    dispatch(resetState());

    setMediaType('VIDEO');
    getLastMediaFromGallery();

    return () => {
      dispatch(resetState());
    };
  }, []);

  return (
    <>
      <View className="flex-1  justify-between">
        {postType !== 'Text' && postType !== 'Audio' && isFocused && (
          <Camera
            ratio={ratio}
            ref={cameraRef}
            autoFocus={true}
            type={cameraType}
            className="w-full h-full z-50"
          />
        )}
        {postType === 'Text' && (
          <>
            <View className="w-full h-full z-40 bg-[#8896cc]"></View>
            <TextInput
              value={postTxt}
              onChangeText={setPostTxt}
              style={{
                position: 'absolute',
                top: '35%',
                zIndex: 9999,
                fontSize: 19,
                alignSelf: 'center',
                color: 'black',
                textAlign: 'center',
              }}
              placeholder="Type something"
              cursorColor="black"
            />
          </>
        )}
        <View
          className="flex-1 absolute z-50 justify-between px-6"
          style={{ width: width, height: height, paddingBottom: bottom || 16 }}>
          <Header
            showBackIcon
            backIconColor="white"
            onPressRight={postType !== 'Text' ? cameraToggle : handleProceed}
            rightComponent={
              postType !== 'Text' ? (
                <Icons.SwitchCameraIcon />
              ) : (
                <Pressable>
                  <Text
                    className={text({
                      type: postTxt ? 'r14' : 'm14',
                      class: !postTxt ? 'text-black opacity-30' : 'text-white',
                    })}>
                    Next
                  </Text>
                </Pressable>
              )
            }
          />
          <View>
            <View className="flex-row self-end">
              <PostCameraTabItem
                onPress={() => (setPostType('Photo'), setMediaType('PHOTO'))}
                isActive={postType === 'Photo'}>
                Photo
              </PostCameraTabItem>
              <PostCameraTabItem
                onPress={() => (setPostType('Video'), setMediaType('VIDEO'))}
                isActive={postType === 'Video'}>
                Video
              </PostCameraTabItem>
              <PostCameraTabItem isActive={postType === 'Text'} onPress={() => setPostType('Text')}>
                Text
              </PostCameraTabItem>
            </View>
            <View className="flex-row justify-between items-center mt-9">
              <View className="items-center">
                <Icons.MicrophoneIcon />
                <Text className={text({ type: 'm12', class: 'text-white mt-1.5' })}>Record</Text>
              </View>
              <Pressable
                className="bg-white w-20 h-20 rounded-[40px] items-center justify-center"
                onPress={
                  postType === 'Photo' || postType === 'Video' ? onPressRecordButton : () => null
                }>
                <View
                  className={`${
                    postType === 'Photo'
                      ? 'bg-white border-[0px]'
                      : `${isRecording ? 'bg-red-600' : 'bg-saffron'} border-[3px]`
                  } w-16 rounded-[32px] h-16`}
                  style={{ opacity: postType === 'Text' ? 0.5 : 1 }}
                />
              </Pressable>
              <TouchableOpacity
                onPress={() =>
                  pickImage(
                    postType === 'Photo'
                      ? MediaTypeOptions.Images
                      : postType === 'Video'
                      ? MediaTypeOptions.Videos
                      : MediaTypeOptions.All,
                    false,
                  )
                }
                className="items-center">
                {lastMedia && (
                  <Image
                    source={{ uri: lastMedia }}
                    className="w-10 h-10 border-2 border-white rounded-md"
                  />
                )}
                <Text className={text({ type: 'm12', class: 'text-white mt-1.5' })}>Upload</Text>
              </TouchableOpacity>
            </View>
            <View className="mt-5">
              <MeetupAndJobButtons isAbsolute={false} flow="post" />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default PostCameraScreen;
