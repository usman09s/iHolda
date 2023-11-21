import Button from 'components/Button';
import Header from 'components/Header/Header';
import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { text } from 'theme/text';
import { CustomReferenceButton } from '../components/CustomReferenceButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { height } from 'utils/helpers';

export const BasicVerificationThreeScreen = ({ navigation }: any) => {
  const isSmallScreen = height < 700;
  return (
    <View className="px-6 flex-1">
      <Header
        showBackIcon
        centerComponent={
          <Text className={text({ type: 'm16', class: 'mt-2 text-lg' })}>Basic verification</Text>
        }
        title="Basic verification"
        rightComponent={<Text className={text({ type: 'm16', class: 'mt-1' })}>3/3</Text>}
      />
      <View
        className={`flex-1 items-center justify-between ${
          isSmallScreen ? 'mb-28 mt-16' : 'mt-28 mb-36'
        }`}>
        <View>
          <Text className="text-black text-center font-medium text-24">Add reference</Text>
          <Text className="text-slate-500 text-center mt-8 mx-6">
            Add any two people on the app who knows you personally
          </Text>
        </View>
        <View
          className={`flex-row gap-8 justify-center items-center ${
            isSmallScreen ? 'pt-12 pb-10' : ''
          }`}>
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
          extraStyles={{ borderWidth: 5 }}
        />
      </View>
    </View>
  );
};
