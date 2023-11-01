import { Image, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Button from 'components/Button';
import Header from 'components/Header/Header';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import Api from 'services/Api';
import { matchedUserSelector } from 'store/moments/momentsSelectors';
import { text } from 'theme/text';

import { MomentsStackParamList } from '../MomentsStackNavigator';
import { MatchedUserType } from 'types/MomentsTypes';
import { getImageLink } from '../helpers/imageHelpers';

const MomentsMatchScreen = ({ route }: { route?: { params: MatchedUserType } }) => {
  // const matchedUser = useSelector(matchedUserSelector);
  const { data } = useQuery('currentUserProfile', Api.getUserProfile);
  const { navigate } = useNavigation<NavigationProp<MomentsStackParamList>>();
  const matchedUser = route?.params;

  const profilePhoto = data?.data.user.photo;

  return (
    <View className="flex-1 bg-black px-7">
      <Header showBackIcon backIconColor="white" />
      <View className="flex-1 justify-evenly">
        <View>
          <Text className={text({ type: 'b34', class: 'text-white-o-80 text-center' })}>
            Met each other
          </Text>
          <Text className={text({ type: 'b34', class: 'text-white text-center' })}>
            <Text className={text({ class: 'text-white-o-80' })}>1x</Text>🎉
          </Text>
        </View>
        <View className="flex-row self-center mb-20">
          <View className="overflow-hidden border-white rounded-3xl border-4  -rotate-30 ">
            <Image source={{ uri: getImageLink(profilePhoto) }} className="w-28 h-28" resizeMode="cover" />
          </View>
          <View className="overflow-hidden border-white  rounded-3xl border-4   -left-8 top-2 rotate-30">
            <Image
              source={{ uri: getImageLink(matchedUser?.user_profile_image.image) }}
              className="w-28 h-28"
              resizeMode="cover"
            />
          </View>
        </View>
        <Text className={text({ type: 'b16', class: 'text-white-o-80 text-center' })}>
          You are meeting @{matchedUser?.user.userName} for the 1st time take a selfie to share this
          moment with them
        </Text>
        <Button
          title="Take selfie"
          type="borderedSolid"
          customContainer="self-center"
          onPress={() => matchedUser && navigate('MomentsSelfie', { ...matchedUser })}
        />
      </View>
    </View>
  );
};

export default MomentsMatchScreen;
