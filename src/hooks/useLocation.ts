import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

const useLocation = () => {
  const [locationStatus, setLocationStatus] = useState<
    'fetching' | 'success' | 'fail' | undefined
  >();
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | undefined>();
  const [errorMsg, setErrorMsg] = useState('');

  const getUserLocation = async () => {
    setLocationStatus('fetching');
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setErrorMsg(
        'Permission to access location was denied. Permission access is for listing closest drop off locations',
      );
      setLocationStatus('fail');

      return;
    }
    const currentUserLocation = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = currentUserLocation.coords;

    setLocation({ latitude, longitude });
    setLocationStatus('success');
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return {
    errorMsg,
    location,
    locationStatus,
  };
};

export default useLocation;
