import { FlatList, Image, ScrollView, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Button from 'components/Button';
import Header from 'components/Header/Header';
import { text } from 'theme/text';
import { width } from 'utils/helpers';

import { MomentsStackParamList } from '../MomentsStackNavigator';

const MomentsUploadScreen = () => {
  const { navigate } = useNavigation<NavigationProp<MomentsStackParamList>>();

  const goToMomentsUpload = () => navigate('MomentsUpload');

  return (
    <ScrollView className="bg-black px-7 pb-6 flex-1" contentContainerStyle={{ flex: 1 }}>
      <Header />
      <Text className={text({ type: 'b44', class: 'text-white-o-70 text-center px-10 mb-3' })}>
        All Done!
      </Text>
      <Text className={text({ type: 'r16', class: 'text-white text-center px-10 mb-3' })}>
        You met @bayuga in person for the first time.
      </Text>
      <View className="flex-row self-center mb-4">
        <View className="overflow-hidden border-white rounded-2xl border-4  -rotate-30 ">
          <Image source={{ uri: 'https://i.pravatar.cc/150?img=33' }} className="w-16 h-16" />
        </View>
        <View className="overflow-hidden border-white  rounded-2xl border-4 -left-8 top-2 rotate-30">
          <Image source={{ uri: 'https://i.pravatar.cc/150?img=34' }} className="w-16 h-16" />
        </View>
      </View>
      <View className="h-3 bg-white rounded-full overflow-hidden  mb-12 mt-8 mx-10">
        <View className="h-3 bg-yellowishOrange" style={{ width: '60%' }} />
      </View>
      <Text className={text({ class: 'text-white text-center' })}>
        view recommended moment from friends
      </Text>
      <View className="mt-6">
        <FlatList
          horizontal
          data={[1, 2, 3]}
          contentContainerStyle={{ paddingLeft: 80 }}
          renderItem={() => (
            <View className="rounded-2xl overflow-hidden border-4 mr-10 border-white">
              <Image
                className="h-64"
                resizeMode="cover"
                style={{ width: width / 2 }}
                source={{ uri: 'https://i.pravatar.cc/300?img=16' }}
              />
              <View className="absolute z-10 bottom-4 left-0 right-0 items-center">
                <Text className={text({ type: 'b16', class: 'text-white' })}>Today</Text>
                <Text className={text({ type: 'b16', class: 'text-white' })}>Buea, Cameroon</Text>
              </View>
            </View>
          )}
        />
      </View>
      <Button
        title="Close"
        type="borderedSolid"
        onPress={goToMomentsUpload}
        customContainer="self-center px-10 mt-16"
      />
    </ScrollView>
  );
};

export default MomentsUploadScreen;
