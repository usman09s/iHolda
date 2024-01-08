import Header from 'components/Header/Header';
import { View, Text, TouchableOpacity } from 'react-native';
import { DeleteLinkIcon } from '../../../../assets/referralGift';
import CustomDayPicker from '../components/CustomDayPicker';
import Icon from 'react-native-vector-icons/Ionicons';
import SelectDropdown from 'react-native-select-dropdown';
import { CustomRestaurantButton } from '../components/CustomRestaurantButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteDiscount,
  deletePaymentAccount,
  selectCartpoSettings,
  selectSelectedDiscount,
} from 'store/cartpo/calculateSlice';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { useCartpoActions } from '../hooks/useCartpoActions';
import { Formik } from 'formik';

export const RestaurantAddDiscountScreen = ({ navigation }: any) => {
  const { handleAddDiscount, handleDeleteDiscount } = useCartpoActions();
  const settingsData = useSelector(selectCartpoSettings);
  const dispatch = useDispatch();
  const selectedDiscount = useSelector(selectSelectedDiscount);

  const initialDiscount = selectedDiscount
    ? {
        discountPercentage: selectedDiscount.percentage,
        minimumUsers: selectedDiscount.people === 1 ? '1 person' : '2 people',
        discountCondition:
          selectedDiscount.condition === 2
            ? 'Both users must be new customers'
            : '1 person must be a new customer',
      }
    : {
        discountPercentage: '',
        minimumUsers: '',
        discountCondition: '',
      };

  const initialValues = {
    ...initialDiscount,
  };

  const discountConditionMap = {
    'Both users must be new customers': 1,
    '1 person must be a new customer': 2,
  };

  const minimumUsersMap = {
    '1 person': 1,
    '2 people': 2,
  };

  const handleSubmit = values => {
    const minimumUsers = minimumUsersMap[values.minimumUsers];
    const discountCondition = discountConditionMap[values.discountCondition];
    const updatedValues = {
      ...values,
      discountPercentage: values.discountPercentage,
      minimumUsers,
      discountCondition,
    };
    handleAddDiscount(updatedValues);
  };

  const handleDeletePaymentAccount = accountValue => {
    dispatch(deleteDiscount(accountValue));
    handleDeleteDiscount();
  };

  return (
    <View className="flex-1 px-6">
      <Header
        showBackIcon
        centerComponent={<Text>Add discount</Text>}
        rightComponent={
          <TouchableOpacity
            onPress={() => selectedDiscount && handleDeletePaymentAccount(selectedDiscount._id)}>
            <DeleteLinkIcon />
          </TouchableOpacity>
        }
      />

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
          <View className="mt-8 mb-24 justify-between flex-1 items-center">
            <View>
              <View className="mb-4">
                <Text>Discount (%)</Text>
                <CustomDayPicker
                  itemsArray={[
                    { label: '10%', value: 10 },
                    { label: '20%', value: 20 },
                    { label: '25%', value: 25 },
                    { label: '30%', value: 30 },
                    { label: '50%', value: 50 },
                    { label: '60%', value: 60 },
                  ]}
                  onDaySelect={item => setFieldValue('discountPercentage', item[0])}
                  multiselect={false}
                  customClassContainer={'w-full h-10'}
                  defaultValue={values.discountPercentage}
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
                    return selectedItem;
                  }}
                  rowTextForSelection={(item: string, index: number) => {
                    return item;
                  }}
                  renderDropdownIcon={() => {
                    return (
                      <View
                        style={{ justifyContent: 'flex-end', paddingRight: 20, paddingLeft: 0 }}>
                        <Icon
                          name="chevron-forward-outline"
                          style={{ fontSize: 20 }}
                          color="gray"
                        />
                      </View>
                    );
                  }}
                  dropdownIconPosition="right"
                  onSelect={item => setFieldValue('minimumUsers', item)}
                  defaultValue={values.minimumUsers}
                />
              </View>
              <View className="w-full">
                <Text>Discount Condition</Text>
                <SelectDropdown
                  data={['Both users must be new customers', '1 person must be a new customer']}
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
                    return selectedItem;
                  }}
                  rowTextForSelection={(item: string, index: number) => {
                    return item;
                  }}
                  onSelect={item => setFieldValue('discountCondition', item)}
                  renderDropdownIcon={() => {
                    return (
                      <View
                        style={{ justifyContent: 'flex-end', paddingRight: 20, paddingLeft: 0 }}>
                        <Icon
                          name="chevron-forward-outline"
                          style={{ fontSize: 20 }}
                          color="gray"
                        />
                      </View>
                    );
                  }}
                  dropdownIconPosition="right"
                  defaultValue={values.discountCondition}
                />
              </View>
            </View>
            <CustomRestaurantButton title={'Save'} onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};
