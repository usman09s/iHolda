import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import MainNavigator from 'navigators/MainNavigator';
import { useLoadFonts } from 'hooks/useLoadFonts';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { loaded } = useLoadFonts();

  useEffect(() => {
    if (loaded) {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 1000);
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <MainNavigator />;
}
