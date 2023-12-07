import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import FeedScreen from './screens/FeedScreen';

export type FeedStackParamList = {
  Feed: undefined;
  FeedDetails: undefined;
  FeedMomentsSearch: undefined;
};

const FeedStack = createNativeStackNavigator<FeedStackParamList>();

const commonOptions: NativeStackNavigationOptions = {
  headerShown: false,
  // statusBarColor: "black"
};

const commonScreenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
};

function FeedStackNavigator() {
  return (
    <FeedStack.Navigator screenOptions={commonScreenOptions}>
      <FeedStack.Screen name="Feed" options={commonOptions} component={FeedScreen} />
    </FeedStack.Navigator>
  );
}

export default FeedStackNavigator;
