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
import socketService from 'services/Socket';
import colors from 'theme/colors';

import BottomTabsNavigator from './BottomTabsNavigator';
import RequestReferenceStackNavigator from 'modules/requestReference/RequestReferenceNavigator';
import AcceptReferenceStackNavigator from 'modules/acceptReference/AcceptReferenceStackNavigator';
import SettingsStackNavigator from 'modules/settings/SettingsStackNavigator';
import CartpoStackNavigator from 'modules/cartpo/CartpoStackNavigator';
import CartpoTabNavigator from 'modules/cartpo/CartpoTabNavigator';
import WalletStackNavigator from 'modules/profile/WalletStackNavigator';
import ActivityStackNavigator from 'modules/activity/ActivityStackNavigator';
import PlasticCollectionScreen from 'modules/activity/screens/PlasticCollectionScan';
import ModifyConfirmPlastic from 'modules/activity/screens/ModifyOrConfirmPlastics';
import AgentPlasticApprovedScreen from 'modules/agentPlastic/screens/AgentPlasticApprovedScreen';
import FollowersScreen from 'modules/profile/screens/FollowersScreen';
import RestaurentDetail from 'modules/restaurants/screens/RestaurantDetail';
import AddReview from 'modules/restaurants/screens/AddReview';
import PostReview from 'modules/restaurants/screens/PostReview';
import { ReviewSuccess } from 'modules/restaurants/screens/ReviewSuccess';
import FeedDetailView from 'modules/feed/screens/FeedDetailView';
import OtherUserProfileScreen from 'modules/profile/screens/OtherUserProfileScreen';
import PlasticActivityScreen from 'modules/activity/screens/PlasticAgentActivity';
import DiscountUserSelect from 'modules/restaurants/screens/DiscountUserSelect';
import DiscountQrScreen from 'modules/restaurants/screens/DiscountQrScreen';

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
    socketService.initializeSocket();
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
      <MainStack.Navigator screenOptions={commonScreenOptions} initialRouteName={status === 'SUCCESS' ? 'BottomTabs' : 'Auth'}>
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
        <MainStack.Screen options={commonOptions} name="Followers" component={FollowersScreen} />

        <MainStack.Screen
          name="PlasticColllectionScan"
          options={commonOptions}
          component={PlasticCollectionScreen}
        />
        <MainStack.Screen
          name="ModifyConfirmPlastic"
          options={commonOptions}
          component={ModifyConfirmPlastic}
        />
        <MainStack.Screen
          name="PlasticApproveScreen"
          options={commonOptions}
          component={AgentPlasticApprovedScreen}
        />

        {/* <MainStack.Screen
          name="ActivityStack"
          options={commonOptions}
          component={ActivityStackNavigator}
        /> */}
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
        <MainStack.Screen
          name="WalletStack"
          options={commonOptions}
          component={WalletStackNavigator}
        />
        <MainStack.Screen
          name="RestaurentDetail"
          options={commonOptions}
          component={RestaurentDetail}
        />
        <MainStack.Screen name="AddReview" options={commonOptions} component={AddReview} />
        <MainStack.Screen name="PostReview" options={commonOptions} component={PostReview} />
        <MainStack.Screen name="ReviewSuccess" options={commonOptions} component={ReviewSuccess} />
        <MainStack.Screen name="DiscountUserSelect" options={commonOptions} component={DiscountUserSelect} />
        <MainStack.Screen name="DiscountQrScreen" options={commonOptions} component={DiscountQrScreen} />
        <MainStack.Screen
          name="FeedDetailView"
          options={commonOptions}
          component={FeedDetailView}
        />

        <MainStack.Screen
          options={commonOptions}
          name="OtherUserProfileMain"
          component={OtherUserProfileScreen}
        />

        <MainStack.Screen
          options={commonOptions}
          name="PlasticActivityScreen"
          component={PlasticActivityScreen}
        />

        <MainStack.Screen name="CartpoTab" options={commonOptions} component={CartpoTabNavigator} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
