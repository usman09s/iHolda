import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import AuthStackNavigator from 'modules/auth/AuthStackNavigator';
import MomentsStackNavigator from 'modules/moments/MomentsStackNavigator';
import { useSelector } from 'react-redux';
import Api from 'services/Api';
import { queryIdSelector, tokensSelector } from 'store/auth/userSelectors';

import BottomTabsNavigator from './BottomTabsNavigator';

const MainStack = createNativeStackNavigator();

const commonOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const commonScreenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
};

export default function MainNavigator() {
  const tokens = useSelector(tokensSelector);
  const queryId = useSelector(queryIdSelector);

  React.useEffect(() => {
    Api.setQueryIdValue(queryId);
    Api.setTokenValue(tokens.token);
  }, []);

  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={commonScreenOptions}>
        <MainStack.Screen options={commonOptions} name="Auth" component={AuthStackNavigator} />
        <MainStack.Screen
          name="BottomTabs"
          options={commonOptions}
          component={BottomTabsNavigator}
        />
        <MainStack.Screen
          name="MomentsStackNav"
          options={commonOptions}
          component={MomentsStackNavigator}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
