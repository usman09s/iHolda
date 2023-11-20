import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image } from 'react-native';

import { CalculatorScreen } from './screens/CalculatorScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { ProfileScreen } from './screens/ProfileScreen';
import { ArrowDollarIcon, BottomBarHouseIcon } from '../../../assets/referralGift';
import SettingsScreen from './screens/SettingsScreen';
import { TransactionScreen } from './screens/TransactionScreen';

const Tab = createBottomTabNavigator();

const renderIcon = (name, component, focused) => {
  const color = focused ? '#076eff' : 'gray';
  return (
    <View style={{ alignItems: 'center' }}>
      {name ? (
        <FontAwesome name={name} size={24} color={color} />
      ) : component ? (
        React.cloneElement(component, { color })
      ) : null}
      {focused && (
        <View
          style={{
            marginTop: 4,
            height: 4,
            width: 4,
            borderRadius: 2,
            backgroundColor: '#076eff',
          }}
        />
      )}
    </View>
  );
};

const CartpoTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Calculator"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: 'white' },
      }}
      backBehavior={'history'}>
      <Tab.Screen
        name="Transaction"
        component={TransactionScreen}
        options={{
          tabBarIcon: ({ focused }) => renderIcon(null, <ArrowDollarIcon />, focused),
        }}
      />
      <Tab.Screen
        name="Calculator"
        component={CalculatorScreen}
        options={{
          tabBarIcon: ({ focused }) => renderIcon(null, <BottomBarHouseIcon />, focused),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => renderIcon('user', null, focused),
        }}
      />
    </Tab.Navigator>
  );
};

export default CartpoTabNavigator;
