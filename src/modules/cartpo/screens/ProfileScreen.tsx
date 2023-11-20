import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { PieIcon } from '../../../../assets/referralGift';

export const ProfileScreen = ({ navigation }: any) => {
  const [selectedOption, setSelectedOption] = useState('Today'); // Initialize with 'Today' as the default selected option

  const handleOptionSelect = option => {
    setSelectedOption(option);
  };

  return (
    <View className="flex-1 bg-white px-6 py-10">
      <View className={'flex-row justify-between items-center'}>
        <View>
          <Text className="text-2xl font-bold">Hi Bayuga!👋</Text>
          <Text className="text-sm font-normal text-gray-500">Let's Track your Sales</Text>
        </View>
        <TouchableOpacity className="bg-blue-200 px-3 py-1 rounded-full">
          <Text className="text-blue-800">Settings</Text>
        </TouchableOpacity>
      </View>
      <View className="mt-6">
        <View className="flex-row justify-around">
          {['Today', 'This week', 'This month', 'All'].map(option => (
            <TouchableOpacity
              key={option}
              onPress={() => handleOptionSelect(option)}
              className={`text-base rounded-2xl ${
                selectedOption === option ? 'bg-pink-100' : ' border border-black'
              }`}
              style={{ padding: 8 }}>
              <Text className="text-xs mx-3">{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="mt-4 bg-pink-100 rounded-2xl px-6 pt-4">
          <View className="flex-row justify-between mr-4">
            <View>
              <Text className="text-xl font-light">Total sales</Text>
              <Text className="text-3xl font-semibold pt-2">
                12,000<Text className="text-xl font-light">cfa</Text>
              </Text>
            </View>
            <View style={{ transform: [{ rotate: '-7deg' }] }}>
              <PieIcon />
            </View>
          </View>
          <View className="flex-row justify-around mt-4">
            <View className="bg-pink-100 px-4 py-6 rounded-lg">
              <Text className="text-12 text-center font-semibold">Cash</Text>
              <Text className="text-2xl font-semibold text-center pt-2">
                10,000<Text className="font-light text-base">cfa</Text>
              </Text>
            </View>
            <View className="bg-pink-100 px-4 py-6 rounded-lg">
              <Text className="text-12 text-center font-semibold">Other method</Text>
              <Text className="text-2xl font-semibold text-center pt-2">
                2000<Text className="font-light text-base">cfa</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Text className="text-gray-500 text-base mt-4 mb-2">Discount Wallet</Text>
      <View>
        <TouchableOpacity
          className="bg-blue p-4 rounded-lg"
          onPress={() => navigation.navigate('CartpoStack', { screen: 'Topup' })}>
          <Text className="text-12 font-normal text-white">Discount credit</Text>
          <Text className="text-3xl font-normal text-white text-center my-2">10,000cfa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-green-500 p-4 rounded-lg mt-3"
          onPress={() => navigation.navigate('CartpoStack', { screen: 'Cashout' })}>
          <Text className="text-12 font-normal text-white">Wallet balance</Text>
          <Text className="text-3xl font-normal text-white text-center my-2">200cfa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
