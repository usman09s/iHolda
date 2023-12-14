import { Pressable, View } from 'react-native';
import Icons from 'components/Icons';

// TODO Add Types
const PostPreviewSideActionBar = ({onPressAudio, isRecording}: any) => (
  <View className="flex-1 absolute z-40 right-0 bottom-8 items-center self-center justify-center mr-6">
    <Pressable className="mb-8">
      <Icons.AaIcon />
    </Pressable>
    <Pressable className="mb-8">
      <Icons.MusicSignIcon />
    </Pressable>
    <Pressable onPress={onPressAudio}>
      <Icons.CircleMicrophoneIcon color={isRecording ? "#05a9f4": undefined} />
    </Pressable>
  </View>
);

export default PostPreviewSideActionBar;
