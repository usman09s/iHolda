import { TouchableOpacity, View } from 'react-native';

type Props = {
  isRecording: boolean;
  onPressRecord: () => void;
};

const RecordButton = ({ isRecording, onPressRecord }: Props) => (
  <TouchableOpacity
    onPress={onPressRecord}
    className="w-20 h-20 bg-white self-center rounded-full absolute bottom-4 justify-center items-center z-20">
    <View
      className={`w-[70px] h-[70px] ${
        isRecording ? ' bg-red-600' : 'bg-blue'
      } self-center rounded-full`}
    />
  </TouchableOpacity>
);

export default RecordButton;
