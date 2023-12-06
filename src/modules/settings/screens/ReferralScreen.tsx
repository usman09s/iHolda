import React from 'react';
import { ScrollView } from 'react-native';
import Header from 'components/Header/Header';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Userpic } from 'react-native-userpic';
import { FacebookIcon } from '../../../../assets/facebook';
import { LinkIcon } from '../../../../assets/link';
import { ReferralGiftIcon } from '../../../../assets/referralGift';
import { useSettingActions } from '../hooks/useSettingsActions';
import { selectUser } from 'store/userDataSlice';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import CustomHeader from 'components/Header/CustomHeader';
import { selectInvitedInvitees, selectPendingInvitees } from 'store/settings/inviteeSlice';
import { getImageLink } from 'modules/moments/helpers/imageHelpers';

const InvitedUser = ({ avatar, name }: any) => {
  return (
    <View style={{ marginRight: 8 }}>
      {avatar ? (
        <Userpic size={56} source={{ uri: avatar }} />
      ) : name ? (
        <Userpic size={56} name={name} />
      ) : (
        <TouchableOpacity className="w-14 h-14 rounded-full bg-blue-500 items-center justify-center mb-2 border-4 border-zinc-300">
          <MaterialCommunityIcons name="plus" size={24} color="gray" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export const ReferralScreen = () => {
  const { handleGetInvitees } = useSettingActions();
  const invitedInvitees = useSelector(selectInvitedInvitees);
  const pendingInvitees = useSelector(selectPendingInvitees);
  const invitedInviteesWithEmptyObjects = [...invitedInvitees];
  const pendingInviteesWithEmptyObjects = [...pendingInvitees];

  while (invitedInviteesWithEmptyObjects.length < 8) {
    invitedInviteesWithEmptyObjects.push({});
  }

  while (pendingInviteesWithEmptyObjects.length < 8) {
    pendingInviteesWithEmptyObjects.push({});
  }

  useFocusEffect(() => {
    handleGetInvitees();
  });

  const userData = useSelector(selectUser);
  const { handleReferralCopy } = useSettingActions();
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
      <View className="px-5">
        <CustomHeader
          showBackIcon
          centerComponent={
            <Text style={{ fontSize: 16, fontWeight: '500', color: 'gray' }}>Referrals</Text>
          }
        />
      </View>
      <View>
        <View className="px-5">
          <View className="bg-gray-200 py-5 rounded-2xl my-6 w-full">
            <Text className="text-center text-base mx-12 text-zinc-600 font-normal">
              Invite a friend and get 500F with them
            </Text>
            <View className="flex-row items-center justify-around mx-3 mt-4 px-2">
              <View className="border-black rounded-xl py-3 w-1/2" style={{ borderWidth: 1 }}>
                <Text className="text-center text-base font-bold">{userData.rewardPaid} F</Text>
                <Text className="text-xs font-normal text-center">Total reward paid</Text>
              </View>
              <View className="w-10"></View>
              <View className="border-black rounded-xl py-3 w-1/2" style={{ borderWidth: 1 }}>
                <Text className="text-center text-base font-bold">{userData.pendingReward} F</Text>
                <Text className="text-xs font-normal text-center">Total reward pending</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ alignItems: 'center', paddingBottom: 5 }}>
          <ReferralGiftIcon widthAndHeight={'90'} />
        </View>
        <View className="items-center justify-center">
          <TouchableOpacity
            className="flex-row items-center bg-neutral-200 justify-between rounded-md py-4 pr-6 pl-4"
            style={{ width: '75%' }}
            onPress={handleReferralCopy}>
            <Text style={{ textAlign: 'center' }}>Your Referral code</Text>
            <View className="flex-row items-center gap-2">
              <Text>{userData.referralCode}</Text>
              <Ionicons name="copy" size={15} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View className={'flex-row justify-between my-6 px-5 items-center w-full'}>
          <TouchableOpacity
            className="flex-row items-center justify-center rounded-lg py-4 h-full bg-[#ECEFE3] w-1/2"
            style={{ marginRight: '1%' }}>
            <Text className="text-center mr-2">Share Referral link</Text>
            <LinkIcon />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center justify-center rounded-lg py-4 h-full bg-[#ECEFE3] w-1/2"
            style={{ marginLeft: '1%' }}>
            <FacebookIcon />
            <Text className="text-center ml-2">Share to</Text>
          </TouchableOpacity>
        </View>
        <View className="ml-5">
          <Text className="mb-2">{`Invited (${invitedInvitees.length}/8)`}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {invitedInviteesWithEmptyObjects.map((invitee, index) => (
              <InvitedUser
                key={index}
                avatar={invitee?.photo?.mediaId && getImageLink(invitee.photo.mediaId)}
                name={invitee.userName && invitee.userName}
              />
            ))}
          </ScrollView>
        </View>
        <View className="ml-5 pb-6">
          <Text className="mb-2">
            Pending invites <MaterialIcons name="error" color="red" />
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {pendingInviteesWithEmptyObjects.map((invitee, index) => (
              <InvitedUser
                key={index}
                avatar={invitee?.photo?.mediaId && getImageLink(invitee.photo.mediaId)}
                name={invitee.userName && invitee.userName}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};
