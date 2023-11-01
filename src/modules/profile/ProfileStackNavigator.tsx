import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import JobDashboardStackNavigator from 'modules/jobDashboard/JobDashboardStackNavigator';

import CompletedJobDetailsScreen from './screens/CompletedJobDetailsScreen';
import MainProfessionProfileScreen from './screens/MainProfessionProfile';
import OtherUserProfileScreen from './screens/OtherUserProfileScreen';
import ProfileScreen from './screens/ProfileScreen';
import SideProfessionProfileScreen from './screens/SideProfessionProfile';
import FollowersScreen from './screens/FollowersScreen';

export type ProfileStackParamList = {
  Profile: undefined;
  OtherUserProfile: undefined;
  AgentPlasticStack: undefined;
  JobDashboardStack: {
    screen?: 'JobDashboard' | 'PostedJob';
  };
  CompletedJobDetails: undefined;
  MainProfessionProfile: undefined;
  SideProfessionProfile: undefined;
  Followers: undefined;
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
        name="Followers"
        component={FollowersScreen}
      />
      <ProfileStack.Screen
        options={commonOptions}
        name="OtherUserProfile"
        component={OtherUserProfileScreen}
      />
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
      <ProfileStack.Screen
        options={commonOptions}
        name="JobDashboardStack"
        component={JobDashboardStackNavigator}
      />
    </ProfileStack.Navigator>
  );
}
