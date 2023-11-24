import Header from 'components/Header/Header';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { View, Text, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { height, horizontalScale, verticalScale } from '../../../utils/helpers';

export const CashoutProfileScreen = ({ navigation }: any) => {
  const isSmallScreen = height < 700;
  const handleValueChange = (value: string) => {
    // You can do something with the selected value here
    console.log('Selected value:', value);
  };

  return (
    <View className="flex-1 px-6">
      <Header showBackIcon centerComponent={<Text className="mt-4">Cash out</Text>} />
      <View className={`py-8 flex-1 justify-between ${isSmallScreen ? 'mb-4' : 'mb-24'}`}>
        <View className="flex-row justify-center">
          <View className="border border-black rounded-lg px-2 py-2">
            <Text className="text-center text-[9px] font-semibold">Available Balance</Text>
            <Text className="text-center text-3xl pt-4 text-green-500 font-bold">
              15,000<Text className="text-sm">CFA</Text>
            </Text>
          </View>
          <View
            style={{
              borderLeftWidth: 1,
              borderColor: 'black',
              marginHorizontal: horizontalScale(8),
              marginVertical: verticalScale(4),
            }}
          />
          <View className="border border-gray-400 rounded-lg px-2 py-2">
            <Text className="text-center text-[9px] font-semibold text-gray-400">
              Pending Balance
            </Text>
            <Text className="text-center text-3xl pt-4 text-gray-500 font-bold">
              15,000<Text className="text-sm">CFA</Text>
            </Text>
          </View>
        </View>
        <View className={`pt-10 ${isSmallScreen ? 'pb-8' : 'pb-16'}`}>
          <Text className="text-center text-5xl font-bold py-6">
            0.0<Text className="text-base">cfa</Text>
          </Text>
          <Text className="text-center font-semibold pb-8">TO</Text>
          <View className="w-52 justify-center self-center bg-[#b3b2b2] rounded-full h-12 pr-8 pl-14">
            <RNPickerSelect
              placeholder={{
                label: 'Select',
                value: null,
              }}
              style={{
                inputIOS: {
                  fontSize: 18,
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  fontWeight: '400',
                  color: 'white',
                },
                inputAndroid: {
                  fontSize: 18,
                  paddingHorizontal: 10,
                  width: '100%',
                  paddingVertical: 8,
                  fontWeight: '400',
                  color: 'white',
                },
              }}
              useNativeAndroidPickerStyle={false}
              onValueChange={handleValueChange}
              Icon={() => (
                <View>
                  <Icon
                    name="keyboard-arrow-down"
                    size={26}
                    color={'white'}
                    style={{ position: 'absolute', top: 9, right: 0 }}
                  />
                </View>
              )}
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
