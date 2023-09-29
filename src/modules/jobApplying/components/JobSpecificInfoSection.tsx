import { Text, View } from 'react-native';
import Icons from 'components/Icons';
import { text } from 'theme/text';

type Props = {
  index: number;
  title: string;
  value: string;
  icon: React.ReactNode;
};

const JobSpecificInfoItem = ({ index, title, value, icon }: Props) => (
  <View className={`flex-row justify-between p-4 bg-${index % 2 === 0 ? 'white' : 'gray-100'}`}>
    <View className="flex-row  items-center">
      {icon && icon}
      <Text className={text({ type: 'r12', class: 'ml-2 text-black-o-70' })}>{title}</Text>
    </View>
    <Text>{value}</Text>
  </View>
);

const JobSpecificInfoSection = () => (
  <View className="mt-10">
    <JobSpecificInfoItem
      index={1}
      title="Start time"
      value={'5pm, Today'}
      icon={<Icons.CalendarIcon />}
    />
    <JobSpecificInfoItem
      index={2}
      value={'2 hours'}
      title="Work duration"
      icon={<Icons.DurationIcon />}
    />
    <JobSpecificInfoItem
      index={3}
      value={'3/5'}
      title="No. of workers"
      icon={<Icons.NoOfWorkersIcon />}
    />
    <JobSpecificInfoItem
      index={4}
      title="Payment"
      value={'25000cfa'}
      icon={<Icons.NoOfWorkersIcon />}
    />
    <JobSpecificInfoItem
      index={3}
      value={'+10'}
      title="Community score"
      icon={<Icons.GreenHeartIcon />}
    />
  </View>
);

export default JobSpecificInfoSection;
