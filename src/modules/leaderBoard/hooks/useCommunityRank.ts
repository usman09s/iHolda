import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import Api from 'services/Api';
import { userCommonInformationSelector } from 'store/auth/userSelectors';
import { RankItemType } from 'types/LeaderBoardTypes';

export const useCommunityRank = () => {
  const { id } = useSelector(userCommonInformationSelector);
  const { data, isLoading, refetch } = useQuery('communityRank', Api.getCommunityPointsRank);

  const rankItems = useMemo(
    (): RankItemType[] =>
      data?.map(item => {
        const pointDiff = Number(item.points) - Number(item.prev_points);

        return {
          point: item.points,
          userId: item.user.id,
          position: item.position,
          username: item.user.user.username,
          avatar: item.user.user_profile_image.image,
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
