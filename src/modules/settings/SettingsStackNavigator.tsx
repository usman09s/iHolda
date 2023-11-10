import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { SettingsOptionScreen } from './screens/SettingsOptionsScreen';

export type SettingsStackParamList = {
  SettingsOption: undefined;
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
    </SettingsStack.Navigator>
  );
}
