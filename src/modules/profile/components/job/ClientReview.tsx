import { Image, Text, View } from 'react-native';
import { text } from 'theme/text';

import Rating from '../Rating';

const ClientReview = () => (
  <View className="mt-6">
    <Text className={text({ type: 'm16' })}>Review from client</Text>
    <View className="flex-row items-center mt-4">
      <Image
        source={{ uri: 'https://i.pravatar.cc/1024?img=54' }}
        className="w-12 h-12 rounded-full mr-2"
      />
      <View>
        <Text className={text({ type: 'm16' })}>Undo Precious</Text>
        <View className="flex-row mt-0.5">
          <Text className={text({ type: 'r12', class: 'text-black-o-50 mr-1' })}>The Client</Text>
          <Rating point={4.5} />
        </View>
      </View>
    </View>
    <View>
      <Text className={text({ type: 'r14', class: 'text-[#191919] leading-[20px] mt-1' })}>
        An absolute gem in Buea! I entrusted my worn-out carpet to this expert for restoration, and
        they worked wonders. Quality craftsmanship at its best. From carpet repairs to restoration,
        they&apos;ve earned my trust and loyalty. Highly recommended
      </Text>
    </View>
  </View>
);

export default ClientReview;
