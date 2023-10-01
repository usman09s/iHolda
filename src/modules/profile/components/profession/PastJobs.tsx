import { Text, View } from 'react-native';
import { text } from 'theme/text';

import PastJobItem from './PastJobItem';

const PastJobs = () => (
  <View>
    <Text className={text({ type: 'r15', class: 'text-start mb-2.5 mx-4 mt-10' })}>
      Past part-time jobs (12)
    </Text>
    <View className="mx-4">
      <PastJobItem />
      <PastJobItem />
      <PastJobItem />
    </View>
  </View>
);

export default PastJobs;
