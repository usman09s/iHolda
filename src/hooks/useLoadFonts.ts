import { useFonts } from 'expo-font';

export const useLoadFonts = () => {
  const [loaded] = useFonts({
    Bold: require('../../assets/fonts/Roboto-Bold.ttf'),
    Thin: require('../../assets/fonts/Roboto-Thin.ttf'),
    Black: require('../../assets/fonts/Roboto-Black.ttf'),
    Light: require('../../assets/fonts/Roboto-Light.ttf'),
    Medium: require('../../assets/fonts/Roboto-Medium.ttf'),
    Regular: require('../../assets/fonts/Roboto-Regular.ttf'),
  });

  return { loaded };
};
