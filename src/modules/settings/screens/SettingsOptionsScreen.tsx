import { View, Text } from 'react-native';
import { SettingsHeader } from '../components/SettingsHeader';
import { CustomSettingOption } from '../components/CustomSettingOption';

export const SettingsOptionScreen = () => {
  return (
    <View>
      <SettingsHeader />
      <View className="px-8">
        <CustomSettingOption option="Edit profile" />
        <CustomSettingOption option="Edit work profile" />
        <CustomSettingOption option="Link payment account" />
        <CustomSettingOption option="Manage account" />
        <CustomSettingOption option="Get help" />
        <CustomSettingOption option="Tutorials" />
        <CustomSettingOption option="Language (En)" />
      </View>
    </View>
  );
};
