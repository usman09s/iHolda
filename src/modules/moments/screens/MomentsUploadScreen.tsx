import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { SlideInLeft } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, StackActions, useNavigation } from '@react-navigation/native';
import Button from 'components/Button';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import Api from 'services/Api';
import { matchedUserSelector } from 'store/moments/momentsSelectors';
import { text } from 'theme/text';
import { formatDateDifference, units, width } from 'utils/helpers';

import { MomentsStackParamList } from '../MomentsStackNavigator';
import { MatchedUserType } from 'types/MomentsTypes';
import { getImageLink } from '../helpers/imageHelpers';

const MomentsUploadScreen = ({ route }: { route?: { params: MatchedUserType } }) => {
  const { top, bottom } = useSafeAreaInsets();
  // const matchedUser = useSelector(matchedUserSelector);
  const matchedUser = route?.params;

  const moments = useQuery('getRestaurents', Api.getRestaurents);
  const { data } = useQuery('currentUserProfile', Api.getUserProfile);
  const { dispatch, reset } = useNavigation<NavigationProp<any>>();

  const navigateToRoot = () => {
    dispatch(StackActions.popToTop);
  };

  const onPressRestaurant = () => {
    // RestaurentDetail
    reset({
      index: 1,
      routes: [{ name: 'BottomTabs' }, { name: 'RestaurentDetail' }],
    });
  };

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
        You met {matchedUser?.user.userName} in person for the first time.
      </Text>
      <View className="flex-row self-center mb-2 mt-4">
        <View className="overflow-hidden border-white rounded-2xl border-4  -rotate-30 ">
          <Image source={{ uri: getImageLink(data?.data.user.photo) }} className="w-16 h-16" />
        </View>
        <View className="overflow-hidden border-white  rounded-2xl border-4 -left-8 top-2 rotate-30">
          <Image
            source={{ uri: getImageLink(matchedUser?.user_profile_image.image) }}
            className="w-16 h-16"
          />
        </View>
      </View>
      <View className="h-3 bg-white rounded-full overflow-hidden  my-8 mx-10">
        <Animated.View
          entering={SlideInLeft}
          style={{ width: '100%' }}
          className="h-3 bg-yellowishOrange"
        />
      </View>
      <Text className={text({ class: 'text-white text-center mb-4' })}>
        To celebrate your first meet up, here is{' '}
        <Text style={{ color: '#ffc401', fontWeight: '800' }}>50% OFF</Text> to dine in at any of
        these restaurants today.
      </Text>
      <View>
        {moments.isLoading && <ActivityIndicator />}
        <FlatList
          horizontal
          data={moments.data?.data?.restaurantData || []}
          contentContainerStyle={styles.contentContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={onPressRestaurant}
              style={{ width: width / 2.1, marginRight: 15 }}>
              <View style={styles.image} className="rounded-3xl overflow-hidden border-4 mr-10">
                <Image
                  resizeMode="cover"
                  className="w-full h-full"
                  source={{ uri: getImageLink(item.media[0]) }}
                />
              </View>
              <View className="flex-row justify-between px-2">
                <Text
                  style={{ width: '70%' }}
                  className={text({ type: 'r16', class: 'text-white' })}>
                  {item?.name}
                </Text>
                <Text className={text({ type: 'b16', class: 'text-white' })}>{item?.rating}.0</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <Button
        title="Close"
        type="borderedSolid"
        onPress={navigateToRoot}
        customContainer="self-center px-10 mt-16"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: { paddingLeft: units.vw * 12 },
  image: { height: units.vh * 30, width: '100%' },
});

export default MomentsUploadScreen;
