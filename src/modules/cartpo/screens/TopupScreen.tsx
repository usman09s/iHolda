import Header from 'components/Header/Header';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { height } from 'utils/helpers';
import colors from 'theme/colors';

export const TopupScreen = ({ navigation }: any) => {
  const isSmallScreen = height < 700;
  const [value, setValue] = useState('value');
  const handleValueChange = (value: string) => {
    console.log('Selected value:', value);
    setValue(value);
  };

  const options = ['12344773', '56783773', '91012333'];

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
          <SelectDropdown
            data={options}
            placeholder="Select"
            buttonTextStyle={{ color: 'white', textAlign: 'center' }}
            placeholderColor={'white'}
            buttonStyle={{
              justifyContent: 'center',
              alignSelf: 'center',
              backgroundColor: '#b3b2b2',
              borderRadius: 30,
              width: 220,
              height: 60,
            }}
            onSelect={(selectedItem: string, index: number) => {
              handleValueChange(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem: string, index: number) => {
              return selectedItem;
            }}
            rowTextForSelection={(item: string, index: number) => {
              return item;
            }}
            renderDropdownIcon={() => {
              return (
                <View style={{ justifyContent: 'flex-end', paddingRight: 30, paddingLeft: 0 }}>
                  <Icon name="keyboard-arrow-down" style={{ fontSize: 28 }} color="white" />
                </View>
              );
            }}
            dropdownIconPosition="right"
          />
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
