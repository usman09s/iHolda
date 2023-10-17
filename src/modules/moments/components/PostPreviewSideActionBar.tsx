import { Pressable, View } from 'react-native';
import Icons from 'components/Icons';

const PostPreviewSideActionBar = ({}) => (
  <View className="flex-1 absolute z-40 right-0 bottom-8 items-center self-center justify-center mr-6">
    <Pressable className="mb-8">
      <Icons.AaIcon />
    </Pressable>
    <Pressable className="mb-8">
      <Icons.MusicSignIcon />
    </Pressable>
    <Pressable>
      <Icons.CircleMicrophoneIcon />
    </Pressable>
  </View>
);

export default PostPreviewSideActionBar;
