import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import CommunityJobDetailsScreen from './screens/CommunityJobDetailsScreen';
import JobApplySuccessScreen from './screens/JobApplySuccessScreen';
import PrivateJobDetailsScreen from './screens/PrivateJobDetailsScreen';

export type JobApplyingStackParamList = {
  CommunityJobDetails: undefined;
  PrivateJobDetails: undefined;
  JobApplySuccess: undefined;
};

const JobApplyingStack = createNativeStackNavigator<JobApplyingStackParamList>();

const commonOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const commonScreenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
};

function JobApplyingStackNavigator() {
  return (
    <JobApplyingStack.Navigator
      screenOptions={commonScreenOptions}
      initialRouteName="JobApplySuccess">
      <JobApplyingStack.Screen
        name="CommunityJobDetails"
        options={commonOptions}
        component={CommunityJobDetailsScreen}
      />
      <JobApplyingStack.Screen
        name="PrivateJobDetails"
        options={commonOptions}
        component={PrivateJobDetailsScreen}
      />
      <JobApplyingStack.Screen
        name="JobApplySuccess"
        options={commonOptions}
        component={JobApplySuccessScreen}
      />
    </JobApplyingStack.Navigator>
  );
}

export default JobApplyingStackNavigator;
