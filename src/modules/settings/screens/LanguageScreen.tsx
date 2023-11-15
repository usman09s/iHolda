import Header from 'components/Header/Header';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { useMemo, useState } from 'react';
import { View, Text } from 'react-native';
import { RadioButton } from 'react-native-radio-buttons-group';

export const LanguageScreen = () => {
  const radioButtons = useMemo(
    () => [
      {
        id: '1',
        label: 'English (En)',
        value: 'option1',
      },
      {
        id: '2',
        label: 'French (Fr)',
        value: 'option2',
      },
      {
        id: '3',
        label: 'Pidgin (Pg)',
        value: 'option3',
      },
    ],
    [],
  );

  const [selectedId, setSelectedId] = useState('1');

  return (
    <View className="flex-1 px-6">
      <Header
        showBackIcon
        centerComponent={
          <Text style={{ fontSize: 16, fontWeight: '700', marginTop: 2 }}>Language</Text>
        }
      />
      <View className="flex-1 justify-between mt-14 mb-36">
        <View className="gap-4">
          {radioButtons.map(button => (
            <View
              key={button.id}
              className="flex-row justify-between items-center rounded-2xl py-2 pr-2 pl-4 border-black"
              style={{ borderWidth: 1 }}>
              <Text className="text-base font-semibold">{button.label}</Text>
              <RadioButton
                id={button.id}
                selected={selectedId === button.id}
                onPress={() => setSelectedId(button.id)}
              />
            </View>
          ))}
        </View>
        <View className="items-center">
          <CustomReferenceButton title="Save" customContainerClass={'px-14 py-3 border-sky-500'} />
        </View>
      </View>
    </View>
  );
};
