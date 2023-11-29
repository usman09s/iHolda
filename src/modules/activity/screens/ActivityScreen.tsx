import { ScrollView, Text, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Header from 'components/Header/Header';
import { text } from 'theme/text';

import CommonActivity from '../components/CommonActivity';
import MultipleUsersActivity from '../components/MultipleUsersActivity';
import PaymentReceivedActivity from '../components/PaymentReceivedActivity';
import SharedMomentActivity from '../components/SharedMomentActivity';
import { useEffect } from 'react';
import Api from 'services/Api';
import { selectNotification, setNotifications } from 'store/notification/notificationSlice';
import { useDispatch, useSelector } from 'react-redux';

const ActivityScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const notifications = useSelector((state: any) => state.notification.data);

  useFocusEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notifications = await Api.getNotifications();
        dispatch(setNotifications(notifications.data));
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    fetchNotifications();
  });

  const handlePress = (notification: any) => {
    dispatch(selectNotification(notification));
    if (notification.title === 'Reference check') {
      navigation.navigate('AcceptReferenceStack');
    }
  };

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
        {notifications.map((notification, index) => {
          const atIndex = notification.body.indexOf('@');
          const bodyWithoutUsername = notification.body.substring(0, atIndex);
          const createdAtTimestamp = new Date(notification.createdAt);
          const currentTime = new Date();
          const hourDifference = `${Math.floor(
            (currentTime - createdAtTimestamp) / (60 * 60 * 1000),
          )}H`;
          if (notification.title === 'Reference check') {
            return (
              <MultipleUsersActivity
                key={index}
                avatars={{
                  user1: notification.sender.photo,
                  user2: 'https://i.pravatar.cc/150?img=36',
                }}
                title={notification.title}
                subTitle={bodyWithoutUsername}
                lastUserUsername={`@${notification.sender.userName}`}
                momentThumbnail={'https://i.pravatar.cc/150?img=36'}
                time={hourDifference}
                onPress={() => handlePress(notification)}
              />
            );
          }
        })}
      </ScrollView>
    </View>
  );
};

export default ActivityScreen;
