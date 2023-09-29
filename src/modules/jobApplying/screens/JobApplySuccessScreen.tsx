import { Text, View } from 'react-native';
import Button from 'components/Button';
import Icons from 'components/Icons';
import { text } from 'theme/text';

const JobApplySuccessScreen = () => (
  <View className="flex-1 bg-white justify-evenly items-center">
    <View>
      <Text>Job completed successfully</Text>
      <View className="bg-green-400 w-14 h-14 rounded-full items-center justify-center self-center mt-10">
        <Icons.TickIcon />
      </View>
    </View>
    <View className="mx-7">
      <Text className={text({ type: 'b26', class: 'text-center mb-4' })}>Pay</Text>
      <Button title="2500cfa" customContainer="px-20" />
      <Text className={text({ type: 'r12', class: 'text-center mb-4 mt-4' })}>
        You will receive your payment once the job poster confirms the job. This should take a
        maximum of 2 hours.
      </Text>
    </View>
    <View>
      <Button title="Close" customContainer="px-12 py-3 bg-darkBlue" />
    </View>
  </View>
);

export default JobApplySuccessScreen;
