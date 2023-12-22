import React from 'react';
import { Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Animated, { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import Icons from 'components/Icons';
import { text } from 'theme/text';
// import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { units } from 'utils/helpers';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import ProfileTabs from '../../profile/components/ProfileTabs';
import ScrolledHeader from '../../profile/components/ScrolledHeader';
import RestaurantScrolledHeaderRight from './ScrolledHeaderRight';
import { getImageLink } from 'modules/moments/helpers/imageHelpers';
import RestaurantsTabs from './RestaurantsTabs';
import Header from 'components/Header/Header';
import { useNavigation } from '@react-navigation/native';

type Props = {
  top: number;
  avatar: string;
  username: string;
  invitedBy: string;
  activeIndex: number;
  monthAndYear: string;
  hederThumbnail: string;
  isCurrentUser: boolean;
  activeY: SharedValue<number>;
  onPressTabItem: (value: number) => () => void;
  onPressDirection: () => void;
  onPressContact: () => void;
  onPressReview: () => void;
  onPressLike: () => void;
  onPressBookmark: () => void;
  isLiked: boolean;
  isBookmarked: boolean;
};

const RestaurantHeader = ({
  top,
  avatar,
  activeY,
  username,
  onPressContact,
  activeIndex,
  onPressDirection,
  isCurrentUser,
  hederThumbnail,
  onPressTabItem,
  onPressReview,
  onPressBookmark,
  onPressLike,
  isLiked,
  isBookmarked,
}: Props) => {
  const navigation: any = useNavigation();
  const headerImageHeight = units.vh * 40;
  const tabHeight = units.vh * 8;

  const animatedTabsStyle = useAnimatedStyle(() => ({
    marginTop: interpolate(
      activeY.value >= headerImageHeight ? headerImageHeight : activeY.value,
      [0, headerImageHeight],
      [0, tabHeight],
    ),
  }));

  const animatedHeaderStyle = useAnimatedStyle(() => ({
    height: interpolate(
      activeY.value >= headerImageHeight ? headerImageHeight : activeY.value,
      [0, headerImageHeight],
      [headerImageHeight, 0],
    ),
  }));

  return (
    <>
      <Animated.View
        style={[{ height: headerImageHeight }, animatedHeaderStyle]}
        className={'z-30 flex-row overflow-hidden w-full'}>
        <Image className="w-full h-full absolute bg-black" source={{ uri: hederThumbnail }} />
        <View className=" h-full justify-end px-6" style={{ paddingBottom: units.vh * 2 }}>
          <View style={{ flexDirection: 'row', gap: 20 }}>
            <TouchableWithoutFeedback onPress={onPressDirection}>
              <View style={{ alignItems: 'center' }}>
                <View
                  style={{
                    backgroundColor: '#0684fa',
                    height: 40,
                    width: 40,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FontAwesome5 name="directions" color={'#FFF'} size={20} />
                </View>
                <Text style={{ color: 'white' }}>Direction</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={onPressContact}>
              <View style={{ alignItems: 'center' }}>
                <View
                  style={{
                    backgroundColor: '#3cc03c',
                    height: 40,
                    width: 40,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Ionicons name="call" color={'#FFF'} size={18} />
                </View>
                <Text style={{ color: 'white' }}>Call</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableOpacity onPress={onPressReview} style={{ alignItems: 'center' }}>
              <View
                style={{
                  backgroundColor: '#676766',
                  height: 40,
                  width: 40,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionicons name="camera-outline" color={'#FFF'} size={18} />
              </View>
              <Text style={{ color: 'white' }}>Add Review</Text>
            </TouchableOpacity>
          </View>
        </View>
        <RestaurantScrolledHeaderRight
          isLiked={isLiked}
          isBookmarked={isBookmarked}
          onPressBookmark={onPressBookmark}
          onPressLike={onPressLike}
          activeY={activeY}
          top={top}
          isCurrentUser={isCurrentUser}
        />
      </Animated.View>
      <View className="bg-white">
        <ScrolledHeader
          top={top}
          avatar={avatar}
          activeY={activeY}
          username={username}
          isCurrentUser={isCurrentUser}
        />
        <Animated.View style={animatedTabsStyle}>
          <RestaurantsTabs
            activeIndex={activeIndex}
            isCurrentUser={isCurrentUser}
            onPressTabItem={onPressTabItem}
          />
        </Animated.View>
      </View>
    </>
  );
};

export default RestaurantHeader;
