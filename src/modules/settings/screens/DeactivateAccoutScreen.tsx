import Header from 'components/Header/Header';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Button,
  Modal,
  ScrollView,
} from 'react-native';
import { RadioButton } from 'react-native-radio-buttons-group';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { text } from 'theme/text';
import { height } from 'utils/helpers';

export const DeactivateAccountScreen = ({ navigation }: any) => {
  const isSmallScreen = height < 680;
  const [visible, setVisible] = useState(false);
  const radioButtons = useMemo(
    () => [
      {
        id: '1',
        label: 'Deactivate account',
        value: 'deactivate',
        description:
          "If you wish to temporarily suspend your account while keeping your data intact, you can deactivate it. Your profile will be hidden and you won't receive notifications until you decide to reactivate your account.",
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

  const onClose = () => {
    setVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View className="flex-1 px-6">
        <Header
          showBackIcon
          centerComponent={
            <Text style={{ fontSize: 16, fontWeight: '700', marginTop: 2 }}>
              Deactivate account
            </Text>
          }
        />
        <View className={`flex-1 justify-between mt-10 ${isSmallScreen ? 'mb-16' : 'mb-24'}`}>
          <View className="gap-4 pb-10">
            {radioButtons.map(button => (
              <TouchableOpacity
                onPress={() => setSelectedId(button.id)}
                className={`rounded-2xl py-2 pr-3 pl-5 border-black ${
                  isSmallScreen ? 'min-h-fit pb-6' : 'h-44'
                }`}
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
              onPress={() => {
                setVisible(true);
              }}
            />
            <CustomReferenceButton
              title="Back"
              customContainerClass={'w-60 py-2'}
              customTextClass={'text-black font-semibold'}
              onPress={() => navigation.goBack()}
              extraStyles={{ borderWidth: 2, borderColor: 'black' }}
            />
          </View>
        </View>
        <Modal statusBarTranslucent visible={visible} onRequestClose={onClose} transparent>
          <View
            className=" flex-1 justify-end overflow-hidden"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <Animated.View className="bg-white rounded-t-2xl p-10 pt-5" entering={SlideInDown}>
              <SafeAreaView>
                <Text className="text-20 font-bold my-4 text-black text-center">
                  Irreversible Action
                </Text>
                <Text className={'text-center text-black text-base'}>
                  Are you sure you want to delete your account?
                </Text>
                <View className="flex-row w-full justify-between">
                  <CustomReferenceButton
                    title="CANCEL"
                    customContainerClass={'w-32 px-0'}
                    extraStyles={{ borderWidth: 3, borderColor: 'black' }}
                    customTextClass={'text-base'}
                    onPress={onClose}
                  />
                  <CustomReferenceButton
                    title="YES"
                    customContainerClass={'w-32 px-0 bg-black'}
                    extraStyles={{ borderWidth: 0, borderColor: 'none' }}
                    customTextClass={'text-base text-white'}
                    onPress={() => {
                      setVisible(false);
                      navigation.navigate('Feedback');
                    }}
                  />
                </View>
              </SafeAreaView>
            </Animated.View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};
