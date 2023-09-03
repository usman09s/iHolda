import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import WelcomeScreen from 'modules/auth/screens/WelcomeScreen';

import ConfirmOtpScreen from './screens/ConfirmOtpScreen';
import CreateUnlockPinScreen from './screens/CreateUnlockPinScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import UserAvatarAndUsernameUpdate from './screens/UserAvatarAndUsernameUpdate';

export type AuthStackParamList = {
  Welcome: undefined;
  SignUp: undefined;
  SignIn: undefined;
  ConfirmOtp: undefined;
  CreateUnlockPinScreen: undefined;
  UserAvatarAndUsernameUpdate: undefined;
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
        name="CreateUnlockPinScreen"
        component={CreateUnlockPinScreen}
      />
    </AuthStack.Navigator>
  );
}
