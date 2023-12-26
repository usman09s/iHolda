import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import FeedScreen from './screens/FeedScreen';
import PlasticStackNavigator from 'modules/plastic/PlasticStackNavigator';
import PlasticScreen from 'modules/plastic/screens/PlasticScreen';
import DropOffLocationListScreen from 'modules/plastic/screens/DropOffLocationListScreen';
import PlasticConfirmationScreen from 'modules/plastic/screens/PlasticConfirmationScreen';
import PlasticQRCodeScreen from 'modules/plastic/screens/PlasticQRCodeScreen';
import PlasticDeliveredDetailsScreen from 'modules/plastic/screens/PlasticDeliveredDetailsScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

export type FeedStackParamList = {
  Feed: undefined;
  FeedDetails: undefined;
  FeedMomentsSearch: undefined;
  DropOffLocationList: any;
  PlasticConfirmation: any;
  PlasticQRCode: any;
  PlasticDeliveredDetails: any;
  Plastic: any
};

const FeedStack = createNativeStackNavigator<FeedStackParamList>();

const commonOptions: NativeStackNavigationOptions = {
  headerShown: false,
  // statusBarColor: "black"
};

const commonScreenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
};

function FeedStackNavigator({ navigation, route }: any) {
  // console.log("🚀 ~ file: FeedStackNavigator.tsx:38 ~ FeedStackNavigator ~ route:", route)
  // React.useLayoutEffect(() => {
  //   const routeName = getFocusedRouteNameFromRoute(route);
  //   // if (routeName === 'Plastic') {
  //   //   navigation.setOptions({ tabBarVisible: false });
  //   // } else {
  //   //   navigation.setOptions({ tabBarVisible: true });
  //   // }

  //   navigation.setOptions({tabBarStyle: {display: 'none'}});
  //   // if(routeName === 'Plastic'){
  //   //  } else {
  //   //  navigation.setOptions({tabBarStyle: {display: 'flex'}});
  //   // }
  // }, [navigation, route]);

  return (
    <FeedStack.Navigator screenOptions={commonScreenOptions}>
      <FeedStack.Screen name="Feed" options={commonOptions} component={FeedScreen} />

      {/* <FeedStack.Screen
          name="PlasticStack"
          options={commonOptions}
          component={PlasticStackNavigator}
        /> */}

      <FeedStack.Screen options={commonOptions} name="Plastic" component={PlasticScreen} />
      <FeedStack.Screen
        options={commonOptions}
        name="DropOffLocationList"
        component={DropOffLocationListScreen}
      />
      <FeedStack.Screen
        options={commonOptions}
        name="PlasticConfirmation"
        component={PlasticConfirmationScreen}
      />
      <FeedStack.Screen
        name="PlasticQRCode"
        options={commonOptions}
        component={PlasticQRCodeScreen}
      />
      <FeedStack.Screen
        options={commonOptions}
        name="PlasticDeliveredDetails"
        component={PlasticDeliveredDetailsScreen}
      />
    </FeedStack.Navigator>
  );
}

export default FeedStackNavigator;
