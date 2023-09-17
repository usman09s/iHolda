import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import ActivityScreen from './screens/ActivityScreen';

export type ActivityStackParamList = {
  Activity: undefined;
};

const ActivityStack = createNativeStackNavigator<ActivityStackParamList>();

const commonOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const commonScreenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
};

function ActivityStackNavigator() {
  return (
    <ActivityStack.Navigator screenOptions={commonScreenOptions}>
      <ActivityStack.Screen name="Activity" options={commonOptions} component={ActivityScreen} />
    </ActivityStack.Navigator>
  );
}

export default ActivityStackNavigator;
