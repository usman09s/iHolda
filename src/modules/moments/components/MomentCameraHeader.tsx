import { Text, View } from 'react-native';
import Header from 'components/Header/Header';
import Icons from 'components/Icons';
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
}: Props) => (
  <View className="absolute z-10 w-full">
    <Header
      customTopHeight={28}
      title={`Moments shared with ${matchedUserUsername}`}
      centerComponent={
        <View className="justify-center items-center left-0 right-0 top-0 bottom-0 absolute z-10">
          <Text className={text({ type: 'b12', class: 'text-white text-center' })}>
            Moments shared with{'\n'}
            {matchedUserUsername}
          </Text>
        </View>
      }
      onPressLeft={goBack}
      onPressRight={onDeleteMoment}
      leftComponent={<Icons.CrossIcon color="white" className="ml-4 z-20" />}
      rightComponent={
        selectedMomentId && <Icons.TrashIcon color="white" className="mr-5 z-20 bg-red-700" />
      }
    />
  </View>
);

export default MomentCameraHeader;
