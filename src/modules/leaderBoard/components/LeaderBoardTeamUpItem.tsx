import { getImageLink } from 'modules/moments/helpers/imageHelpers';
import { Image, Text, View } from 'react-native';
import { text } from 'theme/text';
import { units } from 'utils/helpers';

type Props = {
  index: number;
  customContainerClass?: string;
  avatar: string;
  avatar2: string;
  username: string;
  username2: string;
  point: any;
};

const LeaderBoardTeamUpItem = ({
  index,
  customContainerClass,
  avatar,
  avatar2,
  username,
  username2,
  point
}: Props) => (
  <View
    style={{ height: units.vh * 10 }}
    className={`flex-row items-center justify-between mb-1.5 mt-1.5 px-6 mx-2 rounded-xl bg-cultured ${customContainerClass}`}>
    <View className="flex-row items-center">
      <Text className={text({ type: 'm16', class: 'w-8' })}>{index + 4}</Text>
      <View className="flex-row">
        <View className="border-[3px] border-saffron rounded-full left-2">
          <View className="border-[2px] border-white rounded-full self-center">
            <Image source={{ uri: getImageLink(avatar) }} className="h-10 w-10 rounded-full" />
          </View>
        </View>
        <View className="border-[3px] border-green-500 rounded-full right-2">
          <View className="border-[2px] border-white rounded-full self-center">
            <Image source={{ uri: getImageLink(avatar2) }} className="h-10 w-10 rounded-full" />
          </View>
        </View>
      </View>
      <Text className={text({ type: 'm13' })}>
        {username}
        {' & '}
        {username2}
      </Text>
    </View>
    <Text className={text({ type: 'b13', class: 'mb-2' })}>{point}x</Text>
  </View>
);

export default LeaderBoardTeamUpItem;
