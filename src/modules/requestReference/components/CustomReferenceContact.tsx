import { View, Text } from 'react-native';
import { Userpic } from 'react-native-userpic';
import { CustomReferenceButton } from './CustomReferenceButton';
import { useRequestReferenceAction } from '../hooks/useRequestReferenceActions';
import { useNavigation, useRoute } from '@react-navigation/native';

export const CustomReferenceContact = ({ data }: any) => {
  const { updateReference } = useRequestReferenceAction();
  const { userName, photo } = data;
  const route = useRoute();
  const navigation = useNavigation();
  const index = route.params?.index;

  const handleSelect = () => {
    console.log(index, data);
    updateReference(data, index);
    navigation.goBack();
  };

  return (
    <View className="flex-row items-center justify-between my-2.5">
      <View className="flex-row items-center">
        <Userpic source={{ uri: photo }} size={60} />
        <View className="ml-2">
          <Text className="text-black font-bold text-14">{userName}</Text>
          {/* You can add more properties here if needed */}
        </View>
      </View>
      <CustomReferenceButton
        title="SELECT"
        onPress={handleSelect}
        customContainerClass={'py-0 mt-0 px-3.5'}
        extraStyles={{ borderWidth: 3, borderColor: 'black' }}
        customTextClass={'text-12 font-bold'}
      />
    </View>
  );
};
