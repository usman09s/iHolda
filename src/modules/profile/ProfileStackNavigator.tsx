import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import AgentPlasticStackNavigator from 'modules/agentPlastic/AgentPlasticNavigator';

import ProfileScreen from './screens/ProfileScreen';

export type ProfileStackParamList = {
  Profile: undefined;
  AgentPlasticStack: undefined;
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
        name="AgentPlasticStack"
        component={AgentPlasticStackNavigator}
      />
    </ProfileStack.Navigator>
  );
}
