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
    <Text style={{ fontWeight: "600"}} className={text({ type: 'm13', class: isSelected || title === "Suggesstions" ? 'text-black' : 'text-[#808080]' })}>
      {title}
    </Text>
  </Pressable>
);

export default FolloweTabItem;
