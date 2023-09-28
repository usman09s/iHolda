import { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Modal, Pressable, View } from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from 'components/Button';

type Props = {
  visible: boolean;
  onClose: () => void;
  onPressDone: () => void;
} & PropsWithChildren;

const JobPostingSelectOptionModal = ({ visible, onClose, children, onPressDone }: Props) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <Modal visible={visible} onRequestClose={onClose} transparent className="flex-1">
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <Pressable onPress={onClose} className="flex-1 justify-end items-end bg-black-o-50">
          <Animated.View
            entering={SlideInDown}
            exiting={SlideOutDown}
            className="bg-white rounded-xl w-full justify-start rounded-b-none">
            <Pressable onPress={() => null} className="justify-center items-center p-6 flex-grow">
              {children && children}
              <Button title="Done" customContainer="px-20 py-3 mt-16" onPress={onPressDone} />
              <View style={{ height: bottom || 16 }} />
            </Pressable>
          </Animated.View>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default JobPostingSelectOptionModal;
