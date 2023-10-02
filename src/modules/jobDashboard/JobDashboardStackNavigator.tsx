import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import JobApplications from './screen/JobApplicationsScreen';
import JobDashboardScreen from './screen/JobDashboardScreen';
import PostedJobScreen from './screen/PostedJobScreen';

export type JobDashboardStackParamList = {
  JobDashboard: undefined;
  PostedJob: undefined;
  JobApplications: undefined;
  AssignedJobStack: undefined;
  ProfileStack: {
    screen?: 'CompletedJobDetails' | 'OtherUserProfile';
  };
};

const JobDashboardStack = createNativeStackNavigator<JobDashboardStackParamList>();

const commonOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const commonScreenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
};

export default function JobDashboardStackNavigator() {
  return (
    <JobDashboardStack.Navigator screenOptions={commonScreenOptions}>
      <JobDashboardStack.Screen
        name="JobDashboard"
        options={commonOptions}
        component={JobDashboardScreen}
      />
      <JobDashboardStack.Screen
        name="PostedJob"
        options={commonOptions}
        component={PostedJobScreen}
      />
      <JobDashboardStack.Screen
        name="JobApplications"
        options={commonOptions}
        component={JobApplications}
      />
    </JobDashboardStack.Navigator>
  );
}
