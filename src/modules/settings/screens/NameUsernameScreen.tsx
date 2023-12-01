import Header from 'components/Header/Header';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { View, Text, TextInput, Alert } from 'react-native';
import { horizontalScale, verticalScale } from '../../../utils/helpers';
import { useState } from 'react';

export const NameUsernameScreen = ({ route, navigation }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const headerText = route.params.type === 'name' ? 'Name' : 'Username';
  const placeholderText = `add your ${route.params.type === 'name' ? 'name' : '@username'}`;

  const validateInput = text => {
    if (route.params.type === 'name') {
      if (/\d/.test(text)) {
        setError(`${route.params.type === 'name' ? 'Name' : 'Username'} is not valid`);
        return false;
      }
    } else if (route.params.type === 'username') {
      if (/\s/.test(text)) {
        setError(`${route.params.type === 'name' ? 'Name' : 'Username'} is not valid`);
        return false;
      }
    }
    if (text.trim() === '') {
      setError(`${route.params.type === 'name' ? 'Name' : 'Username'} can not be empty`);
      return false;
    }

    return true;
  };

  const handleDonePress = () => {
    // Get the text input value
    const inputValue = text;
    const isValid = validateInput(inputValue);
    if (isValid) {
      console.log('Input is valid:', inputValue);
      navigation.goBack();
    }
  };

  return (
    <View className="flex-1 px-6">
      <Header
        showBackIcon
        centerComponent={<Text style={{ fontSize: 14, marginTop: 2 }}>{headerText}</Text>}
      />
      <View style={{ flex: 1, justifyContent: 'space-between', marginVertical: 30 }}>
        <View>
          <TextInput
            style={[
              {
                borderWidth: 1,
                borderColor: 'gray',
                paddingVertical: verticalScale(9),
                borderRadius: 10,
                paddingHorizontal: horizontalScale(16),
              },
              error && { borderColor: 'red' },
            ]}
            value={text}
            placeholder={placeholderText}
            onChangeText={text => {
              setText(text);
              setError('');
            }}
          />
          {error && <Text className="text-red-500">{error}</Text>}
        </View>
        <CustomReferenceButton
          customContainerClass={'bg-black w-48 self-center'}
          extraStyles={{ borderWidth: 0, marginBottom: 16 }}
          title="Done"
          customTextClass={'text-white'}
          onPress={handleDonePress}
        />
      </View>
    </View>
  );
};
