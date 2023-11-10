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
}

export const CustomReferenceInput = ({
  keyboardType = 'default',
  ...props
}: CustomReferenceProps) => {
  const handleChangeText = (text: string) => {
    if (props.field === 'date') {
      const cleanedText = text.replace(/\D/g, '');
      const limitedText = cleanedText.slice(0, 8);
      let formattedText = '';
      for (let i = 0; i < limitedText.length; i++) {
        if (i === 2 || i === 4) {
          formattedText += '/';
        }
        formattedText += limitedText[i];
      }

      props.handleChange(formattedText);
    } else {
      props.handleChange(text);
    }
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
      />
      <View className="h-5">
        {props.error && <Text style={{ color: 'red' }}>{props.error}</Text>}
      </View>
    </View>
  );
};
