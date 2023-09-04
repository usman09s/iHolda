import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import PlasticScreen from 'modules/plastic/screens/PlasticScreen';

const Tab = createBottomTabNavigator();

const commonOptions: BottomTabNavigationOptions = {
  lazy: true,
  headerShown: false,
};

function BottomTabsNavigator() {
  return (
    <Tab.Navigator screenOptions={commonOptions}>
      <Tab.Screen name="Plastic" component={PlasticScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabsNavigator;
