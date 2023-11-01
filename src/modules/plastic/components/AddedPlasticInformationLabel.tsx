import { Text, View } from 'react-native';
import { horizontalScale } from '../../../utils/helpers';

const AddedPlasticInformationLabel = () => (
  <View className="flex-row mb-3">
    <View className="basis-3/6">
      <View className="justify-center items-center py-3">
        <Text>Type</Text>
      </View>
    </View>

    <View className="basis-1/6" style={{ marginLeft: -horizontalScale(6) }}>
      <View className="justify-center items-center py-3">
        <Text>Qty</Text>
      </View>
    </View>
    <View className="basis-2/6">
      <View className="justify-center items-center py-3 rounded-md">
        <Text>Payment</Text>
      </View>
    </View>
  </View>
);

export default AddedPlasticInformationLabel;
