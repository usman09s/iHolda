import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import BottomNavigation from 'components/BottomNavigation';
import PlasticStackNavigator from 'modules/plastic/PlasticStackNavigator';

const Tab = createBottomTabNavigator();

const commonOptions: BottomTabNavigationOptions = {
  lazy: true,
  headerShown: false,
};

function BottomTabsNavigator() {
  return (
    <Tab.Navigator screenOptions={commonOptions} tabBar={props => <BottomNavigation {...props} />}>
      <Tab.Screen name="LeaderBoard" component={() => null} />
      <Tab.Screen name="PlasticStack" component={PlasticStackNavigator} />
      <Tab.Screen name="Profile" component={() => null} />
    </Tab.Navigator>
  );
}

export default BottomTabsNavigator;
