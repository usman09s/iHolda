import { useState } from 'react';
import { Linking, Platform, View } from 'react-native';
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
import { Restaurant } from '../types';

const RestaurentDetail = ({ route, navigation }: any) => {
  const activeY = useSharedValue(0);
  const { top } = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const { user } = useSelector(userSelector);
  const invitedBy = user?.invitedBy?.userName;
  const { username, joinedMonthAndYear } = useSelector(userCommonInformationSelector);
  const isCurrentUser = route.params?.isCurrentUser ?? true;
  console.log(route.params, 'jofjeofioh');
  const restaurantData: Restaurant = route.params?.item;
  const avatar = getImageLink(restaurantData.coverImage.mediaId);

  const lat = restaurantData.location.coordinates[1];
  const lng = restaurantData.location.coordinates[0];

  const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
  const latLng = `${lat},${lng}`;
  const label = 'Custom Label';
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });

  const onPressTabItem = (value: number) => () => {
    setIndex(value);
  };

  const scrollHandler = useAnimatedScrollHandler(event => {
    activeY.value = event.contentOffset.y <= 0 ? 0 : event.contentOffset.y;
  });

  const RenderedComponent =
    [
      <Overview data={restaurantData} key={0} />,
      <Menu id={restaurantData._id} key={1} />,
      <Reviews id={restaurantData._id} key={2} />,
    ]?.[index] || [];

  return (
    <View className="flex-1 bg-[#f9f9f9]">
      <View style={{ position: 'absolute', top: 0, left: 30 }}>
        <Header backIconColor="#FFFF" showBackIcon />
      </View>

      <Animated.FlatList
        numColumns={3}
        data={[RenderedComponent]}
        onScroll={scrollHandler}
        stickyHeaderIndices={[0]}
        ListFooterComponent={<View className="h-10 bg-[#f9f9f9]" />}
        nestedScrollEnabled={false}
        className={'flex-1'}
        renderItem={({ item }) => item}
        ListHeaderComponent={
          <RestaurantHeader
            top={top}
            isCurrentUser={isCurrentUser}
            avatar={avatar}
            activeY={activeY}
            username={restaurantData?.name}
            activeIndex={index}
            key={'restaurantHeader'}
            invitedBy={invitedBy ?? ''}
            hederThumbnail={avatar}
            monthAndYear={joinedMonthAndYear}
            onPressTabItem={onPressTabItem}
            onPressReview={() =>
              navigation.navigate('AddReview', { restaurantId: restaurantData._id })
            }
            onPressDirection={() => url && Linking.openURL(url)}
            onPressContact={() =>
              restaurantData?.phone && Linking.openURL(`tel:+${restaurantData.phone}`)
            }
          />
        }
      />
    </View>
  );
};

export default RestaurentDetail;
