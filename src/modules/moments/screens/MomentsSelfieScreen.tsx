import { ActivityIndicator, Image, KeyboardAvoidingView, Text, View } from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import { Camera, CameraType } from 'expo-camera';
import { NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  allMomentsSelector,
  captionSelector,
  matchedUserSelector,
  postMomentsParamsSelector,
  selectedMomentSelector,
} from 'store/moments/momentsSelectors';
import { Video as VideoCompressor, Image as ImageCompresor } from 'react-native-compressor';

import AddedMomentList from '../components/AddedMomentList';
import MomentCameraBottom from '../components/MomentCameraBottom';
import MomentCameraHeader from '../components/MomentCameraHeader';
import RecordButton from '../components/RecordButton';
import { useSelfieActions } from '../hooks/useSelfieActions';
import { MomentsStackParamList } from '../MomentsStackNavigator';
import { MatchedUserType } from 'types/MomentsTypes';
import { useEffect, useRef, useState } from 'react';
import { userSelector } from 'store/auth/userSelectors';
import mime from 'mime';
import Api from 'services/Api';
import { resetState } from 'store/moments/momentsSlice';
import colors from 'theme/colors';

const MomentsSelfieScreen = ({ route }: { route?: { params: MatchedUserType } }) => {
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const caption = useSelector(captionSelector);
  const moments = useSelector(allMomentsSelector);
  const selectedMoment = useSelector(selectedMomentSelector);
  const postMomentsParams = useSelector(postMomentsParamsSelector);
  const user = useSelector(userSelector);
  const matchedUser = route?.params;
  const { goBack, navigate, reset } = useNavigation<NavigationProp<MomentsStackParamList>>();
  const dispatch = useDispatch();
  const videoRef: React.LegacyRef<Video> = useRef(null);
  const {
    sizes,
    ratio,
    cameraRef,
    mediaType,
    showCamera,
    isRecording,
    setMediaType,
    onDeleteMoment,
    onChangeCaption,
    onSelectedMoment,
    recordTimeCounter,
    onPressRecordButton,
  } = useSelfieActions();

  useEffect(() => {
    if (!isFocused) videoRef.current?.pauseAsync();

    if (isFocused && selectedMoment && selectedMoment.type === 'VIDEO')
      videoRef.current?.playAsync();
  }, [isFocused]);

  async function postData(url = '', data: FormData) {
    setIsLoading(true);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data',
      },
      body: data,
    });
    setIsLoading(false);
    return { ...(await response.json()), status: response.status };
  }

  const getMedia = async () => {
    const metMedia = postMomentsParams.moments;
    let imageObject: any, videoObject: any;

    const compressedMedia: any[] = [];

    if (metMedia.length) {
      metMedia.forEach(async (element, index) => {
        if (element.type === 'PHOTO') {
          const imgRes = await ImageCompresor.compress(element.file, {
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
          compressedMedia.push(imageObject);
          if (metMedia.length - 1 === index) goToMomentsUpload(compressedMedia);
        }

        if (element.type === 'VIDEO') {
          const result = await VideoCompressor.compress(
            element.file,
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
          compressedMedia.push(videoObject);
          if (metMedia.length - 1 === index) goToMomentsUpload(compressedMedia);
        }
      });
    }
    // return compressedMedia;
  };

  const goToMomentsUpload = async () => {
    if (!matchedUser || !user?.user?._id) return;
    if (isLoading) return;

    let formdata = new FormData();

    const metMedia = postMomentsParams.moments;
    let imageObject: any, videoObject: any;

    if (metMedia.length) {
      metMedia.forEach(async (element, index) => {
        if (element.type === 'PHOTO') {
          const imgRes = await ImageCompresor.compress(element.file, {
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
          // compressedMedia.push(imageObject);
          formdata.append('post[media]', imageObject);

          if (metMedia.length - 1 === index) {
            // const media: any  = await getMedia();
            formdata.append('post[mediaType]', 'image');
           

            const moodScale = 1;

            if (postMomentsParams.caption) formdata.append('post[text]', postMomentsParams.caption);
            formdata.append('post[visibility]', 'Public');
            // formdata.append('post[subText]', '');
            formdata.append('users[0][user]', user.user?._id);
            formdata.append('users[1][user]', matchedUser?.user._id);
            formdata.append('metBefore', `${matchedUser.metBefore}`);
            // formdata.append('users', users);
            formdata.append('mood', (moodScale < 0 ? 1 : moodScale).toString());

            const resData = await postData(Api.baseUrl + 'met', formdata);

           
            if (resData.status !== 200) return alert('Something went wrong');
            reset({
              index: 0,
              routes: [{ name: 'MomentsUpload', params: matchedUser }],
            });
            dispatch(resetState());
          }
        }

        if (element.type === 'VIDEO') {
          const result = await VideoCompressor.compress(
            element.file,
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
          // compressedMedia.push(videoObject);
          formdata.append('post[media]', videoObject);
          if (metMedia.length - 1 === index) {
            // const media: any  = await getMedia();
            formdata.append('post[mediaType]', 'image');
           
            const moodScale = 1;

            if (postMomentsParams.caption) formdata.append('post[text]', postMomentsParams.caption);
            formdata.append('post[visibility]', 'Public');
            // formdata.append('post[subText]', '');
            formdata.append('users[0][user]', user.user?._id);
            formdata.append('users[1][user]', matchedUser?.user._id);
            formdata.append('metBefore', `${matchedUser.metBefore}`);
            // formdata.append('users', users);
            formdata.append('mood', (moodScale < 0 ? 1 : moodScale).toString());

            const resData = await postData(Api.baseUrl + 'met', formdata);

            if (resData.status !== 200) return alert('Something went wrong');
            reset({
              index: 0,
              routes: [{ name: 'MomentsUpload', params: matchedUser }],
            });
            dispatch(resetState());
          }
        }
      });
    }

    // // const media: any  = await getMedia();
    // formdata.append('post[mediaType]', 'image');
    // console.log('🚀 ~ file: MomentsSelfieScreen.tsx:140 ~ goToMomentsUpload ~ formdata:', formdata);

    // const moodScale = 1;

    // if (postMomentsParams.caption) formdata.append('post[text]', postMomentsParams.caption);
    // formdata.append('post[visibility]', 'Public');
    // // formdata.append('post[subText]', '');
    // formdata.append('users[0][user]', user.user?._id);
    // formdata.append('users[1][user]', matchedUser?.user._id);
    // formdata.append('metBefore', `${matchedUser.metBefore}`);
    // // formdata.append('users', users);
    // formdata.append('mood', (moodScale < 0 ? 1 : moodScale).toString());

    // const resData = await postData(Api.baseUrl + 'met', formdata);

    // console.log('🚀 ~ file: MomentsSelfieScreen.tsx:159 ~ goToMomentsUpload ~ resData:', resData);
    // console.log(
    //   '🚀 ~ file: MomentsMoodScreen.tsx:100 ~ postData ~ resData:',
    //   resData.data.met.post,
    // );
    // if (resData.status !== 200) return alert('Something went wrong');
    // reset({
    //   index: 0,
    //   routes: [{ name: 'MomentsUpload', params: matchedUser }],
    // });
    // dispatch(resetState());

    return;

    // mutate(formdata, {
    //   onSuccess: data => {
    //     reset({
    //       index: 0,
    //       routes: [{ name: 'MomentsUpload' }],
    //     });
    //     dispatch(resetState());
    //   },
    // });
  };

  return (
    <View className="flex-1 bg-black px-4" style={{ paddingBottom: sizes.bottom, paddingTop: 10 }}>
      <View
        style={{ marginTop: sizes.top }}
        className="overflow-hidden rounded-[40px]  mt-4 border-white border-2">
        <MomentCameraHeader
          goBack={goBack}
          matchedUserUsername={matchedUser?.user.userName || ''}
          selectedMomentId={selectedMoment?.id}
          onDeleteMoment={() => {
            selectedMoment && onDeleteMoment(selectedMoment);
          }}
        />
        {selectedMoment && isLoading?<View
          style={{ zIndex: 9999 }}
          className=" absolute h-full w-full justify-center items-center z-[999999]">
          <ActivityIndicator color={colors.saffron} size={'large'} />
        </View> : null}
        <View style={{ height: sizes.cameraHeight - 25, zIndex: -1 }}>
          {isFocused && !selectedMoment && showCamera && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
              }}>
              <Camera
                ratio={ratio}
                ref={cameraRef}
                autoFocus={false}
                type={CameraType.front}
                className="w-full h-full"
              />
            </View>
          )}

          {selectedMoment &&
            (selectedMoment.type === 'PHOTO' ? (
              <Image source={{ uri: selectedMoment.localUri }} className="w-full h-full" />
            ) : (
              <Video
                ref={videoRef}
                isLooping
                shouldPlay={true}
                className="w-full h-full"
                resizeMode={ResizeMode.COVER}
                source={{ uri: selectedMoment.localUri }}
              />
            ))}
          {/* {selectedMoment && isLoading ? (
            <View className="justify-center items-center z-[999999]">
              <ActivityIndicator color={colors.saffron} size={'large'} />
            </View>
          ) : null} */}
        </View>
        <AddedMomentList
          moments={moments}
          listHeight={sizes.cameraHeight}
          selectedMoment={selectedMoment}
        />
        {!selectedMoment?.id && (
          <RecordButton isRecording={isRecording} onPressRecord={onPressRecordButton} />
        )}
      </View>

      <MomentCameraBottom
        caption={caption}
        mediaType={mediaType}
        onPressQuiz={() => matchedUser && navigate('MomentsQuiz', { ...matchedUser })}
        onPressMediaType={setMediaType}
        selectedMoment={selectedMoment}
        onChangeCaption={onChangeCaption}
        onSelectedMoment={onSelectedMoment}
        onPressNext={() => goToMomentsUpload()}
        sectionHeight={sizes.cameraBottomComponentHeight}
      />
    </View>
  );
};

export default MomentsSelfieScreen;
