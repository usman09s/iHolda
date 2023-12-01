import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import ActivityScreen from './screens/ActivityScreen';
import PlasticActivityScreen from './screens/PlasticAgentActivity';
import PlasticCollectionScreen from './screens/PlasticCollectionScan';
import ModifyConfirmPlastic from './screens/ModifyOrConfirmPlastics';
import PlasticApproveScreen from './screens/PlasticApproveScreen';
import AgentPlasticApprovedScreen from 'modules/agentPlastic/screens/AgentPlasticApprovedScreen';
import { useQuery } from 'react-query';
import Api from 'services/Api';

export type ActivityStackParamList = {
  Activity: undefined;
  PlasticColllectionScan: undefined;
  ModifyConfirmPlastic: undefined;
  PlasticApproveScreen: undefined;
};

const ActivityStack = createNativeStackNavigator<ActivityStackParamList>();

const commonOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const commonScreenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
};

function ActivityStackNavigator() {
  const { data: user } = useQuery('currentUserProfile', Api.getUserProfile);

  return (
    <ActivityStack.Navigator screenOptions={commonScreenOptions}>
      <ActivityStack.Screen
        name="Activity"
        options={commonOptions}
        component={
          user
            ? user.data?.user?.isPlasticAgent
              ? PlasticActivityScreen
              : ActivityScreen
            : ActivityScreen
        }
      />
      
    </ActivityStack.Navigator>
  );
}

export default ActivityStackNavigator;
