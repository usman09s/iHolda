import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomDropdownInput = ({ title, type, options, ...props }: any) => {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      <Text className="font-bold">:</Text>
      <View style={styles.inputContainer}>
        {type === 'dropdown' ? (
          <RNPickerSelect
            placeholder={{
              label: 'Value',
              value: null,
            }}
            Icon={() => (
              <View style={styles.dropdownIconContainer}>
                <Icon name="keyboard-arrow-down" style={styles.dropdownIcon} />
              </View>
            )}
            useNativeAndroidPickerStyle={false}
            items={options.map((option: any, index: any) => ({
              label: option.label,
              value: option.value,
              key: index.toString(),
            }))}
          />
        ) : (
          <TextInput {...props} placeholder="Value" />
        )}
      </View>
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
    width: 90,
  },
  inputContainer: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    width: 170,
    backgroundColor: '#e0e0e0',
    borderRadius: 7,
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
