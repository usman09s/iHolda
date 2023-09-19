import { Pressable, Text } from 'react-native';
import { text } from 'theme/text';
import { width } from 'utils/helpers';

type Props = {
  title: string;
  isSelected?: boolean;
  onPressTabItem: () => void;
};

const LeaderBoardTabItem = ({ title, isSelected, onPressTabItem }: Props) => (
  <Pressable
    onPress={onPressTabItem}
    className="py-3 justify-center items-center border-b-white"
    style={{ width: width / 3, borderBottomWidth: isSelected ? 1 : 0 }}>
    <Text className={text({ type: 'm13', class: isSelected ? 'text-white' : 'text-white-o-60' })}>
      {title}
    </Text>
  </Pressable>
);

export default LeaderBoardTabItem;
