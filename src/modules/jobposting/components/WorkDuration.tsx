import { Text, View } from 'react-native';
import Input from 'components/Input';
import colors from 'theme/colors';
import { text } from 'theme/text';

import JobDetailOptionItemContainer from '../components/JobDetailOptionItemContainer';

const WorkDuration = () => (
  <View>
    <Text className={text({ type: 'm14', class: 'mb-5 text-center' })}>{'Work duration'}</Text>
    <View className="flex-wrap flex-row justify-between items-center">
      <JobDetailOptionItemContainer title="1hr" />
      <JobDetailOptionItemContainer title="2hrs" />
      <JobDetailOptionItemContainer title="3hrs" />
      <JobDetailOptionItemContainer title="4hrs" />
      <JobDetailOptionItemContainer title="5hrs" />
      <JobDetailOptionItemContainer title="8hrs" />
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
    <Text className={text({ type: 'm14', class: 'my-5 text-center' })}>
      {'Number of workers needed'}
    </Text>
    <View className="flex-wrap flex-row justify-between items-center">
      <JobDetailOptionItemContainer title="No" isSelected />
      <JobDetailOptionItemContainer title="Daily" />
      <JobDetailOptionItemContainer title="Weekly" />
      <JobDetailOptionItemContainer title="Monthly" />
    </View>
  </View>
);

export default WorkDuration;
