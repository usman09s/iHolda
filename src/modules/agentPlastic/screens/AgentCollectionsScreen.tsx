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
  const { navigate } = useNavigation<NavigationProp<AgentPlasticStackParamList>>();
  const getPlasticsFuture = useQuery('getPlasticsFuture', Api.getPlasticsFuture);
  const getTotalPlasticsToday = useQuery('getTotalPlasticsToday', Api.getTotalPlasticsToday);
  const getTotalPlasticsAll = useQuery('getTotalPlasticsAll', Api.getPlasticsAll);

  return (
    <View className="flex-1 bg-white">
      <Header title="Your collections" />
      <View className="flex-row justify-center mt-8">
        <View className="border-b1 mr-3 rounded-md py-3 flex-1 ml-4">
          <Text className={text({ type: 'r24', class: 'text-center' })}>Total</Text>
          {getTotalPlasticsAll.isLoading ? (
            <ActivityIndicator color={colors.saffron} />
          ) : (
            <Text className={text({ type: 'b26', class: 'text-center' })}>
              {getTotalPlasticsAll.data?.length || 0}
            </Text>
          )}
        </View>
        <View className="border-b1 rounded-md py-3 flex-1 mr-4">
          <Text className={text({ type: 'r24', class: 'text-center' })}>Today</Text>
          {getTotalPlasticsToday.isLoading ? (
            <ActivityIndicator color={colors.saffron} />
          ) : (
            <Text className={text({ type: 'b26', class: 'text-center' })}>
              {getTotalPlasticsToday.data?.length || 0}
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
        data={getPlasticsFuture.data}
        renderItem={({ item }) => (
          <UpcomingDropOffItem
            key={item.id}
            name={item.user.username}
            totalPlasticCount={2}
            avatar={item.user.user_profile.user_profile_image.image}
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
