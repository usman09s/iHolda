import { useEffect } from 'react';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import Api from 'services/Api';
import {
  decreasePlasticCount,
  increasePlasticCount,
  setScannedPlastic,
} from 'store/agentPlastic/agentPlasticSlice';
import {
  addedPlasticSelector,
  addedPlasticTotalPriceSelector,
  agentPlasticCountTotalSelector,
  isChangedPlasticSelector,
  plasticsOwnerInformationSelector,
} from 'store/agentPlastic/agentSelectors';
import { parseApiError } from 'utils/helpers';

import { AgentPlasticStackParamList } from '../AgentPlasticNavigator';

export const useAgentPlasticConfirmationActions = () => {
  const dispatch = useAppDispatch();
  const plastics = useSelector(addedPlasticSelector);
  const isChangedPlastic = useSelector(isChangedPlasticSelector);
  const addedPlasticTotalPrice = useSelector(addedPlasticTotalPriceSelector);
  const agentPlasticCountTotal = useSelector(agentPlasticCountTotalSelector);
  const { plasticId, queryId, username } = useSelector(plasticsOwnerInformationSelector);

  const { mutate, isLoading } = useMutation(Api.decodeQrCode);
  const updatePlasticsSizes = useMutation(Api.updatePlasticsSizes);
  const approvedPlasticDelivery = useMutation(Api.approvedPlasticDelivery);

  const { navigate } = useNavigation<NavigationProp<AgentPlasticStackParamList>>();
  const { params } = useRoute<RouteProp<AgentPlasticStackParamList, 'AgentPlasticConfirmation'>>();

  const onPressConfirm = async () => {
    if (!plasticId || !queryId) {
      return;
    }

    if (isChangedPlastic) {
      await updatePlasticsSizes.mutateAsync({
        plasticId,
        sizes: plastics.map(plastic => ({
          quantity: plastic.quantity,
          size: plastic.size,
        })),
      });

      return await approvedPlasticDelivery.mutateAsync(
        { queryId, plasticId },
        {
          onSuccess: () => {
            if (!username) {
              return;
            }
            navigate('AgentPlasticApproved', {
              totalPlastic: agentPlasticCountTotal,
              username,
            });
          },
        },
      );
    }

    await approvedPlasticDelivery.mutateAsync(
      { queryId, plasticId },
      {
        onSuccess: () => {
          if (!username) {
            return;
          }
          navigate('AgentPlasticApproved', {
            totalPlastic: agentPlasticCountTotal,
            username,
          });
        },
      },
    );
  };

  useEffect(() => {
    if (params) {
      mutate(params, {
        onSuccess: result => {
          dispatch(setScannedPlastic(result));
        },
      });
    }
  }, [params]);

  const onPressDecrease = (size: string | number) => dispatch(decreasePlasticCount(Number(size)));

  const onPressIncrease = (size: string | number) => dispatch(increasePlasticCount(Number(size)));

  const buttonLoading = updatePlasticsSizes.isLoading || approvedPlasticDelivery.isLoading;

  const errorMessage =
    parseApiError(approvedPlasticDelivery.error) || parseApiError(updatePlasticsSizes.error);

  return {
    plastics,
    username,
    isLoading,
    errorMessage,
    buttonLoading,
    onPressConfirm,
    onPressDecrease,
    onPressIncrease,
    agentPlasticCountTotal,
    addedPlasticTotalPrice,
  };
};
