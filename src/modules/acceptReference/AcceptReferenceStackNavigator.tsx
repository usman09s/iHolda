import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { ConfirmReferenceScreen } from './screens/ConfirmReferenceScreen';
import { ConfirmedReferenceScreen } from './screens/ConfirmedReferenceScreen';

export type AcceptReferenceStackParamList = {
  ConfirmReference: undefined;
  ReferenceComplete: undefined;
};

const AcceptReferenceStack = createNativeStackNavigator<AcceptReferenceStackParamList>();

const commonOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const commonScreenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
};

export default function AcceptReferenceStackNavigator() {
  return (
    <AcceptReferenceStack.Navigator screenOptions={commonScreenOptions}>
      <AcceptReferenceStack.Screen
        options={commonOptions}
        name="ConfirmReference"
        component={ConfirmReferenceScreen}
      />
      <AcceptReferenceStack.Screen
        options={commonOptions}
        name="ReferenceComplete"
        component={ConfirmedReferenceScreen}
      />
    </AcceptReferenceStack.Navigator>
  );
}
