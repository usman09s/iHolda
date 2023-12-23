import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { PieIcon } from '../../../../assets/referralGift';
import { height, moderateScale, horizontalScale } from '../../../utils/helpers';
import { useCartpoActions } from '../hooks/useCartpoActions';
import { useSelector } from 'react-redux';
import { selectWalletBalance } from 'store/cartpo/calculateSlice';

export const ProfileScreen = ({ navigation }: any) => {
  const isSmallScreen = height < 700;
  const [selectedOption, setSelectedOption] = useState('Today');
  const walletBalance = useSelector(selectWalletBalance);
  const { handleGetWallet } = useCartpoActions();

  useEffect(() => {
    handleGetWallet();
  }, []);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View className="flex-1 bg-white px-6 py-10">
        <View className={'flex-row justify-between items-center'}>
          <View>
            <Text className="text-2xl font-bold">Hi !👋</Text>
            <Text className="text-sm font-normal text-gray-500">Let's Track your Sales</Text>
          </View>
          <TouchableOpacity
            className="bg-blue-200 px-4 mr-6 py-1.5 rounded"
            // onPress={() => navigation.navigate('CartpoStack', { screen: 'Settings' })}
            style={{ borderWidth: 0.5, borderColor: 'gray' }}>
            <Text className="text-blue-800 text-10"></Text>
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
                style={{ padding: moderateScale(8) }}>
                <Text className="text-xs" style={{ paddingHorizontal: horizontalScale(6) }}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View className="mt-4 bg-pink-100 rounded-2xl px-6 pt-4">
            <View className="flex-row justify-between mr-1.5">
              <View>
                <Text className="text-xl font-light">Total sales</Text>
                <Text className="text-3xl font-semibold pt-2">
                  {walletBalance?.wallet?.availableBalance + walletBalance?.wallet?.pendingBalance}
                  <Text className="text-xl font-light">cfa</Text>
                </Text>
              </View>
              <View>
                <PieIcon />
              </View>
            </View>
            <View className="flex-row justify-between mt-4">
              <View className="bg-pink-100 py-6 rounded-lg">
                <Text className="text-12 text-center font-semibold">Cash</Text>
                <Text className="text-2xl font-semibold text-center pt-2">
                  {walletBalance?.wallet?.availableBalance}
                  <Text className="font-light text-base">cfa</Text>
                </Text>
              </View>
              <View className="bg-pink-100 py-6 rounded-lg">
                <Text className="text-12 text-center font-semibold">Other method</Text>
                <Text className="text-2xl font-semibold text-center pt-2">
                  {walletBalance?.wallet?.pendingBalance}
                  <Text className="font-light text-base">cfa</Text>
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
            <Text className="text-3xl font-normal text-white text-center my-2">
              {walletBalance?.wallet?.topupBalance}cfa
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#01991d] p-4 rounded-lg mt-3"
            onPress={() => navigation.navigate('CartpoStack', { screen: 'Cashout' })}>
            <Text className="text-12 font-normal text-white">Wallet balance</Text>
            <Text className="text-3xl font-normal text-white text-center my-2">
              {walletBalance?.wallet?.pendingBalance}cfa
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
