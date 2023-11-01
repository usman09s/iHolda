import { useMemo, useState } from 'react';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import Api from 'services/Api';
import {
  addedPlasticSelector,
  addedPlasticTotalPriceSelector,
  plasticCountTotalSelector,
  plasticIdSelector,
} from 'store/plastic/plasticSelectors';
import { setPlasticId } from 'store/plastic/plasticSlice';
import { AddPlasticResponseType } from 'types/PlasticTypes';
import { CashAndPointsFixture } from 'utils/fixtures';
import { parseApiError } from 'utils/helpers';

import { PlasticStackParamList } from '../PlasticStackNavigator';
import { selectQrCodeData, setPlasticSupplyData, setQrCode } from 'store/plastic/userPlasticSlice';

export const usePlasticConfirmationActions = () => {
  const dispatch = useAppDispatch();
  const { params } = useRoute<RouteProp<PlasticStackParamList>>();
  const { navigate } = useNavigation<NavigationProp<PlasticStackParamList>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  const plasticId = useSelector(plasticIdSelector);
  const addedPlastics = useSelector(addedPlasticSelector);
  const totalPrice = useSelector(addedPlasticTotalPriceSelector);
  const totalPlastic = useSelector(plasticCountTotalSelector);
  const userQrCode = useSelector(selectQrCodeData);

  const addPlastics = useMutation(Api.addPlastics);
  const updatePlastics = useMutation('dropOffLocations', Api.updatePlastics);
  const updatePlasticRatios = useMutation('dropOffLocations', Api.updatePlasticRatios);

  const [selectedRatio, setSelectedRatio] = useState<(typeof CashAndPointsFixture)[0]>(
    CashAndPointsFixture[0],
  );

  const isLoading =
    updatePlastics.isLoading || updatePlasticRatios.isLoading || addPlastics.isLoading;
  const onPressRatio = (ratio: (typeof CashAndPointsFixture)[0]) => {
    setSelectedRatio(ratio);
  };

  const errorMessage = useMemo(
    () =>
      parseApiError(addPlastics.error) ||
      parseApiError(updatePlastics.error) ||
      parseApiError(updatePlasticRatios.error),
    [addPlastics, updatePlasticRatios, updatePlastics],
  );

  const onSuccessPlastics = async data => {
    dispatch(setPlasticSupplyData(data.data));
    console.log(data, 'llllllllll');
    dispatch(setQrCode(data.data.plasticQrCode));
    try {
      navigate('PlasticQRCode', {
        plasticInformation: data.data.plasticQrCode,
        location: params.location,
      });
    } catch (error) {
      console.error('Error fetching user QR code:', error);
    }
  };

  const onErrorPlastics = error => {
    if (error.response.status === 409) {
      setModalText('You already have a pending plastic delivery');
    } else {
      setModalText('Error Occured. Please try again');
    }
    modalClose();
  };

  const modalClose = () => {
    setModalVisible(!modalVisible);
  };

  const onPressConfirm = () => {
    const commonParams = {
      communityPointRatio: selectedRatio.point * 100,
      virtualMoneyRatio: selectedRatio.cash * 100,
      plasticAgent: params?.locationId,
      plastics: addedPlastics.map(item => ({ size: item.size, quantity: item.count })),
    };

    // if (plasticId) {
    //   updatePlastics.mutate(
    //     { plasticId, ...commonParams },
    //     {
    //       onSuccess: onSuccessPlastics,
    //     },
    //   );

    //   return;
    // }
    addPlastics.mutate(commonParams, {
      onSuccess: onSuccessPlastics,
      onError: onErrorPlastics,
    });
  };

  return {
    isLoading,
    totalPrice,
    totalPlastic,
    onPressRatio,
    errorMessage,
    addedPlastics,
    selectedRatio,
    onPressConfirm,
    modalVisible,
    modalClose,
    modalText,
  };
};
