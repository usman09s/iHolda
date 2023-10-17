import { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';
import { text } from 'theme/text';

type Props = PropsWithChildren & { isActive?: boolean };

const PostCameraTabItem = ({ children, isActive }: Props) => (
  <View
    className={`bg-${isActive ? 'white' : 'black'} rounded-full px-${
      isActive ? '3.5' : '2'
    } py-1 self-start ml-4`}>
    <Text
      className={text({
        type: isActive ? 'r14' : 'm14',
        class: isActive ? 'text-black' : 'text-white',
      })}>
      {children}
    </Text>
  </View>
);

export default PostCameraTabItem;
