import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import BottomNavigation from 'components/BottomNavigation';
import ActivityStackNavigator from 'modules/activity/ActivityStackNavigator';
import FeedStackNavigator from 'modules/feed/FeedStackNavigator';
import LeaderBoardStackNavigator from 'modules/leaderBoard/LeaderBoardStackNavigator';
import MomentsStackNavigator from 'modules/moments/MomentsStackNavigator';
import ProfileStackNavigator from 'modules/profile/ProfileStackNavigator';

const Tab = createBottomTabNavigator();

const commonOptions: BottomTabNavigationOptions = {
  lazy: true,
  headerShown: false,
};

function BottomTabsNavigator() {
  return (
    <Tab.Navigator screenOptions={commonOptions} tabBar={props => <BottomNavigation {...props} />}>
      <Tab.Screen name="FeedStack" component={FeedStackNavigator} />
      <Tab.Screen name="LeaderBoardStack" component={LeaderBoardStackNavigator} />
      <Tab.Screen name="MomentsStack" component={MomentsStackNavigator} />
      <Tab.Screen name="ActivityStack" component={ActivityStackNavigator} />
      <Tab.Screen name="ProfileStack" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
}

export default BottomTabsNavigator;
