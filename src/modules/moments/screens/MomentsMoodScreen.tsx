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
import { MatchedUserType, MomentsMoodParams } from 'types/MomentsTypes';
import { getImageLink } from '../helpers/imageHelpers';
import { EMOTIONS } from '../constants';

const MomentsMoodScreen = ({ route }: { route?: { params: MomentsMoodParams } }) => {
  const dispatch = useDispatch();
  const pressedBtn = useRef<'SKIP' | 'DONE'>();
  const matchedUser = route?.params.matchedUser;

  const { mutate, isLoading } = useMutation(Api.postMoments);
  const postMomentsParams = useSelector(postMomentsParamsSelector);
  const { data } = useQuery('currentUserProfile', Api.getUserProfile);
  const { reset } = useNavigation<NavigationProp<MomentsStackParamList>>();

  const goToMomentsUpload = () => {
    if (!matchedUser || !data) return;

    let formdata = new FormData();
    const mediaUri = postMomentsParams.moments[0].file;
    const mediaType = postMomentsParams.moments[0].type.toLowerCase();
    const media: any = {
      uri: mediaUri,
      type: mediaType,
      name: 'moment.jpeg',
    };

    const moodScale = EMOTIONS.findIndex(e => e === postMomentsParams.mood) + 1;

    // const users: any = [{ user: data?.data.user._id }, {user: matchedUser?.user._id}];

    formdata.append('post[text]', postMomentsParams.caption);
    formdata.append('post[visibility]', 'Public');
    formdata.append('post[media]', media, 'file');
    formdata.append('post[subText]', '');
    formdata.append('post[mediaType]', mediaType);
    formdata.append('users[0][user]', data?.data.user._id);
    formdata.append('users[1][user]', matchedUser?.user._id);
    // formdata.append('users', users);
    formdata.append('mood', moodScale.toString());

    reset({
      index: 0,
      routes: [{ name: 'MomentsUpload', params: matchedUser }],
    });
    dispatch(resetState());
    return;

    mutate(formdata, {
      onSuccess: data => {
        reset({
          index: 0,
          routes: [{ name: 'MomentsUpload' }],
        });
        dispatch(resetState());
      },
    });
  };

  return (
    <ScrollView className="bg-black px-7 pb-6 flex-1" contentContainerStyle={{ flex: 1 }}>
      <Header
        centerComponent={
          <Text className={text({ type: 'r16', class: 'text-white text-center px-10' })}>
            You met @{matchedUser?.user.userName} in person for the first time. {'\n \n'}
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
              <Image source={{ uri: getImageLink(data?.data.user.photo) }} className="w-20 h-20" />
            </View>
            <View className="overflow-hidden border-white  rounded-3xl border-4   -left-8 top-2 rotate-30">
              <Image
                source={{ uri: getImageLink(matchedUser?.user_profile_image.image) }}
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
