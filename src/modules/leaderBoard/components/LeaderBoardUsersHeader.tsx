import { Image, Text, View } from 'react-native';
import Button from 'components/Button';
import { text } from 'theme/text';
import { units } from 'utils/helpers';

const LeaderBoardUsersHeader = () => (
  <View className="bg-black">
    <View>
      <Button
        title="Price : X00,000"
        type="solid"
        customContainer="bg-saffron self-center px-7 rounded-md py-3 mt-5 mb-4"
      />
      <Text className={text({ type: 'r13', class: 'text-white-o-80 text-center px-4 mb-3' })}>
        Ranking is done based on the number of people you meet physically and shared a moment with.
      </Text>
    </View>
    <View>
      <View className="items-center">
        <View className="border-4 border-white rounded-full self-center">
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=33' }}
            className="h-16 w-16 rounded-full"
          />
          <View className="absolute -bottom-3 self-center z-20 w-6 h-6 rounded-full bg-black justify-center items-center border-2 border-saffron">
            <Text className={text({ type: 'b12', class: 'text-white' })}>1</Text>
          </View>
        </View>
        <Text className={text({ type: 'm12', class: 'text-white mt-2.5' })}>@john</Text>
        <View className="bg-extraLightBlue px-5 py-0.5 rounded-md justify-center items-center mt-1.5">
          <Text className={text({ type: 'm12', class: 'text-black' })}>22000</Text>
        </View>
      </View>
      <View
        className="flex-row justify-between bottom-6"
        style={{ marginHorizontal: units.vw * 12 }}>
        <View className="justify-center items-center">
          <View className="border-2 border-white rounded-full">
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=34' }}
              className="h-10 w-10 rounded-full"
            />
            <View className="absolute -bottom-4 self-center z-20 w-6 h-6 rounded-full bg-black justify-center items-center border-2 border-white">
              <Text className={text({ type: 'b12', class: 'text-white' })}>2</Text>
            </View>
          </View>
          <Text className={text({ type: 'm12', class: 'text-white mt-4' })}>@john</Text>
          <View className="bg-extraLightBlue px-3 py-0.5 rounded-md justify-center items-center mt-1.5">
            <Text className={text({ type: 'm12', class: 'text-black' })}>22000</Text>
          </View>
        </View>

        <View className="justify-center items-center">
          <View className="border-2 border-white rounded-full ">
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=36' }}
              className="h-10 w-10 rounded-full"
            />
            <View className="absolute -bottom-4 self-center z-20 w-6 h-6 rounded-full bg-black justify-center items-center border-2 border-white">
              <Text className={text({ type: 'b12', class: 'text-white' })}>3</Text>
            </View>
          </View>
          <Text className={text({ type: 'm12', class: 'text-white mt-4' })}>@john</Text>
          <View className="bg-extraLightBlue px-3 py-0.5 rounded-md justify-center items-center mt-1.5">
            <Text className={text({ type: 'm12', class: 'text-black' })}>22000</Text>
          </View>
        </View>
      </View>
    </View>
  </View>
);

export default LeaderBoardUsersHeader;
