import Button from 'components/Button';
import Header from 'components/Header/Header';
import { View, Text, TouchableOpacity } from 'react-native';
import { text } from 'theme/text';
import { CustomReferenceButton } from '../components/CustomReferenceButton';
import { height } from 'utils/helpers';
import { useRequestReferenceAction } from '../hooks/useRequestReferenceActions';

export const BasicVerificationOneScreen = () => {
  const { selectedOption, selectOption, handleNavigation1 } = useRequestReferenceAction();
  const isSmallScreen = height < 700;

  return (
    <View className="px-6 flex-1">
      <Header
        showBackIcon
        centerComponent={
          <Text className={text({ type: 'm16', class: 'mt-2 text-lg' })}>Basic verification</Text>
        }
        rightComponent={<Text className={text({ type: 'm16' })}>1/3</Text>}
      />
      <View
        className={`flex-1 justify-between items-center ${
          isSmallScreen ? 'mt-12 pb-24' : 'mt-24 mb-32'
        }`}>
        <Text className="text-2xl font-bold py-12">Sex?</Text>
        <View className="flex flex-row mb-20 gap-6">
          <View
            className={`${selectedOption === 'male' ? 'border-2 border-black rounded-2xl' : ''}`}>
            <TouchableOpacity
              onPress={() => selectOption('male')}
              className={`w-36 h-36 rounded-2xl flex items-center justify-center ${
                selectedOption === 'Male' ? 'border-2 border-white bg-sky-400' : 'bg-sky-200'
              }`}>
              <Text className={`text-lg text-black font-medium`}>Male</Text>
            </TouchableOpacity>
          </View>
          <View
            className={`${selectedOption === 'female' ? 'border-2 border-black rounded-2xl' : ''}`}>
            <TouchableOpacity
              onPress={() => selectOption('female')}
              className={`w-36 h-36 rounded-2xl flex items-center justify-center ${
                selectedOption === 'Female' ? 'border-2 border-white bg-sky-400' : 'bg-sky-200'
              }`}>
              <Text className={`text-lg text-black font-medium`}>Female</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="mt-4">
          <CustomReferenceButton title="Next" onPress={handleNavigation1} />
        </View>
      </View>
    </View>
  );
};
