import Header from 'components/Header/Header';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon from '@expo/vector-icons/MaterialIcons';
import { height, horizontalScale, verticalScale } from '../../../utils/helpers';
import { useState } from 'react';
import { useMutation } from 'react-query';
import Api from 'services/Api';
import SelectDropdown from 'react-native-select-dropdown';
import { useSelector } from 'react-redux';
import { userSelector } from 'store/auth/userSelectors';
import { text } from 'theme/text';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ''];

export const CashoutProfileScreen = ({ navigation, route }: any) => {
  const [withdrawAmmount, setWithdrawAmmount] = useState('');
  const [account, setAccount] = useState('');
  const { user } = useSelector(userSelector);

  const { mutate, isLoading } = useMutation(Api.withdrawFromWallet, {
    onError: error => {
      alert('something went wrong');
      console.error(error);
    },
    onSuccess: ({ data }) => {
      navigation.navigate('WithdrawSuccessful', { withdrawAmmount });
    },
  });

  const isSmallScreen = height < 700;
  // const handleValueChange = (value: string) => {
  //   console.log('Selected value:', value);

  //   setWithdrawAmmount(Number(value));
  // };
  const options = user?.linkedPaymentAccounts?.map(el => el.number);
  return (
    <View className="flex-1">
      <View className="px-6">
        <Header showBackIcon centerComponent={<Text className="mt-4">Cash out</Text>} />
      </View>
      <View className={`py-8 flex-1 justify-between ${isSmallScreen ? 'mb-4' : 'mb-24'}`}>
        <View className="flex-row justify-center">
          <View className="border border-black rounded-lg px-2 py-2">
            <Text className="text-center text-[9px] font-semibold">Available Balance</Text>
            <Text className="text-center text-3xl pt-4 text-green-500 font-bold">
              {route.params?.wallet?.availableBalance?.toFixed(2) ?? 0}
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
          {/* <Text className="text-center text-5xl font-bold py-6">
            {withdrawAmmount}.00<Text className="text-base">cfa</Text>
          </Text> */}
          <View
            style={{
              paddingVertical: 24,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TextInput
              value={withdrawAmmount}
              onChangeText={val => {
              
                // if(!val) return;
                if (numbers.includes(!val?.length ? val : val[val?.length - 1]))
                  setWithdrawAmmount(val);
              }}
              placeholder="0"
              placeholderTextColor={'black'}
              keyboardType="numeric"
              style={{
                color: 'black',
                textAlign: 'center',
                fontSize: 48,
                fontWeight: '700',
                paddingRight: 10,
                // minWidth: 100
              }}
            />

            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                fontSize: 48,
                fontWeight: '700',
                paddingRight: 10,
                marginLeft: -5,
                // minWidth: 100
              }}>
              .0
            </Text>

            <Text
              style={{
                color: 'blacck',
                textAlign: 'center',
                fontSize: 16,
                alignSelf: 'flex-end',
                marginBottom: 8,
              }}>
              {' '}
              cfa
            </Text>
          </View>
          <Text className="text-center font-semibold pb-8">TO</Text>

          {/* <View
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              backgroundColor: '#b3b2b2',
              borderRadius: 30,
              minWidth: 220,
              height: 60,
              flexDirection: 'row',
              alignItems: 'center',
              overflow: 'hidden',
              paddingHorizontal: 5,
            }}>
            <TextInput
              value={account}
              onChangeText={setAccount}
              keyboardType="numeric"
              placeholder="Enter"
              placeholderTextColor={'white'}
              className="text-white text-center text-18"
            />
            <Icon name="keyboard-arrow-down" style={{ fontSize: 28 }} color="white" />
          </View> */}
          {!options?.length ? (
            <View className="w-full py-5 bg-[#b3b2b2]">
              <Text className={text({ type: 'r18', class: 'text-center text-white' })}>
                Add a payment account first
              </Text>{' '}
            </View>
          ) : (
            <SelectDropdown
              data={options ?? []}
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
                setAccount(selectedItem);
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
          )}
        </View>
        <View className="mx-6">
          <CustomReferenceButton
            title={'Cash Out'}
            extraStyles={{ borderWidth: 0 }}
            customContainerClass="bg-black py-4"
            customTextClass={'text-white text-base'}
            // onPress={() => navigation.navigate('WithdrawSuccessful')}
            onPress={() => {
              if (!options?.length) return alert('Link an payment account first');
              if (!withdrawAmmount) return alert('Amount is required');
              if (route.params?.wallet?.availableBalance < withdrawAmmount)
                return alert('Amount should be less than available balance.');
              if (!account) return alert('Account is required');
              mutate(Number(withdrawAmmount));
            }}
          />
        </View>
      </View>
    </View>
  );
};
