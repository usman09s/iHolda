import { Image, KeyboardAvoidingView, Text, View } from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import { Camera, CameraType } from 'expo-camera';
import { NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import {
  allMomentsSelector,
  captionSelector,
  matchedUserSelector,
  selectedMomentSelector,
} from 'store/moments/momentsSelectors';

import AddedMomentList from '../components/AddedMomentList';
import MomentCameraBottom from '../components/MomentCameraBottom';
import MomentCameraHeader from '../components/MomentCameraHeader';
import RecordButton from '../components/RecordButton';
import { useSelfieActions } from '../hooks/useSelfieActions';
import { MomentsStackParamList } from '../MomentsStackNavigator';
import { MatchedUserType } from 'types/MomentsTypes';

const MomentsSelfieScreen = ({ route }: { route?: { params: MatchedUserType } }) => {
  const isFocused = useIsFocused();
  const caption = useSelector(captionSelector);
  const moments = useSelector(allMomentsSelector);
  const selectedMoment = useSelector(selectedMomentSelector);
  const matchedUser = route?.params;
  const { goBack, navigate } = useNavigation<NavigationProp<MomentsStackParamList>>();
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

  return (
    <View className="flex-1 bg-black px-4" style={{ paddingBottom: sizes.bottom }}>
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
        <View style={{ height: sizes.cameraHeight,zIndex: -1 }}>
          {isFocused && !selectedMoment && showCamera && (
            <View style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', zIndex: -1 }}>
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
                isLooping
                shouldPlay={true}
                className="w-full h-full"
                resizeMode={ResizeMode.COVER}
                source={{ uri: selectedMoment.localUri }}
              />
            ))}
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
        onPressNext={() => matchedUser && navigate('MomentsMood', { matchedUser })}
        sectionHeight={sizes.cameraBottomComponentHeight}
      />
    </View>
  );
};

export default MomentsSelfieScreen;
