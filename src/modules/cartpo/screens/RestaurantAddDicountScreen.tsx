import Header from 'components/Header/Header';
import { View, Text } from 'react-native';
import { DeleteLinkIcon } from '../../../../assets/referralGift';
import CustomDayPicker from '../components/CustomDayPicker';
import Icon from 'react-native-vector-icons/Ionicons';
import SelectDropdown from 'react-native-select-dropdown';

export const RestaurantAddDiscountScreen = () => {
  return (
    <View className="px-6">
      <Header
        showBackIcon
        centerComponent={<Text>Add discount</Text>}
        rightComponent={<DeleteLinkIcon />}
      />
      <Text>Discount (%)</Text>
      <CustomDayPicker itemsArray={['10%', '20%', '25%', '30%', '50%', '60%']} />
      <View>
        <Text>Minimum number of users</Text>
        <SelectDropdown
          data={['1 person', '2 people']}
          placeholder="Select"
          buttonTextStyle={{ color: 'black' }}
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
            return selectedItem;
          }}
          rowTextForSelection={(item: string, index: number) => {
            return item;
          }}
          renderDropdownIcon={() => {
            return (
              <View style={{ justifyContent: 'flex-end', paddingRight: 20, paddingLeft: 0 }}>
                <Icon name="chevron-forward-outline" style={{ fontSize: 28 }} color="gray" />
              </View>
            );
          }}
          dropdownIconPosition="right"
        />
      </View>
      <View>
        <Text>Discount Condition</Text>
        <SelectDropdown
          data={['Both users must be new customers', '1 person must be new customer']}
          placeholder="Select"
          buttonTextStyle={{ color: 'black' }}
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
            return selectedItem;
          }}
          rowTextForSelection={(item: string, index: number) => {
            return item;
          }}
          renderDropdownIcon={() => {
            return (
              <View style={{ justifyContent: 'flex-end', paddingRight: 20, paddingLeft: 0 }}>
                <Icon name="chevron-forward-outline" style={{ fontSize: 28 }} color="gray" />
              </View>
            );
          }}
          dropdownIconPosition="right"
        />
      </View>
    </View>
  );
};
