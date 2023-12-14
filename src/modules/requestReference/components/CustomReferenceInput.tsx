import React from 'react';
import { View, Text, TextInput } from 'react-native';

interface CustomReferenceProps {
  keyboardType?: any;
  placeholder: string;
  label?: string;
  customTextInputClass?: any;
  customLabelClass?: any;
  handleChange: (text: string) => void;
  value: string;
  error: string | undefined;
  field: string;
  containerClass?: any;
  textAlignVertical?: string;
  multiline?: boolean;
}

export const CustomReferenceInput = ({
  keyboardType = 'default',
  ...props
}: CustomReferenceProps) => {
  const handleChangeText = (text: string) => {
    props.handleChange(text);
  };

  const hasError = props.error !== undefined;

  return (
    <View className={`gap-1.5 py-1.5 ${props.containerClass}`}>
      {props.label && <Text className={`text-sm ${props.customLabelClass}`}>{props.label}</Text>}
      <TextInput
        placeholder={props.placeholder}
        keyboardType={keyboardType}
        onChangeText={handleChangeText}
        value={props.value}
        className={`bg-neutral-200 rounded-3xl h-12 px-4 w-full ${props.customTextInputClass} ${
          hasError ? 'border-red-600 border-2' : ''
        }`}
        placeholderTextColor={'gray'}
        textAlignVertical={props.textAlignVertical}
        multiline={props.multiline}
      />
      <View className="h-5">
        {props.error && <Text style={{ color: 'red' }}>{props.error}</Text>}
      </View>
    </View>
  );
};
