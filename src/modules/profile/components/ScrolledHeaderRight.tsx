import { View, Text, Linking } from 'react-native';
import Animated, { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import Button from 'components/Button';
import Icons from 'components/Icons';
import { text } from 'theme/text';
import { units } from 'utils/helpers';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { userSelector } from 'store/auth/userSelectors';
import Api from 'services/Api';
import { useState } from 'react';

type Props = { top: number; isCurrentUser: boolean; activeY: SharedValue<number>; user: any };

const ScrolledHeaderRight = ({ top, activeY, isCurrentUser, user: otherUser }: Props) => {
  const navigation = useNavigation();
  const loggedInUser = useSelector(userSelector);
  const { user } = otherUser ? { user: otherUser } : useSelector(userSelector);
  const [followed, setFollowed] = useState<boolean>(otherUser?.followers?.includes(loggedInUser.user?._id));

  const facebook = user?.socialLinks?.find((s: any) => s?.platform === 'facebook')?.link;
  const tiktok = user?.socialLinks?.find((s: any) => s?.platform === 'tiktok')?.link;
  const instagram = user?.socialLinks?.find((s: any) => s?.platform === 'instagram')?.link;
  const website = user?.socialLinks?.find((s: any) => s?.platform === 'website')?.link;
  const snapchat = user?.socialLinks?.find((s: any) => s?.platform === 'snapchat')?.link;

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      activeY.value >= units.vh * 40 ? units.vh * 40 : activeY.value,
      [0, units.vh * 40],
      [1, 0],
    ),
  }));

  const followUnfollowUser = async (userId: string) => {
    try {
      await Api.followUnFollowUseer(userId, followed);
      // console.log("🚀 ~ file: FollowersScreen.tsx:45 ~ followUnfollowUser ~ res:", res)
      setFollowed(prev => !prev);
    } catch (error) {
      // console.log('🚀 ~ followUnfollowUser ~ error:', error);
    }
  };

  return (
    <Animated.View className="flex-1 items-end pr-6 absolute right-0" style={animatedStyle}>
      <View className="w-full" style={{ marginTop: units.vh * 3 + top }}>
        <Button
          title={isCurrentUser ? 'Settings' : followed ? 'Followed' : 'Follow'}
          type="solid"
          customContainer="rounded-md self-center py-1 px-3 bg-white border-b1 border-black-o-20"
          customTextClass={text({ type: 'r12', class: 'text-black h-4' })}
          onPress={() => {
            if (isCurrentUser) {
              navigation.navigate('SettingsStack');
            }else {
              followUnfollowUser(otherUser._id, )
            }
          }}
        />

        <View className="justify-around items-center mt-4">
          {/* Linking.openURL(this.state.url).catch(err => console.error("Couldn't load page", err)); */}

          <TouchableOpacity onPress={() => tiktok && Linking.openURL(tiktok)}>
            <Icons.TiktokIcon />
          </TouchableOpacity>
          <View style={{ height: units.vh * 2 }} />
          <TouchableOpacity onPress={() => instagram && Linking.openURL(instagram)}>
            <Icons.InstagramIcon />
          </TouchableOpacity>
          <View style={{ height: units.vh * 2 }} />
          <TouchableOpacity onPress={() => snapchat && Linking.openURL(snapchat)}>
            <Icons.SnapchatIcon />
          </TouchableOpacity>
          <View style={{ height: units.vh * 2 }} />
          <TouchableOpacity onPress={() => website && Linking.openURL(website)}>
            <Icons.WebsiteIcon />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default ScrolledHeaderRight;
