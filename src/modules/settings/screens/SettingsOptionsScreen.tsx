import { View, Text, Pressable, ScrollView } from 'react-native';
import { SettingsHeader } from '../components/SettingsHeader';
import { CustomSettingOption } from '../components/CustomSettingOption';
import { ReferralGiftIcon } from '../../../../assets/referralGift';

export const SettingsOptionScreen = ({ navigation }: any) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
      <SettingsHeader />
      <Pressable
        className="flex-row items-center bg-zinc-200 px-6 py-3 mx-6 mt-4 rounded-2xl"
        onPress={() => navigation.navigate('Referrals')}>
        <ReferralGiftIcon />
        <View className="ml-2">
          <Text className="text-base font-semibold">Invite friends</Text>
          <Text className="text-base font-semibold text-amber-500">and Get 500cfa</Text>
        </View>
      </Pressable>
      <View className="px-8">
        <CustomSettingOption
          option="Edit profile"
          onPress={() => navigation.navigate('EditProfile')}
        />
        <CustomSettingOption option="Edit work profile" />
        <CustomSettingOption
          option="Link payment account"
          onPress={() => navigation.navigate('MobileMoney')}
        />
        <CustomSettingOption
          option="Manage account"
          onPress={() => navigation.navigate('ManageAccount')}
        />
        <CustomSettingOption option="Get help" />
        <CustomSettingOption option="Tutorials" onPress={() => navigation.navigate('Tutorial')} />
        <CustomSettingOption
          option="Language (En)"
          onPress={() => navigation.navigate('Language')}
        />
      </View>
    </ScrollView>
  );
};