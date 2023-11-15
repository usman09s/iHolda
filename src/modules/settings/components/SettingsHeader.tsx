import { useNavigation } from '@react-navigation/native';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { View, Text } from 'react-native';
import { Userpic } from 'react-native-userpic';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const SettingsHeader = () => {
  const navigation = useNavigation();
  return (
    <View className="bg-blue items-center pt-10 pb-6">
      <View className="items-center justify-between px-6 flex-row w-full">
        <Ionicons name="arrow-back" size={30} color="white" />
        <Ionicons name="qr-code-sharp" size={30} color="white" />
      </View>
      <Userpic
        source={{ uri: 'https://i.pravatar.cc/100?img=5' }}
        size={100}
        style={{ borderWidth: 5, borderColor: 'white' }}
      />
      <Text className="text-center color-white text-2xl font-semibold my-2">Betrand Bayuga</Text>
      <Text className="text-center color-white text-base font-normal">@Bayuga</Text>
      <CustomReferenceButton
        title={'Verify account'}
        onPress={() => navigation.navigate('RequestReferenceStack')}
        customContainerClass={'border-0 px-20 ml-4 py-2'}
        extraStyles={{ backgroundColor: 'rgba(101,190,229,255)' }}
        customTextClass={'text-white text-sm py-0 my-0 font-normal'}
      />
    </View>
  );
};
