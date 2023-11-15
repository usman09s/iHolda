import Header from 'components/Header/Header';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Button, Modal } from 'react-native';
import { RadioButton } from 'react-native-radio-buttons-group';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { text } from 'theme/text';

export const DeactivateAccountScreen = ({ navigation }: any) => {
  const radioButtons = useMemo(
    () => [
      {
        id: '1',
        label: 'Deactivate account',
        value: 'deactivate',
        description:
          'If you wish to temporarily suspend your account while keeping your data intact, you can deactivate it. Your profile will be hidden and you wont receive notifications until you decide to reactivate your account.',
      },
      {
        id: '2',
        label: 'Delete account',
        value: 'delete',
        description:
          'This action is irreversible and will erase all your information, including your profile, history, and preferences.',
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
          <Text style={{ fontSize: 16, fontWeight: '700', marginTop: 2 }}>Deactivate account</Text>
        }
      />
      <View className="flex-1 justify-between mt-14 mb-32">
        <View className="gap-4">
          {radioButtons.map(button => (
            <TouchableOpacity
              onPress={() => setSelectedId(button.id)}
              className="rounded-2xl py-2 pr-3 pl-5 border-black h-44"
              key={button.id}
              style={{ borderWidth: 0.4 }}>
              <View className="flex-row justify-between items-center">
                <Text className="text-xl font-bold">{button.label}</Text>
                <RadioButton
                  id={button.id}
                  selected={selectedId === button.id}
                  onPress={() => setSelectedId(button.id)}
                  borderSize={3}
                />
              </View>
              <Text className="font-semibold text-sm my-1">{button.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="items-center">
          <CustomReferenceButton
            title="Continue"
            customContainerClass={'w-60 py-2 border-0 bg-black'}
            customTextClass={'text-white font-normal'}
            onPress={() => navigation.navigate('Feedback')}
          />
          <CustomReferenceButton
            title="Back"
            customContainerClass={'w-60 py-2 border-2 border-black'}
            customTextClass={'text-black font-semibold'}
          />
        </View>
      </View>
      <Modal statusBarTranslucent visible={visible} onRequestClose={onClose} transparent>
        <View
          className=" flex-1 justify-end overflow-hidden"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <Animated.View className="bg-white rounded-t-2xl p-10 pt-5" entering={SlideInDown}>
            <SafeAreaView>
              <Text>This location is currently {'\n'}closed</Text>
              <Text className={text({ type: 'r12', class: 'text-center' })}>
                Select another location to drop off your plastics
              </Text>
              <Button
                title="FIND ANOTHER"
                onPress={onClose}
                customContainer="bg-yellowishOrange rounded-md mt-8"
                customTextClass="text-16"
              />
            </SafeAreaView>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};
