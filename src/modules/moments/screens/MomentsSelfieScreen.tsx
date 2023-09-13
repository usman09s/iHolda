import { Image, Text, View } from 'react-native';
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

const MomentsSelfieScreen = () => {
  const isFocused = useIsFocused();
  const caption = useSelector(captionSelector);
  const moments = useSelector(allMomentsSelector);
  const selectedMoment = useSelector(selectedMomentSelector);
  const matchedUser = useSelector(matchedUserSelector);
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
          matchedUserUsername={matchedUser?.user.username || ''}
          selectedMomentId={selectedMoment?.id}
          onDeleteMoment={() => {
            alert('dd');
            selectedMoment && onDeleteMoment(selectedMoment);
          }}
        />
        <View style={{ height: sizes.cameraHeight }}>
          {isFocused && !selectedMoment && showCamera && (
            <Camera
              ratio={ratio}
              ref={cameraRef}
              autoFocus={false}
              type={CameraType.front}
              className="w-full h-full z-40"
            />
          )}
          {!selectedMoment?.id && (
            <Text className="absolute text-white z-10 text-32 items-center top-0 bottom-0 left-0 right-0 text-center mt-44">
              {recordTimeCounter}
            </Text>
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
        onPressMediaType={setMediaType}
        selectedMoment={selectedMoment}
        onChangeCaption={onChangeCaption}
        onSelectedMoment={onSelectedMoment}
        onPressNext={() => navigate('MomentsMood')}
        sectionHeight={sizes.cameraBottomComponentHeight}
      />
    </View>
  );
};

export default MomentsSelfieScreen;
