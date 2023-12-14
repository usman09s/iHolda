import { useEffect, useState } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { userCommonInformationSelector, userSelector } from 'store/auth/userSelectors';

import ProfileHeader from '../components/ProfileHeader';
import Community from '../containers/Community';
import Profile from '../containers/Profile';
import Wallet from '../containers/Wallet';
import Shared from '../containers/Shared';
import { selectUser } from 'store/userDataSlice';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { setUserInfo } from 'store/auth/userSlice';
import Api from 'services/Api';
import { useQuery } from 'react-query';

const ProfileScreen = ({ route }: any) => {
  const activeY = useSharedValue(0);
  const { top } = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const { user } = useSelector(userSelector);
  const invitedBy = user?.invitedBy?.userName;
  const { username, avatar, joinedMonthAndYear } = useSelector(userCommonInformationSelector);
  const isCurrentUser = route.params?.isCurrentUser ?? true;
  const dispatch = useAppDispatch();
  const { data, refetch } = useQuery('currentUserProfile', Api.getUserProfile0, {
    refetchOnMount: false,
  });

  const onPressTabItem = (value: number) => () => {
    setIndex(value);
  };

  const scrollHandler = useAnimatedScrollHandler(event => {
    activeY.value = event.contentOffset.y <= 0 ? 0 : event.contentOffset.y;
  });

  const RenderedComponent =
    [
      <Profile
        followers={data?.data.user?.followers ? data?.data.user?.followers?.length.toString() : '0'}
        impression="0"
        metPeople={user?.metCount ? user?.metCount?.toString() : '0'}
        key={0}
      />,
      <Community cp={user?.cp ?? '0'} lastcp={user?.lastCp} key={1} />,
      <Wallet key={2} />,
      // <Shared key={2} />,
    ]?.[index] || [];

  // useEffect(() => {
  //   dispatch(setUserInfo(data.data.user));
  // },[])

  return (
    <View className="flex-1 bg-white">
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
            verified={user?.basicVerification ?? false}
            top={top}
            isCurrentUser={isCurrentUser}
            avatar={avatar?.mediaId ?? ""}
            activeY={activeY}
            username={username}
            activeIndex={index}
            key={'profileHeader'}
            invitedBy={invitedBy ?? ""}
            hederThumbnail={avatar?.mediaId ?? ""}
            monthAndYear={joinedMonthAndYear}
            onPressTabItem={onPressTabItem}
          />
        }
      />
    </View>
  );
};

export default ProfileScreen;
