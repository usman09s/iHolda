import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import AuthStackNavigator from 'modules/auth/AuthStackNavigator';

const MainStack = createNativeStackNavigator();

const commonOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const commonScreenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
};

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={commonScreenOptions}>
        <MainStack.Screen options={commonOptions} name="Auth" component={AuthStackNavigator} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
