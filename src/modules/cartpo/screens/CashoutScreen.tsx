import Header from 'components/Header/Header';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { View, Text, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const CashoutScreen = () => {
  return (
    <View className="flex-1 px-6">
      <Header showBackIcon centerComponent={<Text>Cash out</Text>} />
      <View className="py-8 flex-1 justify-between mb-24">
        <View className="bg-green-500 p-4 rounded-lg">
          <Text className="text-12 font-normal text-white text-center">Discount credit</Text>
          <Text className="text-3xl font-bold text-white text-center my-2 pt-4">
            10,000<Text className="text-xs font-bold">CFA</Text>
          </Text>
        </View>
        <View className="pb-16">
          <Text className="text-center text-5xl font-bold py-6">
            0.0<Text className="text-base">cfa</Text>
          </Text>
          <Text className="text-center font-semibold pb-8">TO</Text>
          <View className="w-52 justify-center self-center bg-gray-500 rounded-full h-10 px-10">
            <RNPickerSelect
              placeholder={{
                label: '671234567',
                value: '671234567',
              }}
              Icon={() => (
                <View style={{ position: 'absolute', top: 10 }}>
                  <Icon name="keyboard-arrow-down" size={20} color={'white'} />
                </View>
              )}
              useNativeAndroidPickerStyle={false}
              items={[
                { label: '1234', value: '1234' },
                { label: '5678', value: '5678' },
                { label: '90123', value: '90123' },
              ]}
            />
          </View>
        </View>
        <View className="mx-6">
          <CustomReferenceButton
            title={'Cash Out'}
            customContainerClass="border-0 bg-black py-4"
            customTextClass={'text-white text-base'}
            onPress={() => navigation.navigate('WithdrawSuccessful')}
          />
        </View>
      </View>
    </View>
  );
};
