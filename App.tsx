import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import MainNavigator from 'navigators/MainNavigator';
import { useLoadFonts } from 'hooks/useLoadFonts';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import CustomErrorModal from 'components/ErrorModal/errorModal';

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

export default function App() {
  const { loaded } = useLoadFonts();
  const [networkErrorVisible, setNetworkErrorVisible] = useState(false);

  const checkNetworkStatus = async () => {
    try {
      const state = await NetInfo.fetch();
      console.log('Network Status Checked:', state.isConnected);
      setNetworkErrorVisible(!state.isConnected);
    } catch (error) {
      console.error('Failed to check network status:', error);
    }
  };

  useEffect(() => {
    if (loaded) {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 1000);
    }
  }, [loaded]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Network Status Changed:', state.isConnected);
      setNetworkErrorVisible(!state.isConnected);
    });
    checkNetworkStatus();
    return unsubscribe;
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <CustomErrorModal
          errorText={'Please check your internet connection and try again.'}
          visible={networkErrorVisible}
          onClose={() => checkNetworkStatus()}
          buttonTitle="Try Again"
        />
        <MainNavigator />
      </QueryClientProvider>
      <Toast />
    </Provider>
  );
}
