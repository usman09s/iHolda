import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { SettingsOptionScreen } from './screens/SettingsOptionsScreen';
import { EditProfileScreen } from './screens/EditProfileScreen';
import { LanguageScreen } from './screens/LanguageScreen';
import { ManageAccountScreen } from './screens/ManageAccountScreen';
import { DeactivateAccountScreen } from './screens/DeactivateAccoutScreen';
import { FeedbackScreen } from './screens/FeedbackScreen';
import { ChangePinScreen } from './screens/ChangePinScreen';
import { SocialMediaScreen } from './screens/SocialMediaScreen';
import { ReferralScreen } from './screens/ReferralScreen';
import { TutorialScreen } from './screens/TutorialScreen';
import { MobileMoneyScreen } from './screens/MobileMoneyScreen';
import NameScreen from './screens/NameScreen';
import UsernameScreen from './screens/UsernameScreen';

export type SettingsStackParamList = {
  SettingsOption: undefined;
  EditProfile: undefined;
  Language: undefined;
  ManageAccount: undefined;
  DeactivateAccount: undefined;
  Feedback: undefined;
  ChangePin: undefined;
  SocialMedia: undefined;
  Referrals: undefined;
  Tutorial: undefined;
  MobileMoney: undefined;
  Name: undefined;
  Username: undefined;
};

const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

const commonOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const commonScreenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
};

export default function SettingsStackNavigator() {
  return (
    <SettingsStack.Navigator screenOptions={commonScreenOptions}>
      <SettingsStack.Screen
        options={commonOptions}
        name="SettingsOption"
        component={SettingsOptionScreen}
      />
      <SettingsStack.Screen
        options={commonOptions}
        name="EditProfile"
        component={EditProfileScreen}
      />
      <SettingsStack.Screen options={commonOptions} name="Language" component={LanguageScreen} />
      <SettingsStack.Screen
        options={commonOptions}
        name="ManageAccount"
        component={ManageAccountScreen}
      />
      <SettingsStack.Screen
        options={commonOptions}
        name="DeactivateAccount"
        component={DeactivateAccountScreen}
      />
      <SettingsStack.Screen options={commonOptions} name="Feedback" component={FeedbackScreen} />
      <SettingsStack.Screen options={commonOptions} name="ChangePin" component={ChangePinScreen} />
      <SettingsStack.Screen
        options={commonOptions}
        name="SocialMedia"
        component={SocialMediaScreen}
      />
      <SettingsStack.Screen options={commonOptions} name="Referrals" component={ReferralScreen} />
      <SettingsStack.Screen options={commonOptions} name="Tutorial" component={TutorialScreen} />
      <SettingsStack.Screen
        options={commonOptions}
        name="MobileMoney"
        component={MobileMoneyScreen}
      />
      <SettingsStack.Screen options={commonOptions} name="Name" component={NameScreen} />
      <SettingsStack.Screen options={commonOptions} name="Username" component={UsernameScreen} />
    </SettingsStack.Navigator>
  );
}
