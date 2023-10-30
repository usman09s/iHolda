import { ImageBackground, Pressable, View, Image, Text } from 'react-native';
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

  const { dispatch: dispatchNavigation, goBack } =
    useNavigation<NavigationProp<MomentsStackParamList>>();
  const { bottom } = useSafeAreaInsets();

  const { mutate, isLoading } = useMutation(Api.createPost);

  const { postType, text } = route ? route.params : { postType: 'PHOTO', text: '' };

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const postMomentsParams = useSelector(postMomentsParamsSelector);
  const moments = useSelector(allMomentsSelector);

  const makePost = () => {
    let formdata = new FormData();
    const mediaUri = moments[0].localUri;
    const mediaType = moments[0].type.toLowerCase();
    const media: any = {
      uri: mediaUri,
      type: mediaType,
      name: 'moment.jpeg',
    };

    formdata.append('visibility', 'Public');
    formdata.append('media', media, 'file');
    formdata.append('subText', '');
    formdata.append('hexCode', TEXT_POST_COLOR);
    formdata.append('text', postMomentsParams.caption);

    mutate(formdata, {
      onSuccess: data => {
        console.log('🚀 ~ file: PostPreviewScreen.tsx:59 ~ makePost ~ data:', data);
        return;
        dispatchNavigation(StackActions.popToTop());
        goBack();
      },
      onError: err => {
        console.log('🚀 ~ file: PostPreviewScreen.tsx:63 ~ makePost ~ err:', err);
      },
    });
  };

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, []);

  return (
    <View className="flex-1 bg-black justify-center ">
      <View style={{ flex: 1, width: '100%', zIndex: 9999 }}>
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
                  className={`w-full h-full bg-[${TEXT_POST_COLOR}] justify-center items-center`}>
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
        className="flex-row w-full px-6"
        style={{ marginBottom: bottom || 16, marginTop: bottom || 16 }}>
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
