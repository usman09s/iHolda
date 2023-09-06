import { Text, View } from 'react-native';
import Button from 'components/Button';
import Header from 'components/Header/Header';
import Icons from 'components/Icons';
import { text } from 'theme/text';

const PlasticDeliveredDetailsScreen = () => (
  <View className="bg-milkWhite px-7 flex-1">
    <Header />
    <Text className={text({ type: 'r15', class: 'text-center' })}>60 successfully delivered</Text>
    <View className="w-15 h-15 rounded-full bg-green-500 self-center p-6 mt-20">
      <Icons.TickIcon />
    </View>
    <Button title="655Cfa" customContainer="bg-slate-800 mt-12" />
    <Text className={text({ type: 'b26', class: 'text-center my-4' })}>&</Text>
    <Button title="100 CP" customContainer="bg-green-600" />
    <Text className={text({ type: 'l16', class: 'text-center mt-12' })}>
      will be credited into your accounts
    </Text>
  </View>
);

export default PlasticDeliveredDetailsScreen;
