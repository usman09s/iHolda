import { Pressable, Text, View } from 'react-native';
import Icons from 'components/Icons';
import { text } from 'theme/text';
import { height, units } from 'utils/helpers';

type Props = {
  count: number;
  title: string;
  subTitle: string;
  onPress?: () => void;
};

const CommunityItem = ({ count, title, subTitle, onPress }: Props) => (
  <Pressable
    onPress={onPress}
    className="bg-slate-600 flex-row items-center px-6 py-5 rounded-xl justify-between mb-4">
    <View className="flex-row items-center">
      <View className="min-w-[24px] min-h-[24px] justify-center items-center bg-saffron rounded-full mr-3">
        <Text className={text({ class: 'text-black' })}>{count}</Text>
      </View>
      <View>
        <Text className={text({ class: 'text-white' })}>{title}</Text>
        <Text className={text({ class: 'text-white-o-60' })}>{subTitle}</Text>
      </View>
    </View>
    <View>
      <Icons.CaretRightIcon />
    </View>
  </Pressable>
);

// TODO: add types
const Community = ({ cp = 0, lastcp = 0 }: any) => (
  <View className="flex-1 bg-white pt-6 px-6" style={{ minHeight: height + 200 }}>
    <Text className={text({ type: 'b20', class: 'text-slate-400 mb-4' })}>
      Total{'\n'}
      Community points
    </Text>
    <View className="justify-center items-center">
      <View
        style={{ height: units.vw * 60, width: units.vw * 60 }}
        className="bg-slate-800 rounded-full justify-center items-center">
        <View
          style={{
            height: units.vw * 45,
            width: units.vw * 45,
            borderWidth: 4,
            borderColor: '#01ff30',
          }}
          className="rounded-full justify-center items-center">
          <View className="flex-row items-center">
            <Text className={text({ type: 'b30', class: 'text-white' })}>{cp}</Text>
            <View className="ml-2">
              <Icons.GreenTriangleIcon />
              <Text className={text({ type: 'm12', class: 'text-white' })}>+{lastcp}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>

    <View className="mt-5 mb-8">
      <Text className={text({ type: 'r18', class: 'text-black-o-30 text-center' })}>
        Level <Text className={text({ type: 'b26', class: 'text-black' })}>Bronze 👍</Text>
      </Text>
      <Text className={text({ type: 'r13', class: 'text-black px-7 text-center mt-3' })}>
        Total community points are based on the below activities.
      </Text>
    </View>
    <View>
      <CommunityItem title="Plastics" subTitle="Total plastic rescued" count={10} />
      <CommunityItem title="Community work" subTitle="Total plastic rescued" count={10} />
      <CommunityItem title="Meetups" subTitle="Total plastic rescued" count={10} />
      <CommunityItem title="Verification" subTitle="Total plastic rescued" count={10} />
      <CommunityItem title="Campaigns" subTitle="Total plastic rescued" count={10} />
    </View>
  </View>
);

export default Community;
