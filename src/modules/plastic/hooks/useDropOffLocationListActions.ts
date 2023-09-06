import { useMemo, useState } from 'react';
import { Alert, Linking } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import useLocation from 'hooks/useLocation';
import { useQuery } from 'react-query';
import Api from 'services/Api';
import { DropOffLocationItemType } from 'types/PlasticTypes';

import { PlasticStackParamList } from '../PlasticStackNavigator';

const useDropOffLocationListActions = () => {
  const locationRequest = useLocation();
  const [searchKeyword, setSearchKeyword] = useState('');
  const { navigate } = useNavigation<NavigationProp<PlasticStackParamList>>();
  const [showClosedDropOffLocationPopup, setShowClosedDropOffLocationPopup] = useState(false);

  const locationStatus = useMemo(() => locationRequest.locationStatus, [locationRequest]);

  const { data, isLoading } = useQuery(['dropOffLocations', locationStatus], () => {
    if (locationStatus === 'success' && locationRequest.location) {
      return Api.getClosestDropOffLocations(locationRequest.location);
    } else {
      if (locationStatus !== 'fail') return;
      Alert.alert(
        'Information',
        'If you can give location permission, you can see the nearest drop off locations list ',
        [{ text: 'Cancel' }, { text: 'Go to Settings', onPress: Linking.openSettings }],
      );

      return Api.getDropOffLocations();
    }
  });

  const locationResult = useMemo(() => {
    if (!data || !searchKeyword) {
      return [];
    }

    const filteredLocations = data?.filter(
      location =>
        location.location_name?.toLocaleLowerCase().includes(searchKeyword.toLocaleLowerCase()) ||
        location?.location?.address?.town
          ?.toLocaleLowerCase()
          .includes(searchKeyword.toLocaleLowerCase()),
    );

    return filteredLocations;
  }, [data, searchKeyword]);

  const onPressLocation = (item: DropOffLocationItemType) => () => {
    if (item.state === 'Closed') {
      return setShowClosedDropOffLocationPopup(true);
    }
    navigate('PlasticConfirmation');
  };

  return {
    data,
    isLoading,
    searchKeyword,
    locationResult,
    onPressLocation,
    setSearchKeyword,
    showClosedDropOffLocationPopup,
    setShowClosedDropOffLocationPopup,
  };
};

export default useDropOffLocationListActions;
