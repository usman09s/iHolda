import { Text, View } from 'react-native';
import { text } from 'theme/text';

type Props = {
  totalPrice: number;
  totalPlastic: number;
};

const TotalResultBar = ({ totalPlastic, totalPrice }: Props) => (
  <View className="justify-between flex-row border-[0.3px] rounded-lg p-3 mt-2">
    <Text className={text({ type: 'l16' })}>Total Plastic = {totalPlastic}</Text>
    <Text className={text({ type: 'b16' })}> = {totalPrice}Cfa</Text>
  </View>
);

export default TotalResultBar;
