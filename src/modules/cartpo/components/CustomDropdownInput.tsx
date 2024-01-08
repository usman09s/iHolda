import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SelectDropdown from 'react-native-select-dropdown';
import { useField } from 'formik';
import { horizontalScale } from 'utils/helpers';

const CustomDropdownInput = ({ title, type, options, ...props }: any) => {
  const [field, meta, helpers] = useField(props.name);
  const hasError = meta.touched && meta.error;

  const inputStyles = {
    borderWidth: 1,
    borderColor: hasError ? 'red' : '#e0e0e0',
  };

  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      <Text className="font-bold">:</Text>
      {type === 'dropdown' ? (
        <SelectDropdown
          data={options}
          buttonStyle={[
            styles.inputContainer,
            { paddingVertical: 0, paddingHorizontal: 0, paddingLeft: 7, height: 35 },
            inputStyles,
            props.extraInputStyles,
          ]}
          placeholder="Value"
          placeholderColor={props.placeholderTextColor ? props.placeholderTextColor : '#b3b3b3'}
          buttonTextStyle={styles.dropdownButtonText}
          onSelect={(selectedItem, index) => {
            helpers.setValue(selectedItem);
            props.onValueChange && props.onValueChange(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          renderDropdownIcon={() => {
            return <Icon name="keyboard-arrow-down" style={styles.dropdownIcon} />;
          }}
          dropdownIconPosition="right"
        />
      ) : (
        <View style={[styles.inputContainer, inputStyles, props.extraInputStyles]}>
          <TextInput
            onChangeText={text => {
              helpers.setValue(text);
              props.onValueChange(text);
            }}
            placeholder="Value"
            placeholderTextColor={
              props.placeholderTextColor ? props.placeholderTextColor : '#b3b3b3'
            }
            value={field.value}
            keyboardType={props.keyboardType ? props.keyboardType : 'default'}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
    width: horizontalScale(90),
  },
  inputContainer: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    width: 170,
    backgroundColor: '#e0e0e0',
    borderRadius: 7,
  },
  dropdownButtonText: {
    fontSize: 13,
    textAlign: 'left',
  },
  dropdownIconContainer: {
    position: 'absolute',
    top: 4,
    right: 10,
  },
  dropdownIcon: {
    fontSize: 20,
    color: 'gray',
  },
});

export default CustomDropdownInput;
