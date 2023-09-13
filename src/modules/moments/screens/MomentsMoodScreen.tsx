import { useRef } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Button from 'components/Button';
import Header from 'components/Header/Header';
import { useMutation, useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import Api from 'services/Api';
import { matchedUserSelector, postMomentsParamsSelector } from 'store/moments/momentsSelectors';
import { resetState, setMood } from 'store/moments/momentsSlice';
import { text } from 'theme/text';

import MoodSlider from '../components/MoodSlider';
import { MomentsStackParamList } from '../MomentsStackNavigator';

const MomentsMoodScreen = () => {
  const dispatch = useDispatch();
  const pressedBtn = useRef<'SKIP' | 'DONE'>();
  const matchedUser = useSelector(matchedUserSelector);
  const { mutate, isLoading } = useMutation(Api.postMoments);
  const postMomentsParams = useSelector(postMomentsParamsSelector);
  const { data } = useQuery('currentUserProfile', Api.getUserProfile);
  const { reset } = useNavigation<NavigationProp<MomentsStackParamList>>();

  const goToMomentsUpload = () => {
    mutate(
      { ...postMomentsParams },
      {
        onSuccess: () => {
          reset({
            index: 0,
            routes: [{ name: 'MomentsUpload' }],
          });
          dispatch(resetState());
        },
      },
    );
  };

  return (
    <ScrollView className="bg-black px-7 pb-6 flex-1" contentContainerStyle={{ flex: 1 }}>
      <Header
        centerComponent={
          <Text className={text({ type: 'r16', class: 'text-white text-center px-10' })}>
            You met {matchedUser?.user.username} in person for the first time. {'\n \n'}
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
              <Image source={{ uri: data?.user_profile_image.image }} className="w-20 h-20" />
            </View>
            <View className="overflow-hidden border-white  rounded-3xl border-4   -left-8 top-2 rotate-30">
              <Image
                source={{ uri: matchedUser?.user_profile_image.image }}
                className="w-20 h-20"
              />
            </View>
          </View>
        </View>
        <View>
          <Text className={text({ type: 'b26', class: 'text-white text-center px-10' })}>Mood</Text>
          <MoodSlider onChangeMood={mood => dispatch(setMood(mood))} />
        </View>
        <View>
          <Button
            title="Done"
            disabled={isLoading}
            type="borderedSolid"
            isLoading={pressedBtn.current === 'DONE' && isLoading}
            onPress={() => {
              pressedBtn.current = 'DONE';
              goToMomentsUpload();
            }}
            customContainer="self-center px-10"
          />
          <Button
            disabled={isLoading}
            isLoading={pressedBtn.current === 'SKIP' && isLoading}
            title="Skip for now"
            customTextClass="text-13"
            onPress={() => {
              pressedBtn.current = 'SKIP';
              goToMomentsUpload();
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default MomentsMoodScreen;
