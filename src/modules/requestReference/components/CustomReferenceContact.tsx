import { View, Text } from 'react-native';
import { Userpic } from 'react-native-userpic';
import { CustomReferenceButton } from './CustomReferenceButton';
import { useNavigation } from '@react-navigation/native';

export const CustomReferenceContact = ({ data }: any) => {
  const navigation = useNavigation();
  return (
    <View className="flex-row items-center justify-between my-2.5">
      <View className="flex-row items-center">
        <Userpic source={{ uri: data.imageUri }} size={60} />
        <View className="ml-2">
          <Text className="text-black font-bold text-14">{data.name}</Text>
          <Text className="text-black font-light text-10">{data.card}</Text>
        </View>
      </View>
      <CustomReferenceButton
        title="SELECT"
        onPress={() => navigation.goBack()}
        customContainerClass={'border-black py-0 mt-0 px-3.5'}
        extraStyles={{ borderWidth: 3 }}
        customTextClass={'text-12 font-bold'}
      />
    </View>
  );
};
