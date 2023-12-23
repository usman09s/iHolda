import { useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import Icons from 'components/Icons';
import { text } from 'theme/text';
import { height, width } from 'utils/helpers';
import Api from 'services/Api';
import { useQuery } from 'react-query';
import { getImageLink } from 'modules/moments/helpers/imageHelpers';

const Shared = ({
  userId,
  userName,
  loginUserId,
}: {
  userId: string;
  userName: string;
  loginUserId: string;
}) => {
  const [data, setData] = useState<any[]>([]);
  const { data: friendAndMetData, refetch } = useQuery(
    'freindRandAndMetCount',
    () => Api.getMetAndFriendRank(userId),
    {
      refetchOnMount: false,
    },
  );

  async function getTwoUserMet() {
    try {
      const response = await fetch(Api.baseUrl + `met?userId=${loginUserId}&userId2=${userId}`, {
        method: 'GET',
      });

      if (response?.status !== 200) return;

      const res = await response.json();
      if (!res?.data?.data) return;

      setData(res.data.data);
      //       console.log('🚀 ~ file: FeedDetailView.tsx:67 ~ getTwoUserMet ~ res:', res.data.data);
    } catch (error) {
      console.log('~ getTwoUserMet ~ error:', error);
    }
  }

  useEffect(() => {
    getTwoUserMet();
  }, []);
  return (
    <View className="flex-1 bg-white pt-6 px-6" style={{ minHeight: height + 200 }}>
      <View className="flex-row justify-between">
        <View className="border-[0.4px] rounded-xl px-6 py-3" style={{ width: width / 2 - 32 }}>
          <Text className={text({ class: 'text-center', type: 'r13' })}>Met @{userName}</Text>
          <Text className={text({ class: 'text-center mt-2', type: 'b13' })}>
            {friendAndMetData?.data?.metUserCount} times
          </Text>
        </View>
        <View className="border-[0.4px] rounded-xl px-6 py-3" style={{ width: width / 2 - 32 }}>
          <Text className={text({ class: 'text-center', type: 'r13' })}>Friend Rank</Text>
          <Text className={text({ class: 'text-center mt-2', type: 'b13' })}>
            {friendAndMetData?.data?.friendRank}
          </Text>
        </View>
      </View>
      <FlatList
        className="mt-6"
        data={data}
        renderItem={({ item }) => <SharedItem item={item} />}
      />
    </View>
  );
};

export default Shared;

const formatData = (dateString: string) => {
  const date = new Date(dateString);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

const SharedItem = ({ item }: any) => {
  return (
    <View className="flex-row justify-between bg-cultured px-4 py-3 mb-4 rounded-xl">
      <View className="flex-row ">
        <View className="flex-row">
          <View className="w-10 h-10 rounded-full border-[3px] border-saffron justify-center items-center">
            <View className="h-full w-full rounded-full border-[2px] border-white justify-center items-center">
              <Image
                source={{ uri: getImageLink(item.users[0]?.user?.photo?.mediaId ?? '') }}
                className="h-full w-full rounded-full"
              />
            </View>
          </View>
          <View className="w-10 h-10 rounded-full border-[3px] border-green-500 right-4  justify-center items-center">
            <View className="h-full w-full rounded-full border-[2px] border-white  justify-center items-center">
              <Image
                source={{ uri: getImageLink(item.users[1]?.user?.photo?.mediaId ?? '') }}
                className="h-full w-full rounded-full"
              />
            </View>
          </View>
        </View>
        <View>
          <Text className={text({ type: 'b16' })}>You and {item.users[1]?.user.userName} met</Text>
          <Text className={text({ type: 'r12', class: 'mt-2 font-bold text-gray-500' })}>
            Buea, <Text className="font-normal">Cameroon</Text>
          </Text>
        </View>
      </View>
      <View>
        <View className="flex-row justify-end mb-2">
          <Icons.CameraIcon />
          <Text className={text({ type: 'r10', class: 'text-right' })}>
            {(item?.userQuiz ? [item.userQuiz.recording] : item?.post?.media)?.length ?? 0}x
          </Text>
        </View>
        <Text className={text({ type: 'r12' })}>{formatData(item.post?.createdAt)}</Text>
      </View>
    </View>
  );
};
