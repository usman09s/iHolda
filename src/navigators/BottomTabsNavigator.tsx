import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import BottomNavigation from 'components/BottomNavigation';
import FeedStackNavigator from 'modules/feed/FeedStackNavigator';
import MomentsStackNavigator from 'modules/moments/MomentsStackNavigator';
import ProfileStackNavigator from 'modules/profile/ProfileStackNavigator';
import ProfileScreen from 'modules/profile/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const commonOptions: BottomTabNavigationOptions = {
  lazy: true,
  headerShown: false,
};

function BottomTabsNavigator() {
  return (
    <Tab.Navigator screenOptions={commonOptions} tabBar={props => <BottomNavigation {...props} />}>
      <Tab.Screen name="FeedStack" component={FeedStackNavigator} />
      <Tab.Screen name="LeaderBoard" component={ProfileScreen} />
      <Tab.Screen name="MomentsStack" component={MomentsStackNavigator} />
      <Tab.Screen name="ProfileStack" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
}

export default BottomTabsNavigator;
