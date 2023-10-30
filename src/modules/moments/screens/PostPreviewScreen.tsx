import { ImageBackground, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, StackActions, useNavigation } from '@react-navigation/native';
import Header from 'components/Header/Header';
import Icons from 'components/Icons';
import Input from 'components/Input';

import PostPreviewSideActionBar from '../components/PostPreviewSideActionBar';
import { MomentsStackParamList } from '../MomentsStackNavigator';
import { useSelector } from 'react-redux';
import { allMomentsSelector } from 'store/moments/momentsSelectors';
import { ResizeMode, Video } from 'expo-av';

const PostPreviewScreen = () => {
  const { dispatch, goBack } = useNavigation<NavigationProp<MomentsStackParamList>>();
  const { bottom } = useSafeAreaInsets();
  const moments = useSelector(allMomentsSelector);
  console.log(
    '🚀 ~ file: PostPreviewScreen.tsx:18 ~ PostPreviewScreen ~ moments:',
    moments[0].localUri,
  );

  return (
    <View className="flex-1 bg-black justify-center ">
      <View style={{ flex: 1, width: '100%', zIndex: 9999 }}>
        <Video
          isLooping
          shouldPlay={true}
          className="w-full h-full"
          resizeMode={ResizeMode.COVER}
          source={{ uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
        />
      </View>
      {/* <ImageBackground
        resizeMode="cover"
        className="flex-1 w-full"
        source={{ uri: moments[0].localUri }}>
        <View className="px-6">
          <Header showBackIcon backIconColor="white" />
        </View>
        <PostPreviewSideActionBar />
      </ImageBackground> */}
      <View
        className="flex-row w-full px-6"
        style={{ marginBottom: bottom || 16, marginTop: bottom || 16 }}>
        <Input placeholder="Add caption" customInputClass="flex-1 mr-4" />
        <Pressable
          onPress={() => {
            dispatch(StackActions.popToTop());
            goBack();
          }}
          className="bg-blue rounded-full w-12 h-12 items-center justify-center">
          <Icons.ArrowLeftIcon color={'white'} className="rotate-180" />
        </Pressable>
      </View>
    </View>
  );
};

export default PostPreviewScreen;
