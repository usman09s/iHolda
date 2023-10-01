import { Text, View } from 'react-native';
import { text } from 'theme/text';

const EducationItem = () => (
  <View className="mb-3 py-1.5 rounded-xl bg-[#faf9fa] justify-center">
    <View className="p-3">
      <Text className={text({ type: 'r14' })}>
        <Text className={text({ type: 'b14' })}>MSC Business Accounting</Text> at University of Buea
      </Text>
      <View className="flex-row justify-between mt-2">
        <Text className={text({ type: 'r14' })}>Postgraduate</Text>
        <Text>2020 - 2023, 3yrs</Text>
      </View>
    </View>
  </View>
);

const EducationSection = () => (
  <View className="mx-4 mt-5">
    <View className="pb-2">
      <Text className={text({ type: 'b20', class: 'text-black-o-50' })}>Education</Text>
    </View>
    <View className="mt-3">
      <EducationItem />
      <EducationItem />
      <EducationItem />
      <EducationItem />
    </View>
  </View>
);

export default EducationSection;
