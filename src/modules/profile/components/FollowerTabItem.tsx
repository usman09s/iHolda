import { Pressable, Text } from 'react-native';
import { text } from 'theme/text';
import { width } from 'utils/helpers';

type Props = {
  title: string;
  isSelected?: boolean;
  onPressTabItem: () => void;
};

const FolloweTabItem = ({ title, isSelected, onPressTabItem }: Props) => (
  <Pressable
    onPress={onPressTabItem}
    className="py-3 justify-center items-center"
    style={{
      width: width / 3,
      borderBottomWidth: 1,
      borderBottomColor: isSelected ? 'black' : 'lightgrey',
    }}>
    <Text className={text({ type: 'm13', class: isSelected ? 'text-black' : 'text-black-o-60' })}>
      {title}
    </Text>
  </Pressable>
);

export default FolloweTabItem;
