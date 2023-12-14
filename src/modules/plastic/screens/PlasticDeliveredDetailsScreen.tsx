import { Text, View } from 'react-native';
import Button from 'components/Button';
import Header from 'components/Header/Header';
import Icons from 'components/Icons';
import { text } from 'theme/text';
import { usePlasticConfirmationActions } from '../hooks/usePlasticConfirmationActions';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { PlasticStackParamList } from '../PlasticStackNavigator';
import { useState } from 'react';

const PlasticDeliveredDetailsScreen = ({ route }: any) => {
  // console.log("dda", route.params);

  const temp = route.params?.data?.plastic?.plastics?.find((e: any) => e.size === '1L');
  
  const temp1 = route.params?.data?.plastic?.plastics?.find((e: any) => e.size === '1.5L');
  
  const temp2 = route.params?.data?.plastic?.plastics?.find((e: any) => e.size === '5L');
  

  const { selectedRatio, totalPrice } = usePlasticConfirmationActions();

  const getPlasticCount = () => {
    return (temp?.quantity ?? 0) + (temp1?.quantity ?? 0) + (temp2?.quantity ?? 0);
  };

  // const getPlasticsPrice = (plastics: any) => {
  //   let price = 0;

  //   for (let i = 0; i < plastics.length; i++) {
  //     price += countStates[plastics[i].size] * plastics[i].perUnitPrice;
  //   }

  //   return price;
  // };

  // const { totalPlastic, selectedRatio, totalPrice } = {
  //   totalPlastic: route.params?.plastic?.
  // };
  const { navigate } = useNavigation<NavigationProp<PlasticStackParamList>>();
  console.log(selectedRatio);

  const getCfa = () => {
    // const cfa = totalPrice - totalPrice * (1 - selectedRatio?.cash);
    const cfa = route.params?.data?.plastic?.earnedAmount;
    return cfa.toString() + 'cfa';
  };

  const getPoints = () => {
    // const points = selectedRatio?.point * 100;
    const points = route.params?.data?.plastic?.earnedCp;
    return points.toString() + ' CP';
  };

  return (
    <View className="bg-milkWhite px-7 flex-1 pt-5">
      <Header />
      <Text className={text({ type: 'r15', class: 'text-center' })}>
        {getPlasticCount()} successfully delivered
      </Text>
      <View className="w-15 h-15 rounded-full bg-green-500 self-center p-6 mt-20">
        <Icons.TickIcon />
      </View>
      <Button title={getCfa()} customContainer="bg-slate-800 mt-12" />
      <Text className={text({ type: 'b26', class: 'text-center my-4' })}>&</Text>
      <Button title={getPoints()} customContainer="bg-green-600" />
      <Text className={text({ type: 'l16', class: 'text-center mt-12' })}>
        will be credited into your accounts
      </Text>
      <Button
        title="Close"
        onPress={() => navigate('Plastic')}
        customContainer="self-center px-12 mt-7 mb-4 mt-24"
      />
    </View>
  );
};

export default PlasticDeliveredDetailsScreen;
