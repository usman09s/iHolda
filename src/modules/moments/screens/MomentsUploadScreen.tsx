import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Button from 'components/Button';
import { text } from 'theme/text';
import { units, width } from 'utils/helpers';

import { MomentsStackParamList } from '../MomentsStackNavigator';

const MomentsUploadScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { navigate } = useNavigation<NavigationProp<MomentsStackParamList>>();

  const goToMomentsUpload = () => navigate('MomentsUpload');

  return (
    <ScrollView
      className="bg-black px-7 pb-6 flex-1"
      contentContainerStyle={{
        paddingTop: top + 16,
        paddingBottom: bottom === 0 ? 16 : bottom,
      }}>
      <Text className={text({ type: 'b44', class: 'text-white-o-70 text-center px-10 mb-3' })}>
        All Done!
      </Text>
      <Text className={text({ type: 'r16', class: 'text-white text-center px-10 mb-3' })}>
        You met @bayuga in person for the first time.
      </Text>
      <View className="flex-row self-center mb-2">
        <View className="overflow-hidden border-white rounded-2xl border-4  -rotate-30 ">
          <Image source={{ uri: 'https://i.pravatar.cc/150?img=33' }} className="w-16 h-16" />
        </View>
        <View className="overflow-hidden border-white  rounded-2xl border-4 -left-8 top-2 rotate-30">
          <Image source={{ uri: 'https://i.pravatar.cc/150?img=34' }} className="w-16 h-16" />
        </View>
      </View>
      <View className="h-3 bg-white rounded-full overflow-hidden  my-8 mx-10">
        <View className="h-3 bg-yellowishOrange" style={{ width: '60%' }} />
      </View>
      <Text className={text({ class: 'text-white text-center mb-4' })}>
        view recommended moment from friends
      </Text>
      <View>
        <FlatList
          horizontal
          data={[1, 2, 3]}
          contentContainerStyle={styles.contentContainer}
          renderItem={() => (
            <View className="rounded-2xl overflow-hidden border-4 mr-10 border-white">
              <Image
                resizeMode="cover"
                style={styles.image}
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

const styles = StyleSheet.create({
  contentContainer: { paddingLeft: units.vw * 12 },
  image: { width: width / 2.1, height: units.vh * 30 },
});

export default MomentsUploadScreen;
