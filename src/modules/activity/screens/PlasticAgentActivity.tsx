import { ScrollView, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from 'components/Header/Header';
import { text } from 'theme/text';

import CommonActivity from '../components/CommonActivity';
import MultipleUsersActivity from '../components/MultipleUsersActivity';
import PaymentReceivedActivity from '../components/PaymentReceivedActivity';
import SharedMomentActivity from '../components/SharedMomentActivity';
import Icons from 'components/Icons';
import { useQuery } from 'react-query';
import Api from 'services/Api';
import { useSelector } from 'react-redux';
import { userSelector } from 'store/auth/userSelectors';
import { PROFILE_PLACEHOLDER_IMG } from 'utils/constants';
import { getImageLink } from 'modules/moments/helpers/imageHelpers';
import { useEffect, useState } from 'react';
import socketService from 'services/Socket';

const PlasticActivityScreen = () => {
  const navigation: any = useNavigation();
  const { user } = useSelector(userSelector);
  console.log("🚀 ~ file: PlasticAgentActivity.tsx:23 ~ PlasticActivityScreen ~ user:", user?.plasticAgent)
  const [upcomingDropOff, setUpcomingDropOff] = useState<{ data: any[] } | null>(null);
  const [plasticCount, setPlasticCount] = useState({ todaysCount: 0, totalCount: 0 });

  const _ = useQuery('agentcount', () => (user?.plasticAgent?._id ? Api.checkUserIsAgent(user?.plasticAgent?._id) : null), {
    onSuccess: data => setPlasticCount(data),
    refetchOnMount: true
  });

  // const isFocused = useIsFocused();

  // const { data: upcomingDropOff, isLoading } = useQuery('upcommingDropOff', Api.getPlasticsFuture);

  const getPlasticCounts = (plastics: any) => {
    let count = 0;

    for (let i = 0; i < plastics.length; i++) {
      count += plastics[i].quantity;
    }

    return count;
  };

  const onUpcomingPlastics = (data: any) => setUpcomingDropOff(data.data);

  const onNewPlastic = (data: any) => {
    setUpcomingDropOff(prevDropOffs => ({ data: [data.plastic, ...(prevDropOffs?.data ?? [])] }));
    setPlasticCount(data?.plasticCount);
  };
  useEffect(() => {
    socketService.emit('getUpcomingPlastics', {
      userId: user?._id,
    });

    socketService.on(`getUpcomingPlastics/${user?._id}`, onUpcomingPlastics);
    socketService.on(`newPlastic/${user?._id}`, onNewPlastic);

    return () => {
      socketService.removeListener(`getUpcomingPlastics/${user?._id}`, onUpcomingPlastics);
      socketService.removeListener(`newPlastic/${user?._id}`, onNewPlastic);
    };
  }, []);
  

  return (
    <View className="flex-1 bg-white px-6">
      <Header
        onPressLeft={navigation.goBack}
        leftComponent={<Icons.CrossIcon />}
        title="Your Collections"
      />

      <View style={{ height: 70 }} />

      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 50, paddingHorizontal: 10 }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 5,
          }}>
          <Text style={{ fontSize: 18, color: 'black' }}>Total</Text>
          <Text style={{ fontSize: 21, color: '#595959', fontWeight: '800' }}>
            {plasticCount?.totalCount}
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 5,
          }}>
          <Text style={{ fontSize: 18, color: 'black' }}>Today</Text>
          <Text style={{ fontSize: 21, color: '#595959', fontWeight: '800' }}>
            {plasticCount?.todaysCount}
          </Text>
        </View>
      </View>

      <Text className={text({ type: 'r15', class: 'mb-5' })}>Upcoming drop offs</Text>

      <FlatList
        data={upcomingDropOff?.data}
        keyExtractor={el => el._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: '#f8f8f8',
              paddingVertical: 15,
              paddingHorizontal: 20,
              borderRadius: 15,
              flexDirection: 'row',
              marginBottom: 10,
              alignItems: 'center',
            }}>
            <Image
              style={{ height: 45, width: 45, borderRadius: 50 }}
              source={{
                uri: item.user?.photo?.mediaId
                  ? getImageLink(item.user?.photo?.mediaId)
                  : PROFILE_PLACEHOLDER_IMG,
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                flexShrink: 1,
                alignItems: 'center',
              }}>
              <Text
                className={text({ type: 'r15', class: 'ml-4 flex-1 font-Medium' })}
                style={{ color: '#595959' }}>
                {item.user?.userName}
              </Text>
              <Text className={text({ type: 'r15', class: 'ml-4' })}>
                {getPlasticCounts(item.plastics)}x
              </Text>
              <Image
                style={{ height: 35, width: 30 }}
                resizeMode="contain"
                source={require('../../../../assets/images/bottle.png')}
              />
            </View>
          </View>
        )}
      />

      {upcomingDropOff?.data?.length !== 0 && (
        <View
          style={{
            backgroundColor: 'white',
            justifyContent: 'center',
            flexDirection: 'row',
            width: '100%',
            paddingBottom: 10,
            paddingTop: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PlasticColllectionScan');
            }}
            style={{
              width: '40%',
              backgroundColor: '#ff9133',
              paddingVertical: 10,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>Scan code</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default PlasticActivityScreen;
