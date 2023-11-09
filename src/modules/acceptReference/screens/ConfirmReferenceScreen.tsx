import Header from 'components/Header/Header';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { View, Text } from 'react-native';
import { Userpic } from 'react-native-userpic';

export const ConfirmReferenceScreen = ({ navigation }: any) => {
  return (
    <View className="px-6 flex-1">
      <Header showBackIcon title="Confirm reference" />
      <View className="flex-1 items-center justify-between my-36">
        <View>
          <Text className="text-center text-2xl font-bold mb-10">Do you know</Text>
          <View>
            <Userpic
              source={{ uri: 'https://i.pravatar.cc/100?img=5' }}
              size={140}
              style={{ borderWidth: 4, borderColor: 'rgb(54 83 20)' }}
            />
            <Text className="text-center text-gray-900 my-2 text-lg">@username</Text>
          </View>
        </View>
        <View>
          <Text className="text-center text-gray-500 mb-12 mx-4">
            @username says you know them in person and wants you to give them reference
          </Text>
          <View className="flex-row justify-center">
            <CustomReferenceButton
              title={'Reject'}
              customContainerClass={'bg-red-900 border-0 px-10 mr-4 py-1.5'}
              customTextClass={'text-white text-sm py-0 my-0 font-normal'}
              onPress={() => navigation.navigate('ReferenceComplete', { type: 'reject' })}
            />
            <CustomReferenceButton
              title={'Accept'}
              customContainerClass={'bg-lime-900 border-0 px-8 ml-4 py-1.5'}
              customTextClass={'text-white text-sm py-0 my-0 font-normal'}
              onPress={() => navigation.navigate('ReferenceComplete', { type: 'accept' })}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
