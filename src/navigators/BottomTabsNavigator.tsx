import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import BottomNavigation from 'components/BottomNavigation';
import PlasticStackNavigator from 'modules/plastic/PlasticStackNavigator';
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
      <Tab.Screen name="LeaderBoard" component={ProfileScreen} />
      <Tab.Screen name="PlasticStack" component={PlasticStackNavigator} />
      <Tab.Screen name="ProfileStack" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
}

export default BottomTabsNavigator;
