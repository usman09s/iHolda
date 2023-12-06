import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useQuery } from 'react-query';
import Api from 'services/Api';
import { setTokensAndQueryId, setUserInfo } from 'store/auth/userSlice';

import { useAppDispatch } from './useAppDispatch';
import { setUser } from 'store/userDataSlice';

export const userAppInit = () => {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<'IDLE' | 'LOADING' | 'FAILED' | 'SUCCESS'>('IDLE');
  const { data, refetch } = useQuery('currentUserProfile', Api.getUserProfile, {
    refetchOnMount: false,
  });

  const getTokensAndQueryId = async (key: string) => {
    if (!key) {
      return;
    }

    const result = await SecureStore.getItemAsync(key);

    if (result) {
      const { queryId, accessToken, refreshToken } = JSON.parse(result) as {
        queryId: string;
        accessToken: string;
        refreshToken: string;
      };

      dispatch(setTokensAndQueryId({ queryId, accessToken, refreshToken }));

      Api.setQueryIdValue(queryId);
      Api.setTokenValue(accessToken);

      return { queryId, accessToken, refreshToken };
    }

    return;
  };

  const getProfile = async () => {
    setStatus('LOADING');
    const result = await getTokensAndQueryId('tokensAndQueryId');

    if (result) {
      await refetch()
        .then(response => {
          dispatch(setUser(response.data.data.user));
          setStatus(response.data ? 'SUCCESS' : 'FAILED');
        })
        .catch(() => setStatus('FAILED'));
    } else {
      setStatus('FAILED');
    }
  };

  useEffect(() => {
    if (data) {
      dispatch(setUserInfo(data.data.user));
    }
  }, [data]);

  useEffect(() => {
    getProfile();
  }, []);

  return { data, status };
};
