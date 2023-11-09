import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import { RequestReferenceSummaryScreen } from './screens/RequestReferenceSummaryScreen';
import { BasicVerificationOneScreen } from './screens/BasicVerificationOneScreen';
import { BasicVerificationTwoScreen } from './screens/BasicVerificationTwoScreen';
import { BasicVerificationThreeScreen } from './screens/BasicVerificationThreeScreen';
import { AddReferenceScreen } from './screens/AddReferenceScreen';
import { VerificationCompleteScreen } from './screens/VerficationCompleteScreen';

export type RequestReferenceStackParamList = {
  Summary: undefined;
  BasicVerificationOne: undefined;
  BasicVerificationTwo: undefined;
  BasicVerificationThree: undefined;
  AddReference: undefined;
  VerificationComplete: undefined;
};

const AcceptReferenceStack = createNativeStackNavigator<RequestReferenceStackParamList>();

const commonOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const commonScreenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
};

export default function RequestReferenceStackNavigator() {
  return (
    <AcceptReferenceStack.Navigator screenOptions={commonScreenOptions}>
      <AcceptReferenceStack.Screen
        options={commonOptions}
        name="Summary"
        component={RequestReferenceSummaryScreen}
      />
      <AcceptReferenceStack.Screen
        options={commonOptions}
        name="BasicVerificationOne"
        component={BasicVerificationOneScreen}
      />
      <AcceptReferenceStack.Screen
        options={commonOptions}
        name="BasicVerificationTwo"
        component={BasicVerificationTwoScreen}
      />
      <AcceptReferenceStack.Screen
        options={commonOptions}
        name="BasicVerificationThree"
        component={BasicVerificationThreeScreen}
      />
      <AcceptReferenceStack.Screen
        options={commonOptions}
        name="AddReference"
        component={AddReferenceScreen}
      />
      <AcceptReferenceStack.Screen
        options={commonOptions}
        name="VerificationComplete"
        component={VerificationCompleteScreen}
      />
    </AcceptReferenceStack.Navigator>
  );
}
