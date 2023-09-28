import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { JobPostingType } from 'types/JobPostingTypes';

import JobPostingDetailsScreen from './screen/JobPostingDetailsScreen';
import JobPostingSuccessScreen from './screen/JobPostingSuccessScreen';
import JobPostingTemplatesScreen from './screen/JobPostingTemplatesScreen';

export type JobPostingStackParamList = {
  JobPostingTemplates: undefined;
  JobPostingDetails: {
    jobType: JobPostingType;
  };
  JobPostingSuccess: undefined;
};

const JobPostingStack = createNativeStackNavigator<JobPostingStackParamList>();

const commonOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const commonScreenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
};

export default function JobPostingStackNavigator() {
  return (
    <JobPostingStack.Navigator screenOptions={commonScreenOptions}>
      <JobPostingStack.Screen
        options={commonOptions}
        name="JobPostingTemplates"
        component={JobPostingTemplatesScreen}
      />
      <JobPostingStack.Screen
        options={commonOptions}
        name="JobPostingDetails"
        component={JobPostingDetailsScreen}
      />
      <JobPostingStack.Screen
        options={commonOptions}
        name="JobPostingSuccess"
        component={JobPostingSuccessScreen}
      />
    </JobPostingStack.Navigator>
  );
}
