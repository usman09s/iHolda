import { Pressable, Text, View } from 'react-native';
import Icons from 'components/Icons';
import { text } from 'theme/text';

type JobDetailItemProps = {
  title: string;
  value: string;
  onPressJobDetailItem: () => void;
};

const JobDetailItem = ({ title, value, onPressJobDetailItem }: JobDetailItemProps) => (
  <Pressable
    onPress={onPressJobDetailItem}
    className="flex-row justify-between px-5 pr-2 py-3 items-center border-b-[0.3px] border-black-o-20 mx-4 mb-2.5">
    <Text className={text({ class: 'mr-3 text-black' })}>{title}</Text>
    <View className="flex-row justify-center items-center">
      <Text className={text({ class: 'mr-3 text-black-o-50' })}>{value}</Text>
      <Icons.CaretRightIcon />
    </View>
  </Pressable>
);

export default JobDetailItem;
