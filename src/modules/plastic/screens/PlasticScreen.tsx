import { ActivityIndicator, FlatList, ScrollView, Text, View } from 'react-native';
import { NavigationProp, StackActions } from '@react-navigation/native';
import Button from 'components/Button';
import Header from 'components/Header/Header';
import Icons from 'components/Icons';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import Api from 'services/Api';
import { plasticCountTotalSelector, plasticSizeSelector } from 'store/plastic/plasticSelectors';
import {
  decreasePlasticCount,
  increasePlasticCount,
  setPlasticsSize,
} from 'store/plastic/plasticSlice';
import { text } from 'theme/text';
import { units } from 'utils/helpers';

import PlasticItem from '../components/PlasticItem';
import { PlasticStackParamList } from '../PlasticStackNavigator';
import { userAppInit } from 'hooks/useAppInit';
import { userSelector } from 'store/auth/userSelectors';
const Bottle = require('../../../../assets/images/bottleLabel.png');
const DefaultImage = require('../../../../assets/images/bottle.png');
const BiggerBottle = require('../../../../assets/images/biggerBottle.png');
const BiggestBottle = require('../../../../assets/images/biggestBottle.png');

const PlasticScreen = ({ route }: any) => {
  const dispatch = useAppDispatch();
  const plasticSizes = useSelector(plasticSizeSelector);
  const { data, refetch } = useQuery('currentUserProfile', Api.getUserProfile0, {
    refetchOnMount: false,
  });

  const totalPlastic = useSelector(plasticCountTotalSelector);
  const { navigate, goBack, reset } = useAppNavigation<NavigationProp<PlasticStackParamList>>();
  const userData = useSelector(userSelector);
  const { status } = userAppInit();
  // const status = "SUCCESS"

  const shouldNotLoggedIn = route?.params?.shouldNotLoggedIn;

  const loggedIn = shouldNotLoggedIn ? false : status === 'SUCCESS' && userData.user?.isReferred;

  const { isLoading } = useQuery('plasticSizes', Api.getPlasticSizes, {
    onSuccess: result => {
      dispatch(setPlasticsSize(result));
    },
  });

  const getImageForSize = size => {
    console.log('Size', size);
    if (size === '1L') {
      return Bottle;
    } else if (size === '1.5L') {
      return BiggerBottle;
    } else if (size === '5L') {
      return BiggestBottle;
    } else {
      return DefaultImage;
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-white py-2"
      contentContainerStyle={{ justifyContent: 'space-between', paddingBottom: 16 }}>
      <View className="px-6">
        <Header
          // onPressLeft={() => (loggedIn ? goBack() : navigation.navigate('BottomTabs'))}
          onPressLeft={() =>
            loggedIn
              ? goBack()
              : reset({
                  index: 0,
                  routes: [{ name: 'BottomTabs' }],
                })
          }
          leftComponent={<Icons.CrossIcon />}
        />
      </View>
      <View className="px-6" style={{ marginVertical: 20 }}>
        <Text className={text({ class: 'text-center text-black-o-60 mx-6 ' })}>
          Join the move to protect the future of our planet rescue plastics from your community and
          get rewarded.
        </Text>
        <Text
          className={text({ type: 'b34', class: 'text-center' })}
          style={{ marginTop: units.vh * 2 }}>
          {data?.data.user?.plasticRescued ?? 0}
        </Text>
        <Text className={text({ type: 'r12', class: 'text-center mt-2' })}>
          Plastics rescued so far
        </Text>
      </View>
      <View className="">
        {isLoading && <ActivityIndicator size={'large'} className="mt-8" />}
        <FlatList
          horizontal
          style={{ marginTop: units.vh * 2, height: units.vh * 44 }}
          data={plasticSizes}
          className="pl-16 w-full"
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <PlasticItem
              image={getImageForSize(item.size)}
              count={item.count}
              onPressDecrease={() => {
                console.log('Decrease action for plastic item:', item._id);
                dispatch(decreasePlasticCount(item._id));
              }}
              onPressIncrease={() => dispatch(increasePlasticCount(item._id))}
            />
          )}
          contentContainerStyle={{ paddingRight: 100 }}
        />
      </View>
      <View className="px-7 " style={{ marginTop: units.vh * 2 }}>
        <Text
          className={text({ type: 'm20', class: 'text-center' })}
          style={{ marginVertical: 20 }}>
          Total = {totalPlastic}
        </Text>
        <Button
          title="Continue"
          customContainer="my-4"
          type="borderedTransparent"
          disabled={isLoading || totalPlastic === 0}
          onPress={() => navigate('DropOffLocationList')}
        />
      </View>
    </ScrollView>
  );
};

export default PlasticScreen;
