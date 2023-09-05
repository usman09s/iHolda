import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp } from '@react-navigation/native';
import Button from 'components/Button';
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

import PlasticItem from '../components/PlasticItem';
import { PlasticStackParamList } from '../PlasticStackNavigator';

const PlasticScreen = () => {
  const dispatch = useAppDispatch();
  const { top } = useSafeAreaInsets();
  const plasticSizes = useSelector(plasticSizeSelector);
  const totalPlastic = useSelector(plasticCountTotalSelector);
  const { navigate } = useAppNavigation<NavigationProp<PlasticStackParamList>>();

  const { isLoading } = useQuery('plasticSizes', Api.getPlasticSizes, {
    onSuccess: result => {
      dispatch(setPlasticsSize(result));
    },
  });

  return (
    <View style={{ paddingTop: top + 16 }} className="flex-1 bg-white justify-center">
      <View className="px-6">
        <Text className={text({ class: 'text-center text-black-o-60' })}>
          Join the move to protect the future of our planet rescue plastics from your community and
          get rewarded.
        </Text>
        <Text className={text({ type: 'b34', class: 'text-center mt-9' })}>100,001</Text>
        <Text className={text({ type: 'r12', class: 'text-center mt-2' })}>
          Plastics rescued so far
        </Text>
      </View>
      <View className="">
        {isLoading && <ActivityIndicator size={'large'} className="mt-8" />}
        <FlatList
          horizontal
          data={plasticSizes}
          className="mt-8 pl-16 w-full"
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <PlasticItem
              image={item.image}
              count={item.count}
              onPressDecrease={() => dispatch(decreasePlasticCount(item.id))}
              onPressIncrease={() => dispatch(increasePlasticCount(item.id))}
            />
          )}
          contentContainerStyle={{ paddingRight: 100 }}
        />
      </View>
      <View className="px-7 mt-12">
        <Text className={text({ type: 'm2o', class: 'text-center' })}>Total = {totalPlastic}</Text>
        <Button
          title="Continue"
          customContainer="mt-8"
          type="borderedTransparent"
          disabled={isLoading || totalPlastic === 0}
          onPress={() => navigate('DropOffLocationList')}
        />
      </View>
    </View>
  );
};

export default PlasticScreen;
