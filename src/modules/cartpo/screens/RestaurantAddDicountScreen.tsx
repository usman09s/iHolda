import Header from 'components/Header/Header';
import { View, Text } from 'react-native';
import { DeleteLinkIcon } from '../../../../assets/referralGift';
import CustomDayPicker from '../components/CustomDayPicker';
import Icon from 'react-native-vector-icons/Ionicons';
import SelectDropdown from 'react-native-select-dropdown';
import { CustomRestaurantButton } from '../components/CustomRestaurantButton';
import { useSelector } from 'react-redux';
import { selectCartpoSettings } from 'store/cartpo/calculateSlice';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

export const RestaurantAddDiscountScreen = ({ navigation }: any) => {
  const settingsData = useSelector(selectCartpoSettings);
  const [condition, setCondition] = useState<any>();
  const [users, setUsers] = useState<any>();
  console.log(settingsData);

  const handleSubmit = () => {
    if (!condition || !users) {
      Toast.show({
        type: 'error',
        text1: 'Please fill all the fields',
      });
      return;
    }
    navigation.goBack();
  };

  return (
    <View className="flex-1 px-6">
      <Header
        showBackIcon
        centerComponent={<Text>Add discount</Text>}
        rightComponent={<DeleteLinkIcon />}
      />
      <View className="mt-8 mb-24 justify-between flex-1 items-center">
        <View>
          <View className="mb-4">
            <Text>Discount (%)</Text>
            <CustomDayPicker
              itemsArray={['10%', '20%', '25%', '30%', '50%', '60%']}
              onDaySelect={item => console.log(item)}
            />
          </View>
          <View className="mb-6">
            <Text>Minimum number of users</Text>
            <SelectDropdown
              data={['1 person', '2 people']}
              placeholder="Select"
              buttonTextStyle={{ color: 'black', textAlign: 'left', fontSize: 16 }}
              placeholderColor={'gray'}
              buttonStyle={{
                justifyContent: 'flex-start',
                alignSelf: 'flex-start',
                backgroundColor: 'rgb(229 229 229)',
                borderRadius: 30,
                width: '100%',
              }}
              rowTextStyle={{ fontSize: 14, fontWeight: '500' }}
              dropdownStyle={{ borderRadius: 7, paddingHorizontal: 10 }}
              buttonTextAfterSelection={(selectedItem: string, index: number) => {
                setCondition(selectedItem);
                return selectedItem;
              }}
              rowTextForSelection={(item: string, index: number) => {
                return item;
              }}
              renderDropdownIcon={() => {
                return (
                  <View style={{ justifyContent: 'flex-end', paddingRight: 20, paddingLeft: 0 }}>
                    <Icon name="chevron-forward-outline" style={{ fontSize: 20 }} color="gray" />
                  </View>
                );
              }}
              dropdownIconPosition="right"
            />
          </View>
          <View className="w-full">
            <Text>Discount Condition</Text>
            <SelectDropdown
              data={['Both users must be new customers', '1 person must be new customer']}
              placeholder="Select"
              buttonTextStyle={{ color: 'black', textAlign: 'left', fontSize: 16 }}
              placeholderColor={'gray'}
              buttonStyle={{
                justifyContent: 'flex-start',
                alignSelf: 'flex-start',
                backgroundColor: 'rgb(229 229 229)',
                borderRadius: 30,
                width: '100%',
              }}
              rowTextStyle={{ fontSize: 14, fontWeight: '500' }}
              dropdownStyle={{ borderRadius: 7, paddingHorizontal: 10 }}
              buttonTextAfterSelection={(selectedItem: string, index: number) => {
                setUsers(selectedItem);
                return selectedItem;
              }}
              rowTextForSelection={(item: string, index: number) => {
                return item;
              }}
              renderDropdownIcon={() => {
                return (
                  <View style={{ justifyContent: 'flex-end', paddingRight: 20, paddingLeft: 0 }}>
                    <Icon name="chevron-forward-outline" style={{ fontSize: 20 }} color="gray" />
                  </View>
                );
              }}
              dropdownIconPosition="right"
            />
          </View>
        </View>
        <CustomRestaurantButton title={'Save'} onPress={handleSubmit} />
      </View>
    </View>
  );
};
