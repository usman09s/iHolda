import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Button from 'components/Button';
import Header from 'components/Header/Header';
import { useQuery } from 'react-query';
import Api from 'services/Api';
import colors from 'theme/colors';
import { text } from 'theme/text';

import { AgentPlasticStackParamList } from '../AgentPlasticNavigator';
import UpcomingDropOffItem from '../components/UpcomingDropOffItem';

const AgentCollectionsScreen = () => {
  const agentUser = useQuery('agentUser', Api.checkUserIsAgent);
  const { navigate } = useNavigation<NavigationProp<AgentPlasticStackParamList>>();
  const locationId = agentUser.data?.dropoff_locations?.[0]?.id;
  // const getPlasticsFuture = useQuery(['getPlasticsFuture', locationId], () =>
  //   Api.getPlasticsFuture({ locationId }),
  // );
  const getPlasticsFuture = useQuery(['getPlasticsFuture', locationId], () =>
    Api.getPlasticsFuture(),
  );

  return (
    <View className="flex-1 bg-white">
      <View className="px-4">
        <Header title="Your collections" showBackIcon />
      </View>
      <View className="flex-row justify-center mt-8">
        <View className="border-b1 mr-3 rounded-md py-3 flex-1 ml-4">
          <Text className={text({ type: 'r24', class: 'text-center' })}>Total</Text>
          {agentUser.isLoading ? (
            <ActivityIndicator color={colors.saffron} />
          ) : (
            <Text className={text({ type: 'b26', class: 'text-center' })}>
              {agentUser.data.totalCount || 0}
            </Text>
          )}
        </View>
        <View className="border-b1 rounded-md py-3 flex-1 mr-4">
          <Text className={text({ type: 'r24', class: 'text-center' })}>Today</Text>
          {agentUser.isLoading ? (
            <ActivityIndicator color={colors.saffron} />
          ) : (
            <Text className={text({ type: 'b26', class: 'text-center' })}>
              {agentUser.data.todayCount || 0}
            </Text>
          )}
        </View>
      </View>
      <Text className={text({ type: 'l16', class: 'mt-6 mb-4 mx-7' })}>Upcoming drop offs</Text>
      {getPlasticsFuture.isLoading && <ActivityIndicator color={colors.saffron} size={'large'} />}
      <FlatList
        windowSize={10}
        className="flex-1"
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        data={getPlasticsFuture?.data?.data}
        renderItem={({ item }) => (
          <UpcomingDropOffItem
            key={item.id}
            name={item.user.username ? item.user.username : 'bayuga'}
            totalPlasticCount={item.totalAmount}
            // avatar={item.user.user_profile.user_profile_image.image}
          />
        )}
      />
      <Button
        title="Scan code"
        onPress={() => navigate('AgentQrCodeScan')}
        customContainer="rounded-md mx-7 bg-saffron my-4"
      />
    </View>
  );
};

export default AgentCollectionsScreen;
