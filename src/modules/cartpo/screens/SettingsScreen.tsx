import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import CustomDropdownInput from '../components/CustomDropdownInput';
import Header from 'components/Header/Header';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { Formik } from 'formik';
import * as yup from 'yup';

const SettingsScreen = ({ navigation }: any) => {
  const validationSchema = yup.object().shape({
    ownerName: yup.string().required('Owner name is required'),
    phoneNumber: yup.string().required('Phone number is required'),
    emailAddress: yup.string().email('Invalid email address').required('Email address is required'),
    shopName: yup.string().required('Shop name is required'),
    category: yup.string().required('Category is required'),
    address: yup.string().required('Address is required'),
    postCode: yup.string().required('Post code is required'),
    city: yup.string().required('City is required'),
    country: yup.string().required('Country is required'),
    account: yup.string().required('Account is required'),
    bankOrProvider: yup.string().required('Bank or provider is required'),
    percentage: yup.string().required('Bank or provider is required'),
    minAmount: yup.string().required('Bank or provider is required'),
    condition: yup.string().required('Bank or provider is required'),
    percentage1: yup.string().required('Bank or provider is required'),
    minAmount1: yup.string().required('Bank or provider is required'),
    condition1: yup.string().required('Bank or provider is required'),
    percentage2: yup.string().required('Bank or provider is required'),
    minAmount2: yup.string().required('Bank or provider is required'),
    condition2: yup.string().required('Bank or provider is required'),
  });

  const handleSubmit = () => {
    console.log('values');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} className="px-6">
      <Header
        showBackIcon
        centerComponent={
          <Text className="text-base font-semibold text-gray-500" style={{ marginBottom: -20 }}>
            Settings
          </Text>
        }
      />
      <View className="py-8">
        <Text className="text-lg font-bold">Account Information</Text>
        <Formik
          initialValues={{
            ownerName: '',
            phoneNumber: '',
            emailAddress: '',
            shopName: '',
            category: '',
            address: '',
            postCode: '',
            city: '',
            country: '',
            account: '',
            bankOrProvider: '',
            percentage: '',
            minAmount: '',
            condition: '',
            percentage1: '',
            minAmount1: '',
            condition1: '',
            percentage2: '',
            minAmount2: '',
            condition2: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          validateOnChange={false}>
          {({ values, handleChange, handleSubmit, errors }) => (
            <>
              <View className="border border-gray-500 p-4 rounded-2xl my-6">
                <CustomDropdownInput
                  title="Owner name"
                  type="text"
                  value={values.ownerName}
                  onValueChange={handleChange('ownerName')}
                  errorMessage={errors.ownerName}
                  name="ownerName"
                />
                <CustomDropdownInput
                  title="Phone number"
                  type="text"
                  value={values.phoneNumber}
                  onValueChange={handleChange('phoneNumber')}
                  errorMessage={errors.phoneNumber}
                  name="phoneNumber"
                />
                <CustomDropdownInput
                  title="Email address"
                  type="text"
                  value={values.emailAddress}
                  onValueChange={handleChange('emailAddress')}
                  errorMessage={errors.emailAddress}
                  name="emailAddress"
                />
              </View>
              <Text className="text-lg font-bold">Account Information</Text>
              <View className="border border-gray-500 p-4 rounded-2xl my-6">
                <CustomDropdownInput
                  title="Shop name"
                  type="text"
                  value={values.shopName}
                  onValueChange={handleChange('shopName')}
                  errorMessage={errors.shopName}
                  name="shopName"
                />
                <CustomDropdownInput
                  title="Category"
                  type="dropdown"
                  selectedValue={values.category}
                  onValueChange={handleChange('category')}
                  options={[
                    { label: 'Category 1', value: 'cat1' },
                    { label: 'Category 2', value: 'cat2' },
                  ]}
                  errorMessage={errors.category}
                  name="category"
                />
                <CustomDropdownInput
                  title="Address"
                  type="text"
                  value={values.address}
                  onValueChange={handleChange('address')}
                  errorMessage={errors.address}
                  name="address"
                />
                <CustomDropdownInput
                  title="Post code"
                  type="text"
                  value={values.postCode}
                  onValueChange={handleChange('postCode')}
                  errorMessage={errors.postCode}
                  name="postCode"
                />
                <CustomDropdownInput
                  title="City"
                  type="text"
                  value={values.city}
                  onValueChange={handleChange('city')}
                  errorMessage={errors.city}
                  name="city"
                />
                <CustomDropdownInput
                  title="Country"
                  type="text"
                  value={values.country}
                  onValueChange={handleChange('country')}
                  errorMessage={errors.country}
                  name="country"
                />
              </View>
              <Text className="text-lg font-bold">Payment account</Text>
              <View className="border border-gray-500 p-4 rounded-2xl my-6">
                <CustomDropdownInput
                  title="Account"
                  type="text"
                  value={values.account}
                  onValueChange={handleChange('account')}
                  errorMessage={errors.account}
                  name="account"
                />
                <CustomDropdownInput
                  title="Bank or provider"
                  type="text"
                  value={values.bankOrProvider}
                  onValueChange={handleChange('bankOrProvider')}
                  errorMessage={errors.bankOrProvider}
                  name="bankOrProvider"
                />
              </View>
              <Text className="text-lg font-bold">Discounts</Text>
              <View className="border border-gray-500 p-4 rounded-2xl my-3">
                <View style={styles.circleContainer}>
                  <Text style={styles.circleText}>1</Text>
                </View>
                <CustomDropdownInput
                  title="Percentage"
                  type="text"
                  value={values.percentage}
                  onValueChange={handleChange('percentage')}
                  errorMessage={errors.percentage}
                  name="percentage"
                />
                <CustomDropdownInput
                  title="Min amount"
                  type="dropdown"
                  selectedValue={values.minAmount}
                  options={[
                    { label: '2 people', value: '2people' },
                    { label: '3 people', value: '3people' },
                  ]}
                  onValueChange={handleChange('minAmount')}
                  errorMessage={errors.minAmount}
                  name="minAmount"
                />
                <CustomDropdownInput
                  title="Condition"
                  type="dropdown"
                  selectedValue={values.minAmount}
                  options={[
                    { label: 'Any', value: 'any' },
                    { label: 'Condition 1', value: 'condition1' },
                  ]}
                  onValueChange={handleChange('condition')}
                  errorMessage={errors.condition}
                  name="condition"
                />
              </View>
              <View className="border border-gray-500 p-4 rounded-2xl my-3">
                <View style={styles.circleContainer}>
                  <Text style={styles.circleText}>2</Text>
                </View>
                <CustomDropdownInput
                  title="Percentage"
                  type="text"
                  value={values.percentage1}
                  onValueChange={handleChange('percentage1')}
                  errorMessage={errors.percentage1}
                  name="percentage1"
                />
                <CustomDropdownInput
                  title="Min amount"
                  type="dropdown"
                  selectedValue={values.minAmount1}
                  options={[
                    { label: '2 people', value: '2people' },
                    { label: '3 people', value: '3people' },
                  ]}
                  onValueChange={handleChange('minAmount1')}
                  errorMessage={errors.minAmount1}
                  name="minAmount1"
                />
                <CustomDropdownInput
                  title="Condition"
                  type="dropdown"
                  selectedValue={values.condition1}
                  options={[
                    { label: 'Any', value: 'any' },
                    { label: 'Condition 1', value: 'condition1' },
                  ]}
                  onValueChange={handleChange('condition1')}
                  errorMessage={errors.condition1}
                  name="condition1"
                />
              </View>
              <View className="border border-gray-500 p-4 rounded-2xl mt-3 mb-6">
                <View style={styles.circleContainer}>
                  <Text style={styles.circleText}>3</Text>
                </View>
                <CustomDropdownInput
                  title="Percentage"
                  type="text"
                  value={values.percentage2}
                  onValueChange={handleChange('percentage2')}
                  errorMessage={errors.percentage2}
                  name="percentage2"
                />
                <CustomDropdownInput
                  title="Min amount"
                  type="dropdown"
                  selectedValue={values.minAmount2}
                  options={[
                    { label: '2 people', value: '2people' },
                    { label: '3 people', value: '3people' },
                  ]}
                  onValueChange={handleChange('minAmount2')}
                  errorMessage={errors.minAmount2}
                  name="minAmount2"
                />
                <CustomDropdownInput
                  title="Condition"
                  type="dropdown"
                  selectedValue={values.condition2}
                  options={[
                    { label: 'Any', value: 'any' },
                    { label: 'Condition 1', value: 'condition1' },
                  ]}
                  onValueChange={handleChange('condition2')}
                  errorMessage={errors.condition2}
                  name="condition2"
                />
              </View>
              <CustomReferenceButton
                title="Save"
                customContainerClass={'border-0 bg-black py-4 mx-6'}
                customTextClass={'text-white'}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circleContainer: {
    width: 25,
    height: 25,
    backgroundColor: '#c3c3c3',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  circleText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
