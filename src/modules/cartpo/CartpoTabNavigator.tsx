import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image } from 'react-native';

import { CalculatorScreen } from './screens/CalculatorScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { ProfileScreen } from './screens/ProfileScreen';
import { BottomBarHouseIcon } from '../../../assets/referralGift';
import SettingsScreen from './screens/SettingsScreen';
import { TransactionScreen } from './screens/TransactionScreen';

const Tab = createBottomTabNavigator();

const CartpoTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: 'white' },
      }}>
      <Tab.Screen
        name="Home"
        component={TransactionScreen}
        options={{
          tabBarIcon: ({ focused }) => <FontAwesome name="delete" />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={CalculatorScreen}
        options={{
          tabBarIcon: ({ focused }) => <BottomBarHouseIcon />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => <FontAwesome name="user" size={24} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default CartpoTabNavigator;
