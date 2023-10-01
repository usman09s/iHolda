import { Image, Text, View } from 'react-native';
import { text } from 'theme/text';
import { units } from 'utils/helpers';

const PastJobItem = () => (
  <View className="flex-row mb-4 p-2.5 bg-black-o-025" style={{ height: units.vh * 20 }}>
    <View className="rounded-xl overflow-hidden mr-2.5 flex-1 h-36 self-start">
      <Image source={{ uri: 'https://i.pravatar.cc/300?img=2' }} className="h-36 w-32" />
    </View>
    <View className="flex-shrink justify-between flex-1 basis-2/6 h-36">
      <View className="flex-row justify-between">
        <View className="flex-shrink">
          <Text className={text({ type: 'b16', class: 'mb-2' })}>Carpet cleaner</Text>
          <Text className={text({ type: 'r13' })}>
            Carpet cleaner needed to clean a dirty carpet.
          </Text>
        </View>
        <View className="bg-green-300 items-center justify-center px-3 h-8 rounded-full">
          <Text className={text({ type: 'r12' })}>Accepted</Text>
        </View>
      </View>
      <View className="">
        <Text className={text({ type: 'r13' })}>Location: Buea, Cameroon</Text>
        <View className="flex-row mt-0.5 justify-between items-center">
          <View className="flex-row justify-between items-center">
            <Image
              source={{ uri: 'https://i.pravatar.cc/300?img=12' }}
              className="h-6 w-6 rounded-full"
            />
            <Text className={text({ type: 'r12', class: 'text-black-o-50 ml-1 mr-1' })}>
              Job Owner
            </Text>
          </View>
          <Text className={text({ type: 'm16', class: 'text-smokeGray ml-2' })}>2500Cfa</Text>
        </View>
      </View>
    </View>
  </View>
);

export default PastJobItem;
