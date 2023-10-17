import { ImageBackground, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, StackActions, useNavigation } from '@react-navigation/native';
import Header from 'components/Header/Header';
import Icons from 'components/Icons';
import Input from 'components/Input';

import PostPreviewSideActionBar from '../components/PostPreviewSideActionBar';
import { MomentsStackParamList } from '../MomentsStackNavigator';

const PostPreviewScreen = () => {
  const { dispatch, goBack } = useNavigation<NavigationProp<MomentsStackParamList>>();
  const { bottom } = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-black justify-center ">
      <ImageBackground
        resizeMode="cover"
        className="flex-1 w-full"
        source={{ uri: 'https://i.pravatar.cc/1024?img=24' }}>
        <View className="px-6">
          <Header showBackIcon backIconColor="white" />
        </View>
        <PostPreviewSideActionBar />
      </ImageBackground>
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
