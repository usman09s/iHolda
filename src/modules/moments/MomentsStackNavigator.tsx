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
import MomentsQuizScreen from './screens/MomentsQuizScreen';
import MomentsSelfieScreen from './screens/MomentsSelfieScreen';
import MomentsUploadScreen from './screens/MomentsUploadScreen';
import PostCameraScreen from './screens/PostCameraScreen';
import PostPreviewScreen from './screens/PostPreviewScreen';
import { MatchedUserType, MomentsMoodParams } from 'types/MomentsTypes';

export type MomentsStackParamList = {
  PostCamera: undefined;
  PostPreview: undefined;
  MomentsMood: undefined | MomentsMoodParams;
  MomentsQuiz: undefined | MatchedUserType;
  MomentsMatch: undefined | MatchedUserType;
  MomentsQrScan: undefined;
  MomentsQrCode: undefined;
  MomentsSelfie: undefined | MatchedUserType;
  MomentsUpload: undefined | MatchedUserType;
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
      <MomentsStack.Screen name="PostCamera" options={commonOptions} component={PostCameraScreen} />
      <MomentsStack.Screen
        name="PostPreview"
        options={commonOptions}
        component={PostPreviewScreen}
      />
      <MomentsStack.Screen
        name="MomentsQuiz"
        options={commonOptions}
        component={MomentsQuizScreen}
      />
    </MomentsStack.Navigator>
  );
}
