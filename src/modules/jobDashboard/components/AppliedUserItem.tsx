import { Image, Text, View } from 'react-native';
import Icons from 'components/Icons';
import Rating from 'modules/profile/components/Rating';
import { text } from 'theme/text';
import { units } from 'utils/helpers';

const AppliedUserItem = () => (
  <View className=" bg-[#F9F9F9] flex-row mb-4 px-4 py-4" style={{ height: units.vh * 14 }}>
    <View className="item-center h-full justify-center">
      <Image
        source={{ uri: 'https://i.pravatar.cc/980?img=33' }}
        className="rounded-full"
        width={units.vh * 10}
        height={units.vh * 10}
      />
    </View>
    <View className="flex-1  ml-2 justify-between">
      <View className="flex-row justify-between">
        <View>
          <Text className={text({ type: 'b18' })}>Username</Text>
          <Text className={text({ type: 'r13', class: 'text-black-o-70' })}>Completed jobs</Text>
        </View>
        <Icons.HeartIcon color={'black'} />
      </View>
      <View className="flex-row items-center justify-between">
        <View>
          <Text className={text({ type: 'r13', class: '' })}>Location: Buea, Cameroon</Text>
          <View className="flex-row mt-1">
            <Text className={text({ type: 'r13', class: 'text-black-o-50 mr-1' })}>
              Job ratings
            </Text>
            <Rating
              point={4.5}
              customTextType="r13"
              customStar={<Icons.StarIcon14 />}
              customHalfStar={<Icons.HalfStarIcon14 />}
            />
          </View>
        </View>
        <View>
          <View className="bg-white shadow-md px-3 py-1.5 rounded-full">
            <Text>Review</Text>
          </View>
        </View>
      </View>
    </View>
  </View>
);

export default AppliedUserItem;
