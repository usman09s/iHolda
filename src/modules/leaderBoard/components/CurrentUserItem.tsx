import { getImageLink } from 'modules/moments/helpers/imageHelpers';
import { Image, Text, View } from 'react-native';
import { text } from 'theme/text';
import { units } from 'utils/helpers';

type Props = {
  index: number;
  avatar: string;
  username: string;
};

const CurrentUserItem = ({ index, avatar, username }: Props) => (
  <View
    className="flex-row items-center pb-2 pt-2  border-black-o-20 px-6 bg-green-100"
    style={{ height: units.vh * 10 }}>
    <Text className={text({ type: 'm16', class: 'w-8' })}>{index}</Text>
    <View className="border-4 border-saffron rounded-full self-center ml-4 mr-4">
      <Image className="h-10 w-10 rounded-full" source={{ uri: getImageLink(avatar) }} />
    </View>
    <Text className={text({ type: 'm13', class: "text-[13px]" })}>{username}</Text>
  </View>
);

export default CurrentUserItem;
