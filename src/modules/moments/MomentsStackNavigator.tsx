import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import MomentDetailsScreen from './screens/MomentDetailsScreen';
import MomentsQRCodeScreen from './screens/MomentQRCodeScreen';
import MomentsMatchScreen from './screens/MomentsMatchScreen';
import MomentsMoodScreen from './screens/MomentsMoodScreen';
import MomentsQrScanScreen from './screens/MomentsQrScanScreen';
import MomentsSelfieScreen from './screens/MomentsSelfieScreen';
import MomentsUploadScreen from './screens/MomentsUploadScreen';

export type MomentsStackParamList = {
  MomentsMood: undefined;
  MomentsMatch: undefined;
  MomentsQrScan: undefined;
  MomentsQrCode: undefined;
  MomentsSelfie: undefined;
  MomentsUpload: undefined;
  MomentDetails: undefined;
};

const MomentsStack = createNativeStackNavigator<MomentsStackParamList>();

const commonOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const commonScreenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
};

export default function MomentsStackNavigator() {
  return (
    <MomentsStack.Navigator screenOptions={commonScreenOptions}>
      <MomentsStack.Screen
        name="MomentsQrScan"
        options={commonOptions}
        component={MomentsQrScanScreen}
      />
      <MomentsStack.Screen
        name="MomentsQrCode"
        options={commonOptions}
        component={MomentsQRCodeScreen}
      />
      <MomentsStack.Screen
        name="MomentsMatch"
        options={commonOptions}
        component={MomentsMatchScreen}
      />
      <MomentsStack.Screen
        name="MomentsSelfie"
        options={commonOptions}
        component={MomentsSelfieScreen}
      />
      <MomentsStack.Screen
        name="MomentsMood"
        options={commonOptions}
        component={MomentsMoodScreen}
      />
      <MomentsStack.Screen
        name="MomentsUpload"
        options={commonOptions}
        component={MomentsUploadScreen}
      />
      <MomentsStack.Screen
        name="MomentDetails"
        options={commonOptions}
        component={MomentDetailsScreen}
      />
    </MomentsStack.Navigator>
  );
}
