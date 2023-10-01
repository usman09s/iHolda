import { Text, View } from 'react-native';
import { text } from 'theme/text';

const ProfessionalSkillItem = ({ title }: { title: string }) => (
  <View className="bg-gray-100 py-4 rounded-lg items-center px-3 justify-center mb-4 mr-2">
    <Text className={text({ type: 'r12', class: 'text-center' })}>{title}</Text>
  </View>
);

const ProfessionalSkills = () => (
  <View className="mt-8 mx-4 justify-between">
    <Text className={text({ type: 'b16' })}>Professional skills</Text>
    <View className="mt-3 flex-row flex-wrap">
      <ProfessionalSkillItem title="Financial Analysis" />
      <ProfessionalSkillItem title="Attention to Detail" />
      <ProfessionalSkillItem title="Communication" />
      <ProfessionalSkillItem title="Problem Solving" />
      <ProfessionalSkillItem title="Ethical Judgement" />
    </View>
  </View>
);

export default ProfessionalSkills;
