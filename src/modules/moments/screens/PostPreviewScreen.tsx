import { ImageBackground, Pressable, View, Image, Text, ActivityIndicator } from 'react-native';
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
import mime from 'mime';

import PostPreviewSideActionBar from '../components/PostPreviewSideActionBar';
import { MomentsStackParamList } from '../MomentsStackNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { allMomentsSelector, postMomentsParamsSelector } from 'store/moments/momentsSelectors';
import { ResizeMode, Video } from 'expo-av';
import { useEffect, useRef, useState } from 'react';
import { resetState } from 'store/moments/momentsSlice';
import { PostScreenParams } from 'types/MomentsTypes';
import { useMutation } from 'react-query';
import Api from 'services/Api';
import { TEXT_POST_COLOR } from '../constants';

const PostPreviewScreen = ({ route }: { route?: { params: PostScreenParams } }) => {
  const [caption, setCaption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  console.log('~ isLoading:', isLoading);

  const { dispatch: dispatchNavigation, goBack } =
    useNavigation<NavigationProp<MomentsStackParamList>>();
  const { bottom } = useSafeAreaInsets();

  const { postType, text } = route ? route.params : { postType: 'PHOTO', text: '' };

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

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
      if (data.status !== 200) return alert('Something went wrong');
      console.log(data);
      dispatchNavigation(StackActions.popToTop());
      goBack();
    });
  };

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, []);

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
              <PostPreviewSideActionBar />
            </View>
          </View>
        ) : null}
      </View>
      <View
        className="flex-row w-full px-6 bg-black"
        style={{ paddingBottom: bottom || 16, paddingTop: bottom || 16 }}>
        <Input
          value={caption}
          onChangeText={setCaption}
          placeholder="Add caption"
          customInputClass="flex-1 mr-4"
        />
        <Pressable
          onPress={makePost}
          className="bg-blue rounded-full w-12 h-12 items-center justify-center">
          <Icons.ArrowLeftIcon color={'white'} className="rotate-180" />
        </Pressable>
      </View>
    </View>
  );
};

export default PostPreviewScreen;
