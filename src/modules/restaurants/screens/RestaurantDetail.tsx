import { useState } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { userCommonInformationSelector, userSelector } from 'store/auth/userSelectors';

import ProfileHeader from '../../profile/components/ProfileHeader';
import Community from '../../profile/containers/Community';
import Profile from '../../profile/containers/Profile';
import Wallet from '../../profile/containers/Wallet';
import Shared from '../../profile/containers/Shared';
import RestaurantHeader from '../components/RastaurantsHeader';
import Overview from './Overview';
import Menu from './Menu';
import Reviews from './Reviews';
import Header from 'components/Header/Header';
import { getImageLink } from 'modules/moments/helpers/imageHelpers';

const RestaurentDetail = ({ route }: any) => {
  const activeY = useSharedValue(0);
  const { top } = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const { user } = useSelector(userSelector);
  const invitedBy = user?.invitedBy?.userName;
  const { username, joinedMonthAndYear } = useSelector(userCommonInformationSelector);
  const isCurrentUser = route.params?.isCurrentUser ?? true;
  console.log(route.params, 'jofjeofioh');
  const restaurantData = route.params?.item;
  const avatar = getImageLink(restaurantData.coverImage.mediaId);

  const onPressTabItem = (value: number) => () => {
    setIndex(value);
  };

  const scrollHandler = useAnimatedScrollHandler(event => {
    activeY.value = event.contentOffset.y <= 0 ? 0 : event.contentOffset.y;
  });

  const RenderedComponent =
    [<Overview data={restaurantData} key={0} />, <Menu key={1} />, <Reviews key={2} />]?.[index] ||
    [];

  return (
    <View className="flex-1 bg-white">
      <View style={{ position: 'absolute', top: 0, left: 30 }}>
        <Header backIconColor="#FFFF" showBackIcon />
      </View>

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
          <RestaurantHeader
            top={top}
            isCurrentUser={isCurrentUser}
            avatar={avatar}
            activeY={activeY}
            username={username}
            activeIndex={index}
            key={'restaurantHeader'}
            invitedBy={invitedBy ?? ""}
            hederThumbnail={avatar}
            monthAndYear={joinedMonthAndYear}
            onPressTabItem={onPressTabItem}
          />
        }
      />
    </View>
  );
};

export default RestaurentDetail;
