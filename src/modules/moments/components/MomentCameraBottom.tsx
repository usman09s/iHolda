import { KeyboardAvoidingView, Pressable, Text, View } from 'react-native';
import Icons from 'components/Icons';
import Input from 'components/Input';
import { text } from 'theme/text';
import { MomentType } from 'types/MomentsTypes';
import { getHitSlop } from 'utils/helpers';

type Props = {
  caption: string;
  sectionHeight: number;
  onPressQuiz: () => void;
  onPressNext: () => void;
  selectedMoment?: MomentType;
  onSelectedMoment: () => void;
  mediaType: 'VIDEO' | 'PHOTO' | 'QUIZ';
  onChangeCaption: (value: string) => void;
  onPressMediaType: (value: 'VIDEO' | 'PHOTO' | 'QUIZ') => void;
};

const MomentCameraBottom = ({
  caption,
  mediaType,
  onPressNext,
  onPressQuiz,
  sectionHeight,
  selectedMoment,
  onChangeCaption,
  onSelectedMoment,
  onPressMediaType,
}: Props) => (
  <>
    {selectedMoment && (
      <KeyboardAvoidingView
        behavior="position"
        contentContainerStyle={{ flex: 1, backgroundColor: '' }}
        className="flex-1 flex-row w-full justify-center items-center mt-2">
        <View className="justify-center items-center" style={{ height: sectionHeight }}>
          <View className="flex-row">
            <Input
              value={caption}
              placeholder="Add caption"
              onChangeText={onChangeCaption}
              leftIcon={<Icons.TakePhotoIcon />}
              onPressLeftIcon={() => onSelectedMoment()}
              customInputClass="flex-1 mr-4 bg-black"
            />
            <Pressable
              onPress={onPressNext}
              className="w-12 h-12 justify-center items-center rounded-full bg-blue self-end"
              hitSlop={getHitSlop({ value: 12 })}>
              <Icons.ArrowLeftIcon color={'white'} className="rotate-180" />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    )}
    {!selectedMoment && (
      <View>
        <View className="flex-row w-full justify-between  mt-5 ">
          <View className="flex-row pl-8">
            <Pressable
              onPress={() => {
                onPressQuiz();
                onPressMediaType('VIDEO');
              }}>
              <Text
                className={text({
                  type: 'm18',
                  class: mediaType === 'QUIZ' ? 'text-blue pr-4' : 'text-white pr-4',
                })}>
                Quiz
              </Text>
            </Pressable>
            <Pressable onPress={() => onPressMediaType('VIDEO')}>
              <Text
                className={text({
                  type: 'm18',
                  class: mediaType === 'VIDEO' ? 'text-blue pr-4' : 'text-white pr-4',
                })}>
                Video
              </Text>
            </Pressable>
            <Pressable onPress={() => onPressMediaType('PHOTO')}>
              <Text
                className={text({
                  type: 'm18',
                  class: mediaType === 'PHOTO' ? 'text-blue' : 'text-white pr-4',
                })}>
                Photo
              </Text>
            </Pressable>
          </View>
          {/* <Pressable onPress={onPressNext}>
            <Text className={text({ type: 'm18', class: 'text-white mr-5 text-white-o-60' })}>
              Next
            </Text>
          </Pressable> */}
        </View>
      </View>
    )}
  </>
);

export default MomentCameraBottom;
