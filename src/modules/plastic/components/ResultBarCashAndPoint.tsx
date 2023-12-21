import { Text, View } from 'react-native';
import { getFlexByRatio } from 'utils/helpers';

type Props = {
  cash: number;
  point: number;
  totalPrice: number;
  totalCp: number;
};

const ResultBarCashAndPoints = ({ totalPrice = 0, cash = 0, point = 0, totalCp = 0 }: Props) => {
  const formattedResult = (totalPrice - totalPrice * (1 - cash)).toFixed(2);
  return (
    <View>
      <View className="flex-row overflow-hidden rounded-md">
        {point !== 1 && (
          <View style={{ flex: getFlexByRatio(cash) }} className=" py-3">
            <Text className="text-black text-start">Cash</Text>
          </View>
        )}
        <View style={{ flex: getFlexByRatio(point) }} className=" py-3">
          <Text className="text-black text-start">Community points</Text>
        </View>
      </View>
      <View className="flex-row overflow-hidden rounded-lg">
        {point !== 1 && (
          <View style={{ flex: getFlexByRatio(cash) }} className="bg-slate-600 py-4">
            <Text className="text-white text-center">{formattedResult}Cfa</Text>
          </View>
        )}
        <View style={{ flex: getFlexByRatio(point) }} className="bg-green-500 py-4">
          <Text className="text-white  text-center">+{(totalCp * point).toFixed(2)} points</Text>
        </View>
      </View>
    </View>
  );
};

export default ResultBarCashAndPoints;
