import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import CompletedJobDetailsScreen from './screens/CompletedJobDetailsScreen';
import MainProfessionProfileScreen from './screens/MainProfessionProfile';
import ProfileScreen from './screens/ProfileScreen';
import SideProfessionProfileScreen from './screens/SideProfessionProfile';

export type ProfileStackParamList = {
  Profile: undefined;
  AgentPlasticStack: undefined;
  CompletedJobDetails: undefined;
  MainProfessionProfile: undefined;
  SideProfessionProfile: undefined;
};

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const commonOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const commonScreenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
};

export default function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={commonScreenOptions}>
      <ProfileStack.Screen options={commonOptions} name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen
        options={commonOptions}
        name="MainProfessionProfile"
        component={MainProfessionProfileScreen}
      />
      <ProfileStack.Screen
        options={commonOptions}
        name="SideProfessionProfile"
        component={SideProfessionProfileScreen}
      />
      <ProfileStack.Screen
        options={commonOptions}
        name="CompletedJobDetails"
        component={CompletedJobDetailsScreen}
      />
    </ProfileStack.Navigator>
  );
}
