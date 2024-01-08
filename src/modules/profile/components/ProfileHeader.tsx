import { Image, Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated, { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import Icons from 'components/Icons';
import { text } from 'theme/text';
// import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import { units } from 'utils/helpers';

import ProfileTabs from './ProfileTabs';
import ScrolledHeader from './ScrolledHeader';
import ScrolledHeaderRight from './ScrolledHeaderRight';
import { getImageLink } from 'modules/moments/helpers/imageHelpers';
import { User } from 'types/AuthTypes';
import { useNavigation } from '@react-navigation/native';

type Props = {
  top: number;
  avatar: string;
  username: string;
  invitedBy: User | undefined;
  activeIndex: number;
  monthAndYear: string;
  hederThumbnail: string;
  isCurrentUser: boolean;
  activeY: SharedValue<number>;
  onPressTabItem: (value: number) => () => void;
  user?: User;
  verified: boolean;
  isAgent?: boolean;
  navigate:any;
};

const ProfileHeader = ({
  top,
  avatar,
  activeY,
  username,
  invitedBy,
  activeIndex,
  monthAndYear,
  isCurrentUser,
  hederThumbnail,
  onPressTabItem,
  user,
  verified,
  isAgent = false,
  navigate
}: Props) => {
  const headerImageHeight = units.vh * 40;
  const tabHeight = units.vh * 8;

  // const {navigate}: any = useNavigation();
  const isMe = (id: string) => id === user?._id;

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
        <View className="absolute w-full h-full">
          <Image
            className="w-full h-full bg-black"
            source={{ uri: getImageLink(hederThumbnail) }}
          />

          <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)' }} />
        </View>
        <View className=" h-full justify-end px-6" style={{ paddingBottom: units.vh * 2 }}>
          <View className="flex-row">
            <Text className={text({ type: 'b20', class: 'text-white mr-1 mb-3' })}>{username}</Text>
            {verified ? (
              <Icons.BorderedVerifiedIcon />
            ) : (
              <View
                style={{
                  backgroundColor: 'white',
                  height: 20,
                  borderRadius: 10,
                  top: 3,
                }}>
                <MaterialIcon
                  name={'error'}
                  color="red"
                  size={20}
                  style={{ transform: [{ rotate: '180deg' }] }}
                />
              </View>
            )}
          </View>
          <Text className={text({ type: 'r13', class: 'text-white' })}>
            Joined {monthAndYear} {invitedBy?.userName ? 'invited by' : null}{' '}
            <TouchableWithoutFeedback
              onPress={() => {
                navigate(isMe(invitedBy?._id ?? '') ? 'ProfileStack' : 'OtherUserProfileMain', {
                  userId: invitedBy?._id,
                });
              }}>
              <Text className={text({ type: 'b13' })}>{invitedBy?.userName && '@' + invitedBy?.userName}</Text>
            </TouchableWithoutFeedback>
          </Text>
        </View>
        <ScrolledHeaderRight
          user={user}
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
          <ProfileTabs
            isAgent={isAgent}
            activeIndex={activeIndex}
            isCurrentUser={isCurrentUser}
            onPressTabItem={onPressTabItem}
          />
        </Animated.View>
      </View>
    </>
  );
};

export default ProfileHeader;
