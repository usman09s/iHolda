import { Image, View, ToastAndroid } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp } from '@react-navigation/native';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { AuthStackParamList } from 'modules/auth/AuthStackNavigator';
import { units } from 'utils/helpers';

import BorderedText from '../components/BorderedText';
import FeedItemIndex from '../components/FeedItemIndex';

import FeedItemActionBar from './FeedItemActionBar';
import FeedItemDetailsBar from './FeedItemDetailsBar';
import { useMutation } from 'react-query';
import Api from 'services/Api';
import Commentsui from './CommentsUi';

interface Props {
  image: string;
  username1?: string;
  username2?: string;
  userpic1?: string;
  userpic2?: string;
  caption: string;
  subText: string;
  id: string;
  likes: number;
  comments: number;
}

const FeedItem = ({
  image,
  username1,
  username2,
  userpic1,
  userpic2,
  caption,
  subText,
  id,
  likes,
  comments,
}: Props) => {
  const { top } = useSafeAreaInsets();
  const { mutate, isLoading } = useMutation(Api.sharePost);

  const {} = useAppNavigation<NavigationProp<AuthStackParamList>>();

  return (
    <View>
      {/* <Commentsui visible setVisible={() => null} text='' /> */}
      <View
        className="absolute z-40 flex-row space-x-2 self-center items-center"
        style={{ paddingTop: top + 160 }}>
        <FeedItemIndex indexCount={10} activeIndex={1} />
      </View>
      <View
        className="absolute z-20 flex-row self-center items-center right-10"
        style={{ top: units.vh * 20 }}>
        <BorderedText>4</BorderedText>
      </View>
      <Image
        resizeMode="cover"
        className="w-full h-full"
        source={{
          uri:
            image ||
            'https://images.pexels.com/photos/13347119/pexels-photo-13347119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        }}
      />
      <FeedItemDetailsBar
        userFirst={{
          emotion: '😄',
          username: username1 || '@userFirst',
          avatar: userpic1 || 'https://i.pravatar.cc/150?img=33',
        }}
        userSecond={{
          emotion: '😍',
          username: username2 || '@userSecond',
          avatar: userpic2 || 'https://i.pravatar.cc/150?img=35',
        }}
        subText={subText}
        caption={caption}
      />
      <FeedItemActionBar
        likes={likes}
        comments={comments}
        onPressLike={() => null}
        onPressShare={() => {
          mutate(
            { postId: id },
            {
              onSuccess(data) {
                ToastAndroid.showWithGravity(
                  'Post shared',
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER,
                );
              },
            },
          );
        }}
        onPressComment={() => null}
        onPressBookmark={() => null}
      />
    </View>
  );
};

export default FeedItem;
