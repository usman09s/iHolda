import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Header from 'components/Header/Header';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import Icon from 'react-native-vector-icons/Ionicons';

export const CalculatorScreen = ({ navigation }: any) => {
  const [inputValue, setInputValue] = useState('0');
  const [selectedOption, setSelectedOption] = useState('direct');

  const handleKeypadPress = value => {
    setInputValue(prevInputValue => {
      if (value === '<') {
        if (prevInputValue === '0') {
          return prevInputValue;
        }
        return prevInputValue.length === 1 ? '0' : prevInputValue.slice(0, -1);
      }
      if (prevInputValue === '0') {
        return value === '.' ? '0.' : value;
      }
      if (value === '.' && prevInputValue.includes('.')) {
        return prevInputValue;
      }
      return prevInputValue + value;
    });
  };

  const handleOptionPress = option => {
    setSelectedOption(option);
  };

  return (
    <View className="flex-1 px-6">
      <Header showBackIcon />
      <ScrollView contentContainerStyle={styles.content}>
        <View className="flex-row justify-center">
          <TouchableOpacity
            className={`rounded-xl px-6 py-2 ${
              selectedOption === 'direct' ? 'bg-blue' : 'border border-black'
            }`}
            onPress={() => handleOptionPress('direct')}>
            <Text
              className={`text-black font-semibold text-center ${
                selectedOption === 'direct' && 'text-white'
              }`}>
              Direct
            </Text>
          </TouchableOpacity>
          <View className="w-2" />
          <TouchableOpacity
            className={`rounded-xl px-5 py-2 ${
              selectedOption === 'cash' ? 'bg-blue' : 'border border-black'
            }`}
            onPress={() => handleOptionPress('cash')}>
            <Text
              className={`text-black font-semibold text-center ${
                selectedOption === 'cash' && 'text-white'
              }`}>
              Cash
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-5xl text-center py-5">
          {`${inputValue}`}
          <Text className="text-2xl font-light">CFA</Text>
        </Text>
        <View>
          <View style={styles.keypad}>
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '<'].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.keypadButton}
                onPress={() => handleKeypadPress(item)}>
                {item === '<' ? (
                  <Icon name="backspace-outline" size={28} color="#000" />
                ) : (
                  <Text
                    style={[
                      styles.keypadButtonText,
                      item === '.' && { backgroundColor: 'transparent', borderWidth: 0 },
                    ]}>
                    {item}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
          <CustomReferenceButton
            customContainerClass={'rounded-xl w-72 self-center h-14'}
            extraStyles={{ borderWidth: 0, backgroundColor: 'rgb(51,70,252)', marginTop: 20 }}
            title={'Next'}
            customTextClass={'text-white'}
            onPress={() => navigation.navigate('CartpoStack', { screen: 'SaleComplete' })}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  keypadButton: {
    width: '33%',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
  },
  keypadButtonText: {
    fontSize: 28,
    padding: 12,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#e2e2e2',
    borderRadius: 35,
    width: 65,
    backgroundColor: 'white',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});
