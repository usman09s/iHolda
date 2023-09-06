import { Text, View } from 'react-native';
import { PlasticItemType } from 'types/PlasticTypes';

type Props = {
  plastic: PlasticItemType & { count: number; price: number };
};

const AddedPlasticInformationStats = ({ plastic }: Props) => (
  <View className="flex-row mb-3" key={plastic?.id}>
    <View className="basis-3/6">
      <View className="justify-center items-center py-3 rounded-md border-b1 mr-2">
        <Text>{plastic?.size} Litres</Text>
      </View>
    </View>

    <View className="basis-1/6">
      <View className="justify-center items-center py-3 rounded-md border-b1 mr-2">
        <Text>{plastic?.count}</Text>
      </View>
    </View>
    <View className="basis-2/6">
      <View className="justify-center items-center py-3 rounded-md border-b1">
        <Text>{plastic?.price}</Text>
      </View>
    </View>
  </View>
);

export default AddedPlasticInformationStats;
