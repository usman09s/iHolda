import {
  ImageBackground,
  Pressable,
  View,
  Image,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  NavigationProp,
  StackActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import Header from 'components/Header/Header';
import Icons from 'components/Icons';
import Input from 'components/Input';
import * as FileSystem from 'expo-file-system';
import mime from 'mime';
import Antdesign from '@expo/vector-icons/AntDesign';
import { Video as VideCompressor, Image as ImageCompresor } from 'react-native-compressor';

import PostPreviewSideActionBar from '../../moments/components/PostPreviewSideActionBar';
import { MomentsStackParamList } from '../../moments/MomentsStackNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { allMomentsSelector, postMomentsParamsSelector } from 'store/moments/momentsSelectors';
import { ResizeMode, Video, Audio } from 'expo-av';
import { useEffect, useRef, useState } from 'react';
import { resetState } from 'store/moments/momentsSlice';
import { PostScreenParams } from 'types/MomentsTypes';
import { useMutation } from 'react-query';
import Api from 'services/Api';
import { TEXT_POST_COLOR } from '../../moments/constants';
import { text as themeText } from 'theme/text';
import { useKeyboardVisible } from 'hooks/useKeyboardVisible';

const recording = new Audio.Recording();

const PostReview = ({ route }: { route?: { params: any } }) => {
  const [caption, setCaption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  //   console.log('~ isLoading:', isLoading);
  // const [recording, setRecording] = useState<Audio.Recording | undefined>();
  const [isRecording, setIsRecording] = useState(false);
  const [selectedRating, setSelectedRating] = useState(4);
  const [selectedCategory, setSelectedCategory] = useState('service');

  const restaurantId = route?.params?.restaurantId;

  const isKeyboardVisible = useKeyboardVisible();

  const { dispatch: dispatchNavigation, goBack, reset } = useNavigation<NavigationProp<any>>();
  const { bottom } = useSafeAreaInsets();

  const { postType, text } = route ? route.params : { postType: 'PHOTO', text: '' };

  const isFocused = useIsFocused();
  //   const dispatch = useDispatch();

  const { caption: postCaption } = useSelector(postMomentsParamsSelector);
  const moments = useSelector(allMomentsSelector);

  async function postData(url = '', data: FormData) {
    setIsLoading(true);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    });
    setIsLoading(false);
    console.log('🚀 ~ file: PostPreviewScreen.tsx:58 ~ postData ~ response:', response);
    return { ...response.json(), status: response.status };
  }

  const handlePostRestaurantReview = async () => {
    if (isLoading) return;

    let formdata = new FormData();
    const mediaUri = moments[0]?.localUri;
    const mediaType = moments[0]?.type;

    let imageObject, videoObject;

    if (mediaUri) {
      if (mediaType === 'VIDEO') {
        const result = await VideCompressor.compress(
          mediaUri,
          { compressionMethod: 'auto' },
          progress => {
            console.log('Compression Progress: ', progress);
          },
        );

        const newVideoUri = 'file:///' + result.split('file:/').join('');

        videoObject = {
          name: result.split('/').pop(),
          height: 1920,
          width: 1080,
          type: mime.getType(newVideoUri),
          uri: result,
        };
      } else {
        const imgRes = await ImageCompresor.compress(mediaUri, {
          progressDivider: 10,
          downloadProgress: progress => {
            console.log('downloadProgress: ', progress);
          },
        });

        const imageUri = 'file:///' + imgRes.split('file:/').join('');

        imageObject = {
          name: imgRes.split('/').pop(),
          type: mime.getType(imageUri),
          uri: imgRes,
        };
      }
    }

    const media: any = mediaType === 'PHOTO' ? imageObject : videoObject;

    formdata.append('post[text]', caption);
    if (media) formdata.append('post[media]', media);
    formdata.append('star', selectedRating.toString());
    formdata.append('to', restaurantId);
    formdata.append('categories[0]', selectedCategory);

    postData(Api.baseUrl + 'rating', formdata).then(data => {
      console.log('🚀~ postData ~ data:', data);
      if (data.status !== 200) return alert('Something went wrong');
      console.log(data);
      // navigate('ReviewSuccess', { type: 'accept' });
      reset({
        index: 1,
        routes: [{ name: 'BottomTabs' }, { name: 'ReviewSuccess', params: { type: 'accept' } }],
      });
      return;
      dispatchNavigation(StackActions.popToTop());
      goBack();
    });
  };

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      setIsRecording(true);
      console.log('Starting recording..');
      await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await recording.startAsync();
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
  }

  const handleAudioPress = () => {
    if (!isRecording) startRecording();
    else stopRecording();
  };

  // const handlePostRestaurantReview = () => {

  // };

  //   useEffect(() => {
  //     return () => {
  //       dispatch(resetState());
  //     };
  //   }, []);

  return (
    <View className="flex-1 justify-center ">
      <View style={{ flex: 1, width: '100%', zIndex: 9999 }}>
        {isLoading && (
          <View className="w-full h-full justify-center items-center bg-[transparent] z-[99999] absolute">
            <ActivityIndicator size={'large'} color={'#FFF'} />
          </View>
        )}
        {isFocused ? (
          <View className="w-full h-full">
            {postType === 'Video' ? (
              <Video
                isLooping
                shouldPlay={true}
                className="w-full h-full"
                resizeMode={ResizeMode.COVER}
                // useNativeControls
                source={{
                  uri: moments[0].localUri,
                  // overrideFileExtensionAndroid: "mp4"
                }}
              />
            ) : postType === 'Photo' ? (
              <Image
                resizeMode="cover"
                className="flex-1 w-full"
                source={{ uri: moments[0].localUri }}
              />
            ) : postType === 'Text' ? (
              <>
                <View
                  style={{ backgroundColor: TEXT_POST_COLOR }}
                  className={`w-full h-full justify-center items-center`}>
                  <Text
                    style={{
                      zIndex: 9999,
                      fontSize: 19,
                      color: 'black',
                      textAlign: 'center',
                    }}>
                    {text}
                  </Text>
                </View>
              </>
            ) : null}
            <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
              <View className="px-6">
                <Header showBackIcon backIconColor="white" />
              </View>
              <View
                className={`bottom-${
                  isKeyboardVisible ? 0 : 2
                } absolute w-full justify-center items-center px-${isKeyboardVisible ? 0 : 5}`}>
                <View className="flex-row justify-center gap-2 bottom-4">
                  {[1, 2, 3, 4, 5].map(e => (
                    <TouchableOpacity onPress={() => setSelectedRating(e)}>
                      {selectedRating >= e ? (
                        <Antdesign key={e} name="star" color={'#ffc859'} size={30} />
                      ) : (
                        <Antdesign key={e} name="staro" color={'#FFF'} size={30} />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>

                <View
                  className={
                    isKeyboardVisible ? 'w-full bg-white rounded-t-2xl px-2 pb-10' : 'w-full'
                  }>
                  {isKeyboardVisible && (
                    <TouchableOpacity onPress={Keyboard.dismiss}>
                      <Icons.CrossIcon className="ml-1 mt-2 mb-3" />
                    </TouchableOpacity>
                  )}
                  <View
                    className={
                      isKeyboardVisible
                        ? 'border border-[#d9d7d7] rounded-2xl pt-5 px-4 pb-2'
                        : 'w-full'
                    }>
                    <Input
                      value={caption}
                      onChangeText={setCaption}
                      placeholder={
                        !isKeyboardVisible
                          ? 'Write review here'
                          : 'Add your experience and review here. (Optional)'
                      }
                      customInputClass={!isKeyboardVisible ? 'w-full' : 'w-full px-0 py-0'}
                      style={{ color: isKeyboardVisible ? 'black' : 'white' }}
                      placeholderTextColor={isKeyboardVisible ? '#000' : '#fff'}
                    />

                    {isKeyboardVisible && (
                      <View className="flex-row gap-2 mt-24">
                        {['service', 'food', 'hygiene'].map(c => (
                          <TouchableOpacity
                            onPress={() => setSelectedCategory(c)}
                            className="bg-[#740ef5] py-2 px-3 rounded-md items-center justify-center flex-row flex-1">
                            <Text
                              className={themeText({
                                type: 'm16',
                                class: `text-white capitalize`,
                              })}>
                              {c}
                            </Text>
                            <View className="border border-white items-center justify-center rounded-full h-[14] w-[14] overflow-hidden ml-2">
                              <View
                                className={`bg-${
                                  selectedCategory === c ? 'white' : '#740ef5'
                                } w-[7] h-[7] rounded-full`}
                              />
                            </View>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                </View>
              </View>
              {/* <PostPreviewSideActionBar onPressAudio={handleAudioPress} /> */}
            </View>
          </View>
        ) : null}
      </View>
      {!isKeyboardVisible && (
        <View
          className="flex-row w-full px-6 bg-black justify-center"
          style={{ paddingBottom: bottom || 16, paddingTop: bottom || 16 }}>
          <Pressable
            // onPress={() => navigate('ReviewSuccess', { type: 'accept' })}
            onPress={handlePostRestaurantReview}
            className="bg-white rounded-full px-8 h-12 items-center justify-center">
            <Text
              className={themeText({
                type: 'm16',
                class: `text-center text-black`,
              })}>
              Post Review
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default PostReview;
