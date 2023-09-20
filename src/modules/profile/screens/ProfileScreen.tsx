import { useState } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { userCommonInformationSelector } from 'store/auth/userSelectors';

import ProfileHeader from '../components/ProfileHeader';
import Community from '../containers/Community';
import Profile from '../containers/Profile';
import Shared from '../containers/Shared';
import Wallet from '../containers/Wallet';
import Work from '../containers/Work';

const ProfileScreen = () => {
  const activeY = useSharedValue(0);
  const { top } = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const { username, avatar, invitedBy, joinedMonthAndYear } = useSelector(
    userCommonInformationSelector,
  );

  const onPressTabItem = (value: number) => () => {
    setIndex(value);
  };

  const scrollHandler = useAnimatedScrollHandler(event => {
    activeY.value = event.contentOffset.y <= 0 ? 0 : event.contentOffset.y;
  });

  const RenderedComponent =
    [
      <Profile key={0} />,
      <Community key={1} />,
      <Work key={2} />,
      <Wallet key={3} />,
      <Shared key={4} />,
    ]?.[index] || [];

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
            avatar={avatar}
            activeY={activeY}
            username={username}
            activeIndex={index}
            key={'profileHeader'}
            invitedBy={invitedBy}
            hederThumbnail={avatar}
            monthAndYear={joinedMonthAndYear}
            onPressTabItem={onPressTabItem}
          />
        }
      />
    </View>
  );
};

export default ProfileScreen;
