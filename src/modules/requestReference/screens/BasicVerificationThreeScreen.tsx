import Button from 'components/Button';
import Header from 'components/Header/Header';
import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { text } from 'theme/text';
import { CustomReferenceButton } from '../components/CustomReferenceButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const BasicVerificationThreeScreen = ({ navigation }: any) => {
  return (
    <View className="px-6 flex-1 py-4">
      <Header
        showBackIcon
        title="Basic verification"
        rightComponent={<Text className={text({ type: 'm16' })}>3/3</Text>}
      />
      <View className="flex-1 items-center my-28 mb-36 justify-between">
        <View>
          <Text className="text-black text-center font-medium text-24">Add reference</Text>
          <Text className="text-slate-500 text-center mt-8 mx-6">
            Add any two people on the app who knows you personally
          </Text>
        </View>
        <View className="flex-row gap-8 justify-center items-center">
          <View>
            <TouchableOpacity
              className="w-32 h-32 rounded-full bg-blue-500 items-center justify-center mb-2 border-2 border-zinc-400"
              onPress={() => navigation.navigate('AddReference')}>
              <MaterialCommunityIcons name="plus" size={40} color="gray" />
            </TouchableOpacity>
            <Text className="text-zinc-500 text-lg text-center">@reference1</Text>
          </View>
          <View>
            <TouchableOpacity
              className="w-32 h-32 rounded-full bg-blue-500 items-center justify-center mb-2 border-2 border-zinc-400"
              onPress={() => navigation.navigate('AddReference')}>
              <MaterialCommunityIcons name="plus" size={40} color="gray" />
            </TouchableOpacity>
            <Text className="text-zinc-500 text-lg text-center">@reference2</Text>
          </View>
        </View>
        <CustomReferenceButton
          title="Submit"
          onPress={() => navigation.navigate('VerificationComplete')}
        />
      </View>
    </View>
  );
};
