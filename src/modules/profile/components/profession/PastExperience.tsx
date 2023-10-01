import { Text, View } from 'react-native';
import { text } from 'theme/text';

const PastExperienceItem = () => (
  <View className="mb-3 py-1.5 rounded-xl bg-[#faf9fa]">
    <View className="px-2">
      <Text className={text({ type: 'm16' })}>Senior Chartered Accountant</Text>
      <View className="flex-row justify-between mb-5">
        <Text className={text({ type: 'r15' })}>
          at <Text className="text-[#056DFA]">Sultan Bridge</Text>
        </Text>
        <Text>2020 - 2023, 3yrs</Text>
      </View>
    </View>
    <View className="pl-4 pr-2">
      <View className="flex-row items-start mb-2">
        <View className="h-1.5 w-1.5 rounded-md bg-black top-1 mr-1.5" />
        <Text className={text({ type: 'r14', class: 'leading-[16px]' })}>
          Expertly managed financial records and audits for clients.
        </Text>
      </View>
      <View className="flex-row items-start mb-2">
        <View className="h-1.5 w-1.5 rounded-md bg-black top-1 mr-1.5" />
        <Text className={text({ type: 'r14', class: 'leading-[16px]' })}>
          Delivered strategic financial advice, optimizing client outcomes.
        </Text>
      </View>
      <View className="flex-row items-start mb-2">
        <View className="h-1.5 w-1.5 rounded-md bg-black top-1 mr-1.5" />
        <Text className={text({ type: 'r14', class: 'leading-[16px]' })}>
          Facilitated software implementation, enhancing operational efficiency.{' '}
        </Text>
      </View>
    </View>
  </View>
);

const PastExperience = () => (
  <View className="mx-4">
    <View className="border-b-b1 border-black-o-10 pb-2">
      <Text className={text({ type: 'b20', class: 'text-black-o-50' })}>Past experience</Text>
    </View>
    <View className="mt-4">
      <PastExperienceItem />
      <PastExperienceItem />
      <PastExperienceItem />
      <PastExperienceItem />
    </View>
  </View>
);

export default PastExperience;
