import { Pressable, Text, View } from 'react-native';
import { text } from 'theme/text';
import { getHitSlop } from 'utils/helpers';

type Props = {
  activeIndex: number;
  onPressTabItem: (value: number) => () => void;
};

const JobPostingTemplatesTabs = ({ activeIndex, onPressTabItem }: Props) => (
  <View className="flex-row">
    <Pressable
      className="mr-4"
      onPress={onPressTabItem && onPressTabItem(0)}
      hitSlop={getHitSlop({ value: 15, right: 4 })}>
      <Text
        className={text({
          type: 'b18',
          class: activeIndex === 0 ? 'text-white' : 'text-white-o-30',
        })}>
        Private
      </Text>
    </Pressable>
    <Pressable
      onPress={onPressTabItem && onPressTabItem(1)}
      hitSlop={getHitSlop({ value: 15, left: 4 })}>
      <Text
        className={text({
          type: 'b18',
          class: activeIndex === 1 ? 'text-white' : 'text-white-o-30',
        })}>
        Community
      </Text>
    </Pressable>
  </View>
);

export default JobPostingTemplatesTabs;
