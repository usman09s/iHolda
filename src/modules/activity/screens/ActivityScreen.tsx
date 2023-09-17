import { ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from 'components/Header/Header';
import { text } from 'theme/text';

import CommonActivity from '../components/CommonActivity';
import MultipleUsersActivity from '../components/MultipleUsersActivity';
import PaymentReceivedActivity from '../components/PaymentReceivedActivity';
import SharedMomentActivity from '../components/SharedMomentActivity';

const ActivityScreen = () => {
  const {} = useNavigation();

  return (
    <View className="flex-1 bg-white px-6">
      <Header />
      <Text className={text({ type: 'b32', class: 'mb-10' })}>Activity</Text>
      <ScrollView>
        <SharedMomentActivity
          avatars={{
            user1: 'https://i.pravatar.cc/150?img=13',
            user2: 'https://i.pravatar.cc/150?img=36',
          }}
          momentThumbnail={'https://i.pravatar.cc/150?img=36'}
          title="You & Ornela shared a moment"
          subTitle="in Buea, Cameroon"
        />
        <PaymentReceivedActivity
          price="340Cfa"
          title="Payment received"
          subTitle="From plastic donation"
        />
        <CommonActivity
          title="bayuga"
          subTitle="Shared your post"
          postThumbnail={'https://i.pravatar.cc/150?img=36'}
          avatars={{
            user1: 'https://i.pravatar.cc/150?img=13',
            user2: 'https://i.pravatar.cc/150?img=36',
          }}
        />
        <CommonActivity
          title="bayuga"
          showFollowBack
          subTitle="Followed you"
          postThumbnail={'https://i.pravatar.cc/150?img=36'}
          avatars={{
            user1: 'https://i.pravatar.cc/150?img=13',
            user2: 'https://i.pravatar.cc/150?img=36',
          }}
        />
        <PaymentReceivedActivity
          price="400Cfa"
          title="Payment received"
          subTitle="From plastic donation"
        />
        <MultipleUsersActivity
          avatars={{
            user1: 'https://i.pravatar.cc/150?img=13',
            user2: 'https://i.pravatar.cc/150?img=36',
          }}
          title="User1 & 5 others"
          lastUserUsername="@user3"
          subTitle="Liked your moment with "
          momentThumbnail={'https://i.pravatar.cc/150?img=36'}
        />
      </ScrollView>
    </View>
  );
};

export default ActivityScreen;
