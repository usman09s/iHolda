import { IsAny } from '@reduxjs/toolkit/dist/tsHelpers';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

const CustomDayPicker = ({
  itemsArray,
  multiselect,
  onDaySelect,
  customClassContainer,
  customButtonContainer,
  defaultValue,
}: any) => {
  const [selectedIndices, setSelectedIndices] = useState([]);

  const toggleDay = index => {
    if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter(selectedIndex => selectedIndex !== index));
    } else {
      setSelectedIndices([...selectedIndices, index]);
    }
  };

  useEffect(() => {
    if (defaultValue) {
      const defaultIndex = itemsArray.indexOf(defaultValue);
      if (defaultIndex !== -1) {
        setSelectedIndices([defaultIndex as never]);
        onDaySelect([defaultValue]);
      }
    }
  }, [defaultValue]);

  const handlePress = index => {
    if (multiselect) {
      if (selectedIndices.length === 2) {
        setSelectedIndices([index]);
        onDaySelect([index]); // Use the new value directly
      } else if (selectedIndices.length === 1) {
        const startIndex = selectedIndices[0];
        const endIndex = index;
        const newSelectedIndices = Array.from(
          { length: endIndex - startIndex + 1 },
          (_, i) => i + startIndex,
        );
        setSelectedIndices([...newSelectedIndices]);
        onDaySelect([...newSelectedIndices]);
      } else {
        toggleDay(index);
      }
    } else {
      setSelectedIndices([index]);
      onDaySelect([itemsArray[index]]);
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={item}
      className={`w-9 h-10 rounded-xl items-center justify-center ${
        selectedIndices.includes(index) ? 'bg-sky-400' : 'bg-[#e3e2e2]'
      } ${customButtonContainer}`}
      onPress={() => handlePress(index)}>
      <Text style={selectedIndices.includes(index) ? 'text-gray-600' : 'text-gray-600'}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className={`mb-5 ${customClassContainer}`}>
      <FlatList
        data={itemsArray}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        contentContainerStyle={{ gap: 10 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CustomDayPicker;
