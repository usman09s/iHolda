import { Image, Text, View } from 'react-native';
import Animated, { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import Icons from 'components/Icons';
import { text } from 'theme/text';
import { units } from 'utils/helpers';

import ProfileTabs from './ProfileTabs';
import ScrolledHeader from './ScrolledHeader';
import ScrolledHeaderRight from './ScrolledHeaderRight';

type Props = {
  avatar: string;
  top: number;
  username: string;
  activeIndex: number;
  hederThumbnail: string;
  activeY: SharedValue<number>;
  onPressTabItem: (value: number) => () => void;
};

const ProfileHeader = ({
  top,
  avatar,
  activeY,
  username,
  activeIndex,
  hederThumbnail,
  onPressTabItem,
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
        className={'z-30 flex-row overflow-hidden'}>
        <Image className="w-full h-full absolute" source={{ uri: hederThumbnail }} />
        <View className=" h-full justify-end px-6" style={{ paddingBottom: units.vh * 2 }}>
          <View className="flex-row">
            <Text className={text({ type: 'b20', class: 'text-white mr-1 mb-3' })}>{username}</Text>
            <Icons.BorderedVerifiedIcon />
          </View>
          <Text className={text({ type: 'r13', class: 'text-white' })}>
            Joined June 2023 invited by <Text className={text({ type: 'b13' })}>@daniel</Text>
          </Text>
        </View>
        <ScrolledHeaderRight activeY={activeY} top={top} />
      </Animated.View>
      <View className="bg-white">
        <ScrolledHeader top={top} username={username} activeY={activeY} avatar={avatar} />
        <Animated.View style={animatedTabsStyle}>
          <ProfileTabs activeIndex={activeIndex} onPressTabItem={onPressTabItem} />
        </Animated.View>
      </View>
    </>
  );
};

export default ProfileHeader;
