import { FlatList, ScrollView, Text, View } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Header from 'components/Header/Header';
import { text } from 'theme/text';

import CommonActivity from '../components/CommonActivity';
import MultipleUsersActivity from '../components/MultipleUsersActivity';
import PaymentReceivedActivity from '../components/PaymentReceivedActivity';
import SharedMomentActivity from '../components/SharedMomentActivity';
import { useQuery } from 'react-query';
import Api from 'services/Api';
import { useEffect } from 'react';
import { getImageLink } from 'modules/moments/helpers/imageHelpers';
import { useDispatch } from 'react-redux';
import { selectNotification } from 'store/notification/notificationSlice';

const ActivityScreen = () => {
  const notifications = useQuery('getNotifications', Api.getNotifications);
  const navigation: any = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  function getTimeDifference(dateString: string) {
    const currentDate = new Date();
    const providedDate = new Date(dateString);

    const timeDifferenceInSeconds = Math.floor((currentDate.valueOf() - providedDate.valueOf()) / 1000);

    if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds}s`;
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutes}m`;
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return `${hours}H`;
    } else if (timeDifferenceInSeconds < 2592000) {
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      return `${days}D`;
    } else if (timeDifferenceInSeconds < 31536000) {
      const months = Math.floor(timeDifferenceInSeconds / 2592000);
      return `${months}M`;
    } else {
      const years = Math.floor(timeDifferenceInSeconds / 31536000);
      return `${years}Y`;
    }
  }

  const handlePress = (notification: any) => {
    dispatch(selectNotification(notification));
    if (notification.title === 'Reference check') {
      navigation.navigate('AcceptReferenceStack');
    }
  };

  useEffect(() => {
    if (isFocused) notifications.refetch();
  }, [isFocused]);
  return (
    <View className="flex-1 bg-white px-6">
      <Header />
      <Text className={text({ type: 'b32', class: 'mb-10' })}>Activity</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={notifications.data}
        keyExtractor={n => n._id}
        renderItem={({ item }) => {
          return item.type === 'Met' ? (
            <SharedMomentActivity
              avatars={{
                user1: getImageLink(item?.met?.users[0]?.user?.photo?.mediaId),
                user2: getImageLink(item?.met?.users[1]?.user?.photo?.mediaId),
              }}
              momentThumbnail={
                item.post?.mediaType === 'image' ? getImageLink(item.post?.media[0]?.mediaId) : ''
              }
              title={item.title}
              subTitle={item.body}
              time={getTimeDifference(item.createdAt)}
            />
          ) : item.type === 'Reference-Check' ? (
            <MultipleUsersActivity
              title={item.title}
              lastUserUsername=""
              time={getTimeDifference(item.createdAt)}
              subTitle={item.body}
              momentThumbnail={
                item?.post && item.post?.mediaType && item.post?.mediaType?.includes('image')
                  ? getImageLink(item.post.media[0]?.mediaId)
                  : ''
              }
              onPress={() => handlePress(item)}
            />
          ) : item.type === 'Invite' ? (
            <CommonActivity
              title={item.title}
              time={getTimeDifference(item.createdAt)}
              // showFollowBack={item?.sender?.followers?.includes(user?._id)}
              subTitle={item.body}
              avatars={{
                user1: getImageLink(item?.sender?.photo?.mediaId),
                user2: 'https://i.pravatar.cc/150?img=36',
              }}
            />
          ) : item.type === 'Shared' ? (
            <CommonActivity
              time={getTimeDifference(item.createdAt)}
              title={item.title}
              subTitle={item.body}
              postThumbnail={
                item.post.mediaType.includes('image')
                  ? getImageLink(item.post.media[0]?.mediaId)
                  : ''
              }
              avatars={{
                user1: getImageLink(item?.sender?.photo?.mediaId),
                user2: 'https://i.pravatar.cc/150?img=36',
              }}
            />
          ) : item.type === 'Like-Met' ? (
            <MultipleUsersActivity
              time={getTimeDifference(item.createdAt)}
              user1Photo={getImageLink(item?.met?.users[0]?.user?.photo?.mediaId)}
              user2Photo={getImageLink(item?.met?.users[1]?.user?.photo?.mediaId)}
              title={item.title}
              lastUserUsername=""
              subTitle={item.body}
              momentThumbnail={
                item.post.mediaType.includes('image')
                  ? getImageLink(item.post?.media[0]?.mediaId)
                  : ''
              }
            />
          ) : item.type === 'Followed' ? (
            <CommonActivity
              title={item.title}
              time={getTimeDifference(item.createdAt)}
              // showFollowBack
              subTitle={item.body}
              // postThumbnail={'https://i.pravatar.cc/150?img=36'}
              avatars={{
                user1: getImageLink(item?.sender?.photo?.mediaId),
                user2: 'https://i.pravatar.cc/150?img=36',
              }}
            />
          ) : (
            <></>
          );
        }}
      />
      {/* <PaymentReceivedActivity
        price="340Cfa"
        title="Payment received"
        subTitle="From plastic donation"
      /> */}
      {/* 
      <PaymentReceivedActivity
        price="400Cfa"
        title="Payment received"
        subTitle="From plastic donation"
      /> */}
    </View>
  );
};

// const calculateTimeDifference = (createdAt: string, currentTime) => {
//   const timeDifferenceInSeconds = Math.floor((currentTime - createdAt) / 1000);

//   if (timeDifferenceInSeconds < 60) {
//     return `${timeDifferenceInSeconds}s`;
//   } else if (timeDifferenceInSeconds < 3600) {
//     const minutes = Math.floor(timeDifferenceInSeconds / 60);
//     return `${minutes}m`;
//   } else if (timeDifferenceInSeconds < 86400) {
//     const hours = Math.floor(timeDifferenceInSeconds / 3600);
//     return `${hours}h`;
//   } else {
//     const days = Math.floor(timeDifferenceInSeconds / 86400);
//     return `${days}d`;
//   }
// };

export default ActivityScreen;
