import * as React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { userAppInit } from 'hooks/useAppInit';
import AgentPlasticStackNavigator from 'modules/agentPlastic/AgentPlasticNavigator';
import AuthStackNavigator from 'modules/auth/AuthStackNavigator';
import FeedDetailsScreen from 'modules/feed/screens/FeedDetailScreen';
import FeedMomentsSearchScreen from 'modules/feed/screens/FeedMomentsSearchScreen';
import JobApplyingStackNavigator from 'modules/jobApplying/JobApplyingStackNavigator';
import AssignedJobStackNavigator from 'modules/jobDashboard/AssignedJobStackNavigator';
import JobPostingStackNavigator from 'modules/jobposting/JobPostingStackNavigator';
import MomentsStackNavigator from 'modules/moments/MomentsStackNavigator';
import PlasticStackNavigator from 'modules/plastic/PlasticStackNavigator';
import { useSelector } from 'react-redux';
import Api from 'services/Api';
import { queryIdSelector, tokensSelector } from 'store/auth/userSelectors';
import colors from 'theme/colors';

import BottomTabsNavigator from './BottomTabsNavigator';
import RequestReferenceStackNavigator from 'modules/requestReference/RequestReferenceNavigator';
import AcceptReferenceStackNavigator from 'modules/acceptReference/AcceptReferenceStackNavigator';
import SettingsStackNavigator from 'modules/settings/SettingsStackNavigator';
import CartpoStackNavigator from 'modules/cartpo/CartpoStackNavigator';
import CartpoTabNavigator from 'modules/cartpo/CartpoTabNavigator';

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
  const { status } = userAppInit();

  React.useEffect(() => {
    Api.setQueryIdValue(queryId);
    Api.setTokenValue(tokens.token);
  }, []);

  if (status === 'IDLE' || status === 'LOADING') {
    return (
      <View className="flex-1 justify-center items-center bg-blue">
        <ActivityIndicator size={'large'} color={colors.white} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator
        screenOptions={commonScreenOptions}
        initialRouteName={status === 'SUCCESS' ? 'BottomTabs' : 'Auth'}>
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
          name="AgentPlasticStack"
          options={commonOptions}
          component={AgentPlasticStackNavigator}
        />
        <MainStack.Screen
          name="FeedDetails"
          component={FeedDetailsScreen}
          options={{ ...commonOptions, animation: 'slide_from_bottom' }}
        />
        <MainStack.Screen
          name="FeedMomentsSearch"
          options={commonOptions}
          component={FeedMomentsSearchScreen}
        />
        <MainStack.Screen
          name="JobPostingStack"
          options={commonOptions}
          component={JobPostingStackNavigator}
        />
        <MainStack.Screen
          name="JopApplyingStack"
          options={commonOptions}
          component={JobApplyingStackNavigator}
        />
        <MainStack.Screen
          name="AssignedJobStack"
          options={commonOptions}
          component={AssignedJobStackNavigator}
        />
        <MainStack.Screen
          name="RequestReferenceStack"
          options={commonOptions}
          component={RequestReferenceStackNavigator}
        />
        <MainStack.Screen
          name="AcceptReferenceStack"
          options={commonOptions}
          component={AcceptReferenceStackNavigator}
        />
        <MainStack.Screen
          name="SettingsStack"
          options={commonOptions}
          component={SettingsStackNavigator}
        />
        <MainStack.Screen
          name="CartpoStack"
          options={commonOptions}
          component={CartpoStackNavigator}
        />
        <MainStack.Screen name="CartpoTab" options={commonOptions} component={CartpoTabNavigator} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
