import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import MainNavigator from 'navigators/MainNavigator';

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 1000);
  }, []);

  return <MainNavigator />;
}
