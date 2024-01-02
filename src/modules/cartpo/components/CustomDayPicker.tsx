import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

const CustomDayPicker = ({
  itemsArray,
  multiselect,
  onDaySelect,
  customClassContainer,
  customButtonContainer,
  defaultValue,
  error,
}: any) => {
  const [selectedIndices, setSelectedIndices] = useState([]);

  useEffect(() => {
    if (defaultValue !== undefined && defaultValue !== null) {
      const defaultValues = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
      const defaultIndices = defaultValues.map(day =>
        itemsArray.findIndex(item => item.value === day),
      );
      setSelectedIndices(defaultIndices.filter(index => index !== -1));
      onDaySelect(defaultValues);
    }
  }, [defaultValue]);

  const handlePress = selectedDay => {
    if (multiselect) {
      const isSelected = selectedIndices.includes(selectedDay.index);
      const newSelectedIndices = isSelected
        ? selectedIndices.filter(index => index !== selectedDay.index)
        : [...selectedIndices, selectedDay.index];

      setSelectedIndices(newSelectedIndices);
      onDaySelect(newSelectedIndices.map(i => itemsArray[i].value));
    } else {
      const shouldDeselect =
        selectedIndices.includes(selectedDay.index) && selectedIndices.length === 1;
      setSelectedIndices(shouldDeselect ? [] : [selectedDay.index]);
      onDaySelect(shouldDeselect ? [] : [selectedDay.value]);
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={item.value}
      className={`w-9 h-10 rounded-xl items-center justify-center ${
        selectedIndices.includes(index) ? 'bg-sky-400' : 'bg-[#e3e2e2]'
      } ${error ? 'border-2 border-red-500' : ''} ${customButtonContainer}`}
      onPress={() => handlePress({ value: item.value, index })}>
      <Text style={selectedIndices.includes(index) ? 'text-gray-600' : 'text-gray-600'}>
        {item.label}
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
