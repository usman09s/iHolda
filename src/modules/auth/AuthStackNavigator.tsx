import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import WelcomeScreen from 'modules/auth/screens/WelcomeScreen';

import ConfirmOtpScreen from './screens/ConfirmOtpScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';

export type AuthStackParamList = {
  Welcome: undefined;
  SignUp: undefined;
  ConfirmOtp: undefined;
  SignIn: undefined;
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
      <AuthStack.Screen options={commonOptions} name="SignIn" component={SignInScreen} />
    </AuthStack.Navigator>
  );
}
