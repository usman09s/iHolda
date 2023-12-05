import { useState } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { userCommonInformationSelector } from 'store/auth/userSelectors';

import ProfileHeader from '../components/ProfileHeader';
import Community from '../containers/Community';
import Profile from '../containers/Profile';
import Wallet from '../containers/Wallet';
import Shared from '../containers/Shared';
import { selectUser } from 'store/userDataSlice';

const ProfileScreen = ({ route }: any) => {
  const activeY = useSharedValue(0);
  const { top } = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const { username, avatar, invitedBy, joinedMonthAndYear } = useSelector(
    userCommonInformationSelector,
  );
  const userData = useSelector(selectUser);
  const isCurrentUser = route.params?.isCurrentUser ?? true;
  console.log(route.params, 'jofjeofioh');

  const onPressTabItem = (value: number) => () => {
    setIndex(value);
  };

  const scrollHandler = useAnimatedScrollHandler(event => {
    activeY.value = event.contentOffset.y <= 0 ? 0 : event.contentOffset.y;
  });

  const RenderedComponent =
    [<Profile key={0} />, <Community key={1} />, <Wallet key={2} />, <Shared key={3} />]?.[index] ||
    [];

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
            top={top}
            isCurrentUser={isCurrentUser}
            avatar={avatar}
            activeY={activeY}
            username={username}
            activeIndex={index}
            key={'profileHeader'}
            invitedBy={invitedBy}
            hederThumbnail={userData.photo?.mediaId}
            monthAndYear={joinedMonthAndYear}
            onPressTabItem={onPressTabItem}
          />
        }
      />
    </View>
  );
};

export default ProfileScreen;
