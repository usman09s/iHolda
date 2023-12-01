import Header from 'components/Header/Header';
import { View, Text, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { text } from 'theme/text';
import { CustomReferenceButton } from '../components/CustomReferenceButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { height } from 'utils/helpers';
import { useSelector } from 'react-redux';
import { useRequestReferenceAction } from '../hooks/useRequestReferenceActions';
import { Userpic } from 'react-native-userpic';

export const BasicVerificationThreeScreen = () => {
  const {
    handleAddReference1,
    handleAddReference2,
    handleFinalNavigation,
    updateReference1,
    updateReference2,
  } = useRequestReferenceAction();
  const isSmallScreen = height < 700;
  const referenceUsers = useSelector((state: any) => state.userReference.referenceUsers);

  useEffect(() => {
    console.log(referenceUsers, 'Refer');
  });

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
            Add any two people on the app who know you personally
          </Text>
        </View>
        <View
          className={`flex-row gap-8 justify-center items-center ${
            isSmallScreen ? 'pt-12 pb-10' : ''
          }`}>
          <View>
            <TouchableOpacity
              className="w-32 h-32 rounded-full bg-blue-500 items-center justify-center mb-2 border-2 border-zinc-400"
              onPress={() => handleAddReference1()}>
              {referenceUsers.length > 0 ? (
                <Userpic name={referenceUsers[0].userName} size={110} />
              ) : (
                <MaterialCommunityIcons name="plus" size={40} color="gray" />
              )}
            </TouchableOpacity>
            <Text className="text-zinc-500 text-lg text-center">
              {referenceUsers.length > 0 ? `@${referenceUsers[0].userName}` : '@reference1'}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              className="w-32 h-32 rounded-full bg-blue-500 items-center justify-center mb-2 border-2 border-zinc-400"
              onPress={() => handleAddReference2()}>
              {referenceUsers.length > 1 ? (
                <Userpic name={referenceUsers[1].userName} size={110} />
              ) : (
                <MaterialCommunityIcons name="plus" size={40} color="gray" />
              )}
            </TouchableOpacity>
            <Text className="text-zinc-500 text-lg text-center">
              {referenceUsers.length > 1 ? `@${referenceUsers[1].userName}` : '@reference2'}
            </Text>
          </View>
        </View>
        <CustomReferenceButton title="Submit" onPress={handleFinalNavigation} />
      </View>
    </View>
  );
};
