import { useState } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { userCommonInformationSelector, userSelector } from 'store/auth/userSelectors';

import ProfileHeader from '../components/ProfileHeader';
import Community from '../containers/Community';
import Profile from '../containers/Profile';
import Shared from '../containers/Shared';
import Work from '../containers/Work';
import Wallet from '../containers/Wallet';
import { useQuery } from 'react-query';
import Api from 'services/Api';
import { useNavigation } from '@react-navigation/native';

const OtherUserProfileScreen = ({ route }: any) => {
  const activeY = useSharedValue(0);
  const { top } = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const { data, refetch } = useQuery(
    'otherUserProfile',
    () => Api.getUserProfile(route.params.userId),
    {
      refetchOnMount: false,
    },
  );
  const { user } = useSelector(userSelector);

  const { navigate }: any = useNavigation();

  const invitedBy = data?.data.user?.invitedBy?.userName;
  const username = data?.data?.user.userName;
  const avatar = data?.data?.user.photo;
  const joinedMonthAndYear = 'June 2023';
  // const { joinedMonthAndYear } = useSelector(userCommonInformationSelector);

  const onPressTabItem = (value: number) => () => {
    setIndex(value);
  };

  const scrollHandler = useAnimatedScrollHandler(event => {
    activeY.value = event.contentOffset.y <= 0 ? 0 : event.contentOffset.y;
  });

  const RenderedComponent =
    [
      <Profile
        onPressMet={(data: any) => navigate('FeedDetailView', { item: data })}
        followers={
          data?.data?.user?.followers ? data?.data?.user?.followers?.length.toString() : '0'
        }
        impression="0"
        metPeople={data?.data?.user?.metCount ? data?.data?.user?.metCount?.toString() : '0'}
        key={0}
        metsUserId={data?.data?.user._id}
      />,
      <Community cp={data?.data?.user?.cp} lastcp={data?.data?.user?.lastCp} key={1} />,
      <Wallet key={2} />,
      <Shared
        userId={data?.data?.user._id ?? ''}
        userName={data?.data?.user.userName ?? ''}
        loginUserId={user?._id ?? ""}
        key={3}
      />,
    ]?.[index] || [];

  return (
    <View className="flex-1 bg-white">
      {data ? (
        <Animated.FlatList
          numColumns={3}
          data={[RenderedComponent]}
          onScroll={scrollHandler}
          stickyHeaderIndices={[0]}
          ListFooterComponent={<View className="h-10" />}
          nestedScrollEnabled={false}
          className={'flex-1'}
          renderItem={({ item }) => item}
          ListHeaderComponent={
            <ProfileHeader
              user={data?.data?.user}
              top={top}
              avatar={avatar ?? ''}
              activeY={activeY}
              username={username ?? ''}
              activeIndex={index}
              key={'profileHeader'}
              invitedBy={invitedBy ?? ''}
              isCurrentUser={false}
              hederThumbnail={avatar ?? ''}
              monthAndYear={joinedMonthAndYear}
              onPressTabItem={onPressTabItem}
            />
          }
        />
      ) : null}
    </View>
  );
};

export default OtherUserProfileScreen;
