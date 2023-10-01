import { Text, View } from 'react-native';
import { text } from 'theme/text';

import Rating from '../components/Rating';

export const UserCommunityStatistic = ({ fullName }: { fullName: string }) => (
  <View className="mx-5 mt-7">
    <Text className={text({ type: 'm20', class: '' })}>{fullName}</Text>
    <View>
      <View className="flex-row mt-4 items-center">
        <Text className={text({ type: 'r14', class: 'mr-1 text-black-o-50' })}>
          Community Points:
        </Text>
        <Text className={text({ type: 'm16', class: 'bg-saffron text-white self-start px-2' })}>
          450
        </Text>
      </View>
      <View className="flex-row mt-3">
        <Text className={text({ type: 'r14', class: 'mr-1 text-black-o-50' })}>Job ratings</Text>
        <Rating point={4.5} customTextType="r14" />
        <Text className={text({ type: 'r14', class: 'mr-1 text-black-o-50 ml-1' })}>
          (24 reviews)
        </Text>
      </View>
      <View className="flex-row mt-3">
        <Text className={text({ type: 'r14', class: 'mr-1 text-black-o-50' })}>
          Location: <Text className="text-darkBlue">Buea, Cameron</Text>
        </Text>
      </View>
    </View>
    <Text className={text({ type: 'b16', class: 'mt-5 mb-1.5' })}>Overview</Text>
    <Text className={text({ type: 'r16', class: 'leading-[22px]' })}>
      I&apos;m a product manager with 2 years experience actively seeking full-time management
      roles. In the meantime, I&apos;m offering quick job services as side hustles, available to
      assist with various tasks.
    </Text>
  </View>
);

export default UserCommunityStatistic;
