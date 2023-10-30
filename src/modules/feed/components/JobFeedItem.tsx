import { Image, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp } from '@react-navigation/native';
import Button from 'components/Button';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { AuthStackParamList } from 'modules/auth/AuthStackNavigator';
import { text } from 'theme/text';
import { units } from 'utils/helpers';

import BorderedText from '../components/BorderedText';
import FeedItemIndex from '../components/FeedItemIndex';

import FeedItemActionBar from './FeedItemActionBar';
import JobFeedItemDetailsBar from './JobFeedItemDetailsBar';

const JobFeedItem = ({ image, type }: { image: string; type: string }) => {
  const { top } = useSafeAreaInsets();
  const { navigate } = useAppNavigation<NavigationProp<AuthStackParamList>>();

  return (
    <View>
      <View
        className="flex-row space-x-2 self-center items-center"
        // style={{ paddingTop: top + 160 }}
        >
        <FeedItemIndex indexCount={10} activeIndex={1} />
      </View>
      <View
        className="absolute z-20 flex-row self-center items-center right-10"
        style={{ top: units.vh * 20 }}
        >
        <BorderedText>4</BorderedText>
      </View>
      <Image
        resizeMode="cover"
        className="w-full h-full"
        source={{
          uri: image,
        }}
      />
      <JobFeedItemDetailsBar
        caption={type === 'private' ? 'Professional chef needed to cook' : 'Drainage Clenup'}>
        <View className="w-full px-8 mt-4">
          <Button
            title="Quick apply"
            customContainer="mt-3 bg-darkBlue w-full"
            customTextClass={text({ type: 'r16' })}
            onPress={() =>
              navigate('JopApplyingStack', {
                screen: type === 'private' ? 'PrivateJobDetails' : 'CommunityJobDetails',
              })
            }
          />
        </View>
      </JobFeedItemDetailsBar>
      <FeedItemActionBar
        hideComment
        onPressLike={() => null}
        onPressShare={() => null}
        onPressComment={() => null}
        onPressBookmark={() => null}
      />
    </View>
  );
};

export default JobFeedItem;
