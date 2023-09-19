import { FlatList, Image, Text, View } from 'react-native';
import Icons from 'components/Icons';
import { text } from 'theme/text';
import { height, width } from 'utils/helpers';

const Shared = () => (
  <View className="flex-1 bg-white pt-6 px-6" style={{ minHeight: height + 200 }}>
    <View className="flex-row justify-between">
      <View className="border-[0.4px] rounded-xl px-6 py-3" style={{ width: width / 2 - 32 }}>
        <Text className={text({ class: 'text-center', type: 'r13' })}>Met @bayuga</Text>
        <Text className={text({ class: 'text-center mt-7', type: 'b13' })}>19 times</Text>
      </View>
      <View className="border-[0.4px] rounded-xl px-6 py-3" style={{ width: width / 2 - 32 }}>
        <Text className={text({ class: 'text-center', type: 'r13' })}>Met @bayuga</Text>
        <Text className={text({ class: 'text-center mt-7', type: 'b13' })}>19 times</Text>
      </View>
    </View>
    <FlatList className="mt-6" data={[1, 2, 3, 4, 5, 6]} renderItem={({}) => <SharedItem />} />
  </View>
);

export default Shared;

const SharedItem = () => (
  <View className="flex-row justify-between bg-cultured px-4 py-3 mb-4 rounded-xl">
    <View className="flex-row ">
      <View className="flex-row">
        <View className="w-10 h-10 rounded-full border-[3px] border-saffron justify-center items-center">
          <View className="h-full w-full rounded-full border-[2px] border-white justify-center items-center">
            <Image
              source={{ uri: 'https://i.pravatar.cc/300?img=33' }}
              className="h-full w-full rounded-full"
            />
          </View>
        </View>
        <View className="w-10 h-10 rounded-full border-[3px] border-green-500 right-4  justify-center items-center">
          <View className="h-full w-full rounded-full border-[2px] border-white  justify-center items-center">
            <Image
              source={{ uri: 'https://i.pravatar.cc/300?img=33' }}
              className="h-full w-full rounded-full"
            />
          </View>
        </View>
      </View>
      <View>
        <Text className={text({ type: 'b16' })}>You and Bayuga met</Text>
        <Text className={text({ type: 'r12', class: 'mt-2' })}>Buea, Cameroon</Text>
      </View>
    </View>
    <View>
      <View className="flex-row justify-end mb-2">
        <Icons.CameraIcon />
        <Text className={text({ type: 'r10', class: 'text-right' })}>4x</Text>
      </View>
      <Text className={text({ type: 'r12' })}> 4 Jun 2023</Text>
    </View>
  </View>
);
