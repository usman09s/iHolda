import Header from 'components/Header/Header';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { height } from 'utils/helpers';

export const TopupScreen = ({ navigation }: any) => {
  const isSmallScreen = height < 700;
  const [value, setValue] = useState('value');
  const handleValueChange = (value: string) => {
    console.log('Selected value:', value);
    setValue(value);
  };
  return (
    <View className="flex-1 px-6">
      <Header showBackIcon centerComponent={<Text>Top up</Text>} />
      <View className={`py-8 flex-1 justify-between ${isSmallScreen ? 'mb-4' : 'mb-24'}`}>
        <View className="bg-blue p-4 rounded-lg">
          <Text className="text-12 font-normal text-white text-center">Discount credit</Text>
          <Text className="text-3xl font-bold text-white text-center my-2 pt-4">
            10,000<Text className="text-xs font-bold">CFA</Text>
          </Text>
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
                value: 'value',
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
            title={'Top up'}
            customContainerClass="border-0 bg-black py-4"
            customTextClass={'text-white text-base'}
            onPress={() => {
              value !== 'value' && navigation.navigate('WithdrawSuccessful');
            }}
          />
        </View>
      </View>
    </View>
  );
};
