import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CheckmarkIcon } from '../../../../assets/referralGift';

export const SaleCompleteScreen = ({ navigation }: any) => {
  return (
    <View className="flex-1 items-center justify-around">
      <View>
        <View
          style={{
            width: 180, // Adjust the width and height to your desired size
            height: 180, // This will create a square container
            backgroundColor: '#cff3dc',
            borderRadius: 90, // Set borderRadius to half of the width or height
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
          }}>
          <View style={{ left: 3 }}>
            <CheckmarkIcon />
          </View>
        </View>
        <Text className="text-center text-2xl mt-6">Sale complete</Text>
      </View>
      <View>
        <TouchableOpacity
          className="bg-gray-300 px-12 rounded-full"
          onPress={() => navigation.goBack()}>
          <Text className="text-center text-2xl my-1">Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
