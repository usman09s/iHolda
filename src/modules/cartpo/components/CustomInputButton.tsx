import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomInputButton = ({ text, placeholder, onPress, index }) => {
  return (
    <View className="flex-row items-center flex my-2">
      {index && <Text className="text-lg font-normal">{index}</Text>}
      <TouchableOpacity
        onPress={onPress}
        className="bg-neutral-200 py-3 rounded-full flex-row items-center pr-3 pl-5 ml-2.5">
        <View className={`flex-1 ${text ? 'justify-center' : 'justify-start'}`}>
          {text ? (
            <Text className="text-base text-black text-center">{text}</Text>
          ) : (
            <Text className="text-sm text-gray-500">{placeholder}</Text>
          )}
        </View>
        <View className="ml-2">
          {text ? (
            <Icon name="checkmark" size={24} color="#11db6c" />
          ) : (
            <Icon name="chevron-forward-outline" size={24} color="#696869" />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomInputButton;
