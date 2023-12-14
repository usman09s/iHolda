import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import Api from 'services/Api';
import { userCommonInformationSelector } from 'store/auth/userSelectors';
import { RankItemType } from 'types/LeaderBoardTypes';

export const useCommunityRank = (pair = false) => {
  const { id } = useSelector(userCommonInformationSelector);
  const {
    data: metLeaderData,
    isLoading: metLeaderLoading,
    refetch: metLeaderRefetch,
  } = useQuery('communityRank', Api.getMetLeaderboard);
  const {
    data: metPairLeaderData,
    isLoading: metPairLeaderLoading,
    refetch: metPairLeaderRefetch,
  } = useQuery('communityPairRank', Api.getMetPairLeaderboard);

  const data: any = pair ? metPairLeaderData : metLeaderData;
  const isLoading = pair ? metPairLeaderLoading : metLeaderLoading;
  const refetch = pair ? metPairLeaderRefetch : metLeaderRefetch;

  const rankItems = useMemo(
    (): RankItemType[] =>
      !data
        ? []
        : data?.map((item: any) => {
            const pointDiff = Number(item.metCount ?? '0') - Number(0);

            return {
              point: item.metCount?.toString() ?? '',
              userId: item?.users ? item.users[0]?._id : item.user?._id,
              userId2: item?.users ? item.users[1]?._id : '',
              position: item.metCount,
              username: item?.users ? item.users[0]?.userName : item.user?.userName,
              username2: item?.users ? item.users[1]?.userName : item.user?.userName,
              avatar: item?.users ? item.users[0]?.photo?.mediaId : item.user?.photo?.mediaId,
              avatar2: item?.users ? item.users[1]?.photo?.mediaId : item.user?.photo?.mediaId,
              pointStatus: pointDiff > 0 ? 'UP' : pointDiff === 0 ? 'STABLE' : 'DOWN',
            };
          }),
    [data],
  );

  const currentUser = useMemo(
    () => rankItems.filter(item => item.userId === id)?.[0] || {},
    [rankItems],
  );

  const winners = {
    first: rankItems?.[0] || {},
    second: rankItems?.[1] || {},
    third: rankItems?.[2] || {},
  };

  return {
    refetch,
    winners,
    isLoading,
    currentUser,
    rankItems: rankItems?.slice(3, rankItems?.length),
  };
};
