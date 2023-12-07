import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { ConfirmOtpScreen } from './screens/ConfirmOtpScreen';
import { CreatePinScreen } from './screens/CreatePinScreen';
import { UnlockPinScreen } from './screens/UnlockPinScreen';
import { TopupScreen } from './screens/TopupScreen';
import { CashoutScreen } from './screens/CashoutScreen';
import { WithdrawSuccessfulScreen } from './screens/WithdrawSuccessfulScreen';
import { DiscountQrCodeScreen } from './screens/DiscountQrCodeScreen';
import { DirectPaymentScreen } from './screens/DirectPaymentScreen';
import { SaleCompleteScreen } from './screens/SaleCompleteScreen';
import { TotalDiscountScreen } from './screens/TotalDiscountScreen';
import SettingsScreen from './screens/SettingsScreen';
import { RestaurantSettingsScreen } from './screens/RestaurantSettingsScreen';
import { RestaurantPaymentMethodScreen } from './screens/RestaurantPaymentMethod';
import { RestaurantAddPaymentScreen } from './screens/RestaurantAddPaymentScreen';
import { RestaurantEditDiscountScreen } from './screens/RestaurantEditDiscountScreen';
import { RestaurantEditMenuScreen } from './screens/RestaurantEditMenuScreen';
import { RestaurantAddDiscountScreen } from './screens/RestaurantAddDicountScreen';

export type CartpoStackParamList = {
  Welcome: undefined;
  ConfirmOtp: undefined;
  CreatePin: undefined;
  Calculator: undefined;
  UnlockPin: undefined;
  Topup: undefined;
  Cashout: undefined;
  WithdrawSuccessful: undefined;
  DiscountQrCode: undefined;
  DirectPayment: undefined;
  SaleComplete: undefined;
  TotalDiscount: undefined;
  Settings: undefined;
  RestaurantSettings: undefined;
  RestaurantPaymentMethod: undefined;
  RestaurantAddPayment: undefined;
  RestaurantEditDiscount: undefined;
  RestaurantAddDiscount: undefined;
  RestaurantEditMenu: undefined;
};

const CartpoStack = createNativeStackNavigator<CartpoStackParamList>();

const commonOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const commonScreenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
};

export default function CartpoStackNavigator() {
  return (
    <CartpoStack.Navigator
      screenOptions={commonScreenOptions}
      initialRouteName="RestaurantAddDiscount">
      <CartpoStack.Screen options={commonOptions} name="Welcome" component={WelcomeScreen} />
      <CartpoStack.Screen options={commonOptions} name="ConfirmOtp" component={ConfirmOtpScreen} />
      <CartpoStack.Screen options={commonOptions} name="CreatePin" component={CreatePinScreen} />
      <CartpoStack.Screen options={commonOptions} name="UnlockPin" component={UnlockPinScreen} />
      <CartpoStack.Screen options={commonOptions} name="Topup" component={TopupScreen} />
      <CartpoStack.Screen options={commonOptions} name="Cashout" component={CashoutScreen} />
      <CartpoStack.Screen options={commonOptions} name="Settings" component={SettingsScreen} />
      <CartpoStack.Screen
        options={commonOptions}
        name="WithdrawSuccessful"
        component={WithdrawSuccessfulScreen}
      />
      <CartpoStack.Screen
        options={commonOptions}
        name="DiscountQrCode"
        component={DiscountQrCodeScreen}
      />
      <CartpoStack.Screen
        options={commonOptions}
        name="DirectPayment"
        component={DirectPaymentScreen}
      />
      <CartpoStack.Screen
        options={commonOptions}
        name="SaleComplete"
        component={SaleCompleteScreen}
      />
      <CartpoStack.Screen
        options={commonOptions}
        name="TotalDiscount"
        component={TotalDiscountScreen}
      />
      <CartpoStack.Screen
        options={commonOptions}
        name="RestaurantSettings"
        component={RestaurantSettingsScreen}
      />
      <CartpoStack.Screen
        options={commonOptions}
        name="RestaurantPaymentMethod"
        component={RestaurantPaymentMethodScreen}
      />
      <CartpoStack.Screen
        options={commonOptions}
        name="RestaurantAddPayment"
        component={RestaurantAddPaymentScreen}
      />
      <CartpoStack.Screen
        options={commonOptions}
        name="RestaurantEditDiscount"
        component={RestaurantEditDiscountScreen}
      />
      <CartpoStack.Screen
        options={commonOptions}
        name="RestaurantAddDiscount"
        component={RestaurantAddDiscountScreen}
      />
      <CartpoStack.Screen
        options={commonOptions}
        name="RestaurantEditMenu"
        component={RestaurantEditMenuScreen}
      />
    </CartpoStack.Navigator>
  );
}
