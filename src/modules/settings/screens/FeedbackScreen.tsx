import Header from 'components/Header/Header';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { height } from 'utils/helpers';

export const FeedbackScreen = () => {
  const isSmallScreen = height < 700;
  return (
    <ScrollView className="px-6" contentContainerStyle={{ flexGrow: 1 }}>
      <Header
        showBackIcon
        centerComponent={
          <Text style={{ fontSize: 16, fontWeight: '700', marginTop: 2 }}>Feedback</Text>
        }
      />
      <View className={`justify-between flex-1 ${isSmallScreen ? 'mb-20 mt-12' : 'mb-32 mt-20'}`}>
        <View className="px-4 flex-column gap-4">
          <Text className="text-base font-bold">Why are you leaving us?</Text>
          <TextInput
            placeholder="Write your feedback here...."
            placeholderTextColor={'gray'}
            className="h-72 border-black rounded-3xl py-4 px-3 text-2xl font-normal"
            textAlignVertical="top"
            style={{ borderWidth: 1, color: 'black' }}
            multiline
          />
        </View>
        <View className="items-center">
          <CustomReferenceButton
            title="Delete account"
            customContainerClass={'border-0 bg-red-600 w-4/5'}
            customTextClass={'text-white font-normal'}
          />
        </View>
      </View>
    </ScrollView>
  );
};
