import { Text, View } from 'react-native';
import Input from 'components/Input';
import colors from 'theme/colors';
import { text } from 'theme/text';

const JobLocation = () => (
  <View className="w-full">
    <Text className={text({ type: 'm14', class: 'mb-5 text-center' })}>{'Job location'}</Text>
    <Input
      placeholder="Use current location"
      placeholderTextColor={colors['black-o-30']}
      customInputClass={text({
        type: 'r12',
        class: 'border-b1 border-black rounded-md w-full',
      })}
    />
    <Text className={text({ type: 'r12', class: 'my-5 text-center text-black-o-40' })}>
      {'or  input address below'}
    </Text>
    <View className="w-full">
      <Input
        statusText="Required*"
        placeholder="Town"
        placeholderTextColor={colors['black-o-30']}
        customInputClass={text({
          type: 'r12',
          class: 'border-b1 border-black rounded-md w-full mb-4',
        })}
      />
      <Input
        statusText="Optional"
        placeholder="Contact number"
        placeholderTextColor={colors['black-o-30']}
        customInputClass={text({
          type: 'r12',
          class: 'border-b1 border-black rounded-md w-full',
        })}
      />
    </View>
  </View>
);

export default JobLocation;
