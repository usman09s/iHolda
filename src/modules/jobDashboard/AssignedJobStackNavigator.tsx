import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import AssignedJobScreen from './screen/AssignedJobScreen';
import JobApprovedSuccessScreen from './screen/JobApprovedSuccessScreen';
import JobCompletedSuccessScreen from './screen/JobCompletedSuccessScreen';

export type AssignedJobStackParamList = {
  AssignedJob: undefined;
  JobApprovedSuccess: undefined;
  JobCompletedSuccess: undefined;
};

const AssignedJobStack = createNativeStackNavigator<AssignedJobStackParamList>();

const commonOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const commonScreenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
};

export default function AssignedJobStackNavigator() {
  return (
    <AssignedJobStack.Navigator screenOptions={commonScreenOptions}>
      <AssignedJobStack.Screen
        options={commonOptions}
        name="AssignedJob"
        component={AssignedJobScreen}
      />
      <AssignedJobStack.Screen
        options={commonOptions}
        name="JobApprovedSuccess"
        component={JobApprovedSuccessScreen}
      />
      <AssignedJobStack.Screen
        options={commonOptions}
        name="JobCompletedSuccess"
        component={JobCompletedSuccessScreen}
      />
    </AssignedJobStack.Navigator>
  );
}
