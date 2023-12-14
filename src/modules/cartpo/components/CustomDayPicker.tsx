import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const CustomDayPicker = ({
  itemsArray,
  multiselect,
  onDaySelect,
  customClassContainer,
  customButtonContainer,
}: any) => {
  const [selectedIndices, setSelectedIndices] = useState([]);

  const toggleDay = index => {
    if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter(selectedIndex => selectedIndex !== index));
    } else {
      setSelectedIndices([...selectedIndices, index]);
    }
  };

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
        onDaySelect([...newSelectedIndices]); // Use the new value directly
      } else {
        toggleDay(index);
      }
    } else {
      toggleDay(index);
    }
  };

  return (
    <View className="mb-5">
      <View className={`flex flex-row justify-between ${customClassContainer}`}>
        {itemsArray.map((day, index) => (
          <TouchableOpacity
            key={day}
            className={`w-9 h-10 rounded-xl items-center justify-center ${
              selectedIndices.includes(index) ? 'bg-sky-400' : 'bg-[#e3e2e2]'
            } ${customButtonContainer}`}
            onPress={() => handlePress(index)}>
            <Text
              className={`${selectedIndices.includes(index) ? 'text-gray-600' : 'text-gray-600'}`}>
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CustomDayPicker;
