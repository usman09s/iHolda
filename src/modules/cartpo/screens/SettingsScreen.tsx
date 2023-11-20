import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import CustomDropdownInput from '../components/CustomDropdownInput';
import Header from 'components/Header/Header';

const SettingsScreen = () => {
  const [shopName, setShopName] = useState('');
  const [category, setCategory] = useState('');

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
        <View className="border border-gray-500 p-4 rounded-2xl my-6">
          <CustomDropdownInput
            title="Owner name"
            type="text"
            value={shopName}
            onChangeText={setShopName}
          />
          <CustomDropdownInput
            title="Phone number"
            type="text"
            value={shopName}
            onChangeText={setShopName}
          />
          <CustomDropdownInput
            title="Email address"
            type="email"
            value={shopName}
            onChangeText={setShopName}
          />
        </View>
        <Text className="text-lg font-bold">Account Information</Text>
        <View className="border border-gray-500 p-4 rounded-2xl my-6">
          <CustomDropdownInput
            title="Shop name"
            type="text"
            value={shopName}
            onChangeText={setShopName}
          />
          <CustomDropdownInput
            title="Category"
            type="dropdown"
            selectedValue={category}
            onValueChange={itemValue => setCategory(itemValue)}
            options={[
              { label: 'Category 1', value: 'cat1' },
              { label: 'Category 2', value: 'cat2' },
              // ... other categories
            ]}
          />
          <CustomDropdownInput
            title="Address"
            type="text"
            value={shopName}
            onChangeText={setShopName}
          />
          <CustomDropdownInput
            title="Post code"
            type="text"
            value={shopName}
            onChangeText={setShopName}
          />
          <CustomDropdownInput
            title="City"
            type="text"
            value={shopName}
            onChangeText={setShopName}
          />
          <CustomDropdownInput
            title="Country"
            type="text"
            value={shopName}
            onChangeText={setShopName}
          />
        </View>
        <Text className="text-lg font-bold">Payment account</Text>
        <View className="border border-gray-500 p-4 rounded-2xl my-6">
          <CustomDropdownInput
            title="Account"
            type="text"
            value={shopName}
            onChangeText={setShopName}
          />
          <CustomDropdownInput
            title="Bank or provider"
            type="text"
            value={shopName}
            onChangeText={setShopName}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SettingsScreen;
