import * as React from 'react';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { WithdrawSuccessfulScreen } from './screens/WithdrawSuccessfulScreen';
import { CashoutProfileScreen } from './screens/CashoutProfileScreen';

export type WalletStackParamList = {
  Cashout: undefined;
  WithdrawSuccessful: undefined;
};

const WalletStack = createNativeStackNavigator<WalletStackParamList>();

const commonOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const WalletStackNavigator = () => {
  return (
    <WalletStack.Navigator>
      <WalletStack.Screen name="Cashout" component={CashoutProfileScreen} options={commonOptions} />
      <WalletStack.Screen
        name="WithdrawSuccessful"
        component={WithdrawSuccessfulScreen}
        options={commonOptions}
      />
    </WalletStack.Navigator>
  );
};

export default WalletStackNavigator;
