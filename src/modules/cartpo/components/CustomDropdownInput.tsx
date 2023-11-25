import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
      <View style={[styles.inputContainer, inputStyles]}>
        {type === 'dropdown' ? (
          <RNPickerSelect
            placeholder={{
              label: 'Value',
              value: 'value',
            }}
            Icon={() => (
              <View style={styles.dropdownIconContainer}>
                <Icon name="keyboard-arrow-down" style={styles.dropdownIcon} />
              </View>
            )}
            onValueChange={value => {
              helpers.setValue(value); // Update Formik field value
              props.onValueChange(value); // Call the provided onValueChange prop
            }}
            value={field.value}
            useNativeAndroidPickerStyle={false}
            items={options.map((option, index) => ({
              label: option.label,
              value: option.value,
              key: index.toString(),
            }))}
            style={{
              inputIOS: {
                backgroundColor: '#e0e0e0',
                borderRadius: 7,
                paddingVertical: 2,
                fontSize: 14,
              },
              inputAndroid: {
                backgroundColor: '#e0e0e0',
                borderRadius: 7,
                paddingVertical: 2,
                fontSize: 14,
              },
            }}
          />
        ) : (
          <TextInput
            onChangeText={text => {
              helpers.setValue(text);
              props.onValueChange(text);
            }}
            placeholder="Value"
            value={field.value}
          />
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
    width: horizontalScale(90),
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
