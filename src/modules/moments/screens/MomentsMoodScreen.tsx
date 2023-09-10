import { Image, ScrollView, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Button from 'components/Button';
import Header from 'components/Header/Header';
import { text } from 'theme/text';

import MoodSlider from '../components/MoodSlider';
import { MomentsStackParamList } from '../MomentsStackNavigator';

const MomentsMoodScreen = () => {
  const { navigate } = useNavigation<NavigationProp<MomentsStackParamList>>();

  const goToMomentsUpload = () => navigate('MomentsUpload');

  return (
    <ScrollView className="bg-black px-7 pb-6 flex-1" contentContainerStyle={{ flex: 1 }}>
      <Header
        centerComponent={
          <Text className={text({ type: 'r16', class: 'text-white text-center px-10' })}>
            You met @bayuga in person for the first time. {'\n \n'}
          </Text>
        }
      />
      <View className="flex-1 justify-evenly">
        <View>
          <Text className={text({ class: 'text-white text-center mt-7', type: 'm28' })}>
            <Text className="text-white-o-70">1x</Text>🎉
          </Text>
          <View className="flex-row self-center mb-20 mt-10">
            <View className="overflow-hidden border-white rounded-3xl border-4  -rotate-30 ">
              <Image source={{ uri: 'https://i.pravatar.cc/150?img=33' }} className="w-20 h-20" />
            </View>
            <View className="overflow-hidden border-white  rounded-3xl border-4   -left-8 top-2 rotate-30">
              <Image source={{ uri: 'https://i.pravatar.cc/150?img=34' }} className="w-20 h-20" />
            </View>
          </View>
        </View>
        <View>
          <Text className={text({ type: 'b26', class: 'text-white text-center px-10' })}>Mood</Text>
          <MoodSlider />
        </View>
        <View>
          <Button
            title="Done"
            type="borderedSolid"
            onPress={goToMomentsUpload}
            customContainer="self-center px-10"
          />
          <Button title="Skip for now" customTextClass="text-13" onPress={goToMomentsUpload} />
        </View>
      </View>
    </ScrollView>
  );
};

export default MomentsMoodScreen;
