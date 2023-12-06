import Header from 'components/Header/Header';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { View, Text, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { height, horizontalScale, verticalScale } from '../../../utils/helpers';
import { useState } from 'react';
import { useMutation } from 'react-query';
import Api from 'services/Api';
import SelectDropdown from 'react-native-select-dropdown';

export const CashoutProfileScreen = ({ navigation, route }: any) => {
  const [withdrawAmmount, setWithdrawAmmount] = useState(0);


  const { mutate, isLoading } = useMutation(Api.withdrawFromWallet, {
    onError: error => {
      alert("something went wrong")
      console.error(error);
    },
    onSuccess: ({ data }) => {
      console.log("🚀 ~ file: CashoutProfileScreen.tsx:20 ~ CashoutProfileScreen ~ data:", data)
      navigation.navigate('WithdrawSuccessful', {withdrawAmmount})
    },
  });


  const isSmallScreen = height < 700;
  const handleValueChange = (value: string) => {
    console.log('Selected value:', value);

    setWithdrawAmmount(Number(value));
  };
  const options = ['12344773', '56783773', '91012333'];
  return (
    <View className="flex-1 px-6">
      <Header showBackIcon centerComponent={<Text className="mt-4">Cash out</Text>} />
      <View className={`py-8 flex-1 justify-between ${isSmallScreen ? 'mb-4' : 'mb-24'}`}>
        <View className="flex-row justify-center">
          <View className="border border-black rounded-lg px-2 py-2">
            <Text className="text-center text-[9px] font-semibold">Available Balance</Text>
            <Text className="text-center text-3xl pt-4 text-green-500 font-bold">
              {route.params?.wallet?.availableBalance ?? 0}
              <Text className="text-sm">CFA</Text>
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
              {route.params?.wallet?.pendingBalance ?? 0}
              <Text className="text-sm">CFA</Text>
            </Text>
          </View>
        </View>
        <View className={`pt-10 ${isSmallScreen ? 'pb-8' : 'pb-16'}`}>
          <Text className="text-center text-5xl font-bold py-6">
            {withdrawAmmount}.00<Text className="text-base">cfa</Text>
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
            title={'Cash Out'}
            extraStyles={{ borderWidth: 0 }}
            customContainerClass="bg-black py-4"
            customTextClass={'text-white text-base'}
            // onPress={() => navigation.navigate('WithdrawSuccessful')}
            onPress={() => mutate(withdrawAmmount)}
          />
        </View>
      </View>
    </View>
  );
};
