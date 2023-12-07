import {
  ImageBackground,
  Pressable,
  View,
  Image,
  Text,
  ActivityIndicator,
  TouchableOpacity,
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

const PostReview = ({ route }: { route?: { params: PostScreenParams } }) => {
  const [caption, setCaption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
//   console.log('~ isLoading:', isLoading);
  // const [recording, setRecording] = useState<Audio.Recording | undefined>();
  const [isRecording, setIsRecording] = useState(false);
  const [selectedRating, setSelectedRating] = useState(4);

  const isKeyboardVisible = useKeyboardVisible();

  const { dispatch: dispatchNavigation, goBack, navigate } =
    useNavigation<NavigationProp<MomentsStackParamList>>();
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

  const makePost = () => {
    if (isLoading) return;

    let formdata = new FormData();
    const mediaUri = moments[0]?.localUri;
    const mediaType = moments[0]?.type;

    let imageObject, videoObject;

    if (mediaUri) {
      const imageUri = 'file:///' + mediaUri.split('file:/').join('');

      imageObject = {
        name: mediaUri.split('/').pop(),
        type: mime.getType(imageUri),
        uri: mediaUri,
      };

      const newVideoUri = 'file:///' + mediaUri.split('file:/').join('');

      videoObject = {
        name: mediaUri.split('/').pop(),
        height: 1920,
        width: 1080,
        type: mime.getType(newVideoUri),
        uri: mediaUri,
      };
    }

    const media: any = mediaType === 'PHOTO' ? imageObject : videoObject;

    formdata.append('visibility', 'Public');
    if (media) formdata.append('media', media);
    if (caption) formdata.append('subText', caption);
    formdata.append('hexCode', TEXT_POST_COLOR);
    if (postCaption) formdata.append('text', postCaption);

    postData(Api.baseUrl + 'post', formdata).then(data => {
      console.log('🚀 ~ file: PostPreviewScreen.tsx:100 ~ postData ~ data:', data);
      if (data.status !== 200) return alert('Something went wrong');
      console.log(data);
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
              <View className="bottom-2 absolute w-full justify-center items-center px-5">
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
                <Input
                  onFocus={() => console.log('focus received')}
                  onBlur={() => console.log('focus lost')}
                  value={caption}
                  onChangeText={setCaption}
                  placeholder="Write review here"
                  customInputClass="w-full"
                />
              </View>
              {/* <PostPreviewSideActionBar onPressAudio={handleAudioPress} /> */}
            </View>
          </View>
        ) : null}
      </View>
      {!isKeyboardVisible && <View
        className="flex-row w-full px-6 bg-black justify-center"
        style={{ paddingBottom: bottom || 16, paddingTop: bottom || 16 }}>
        
        <Pressable
          onPress={() => navigate("ReviewSuccess", {type: "accept"})}
          className="bg-white rounded-full px-8 h-12 items-center justify-center">
          <Text
            className={themeText({
              type: 'm16',
              class: `text-center text-black`,
            })}>
            Post Review
          </Text>
        </Pressable>
      </View>}
    </View>
  );
};

export default PostReview;
