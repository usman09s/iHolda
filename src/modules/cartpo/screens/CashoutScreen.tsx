import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { selectCartpoSettings, selectWalletBalance } from 'store/cartpo/calculateSlice';
import { height } from 'utils/helpers';
import { useCartpoActions } from '../hooks/useCartpoActions';
import CustomHeader from 'components/Header/CustomHeader';

export const CashoutScreen = () => {
  const { handleWithdraw } = useCartpoActions();
  const [amount, setAmount] = useState('');
  const isSmallScreen = height < 700;
  const settingsData = useSelector(selectCartpoSettings);
  const walletBalance = useSelector(selectWalletBalance);
  const [value, setValue] = useState('value');
  const handleValueChange = (value: string) => {
    console.log('Selected value:', value);
    setValue(value);
  };

  const options = settingsData.setting?.paymentMethod.map(option => option.account);
  return (
    <View className="flex-1 px-6">
      <CustomHeader showBackIcon centerComponent={<Text>Cash out</Text>} />
      <View className={`py-8 flex-1 justify-between ${isSmallScreen ? 'mb-4' : 'mb-24'}`}>
        <View className="bg-[#01991d] p-4 rounded-lg">
          <Text className="text-12 font-normal text-white text-center">Wallet Balance</Text>
          <Text className="text-3xl font-bold text-white text-center my-2 pt-4">
            {walletBalance?.wallet?.availableBalance}
            <Text className="text-xs font-bold">CFA</Text>
          </Text>
        </View>
        <View className={`${isSmallScreen ? 'pb-8 pt-10' : 'pb-16 pt-10'}`}>
          <View
            style={{
              paddingVertical: 24,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TextInput
              value={amount}
              onChangeText={val => {
                const sanitizedValue = val.replace('.', '');
                setAmount(sanitizedValue);
              }}
              placeholder="0"
              placeholderTextColor={'black'}
              keyboardType="numeric"
              style={{
                color: 'black',
                textAlign: 'center',
                fontSize: 48,
                fontWeight: '700',
                paddingRight: 8,
              }}
            />
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                fontSize: 48,
                fontWeight: '700',
                marginLeft: -5,
              }}>
              .0
            </Text>
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                fontSize: 16,
                fontWeight: '700',
                alignSelf: 'flex-end',
                marginBottom: 9,
              }}>
              cfa
            </Text>
          </View>
          <Text className="text-center font-semibold pb-8">TO</Text>
          <SelectDropdown
            data={options.filter(option => option !== null)}
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
            title={'Cash Out'}
            customContainerClass="border-0 bg-black py-4"
            customTextClass={'text-white text-base'}
            onPress={() => {
              value !== 'value' && handleWithdraw(amount);
            }}
          />
        </View>
      </View>
    </View>
  );
};
