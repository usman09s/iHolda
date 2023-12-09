import 'react-native-gesture-handler';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import MainNavigator from 'navigators/MainNavigator';
import { useLoadFonts } from 'hooks/useLoadFonts';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import Toast from 'react-native-toast-message';

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

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

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MainNavigator />
      </QueryClientProvider>
      <Toast />
    </Provider>
  );
}
