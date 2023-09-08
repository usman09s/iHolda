import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import AgentCollectionsScreen from './screens/AgentCollectionsScreen';
import AgentPlasticApprovedScreen from './screens/AgentPlasticApprovedScreen';
import AgentPlasticConfirmationScreen from './screens/AgentPlasticConfirmationScreen';
import AgentQRCodeScanScreen from './screens/AgentQRCodeScanScreen';

export type AgentPlasticStackParamList = {
  AgentCollection: undefined;
  AgentQrCodeScan: undefined;
  AgentPlasticConfirmation: undefined;
  AgentPlasticApproved: undefined;
};

const AgentPlasticStack = createNativeStackNavigator<AgentPlasticStackParamList>();

const commonOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const commonScreenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
};

export default function AgentPlasticStackNavigator() {
  return (
    <AgentPlasticStack.Navigator screenOptions={commonScreenOptions}>
      <AgentPlasticStack.Screen
        name="AgentCollection"
        options={commonOptions}
        component={AgentCollectionsScreen}
      />
      <AgentPlasticStack.Screen
        name="AgentQrCodeScan"
        options={commonOptions}
        component={AgentQRCodeScanScreen}
      />
      <AgentPlasticStack.Screen
        options={commonOptions}
        name="AgentPlasticConfirmation"
        component={AgentPlasticConfirmationScreen}
      />
      <AgentPlasticStack.Screen
        options={commonOptions}
        name="AgentPlasticApproved"
        component={AgentPlasticApprovedScreen}
      />
    </AgentPlasticStack.Navigator>
  );
}
