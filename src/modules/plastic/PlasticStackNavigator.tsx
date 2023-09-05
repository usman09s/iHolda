import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import DropOffLocationListScreen from './screens/DropOffLocationListScreen';
import PlasticScreen from './screens/PlasticScreen';

export type PlasticStackParamList = {
  Plastic: undefined;
  DropOffLocationList: undefined;
};

const PlasticStack = createNativeStackNavigator<PlasticStackParamList>();

const commonOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const commonScreenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
};

export default function PlasticStackNavigator() {
  return (
    <PlasticStack.Navigator screenOptions={commonScreenOptions}>
      <PlasticStack.Screen options={commonOptions} name="Plastic" component={PlasticScreen} />
      <PlasticStack.Screen
        options={commonOptions}
        name="DropOffLocationList"
        component={DropOffLocationListScreen}
      />
    </PlasticStack.Navigator>
  );
}
