import { Image, Pressable, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { text } from 'theme/text';
import { width } from 'utils/helpers';

import { ProfileStackParamList } from '../ProfileStackNavigator';

const MyMainProfessionItem = ({ goToMainProfession }: { goToMainProfession: () => void }) => (
  <Pressable
    onPress={goToMainProfession}
    style={{ width: (width - 48) / 2 }}
    className="bg-pink-200 rounded-2xl p-3 mb-4">
    <View className="flex-row justify-between items-center">
      <View className="overflow-hidden border-2 border-saffron rounded-full h-11 w-11">
        <Image source={{ uri: 'https://i.pravatar.cc/300?img=3' }} className="h-11 w-11" />
      </View>
      <Text className={text({ type: 'm12' })}>View my CV</Text>
    </View>
    <View className="bg-green-400 rounded-full self-center px-2 py-1 my-2">
      <Text className={text({ type: 'r12' })}>Main profession</Text>
    </View>
    <Text className={text({ type: 'b18', class: 'text-center mb-4' })}>Product Manager</Text>
    <Text className={text({ type: 'r12' })} numberOfLines={2}>
      Location: Cameron / Remote
    </Text>
  </Pressable>
);

const MySideProfessionItem = ({ goToSideProfession }: { goToSideProfession: () => void }) => (
  <Pressable
    onPress={goToSideProfession}
    style={{ width: (width - 48) / 2 }}
    className="bg-[#13333B] rounded-2xl p-3 justify-between mb-4">
    <View className="flex-row justify-between items-center">
      <View className="overflow-hidden border-2 border-white rounded-full h-9 w-9">
        <Image source={{ uri: 'https://i.pravatar.cc/300?img=3' }} className="h-9 w-9" />
      </View>
      <Text className={text({ type: 'm12', class: 'text-white' })}>(Mon - Fri)</Text>
    </View>
    <Text className={text({ type: 'b18', class: 'text-center my-4 text-white' })}>
      Private Home Chef Chef
    </Text>
    <Text className={text({ type: 'r12', class: 'text-white' })} numberOfLines={2}>
      Location: Cameron / Remote
    </Text>
  </Pressable>
);

const MyServices = () => {
  const { navigate } = useNavigation<NavigationProp<ProfileStackParamList>>();

  const goToMainProfession = () => navigate('MainProfessionProfile');
  const goToSideProfession = () => navigate('SideProfessionProfile');

  return (
    <View className="mx-5 mt-6">
      <Text className={text({ type: 'r16' })}>My services</Text>
      <View className="flex-row flex-wrap justify-between mt-3">
        <MyMainProfessionItem goToMainProfession={goToMainProfession} />
        <MySideProfessionItem goToSideProfession={goToSideProfession} />
        <MySideProfessionItem goToSideProfession={goToSideProfession} />
        <MySideProfessionItem goToSideProfession={goToSideProfession} />
      </View>
    </View>
  );
};

export default MyServices;
