import { PropsWithChildren } from 'react';
import { Image, Text, View } from 'react-native';
import { text } from 'theme/text';

const JobInfoSection = ({ children }: PropsWithChildren) => (
  <View className="mt-5">
    <View className="flex-row items-center mx-4">
      <Image
        source={{ uri: 'https://i.pravatar.cc/1024?img=12' }}
        className="h-11 w-11 rounded-full border-2 border-blue"
      />
      <View className="ml-2">
        <Text className={text({ type: 'm16' })}>Emma De Gold</Text>
        <Text className={text({ type: 'r12', class: 'text-black-0-40' })}>Job poster</Text>
      </View>
    </View>
    <View className="mt-8 mx-4">
      <Text className={text({ type: 'b16' })}>Job description</Text>
      <Text className={text({ type: 'r14', class: 'mt-3' })}>
        Spend 5 days and 4 nights in one of the best islands in the world! Bask in the sun while
        walking in the white sand beach and enjoy the night partying at the popular seaside bars.
      </Text>
    </View>
    {children}
  </View>
);

export default JobInfoSection;
