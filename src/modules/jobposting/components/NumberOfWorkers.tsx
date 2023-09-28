import { Text, View } from 'react-native';
import Input from 'components/Input';
import colors from 'theme/colors';
import { text } from 'theme/text';

import JobDetailOptionItemContainer from '../components/JobDetailOptionItemContainer';

const NumberOfWorkers = () => (
  <View className="w-full">
    <Text className={text({ type: 'm14', class: 'mb-5 text-center' })}>
      {'Number of workers needed'}
    </Text>
    <View className="flex-wrap flex-row justify-between items-center">
      <JobDetailOptionItemContainer title="1" />
      <JobDetailOptionItemContainer title="2" />
      <JobDetailOptionItemContainer title="3" />
      <JobDetailOptionItemContainer title="5" />
      <JobDetailOptionItemContainer title="8" />
      <JobDetailOptionItemContainer title="10" />
      <JobDetailOptionItemContainer
        isBig
        isSelected
        customComponent={
          <Input
            placeholder="custom"
            keyboardType="numeric"
            placeholderTextColor={true ? colors['white-o-80'] : colors['black-o-60']}
            customInputClass={text({
              class: `border-0 w-full rounded-none text-${true ? 'white' : 'black'} text-center`,
              type: 'r15',
            })}
          />
        }
      />
    </View>
  </View>
);

export default NumberOfWorkers;
