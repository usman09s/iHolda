import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const CustomDayPicker = ({ itemsArray }) => {
  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDay = day => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(selectedDay => selectedDay !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  return (
    <View className="mb-5">
      <View className="flex flex-row justify-between">
        {itemsArray.map(day => (
          <TouchableOpacity
            key={day}
            className={`w-9 h-10 rounded-xl items-center justify-center ${
              selectedDays.includes(day) ? 'bg-sky-400' : 'bg-[#e3e2e2]'
            }`}
            onPress={() => toggleDay(day)}>
            <Text className={`${selectedDays.includes(day) ? 'text-gray-600' : 'text-gray-600'}`}>
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CustomDayPicker;
