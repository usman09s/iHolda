import Header from 'components/Header/Header';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { selectCalculatorAmount, selectCartpoSettings } from 'store/cartpo/calculateSlice';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useState } from 'react';

export const DirectPaymentScreen = ({ navigation, route }: any) => {
  const settingsData = useSelector(selectCartpoSettings);
  const calculatorAmount = useSelector(selectCalculatorAmount);
  console.log(settingsData.setting.paymentMethod);
  const discountPercentage = 50;
  const paymentAmount = parseFloat(calculatorAmount);
  const discountedAmount = (discountPercentage / 100) * paymentAmount;
  const filteredPaymentMethod = (settingsData.setting?.paymentMethod || []).filter(
    (item: any) => item.accountType.toLowerCase() !== 'cash',
  );
  const totalAmountAfterDiscount = paymentAmount - discountedAmount;
  const isSingleAccount = settingsData.setting?.paymentMethod.length === 1;
  const account = isSingleAccount ? settingsData.setting?.paymentMethod[0].account : undefined;
  const [selectedAccount, setSelectedAccount] = useState<string | undefined>(undefined);

  return (
    <View className="flex-1">
      <View className="px-6">
        <Header
          showBackIcon
          centerComponent={<Text className="text-gray-500 font-semibold mt-2">Direct payment</Text>}
        />
      </View>
      <View className="justify-around flex-1 py-6">
        <Text className="text-center text-4xl font-semibold">
          {totalAmountAfterDiscount}
          <Text className="font-light">CFA</Text>
        </Text>
        <View className="jusify-center mb-10">
          <Text className="text-center text-xl text-gray-500">Payment account</Text>
          {isSingleAccount ? (
            <Text className="bg-gray-300 text-center text-black text-5xl font-semibold py-5 my-2">
              {account || 'No Account Added'}
            </Text>
          ) : (
            <SelectDropdown
              data={filteredPaymentMethod.map(item => item.account) || []}
              placeholder="Select"
              buttonTextStyle={{
                color: 'black',
                textAlign: 'center',
                fontSize: 50,
                fontWeight: 'bold',
              }}
              placeholderColor={'white'}
              buttonStyle={{
                justifyContent: 'center',
                alignSelf: 'center',
                backgroundColor: '#e3e2e3',
                width: '100%',
                height: 100,
              }}
              onSelect={(selectedItem: string, index: number) => {
                setSelectedAccount(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem: string, index: number) => {
                return selectedItem;
              }}
              rowTextForSelection={(item: string, index: number) => {
                return item;
              }}
              renderDropdownIcon={() => {
                return (
                  <View style={{ justifyContent: 'flex-end', paddingRight: 0, paddingLeft: -20 }}>
                    <Icon name="keyboard-arrow-down" style={{ fontSize: 40 }} color="black" />
                  </View>
                );
              }}
              dropdownIconPosition="right"
              defaultValueByIndex={0}
              rowTextStyle={{ textAlign: 'center', fontSize: 20 }}
              rowStyle={{ height: 60 }}
            />
          )}
          <Text className="text-center text-gray-400 font-semibold">
            Account Provider :{' '}
            <Text className="text-gray-500">
              {selectedAccount
                ? filteredPaymentMethod.find(item => item.account === selectedAccount)?.bank ||
                  'MTN'
                : filteredPaymentMethod[0]?.bank || 'MTN'}
            </Text>
          </Text>
        </View>
        <CustomReferenceButton
          title="Done"
          customContainerClass={'bg-black border-0 py-3 mx-10 mb-12'}
          customTextClass={'text-white'}
          onPress={() => navigation.navigate('SaleComplete')}
        />
      </View>
    </View>
  );
};
