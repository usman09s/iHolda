import { Image, Text, View } from 'react-native';
import BorderedText from 'modules/feed/components/BorderedText';
import { text } from 'theme/text';
import { width } from 'utils/helpers';

type Props = { index: number };

const ProfilePostItem = ({ index }: Props) => (
  <View
    style={[
      {
        height: width / 2.4,
        width: width / 3,
        marginRight: 2,
        marginBottom: 2,
        overflow: 'hidden',
      },
    ]}>
    <Image className="h-full w-full" source={{ uri: 'https://i.pravatar.cc/300?img=' + index }} />
    <View className="absolute w-10 z-20 right-4 top-2 items-center justify-center">
      <BorderedText size={30}>9</BorderedText>
      <Text className={text({ type: 'b12', class: 'text-white text-center' })}>Slides</Text>
    </View>
    <View className="absolute z-20 bottom-0 left-0 pl-2 py-2 w-full flex-row overflow-hidden items-center bg-black-o-20">
      <View className="flex-row items-center">
        <View className="rounded-full border-2 border-saffron">
          <View className="rounded-full border-2 border-white">
            <Image
              source={{ uri: 'https://i.pravatar.cc/300?img=12' }}
              className="rounded-full h-6 w-6 "
            />
          </View>
        </View>
        <View className="overflow-hidden rounded-full border-2 border-green-500 right-2">
          <View className="overflow-hidden rounded-full border-2 border-white ">
            <Image
              source={{ uri: 'https://i.pravatar.cc/300?img=13' }}
              className=" rounded-full h-6 w-6"
            />
          </View>
        </View>
      </View>
      <Text numberOfLines={1} className={text({ type: 'b10', class: 'w-1/2 text-white' })}>
        with Bayuga
      </Text>
    </View>
  </View>
);

export default ProfilePostItem;
