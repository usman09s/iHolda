import { forwardRef, memo, useImperativeHandle, useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import Icons from 'components/Icons';
import colors from 'theme/colors';
import { text } from 'theme/text';
import { getHitSlop, units } from 'utils/helpers';

type Props = {
  bottom: number;
  onBlurMessageInput: () => void;
  onFocusMessageInput: () => void;
  onSendMessage: (value: string) => void;
};

const MessageInputField = (
  { bottom, onSendMessage, onBlurMessageInput, onFocusMessageInput }: Props,
  ref: React.Ref<TextInput>,
) => {
  const inputValueRef = useRef('');
  const inputRef = useRef<TextInput>(null);
  const [showSend, setShowSend] = useState(false);

  const clear = () => inputRef.current?.clear();
  const isFocused = () => inputRef.current?.isFocused();

  const sendMessage = () => {
    onSendMessage(inputValueRef.current);
    inputValueRef.current = '';
  };

  const onChangeText = (value: string) => {
    inputValueRef.current = value;
    if (value.length > 0 && value.length < 2) {
      setShowSend(true);

      return;
    }

    if (value.length === 0) {
      setShowSend(false);
    }
  };

  useImperativeHandle(ref, () => ({
    clear,
    isFocused,
  }));

  return (
    <View
      style={{ paddingBottom: bottom ? bottom : 16 }}
      className="w-full bg-milkWhite flex-row items-center pt-4 px-4">
      <View className="flex-1 h-11 justify-center">
        <TextInput
          ref={inputRef}
          returnKeyType="send"
          onEndEditing={sendMessage}
          onChangeText={onChangeText}
          onBlur={onBlurMessageInput}
          onFocus={onFocusMessageInput}
          placeholder="Write your massage"
          style={{ paddingRight: units.vw * 15 }}
          placeholderTextColor={colors['black-o-40']}
          className={text({
            type: 'r15',
            class:
              'border-b1 border-black-o-30 flex-1 items-center  pr-14 text-black rounded-full px-4',
          })}
        />
        {showSend && (
          <Pressable
            onPress={sendMessage}
            className="absolute right-4"
            hitSlop={getHitSlop({ value: 16, left: 4 })}>
            <Text className={text({ type: 'm15' })}>Send</Text>
          </Pressable>
        )}
      </View>
      <Icons.PlusIcon color={'black'} className="mx-4" />
      <Icons.RecordAudioIcon color={'black'} />
    </View>
  );
};
export default memo(forwardRef(MessageInputField));
