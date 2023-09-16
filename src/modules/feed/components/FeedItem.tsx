import { Image, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp } from '@react-navigation/native';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { AuthStackParamList } from 'modules/auth/AuthStackNavigator';
import { units } from 'utils/helpers';

import BorderedText from '../components/BorderedText';
import FeedItemIndex from '../components/FeedItemIndex';

import FeedItemActionBar from './FeedItemActionBar';
import FeedItemDetailsBar from './FeedItemDetailsBar';

const FeedItem = ({ image }: { image: string }) => {
  const { top } = useSafeAreaInsets();
  const {} = useAppNavigation<NavigationProp<AuthStackParamList>>();

  return (
    <View>
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
          username: '@userFirst',
          avatar: 'https://i.pravatar.cc/150?img=33',
        }}
        userSecond={{
          emotion: '😍',
          username: '@userSecond',
          avatar: 'https://i.pravatar.cc/150?img=35',
        }}
        subText="Today - Buea, Cameroon"
        caption="Alrionne is such an amazing human being in person. So happy to have shared a moment with her"
      />
      <FeedItemActionBar
        onPressLike={() => null}
        onPressShare={() => null}
        onPressComment={() => null}
        onPressBookmark={() => null}
      />
    </View>
  );
};

export default FeedItem;
