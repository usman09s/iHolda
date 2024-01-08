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
import { selectUser, setUser } from 'store/userDataSlice';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { setUserInfo } from 'store/auth/userSlice';
import Api from 'services/Api';
import { useQuery } from 'react-query';
import Work from '../containers/Work';
import { useIsFocused } from '@react-navigation/native';

const ProfileScreen = ({ route, navigation }: any) => {
  const activeY = useSharedValue(0);
  const { top } = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const { user } = useSelector(userSelector);
  // console.log("🚀 ~ file: ProfileScreen.tsx:26 ~ ProfileScreen ~ user:", user?.basicVerification)
  const invitedBy = user?.invitedBy?.userName;
  const { username, avatar, joinedMonthAndYear } = useSelector(userCommonInformationSelector);
  const { refetch: refetchUserData } = useQuery('getCurrentUserProfile', Api.getUserProfile0);
  const isCurrentUser = route.params?.isCurrentUser ?? true;
  const dispatch = useAppDispatch();

  const isFocused = useIsFocused();

  const { data } = useQuery('currentUserProfile', Api.getUserProfile0, {
    refetchOnMount: false,
  });

  const onPressTabItem = (value: number) => () => {
    setIndex(value);
  };

  const scrollHandler = useAnimatedScrollHandler(event => {
    activeY.value = event.contentOffset.y <= 0 ? 0 : event.contentOffset.y;
  });

  const AgentRenderedComponent =
    [
      <Profile
        description={data?.data.user?.bio ?? ''}
        onPressMet={(data: any) => navigation.navigate('FeedDetailView', { item: data })}
        followers={data?.data.user?.followers ? data?.data.user?.followers?.length.toString() : '0'}
        impression="0"
        metPeople={user?.metCount ? user?.metCount?.toString() : '0'}
        key={0}
        metsUserId={user?._id}
      />,
      <Community cp={data?.data.user?.cp ?? '0'} lastcp={data?.data.user?.lastCp} key={1} />,
      <Work key={2} />,
      <Wallet key={3} />,
    ]?.[index] || [];

  const RenderedComponent =
    [
      <Profile
        description={data?.data.user?.bio ?? ''}
        onPressMet={(data: any) => navigation.navigate('FeedDetailView', { item: data })}
        followers={data?.data.user?.followers ? data?.data.user?.followers?.length.toString() : '0'}
        impression="0"
        metPeople={user?.metCount ? user?.metCount?.toString() : '0'}
        metsUserId={user?._id}
        key={0}
      />,
      <Community cp={data?.data.user?.cp ?? '0'} lastcp={data?.data.user?.lastCp} key={1} />,
      <Wallet key={2} />,
    ]?.[index] || [];

  const getUpdatedUserData = async () => {
    await refetchUserData()
      .then(response => {
        dispatch(setUser(response?.data?.data.user));
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    // dispatch(setUserInfo(data.data.user));
    if (isFocused) getUpdatedUserData();
  }, [isFocused]);

  return (
    <View className="flex-1 bg-white">
      <Animated.FlatList
        numColumns={3}
        data={[user?.isPlasticAgent ? AgentRenderedComponent : RenderedComponent]}
        onScroll={scrollHandler}
        stickyHeaderIndices={[0]}
        ListFooterComponent={<View className="h-10" />}
        nestedScrollEnabled={false}
        // horizontal
        className={'flex-1'}
        renderItem={({ item }) => item}
        ListHeaderComponent={
          <ProfileHeader
            navigate={navigation.push}
            user={user}
            verified={user?.basicVerification?.isVerified ?? false}
            top={top}
            isCurrentUser={isCurrentUser}
            avatar={avatar?.mediaId ?? ''}
            activeY={activeY}
            username={username}
            activeIndex={index}
            key={'profileHeader'}
            isAgent={user?.isPlasticAgent}
            invitedBy={user?.invitedBy}
            hederThumbnail={avatar?.mediaId ?? ''}
            monthAndYear={joinedMonthAndYear}
            onPressTabItem={onPressTabItem}
          />
        }
      />
    </View>
  );
};

export default ProfileScreen;
