import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import LeaderBoardScreen from './screen/LeaderBoardScreen';

export type LeaderBoardStackParamList = {
  LeaderBoard: undefined;
};

const LeaderBoardStack = createNativeStackNavigator<LeaderBoardStackParamList>();

const commonOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const commonScreenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
};

export default function LeaderBoardStackNavigator() {
  return (
    <LeaderBoardStack.Navigator screenOptions={commonScreenOptions}>
      <LeaderBoardStack.Screen
        name="LeaderBoard"
        options={commonOptions}
        component={LeaderBoardScreen}
      />
    </LeaderBoardStack.Navigator>
  );
}
