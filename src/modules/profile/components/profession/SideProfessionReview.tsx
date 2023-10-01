import { Image, ScrollView, Text, View } from 'react-native';
import { text } from 'theme/text';
import { units } from 'utils/helpers';

import Rating from '../Rating';

const SideProfessionReviewItem = () => (
  <View
    className="border-b1 rounded-xl p-4 justify-between mt-4 mr-4"
    style={{ height: units.vh * 16 }}>
    <View>
      <Text className={text({ type: 'm14' })}>Shoe repairer needed urgently</Text>
      <View className="flex-row mt-1.5">
        <Text className={text({ type: 'r12', class: 'text-black-o-50' })}>
          Location: Buea, Cameroon
        </Text>
        <View className="flex-row items-center ml-2">
          <View className="h-1 w-1 rounded-sm bg-smokeGray mr-1" />
          <Text className={text({ type: 'r12', class: 'text-black-o-50' })}>Sept 2023</Text>
        </View>
      </View>
    </View>
    <View className="flex-row items-center">
      <Image
        source={{ uri: 'https://i.pravatar.cc/1024?img=54' }}
        className="w-7 h-7 rounded-full mr-1"
      />
      <Text className={text({ type: 'r12', class: 'text-black-o-50 mr-1' })}>Job ratings</Text>
      <Rating point={4.5} />
      <Text className={text({ type: 'm13', class: 'text-smokeGray ml-2' })}>7500Cfa</Text>
    </View>
  </View>
);

const SideProfessionReview = () => (
  <View>
    <View className="flex-row justify-between mx-4 mt-12">
      <Text>Reviews</Text>
      <Text>View all</Text>
    </View>
    <ScrollView
      horizontal
      contentContainerStyle={{ paddingLeft: 24 }}
      showsHorizontalScrollIndicator={false}>
      <SideProfessionReviewItem />
      <SideProfessionReviewItem />
    </ScrollView>
  </View>
);

export default SideProfessionReview;
