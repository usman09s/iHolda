import { useEffect, useMemo, useState } from 'react';
import { Alert, Linking } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useAppDispatch } from 'hooks/useAppDispatch';
import useLocation from 'hooks/useLocation';
import { useQuery } from 'react-query';
import Api from 'services/Api';
import { setPlasticId } from 'store/plastic/plasticSlice';
import { DropOffLocationItemType } from 'types/PlasticTypes';

import { PlasticStackParamList } from '../PlasticStackNavigator';

const useDropOffLocationListActions = () => {
  const locationRequest = useLocation();
  const dispatch = useAppDispatch();
  const [searchKeyword, setSearchKeyword] = useState('');
  const { navigate } = useNavigation<NavigationProp<PlasticStackParamList>>();
  const [showClosedDropOffLocationPopup, setShowClosedDropOffLocationPopup] = useState(false);

  const locationData = useMemo(() => locationRequest, [locationRequest]);

  const { data, isLoading } = useQuery(['dropOffLocations', locationData], () => {
    if (locationData.locationStatus === 'success' && locationRequest.location) {
      return Api.getClosestDropOffLocations(locationRequest.location);
    } else {
      if (locationData.locationStatus !== 'fail') return;
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
    console.log(item._id);
    if (item.isAvailable === false) {
      return setShowClosedDropOffLocationPopup(true);
    }
    navigate('PlasticConfirmation', { locationId: item._id });
  };

  useEffect(
    () => () => {
      dispatch(setPlasticId());
    },
    [],
  );

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
