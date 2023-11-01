import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import Api from 'services/Api';
import { userCommonInformationSelector } from 'store/auth/userSelectors';
import { RankItemType } from 'types/LeaderBoardTypes';

export const useCommunityRank = () => {
  const { id } = useSelector(userCommonInformationSelector);
  const { data, isLoading, refetch } = useQuery('communityRank', Api.getMetLeaderboard);

  const rankItems = useMemo(
    (): RankItemType[] =>
      data?.map(item => {
        console.log("🚀 ~ file: useCommunityRank.ts:16 ~ useCommunityRank ~ item:", item)
        const pointDiff = Number(item.metCount) - Number(0);

        return {
          point: item.metCount,
          userId: item.user?._id,
          position: item.metCount,
          username: item.user?.firstName,
          avatar: item.user?.photo,
          pointStatus: pointDiff > 0 ? 'UP' : pointDiff === 0 ? 'STABLE' : 'DOWN',
        };
      }) || [],
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
