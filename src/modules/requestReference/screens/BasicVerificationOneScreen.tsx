import Button from 'components/Button';
import Header from 'components/Header/Header';
import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { text } from 'theme/text';
import { CustomReferenceButton } from '../components/CustomReferenceButton';

export const BasicVerificationOneScreen = ({ navigation }: any) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const selectOption = option => {
    setSelectedOption(option);
  };

  return (
    <View className="px-6 flex-1">
      <Header
        showBackIcon
        title="Basic verification"
        rightComponent={<Text className={text({ type: 'm16' })}>1/3</Text>}
      />
      <View className="flex-1 justify-between items-center my-28 mb-32">
        <Text className="text-2xl font-semibold mt-14">Sex?</Text>
        <View className="flex flex-row mb-20 gap-6">
          <View
            className={`${selectedOption === 'Male' ? 'border-2 border-black rounded-2xl' : ''}`}>
            <TouchableOpacity
              onPress={() => selectOption('Male')}
              className={`w-36 h-36 rounded-2xl flex items-center justify-center ${
                selectedOption === 'Male' ? 'border-2 border-white bg-sky-300' : 'bg-sky-200'
              }`}>
              <Text className={`text-lg text-black font-medium`}>Male</Text>
            </TouchableOpacity>
          </View>
          <View
            className={`${selectedOption === 'Female' ? 'border-2 border-black rounded-2xl' : ''}`}>
            <TouchableOpacity
              onPress={() => selectOption('Female')}
              className={`w-36 h-36 rounded-2xl flex items-center justify-center ${
                selectedOption === 'Female' ? 'border-2 border-white bg-sky-300' : 'bg-sky-200'
              }`}>
              <Text className={`text-lg text-black font-medium`}>Female</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="mt-4">
          <CustomReferenceButton
            title="Next"
            onPress={() => navigation.navigate('BasicVerificationTwo')}
          />
        </View>
      </View>
    </View>
  );
};
