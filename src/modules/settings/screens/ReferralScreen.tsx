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

const InvitedUser = ({ avatar }) => {
  return (
    <View style={{ marginRight: 8 }}>
      {avatar ? (
        <Userpic size={56} source={{ uri: 'https://i.pravatar.cc/100?img=4' }} />
      ) : (
        <TouchableOpacity className="w-14 h-14 rounded-full bg-blue-500 items-center justify-center mb-2 border-4 border-zinc-300">
          <MaterialCommunityIcons name="plus" size={24} color="gray" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const DummyInvitedUsers = [
  { id: 1, avatar: 'user1.jpg' },
  { id: 2, avatar: 'user2.jpg' },
  { id: 3, avatar: 'user3.jpg' },
  {},
  {},
  {},
  {},
  {},
];

export const ReferralScreen = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
      <View className="px-5">
        <Header
          showBackIcon
          centerComponent={
            <Text style={{ fontSize: 16, fontWeight: '500', marginTop: 2, color: 'gray' }}>
              Referrals
            </Text>
          }
        />
      </View>
      <View>
        <View className="bg-gray-200 py-5 rounded-2xl my-6 mx-5">
          <Text className="text-center text-base mx-12 text-zinc-600 font-normal">
            Invite a friend and get 500F with them
          </Text>
          <View className="flex-row items-center justify-around mx-3 mt-4">
            <View className="border-black rounded-xl py-3 px-4" style={{ borderWidth: 1 }}>
              <Text className="text-center text-base font-bold">1500 F</Text>
              <Text className="text-sm font-normal">Total reward paid</Text>
            </View>
            <View className="border-black rounded-xl py-3 px-4" style={{ borderWidth: 1 }}>
              <Text className="text-center text-base font-bold">1500 F</Text>
              <Text className="text-sm font-normal">Total reward paid</Text>
            </View>
          </View>
        </View>
        <View style={{ alignItems: 'center', paddingBottom: 5 }}>
          <ReferralGiftIcon widthAndHeight={'90'} />
        </View>
        <View className="items-center justify-center">
          <TouchableOpacity
            className="flex-row items-center bg-neutral-200 justify-between rounded-md py-4 pr-6 pl-4"
            style={{ width: '75%' }}>
            <Text style={{ textAlign: 'center' }}>Your Referral code</Text>
            <View className="flex-row items-center gap-2">
              <Text>Bayu12</Text>
              <Ionicons name="copy" size={15} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View className={'flex-row justify-between my-6 px-5 items-center'}>
          <TouchableOpacity
            className="flex-row items-center justify-center rounded-lg py-4 h-full"
            style={{ backgroundColor: '#ECEFE3', width: '49%' }}>
            <Text style={{ textAlign: 'center', marginRight: 10 }}>Share Referral link</Text>
            <LinkIcon />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center justify-center rounded-lg py-4 h-full"
            style={{ backgroundColor: '#ECEFE3', width: '49%' }}>
            <FacebookIcon />
            <Text style={{ textAlign: 'center', marginLeft: 10 }}>Share to</Text>
          </TouchableOpacity>
        </View>
        <View className="ml-5">
          <Text className="mb-2">{`Invited (3/8)`}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {DummyInvitedUsers.map((user, index) => (
              <InvitedUser key={index} avatar={user.avatar} />
            ))}
          </ScrollView>
        </View>
        <View className="ml-5 pb-6">
          <Text className="mb-2">
            Pending invites <MaterialIcons name="error" color="red" />
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {DummyInvitedUsers.map((user, index) => (
              <InvitedUser key={index} avatar={user.avatar} />
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};
