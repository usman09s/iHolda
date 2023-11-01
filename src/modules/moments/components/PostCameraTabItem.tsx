import { PropsWithChildren } from 'react';
import { Pressable, Text, View } from 'react-native';
import { text } from 'theme/text';

type Props = PropsWithChildren & { isActive?: boolean; onPress?: () => void };

const PostCameraTabItem = ({ children, isActive, onPress }: Props) => (
  <Pressable
    onPress={onPress}
    className={`bg-${isActive ? 'white' : 'black'} rounded-full px-2.5 py-1 self-start ml-4`}>
    <Text
      className={text({
        type: isActive ? 'r14' : 'm14',
        class: isActive ? 'text-black' : 'text-white',
      })}>
      {children}
    </Text>
  </Pressable>
);

export default PostCameraTabItem;
