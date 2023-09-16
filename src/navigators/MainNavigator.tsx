import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import AuthStackNavigator from 'modules/auth/AuthStackNavigator';
import FeedDetailsScreen from 'modules/feed/screens/FeedDetailScreen';
import FeedMomentsSearchScreen from 'modules/feed/screens/FeedMomentsSearchScreen';
import MomentsStackNavigator from 'modules/moments/MomentsStackNavigator';
import PlasticStackNavigator from 'modules/plastic/PlasticStackNavigator';
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
        <MainStack.Screen
          name="PlasticStack"
          options={commonOptions}
          component={PlasticStackNavigator}
        />
        <MainStack.Screen
          name="FeedDetails"
          options={{ ...commonOptions, animation: 'slide_from_bottom' }}
          component={FeedDetailsScreen}
        />
        <MainStack.Screen
          name="FeedMomentsSearch"
          options={commonOptions}
          component={FeedMomentsSearchScreen}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
