import { Image, Text, View } from 'react-native';
import Animated, { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import Icons from 'components/Icons';
import { text } from 'theme/text';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { units } from 'utils/helpers';

import ProfileTabs from './ProfileTabs';
import ScrolledHeader from './ScrolledHeader';
import ScrolledHeaderRight from './ScrolledHeaderRight';
import { getImageLink } from 'modules/moments/helpers/imageHelpers';
import { User } from 'types/AuthTypes';

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
  user?: User;
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
  user
}: Props) => {
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
        <Image
          className="w-full h-full absolute bg-black"
          source={{ uri: getImageLink(hederThumbnail) }}
        />
        <View className=" h-full justify-end px-6" style={{ paddingBottom: units.vh * 2 }}>
          <View className="flex-row">
            <Text className={text({ type: 'b20', class: 'text-white mr-1 mb-3' })}>{username}</Text>
            {/* {isCurrentUser ? (
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
            )} */}
          </View>
          <Text className={text({ type: 'r13', class: 'text-white' })}>
            Joined {monthAndYear} invited by{' '}
            <Text className={text({ type: 'b13' })}>@{invitedBy}</Text>
          </Text>
        </View>
        <ScrolledHeaderRight user={user} activeY={activeY} top={top} isCurrentUser={isCurrentUser} />
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
