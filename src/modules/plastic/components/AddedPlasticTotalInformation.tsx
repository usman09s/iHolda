import { Text, View } from 'react-native';
import { text } from 'theme/text';

type Props = {
  totalPrice: number;
  totalPlastic: number;
};

const AddedPlasticTotalInformation = ({ totalPlastic, totalPrice }: Props) => (
  <View className="flex-row  bg-green-200 border-b1 border-black-o-50  px-1 rounded-md mt-7 mb-12">
    <View className="basis-1/2 flex-row">
      <View className="basis-4/6 border-r-b1 py-3">
        <Text className={text({ type: 'l13', class: 'text-center' })}>Total approved </Text>
      </View>
      <View className="basis-2/6 border-r-b1 py-3">
        <Text className={text({ type: 'l16', class: 'text-center' })}>{totalPlastic}</Text>
      </View>
    </View>
    <View className="basis-1/2 flex-row">
      <View className="basis-1/2 py-3 border-r-b1">
        <Text className={text({ type: 'l13', class: 'text-center' })}>Reward</Text>
      </View>
      <View className="basis-1/2 py-3">
        <Text className={text({ type: 'b16', class: 'text-center' })}> ={totalPrice}Cfa</Text>
      </View>
    </View>
  </View>
);

export default AddedPlasticTotalInformation;
