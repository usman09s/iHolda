import { Pressable, Text, View } from 'react-native';
import Header from 'components/Header/Header';
import Icons from 'components/Icons';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { setSelectedMoment } from 'store/moments/momentsSlice';
import { text } from 'theme/text';

type Props = {
  goBack: () => void;
  selectedMomentId?: number;
  matchedUserUsername: string;
  onDeleteMoment: () => void;
};

const MomentCameraHeader = ({
  goBack,
  onDeleteMoment,
  selectedMomentId,
  matchedUserUsername,
}: Props) => {
  const dispatch = useAppDispatch();

  return (
    <View className="absolute z-10 w-full">
      <Header
        customTopHeight={20}
        title={`Moments shared with ${matchedUserUsername}`}
        centerComponent={
          <Pressable
            onPress={() => dispatch(setSelectedMoment(undefined))}
            className="justify-center items-center left-0 right-0 top-0 bottom-0 absolute">
            <Text className={text({ type: 'b12', class: 'text-white text-center' })}>
              Moments shared with{'\n'}
              {matchedUserUsername}
            </Text>
          </Pressable>
        }
        onPressLeft={goBack}
        onPressRight={onDeleteMoment}
        leftComponent={<Icons.CrossIcon color="white" className="ml-4" />}
        rightComponent={selectedMomentId && <Icons.TrashIcon color="white" className="mr-5" />}
      />
    </View>
  );
};

export default MomentCameraHeader;
