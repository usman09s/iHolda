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

export const usePlasticConfirmationActions = () => {
  const dispatch = useAppDispatch();
  const { params } = useRoute<RouteProp<PlasticStackParamList>>();
  const { navigate } = useNavigation<NavigationProp<PlasticStackParamList>>();

  const plasticId = useSelector(plasticIdSelector);
  const addedPlastics = useSelector(addedPlasticSelector);
  const totalPrice = useSelector(addedPlasticTotalPriceSelector);
  const totalPlastic = useSelector(plasticCountTotalSelector);

  const addPlastics = useMutation('dropOffLocations', Api.addPlastics);
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

  const onSuccessPlastics = (data: AddPlasticResponseType) => {
    dispatch(setPlasticId(data.id));
    updatePlasticRatios.mutate(
      {
        plasticId: data.id,
        cash: selectedRatio.cash * 100,
        point: selectedRatio.point * 100,
      },
      {
        onSuccess: result => {
          console.log(result);
          dispatch(setPlasticId(result.id));
          navigate('PlasticQRCode', { plasticInformation: result });
        },
      },
    );
  };

  const onPressConfirm = () => {
    console.log(params);
    const commonParams = {
      communityPointRatio: selectedRatio.point * 100,
      virtualMoneyRatio: selectedRatio.cash * 100,
      plasticAgent: params?.locationId,
      plastics: addedPlastics.map(item => ({ size: item.size, quantity: item.count })),
    };

    if (plasticId) {
      updatePlastics.mutate(
        { plasticId, ...commonParams },
        {
          onSuccess: onSuccessPlastics,
        },
      );

      return;
    }
    addPlastics.mutate(commonParams, {
      onSuccess: onSuccessPlastics,
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
  };
};
