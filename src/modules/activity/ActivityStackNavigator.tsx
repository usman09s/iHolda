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
import { useSelector } from 'react-redux';
import { userSelector } from 'store/auth/userSelectors';

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
  // const { data: user } = useQuery('currentUserProfile', () => Api.getUserProfile());
  // console.log("🚀 ~ file: ActivityStackNavigator.tsx:35 ~ ActivityStackNavigator ~ user:", user)
  const user = useSelector(userSelector);

  return (
    <ActivityStack.Navigator screenOptions={commonScreenOptions}>
      <ActivityStack.Screen
        name="Activity"
        options={commonOptions}
        // component={
        //   user
        //     ? user?.user?.isPlasticAgent
        //       ? PlasticActivityScreen
        //       : ActivityScreen
        //     : ActivityScreen
        // }
        component={ActivityScreen}
      />
    </ActivityStack.Navigator>
  );
}

export default ActivityStackNavigator;
