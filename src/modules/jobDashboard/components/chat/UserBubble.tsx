import { Text, View } from 'react-native';
import dayjs from 'dayjs';
import { text } from 'theme/text';
import { width } from 'utils/helpers';

type Props = {
  index: number;
  message: string;
  isCurrentUser: boolean;
};

const UserBubble = ({ isCurrentUser, message, index }: Props) =>
  isCurrentUser ? (
    <View
      className="bg-[#7AFF97] rounded-lg py-2 px-2.5 mb-3 self-end"
      style={{ width: width / 1.7 }}>
      <Text className={text({ type: 'r15' })}>
        {index}-{message}
      </Text>
      <Text className={text({ type: 'r10', class: 'mt-5 text-right pr-3' })}>
        {dayjs().format('HH:mm A').toLowerCase()}
      </Text>
    </View>
  ) : (
    <View className="bg-[#F0F0F0] rounded-lg py-2 px-2.5 mb-3" style={{ width: width / 1.7 }}>
      <Text className={text({ type: 'r15' })}>
        {index}-{message}
      </Text>
      <Text className={text({ type: 'r10', class: 'mt-5 text-left pr-3' })}>
        {dayjs().format('HH:mm A').toLowerCase()}
      </Text>
    </View>
  );

export default UserBubble;
