import { Text, View } from 'react-native';
import Input from 'components/Input';
import colors from 'theme/colors';
import { text } from 'theme/text';

import JobDetailOptionItemContainer from '../components/JobDetailOptionItemContainer';

const JobPayment = () => (
  <View className="w-full">
    <Text className={text({ type: 'm14', class: 'mb-5 text-center' })}>{'Input payment'}</Text>
    <View className="flex-wrap flex-row justify-between items-center">
      <JobDetailOptionItemContainer title="2500" />
      <JobDetailOptionItemContainer title="1000" />
      <JobDetailOptionItemContainer title="5000" />
      <JobDetailOptionItemContainer title="10000" />
      <JobDetailOptionItemContainer title="15000" />
      <JobDetailOptionItemContainer title="20000" />
      <JobDetailOptionItemContainer
        isBig
        customComponent={
          <Input
            placeholder="custom"
            keyboardType="numeric"
            placeholderTextColor={false ? colors['white-o-80'] : colors['black-o-60']}
            customInputClass={text({
              class: `border-0 w-full rounded-none text-${false ? 'white' : 'black'} text-center`,
              type: 'r15',
            })}
          />
        }
      />
    </View>
  </View>
);

export default JobPayment;
