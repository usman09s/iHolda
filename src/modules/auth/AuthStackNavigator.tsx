import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import WelcomeScreen from 'modules/auth/screens/WelcomeScreen';

import ConfirmOtpScreen from './screens/ConfirmOtpScreen';
import CreateUnlockPinScreen from './screens/CreateUnlockPinScreen';
import EnterOptScreen from './screens/EnterOtpScren';
import EnterReferralCodeScreen from './screens/EnterReferralCodeScreen';
import ReferralCodeSuccessfulScreen from './screens/ReferralCodeSuccessfulScreen';
import ResetPinScreen from './screens/ResetPinScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import UserAvatarAndUsernameUpdate from './screens/UserAvatarAndUsernameUpdate';
import UserWaitListScreen from './screens/UserWaitListScreen';
import PlasticStackNavigator from 'modules/plastic/PlasticStackNavigator';

export type AuthStackParamList = {
  Welcome: undefined;
  SignUp: undefined;
  ConfirmOtp: undefined;
  UserWaitList: undefined;
  SignIn: { phone: string };
  CreateUnlockPin: undefined;
  ResetPin: { phone: string };
  EnterOtp: { phone: string };
  EnterReferralCode: undefined;
  ReferralCodeSuccessful: {result: any};
  UserAvatarAndUsernameUpdate: undefined;
  PlasticStack: any;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const commonOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const commonScreenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
};

export default function AuthStackNavigator() {
  return (
    <AuthStack.Navigator screenOptions={commonScreenOptions}>
      <AuthStack.Screen options={commonOptions} name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen options={commonOptions} name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen options={commonOptions} name="ConfirmOtp" component={ConfirmOtpScreen} />
      <AuthStack.Screen
        options={commonOptions}
        name="UserAvatarAndUsernameUpdate"
        component={UserAvatarAndUsernameUpdate}
      />
      <AuthStack.Screen options={commonOptions} name="SignIn" component={SignInScreen} />
      <AuthStack.Screen
        options={commonOptions}
        name="CreateUnlockPin"
        component={CreateUnlockPinScreen}
      />
      <AuthStack.Screen
        options={commonOptions}
        name="EnterReferralCode"
        component={EnterReferralCodeScreen}
      />
      <AuthStack.Screen
        name="UserWaitList"
        options={commonOptions}
        component={UserWaitListScreen}
      />
      <AuthStack.Screen
        options={commonOptions}
        name="ReferralCodeSuccessful"
        component={ReferralCodeSuccessfulScreen}
      />
      <AuthStack.Screen options={commonOptions} name="EnterOtp" component={EnterOptScreen} />
      <AuthStack.Screen options={commonOptions} name="ResetPin" component={ResetPinScreen} />

      
        <AuthStack.Screen
          name="PlasticStack"
          options={commonOptions}
          component={PlasticStackNavigator}
        />
    </AuthStack.Navigator>
  );
}
