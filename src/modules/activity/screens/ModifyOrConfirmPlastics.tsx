import {
  ActivityIndicator,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import Button from 'components/Button';
import Header from 'components/Header/Header';
import Icons from 'components/Icons';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import Api from 'services/Api';
import { plasticCountTotalSelector, plasticSizeSelector } from 'store/plastic/plasticSelectors';
import {
  decreasePlasticCount,
  increasePlasticCount,
  setPlasticsSize,
} from 'store/plastic/plasticSlice';
import { text } from 'theme/text';
import { getHitSlop, units } from 'utils/helpers';

import PlasticItem from '../../plastic/components/PlasticItem';
import { PlasticStackParamList } from '../../plastic/PlasticStackNavigator';
import PlasticCounter from '../components/PlasticCounter';
import { useState } from 'react';
const Bottle = require('../../../../assets/images/bottleLabel.png');
const DefaultImage = require('../../../../assets/images/bottle.png');
const BiggerBottle = require('../../../../assets/images/biggerBottle.png');
const BiggestBottle = require('../../../../assets/images/biggestBottle.png');

const ModifyConfirmPlastic = ({ route }: any) => {
  const scannedData = route.params.data;

  const temp = scannedData.plastics.find((e: any) => e.size === '1L');
  const temp1 = scannedData.plastics.find((e: any) => e.size === '1.5L');
  const temp2 = scannedData.plastics.find((e: any) => e.size === '5L');

  const [oneLQuantity, setOneLQuantity] = useState(temp ? temp?.quantity : 0);
  const [twoLQuantity, setTwoLQuantity] = useState(temp1 ? temp1?.quantity : 0);
  const [FiveLQuantity, setFiveLQuantity] = useState(temp2 ? temp2?.quantity : 0);

  const countStates: any = {
    '1L': oneLQuantity,
    '1.5L': twoLQuantity,
    '5L': FiveLQuantity,
  };

  const setCountStates: any = {
    '1L': setOneLQuantity,
    '1.5L': setTwoLQuantity,
    '5L': setFiveLQuantity,
  };

  //   const dispatch = useAppDispatch();
  //   const plasticSizes = useSelector(plasticSizeSelector);

  //   const totalPlastic = useSelector(plasticCountTotalSelector);
  const { navigate } = useAppNavigation<NavigationProp<any>>();

  const { mutateAsync, isLoading } = useMutation(Api.approvedPlasticDelivery);

  const getImageForSize = (size: '1L' | '1.5L' | '5L') => {
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

  const getPlasticCount = () => {
    return oneLQuantity + twoLQuantity + FiveLQuantity;
  };

  const getPlasticsPrice = (plastics: any) => {
    let price = 0;

    for (let i = 0; i < plastics.length; i++) {
      price += countStates[plastics[i].size] * plastics[i].perUnitPrice;
    }

    return price;
  };

  const handlePlasticSupply = () => {
    const requirePlasticData: { size: string; quantity: number }[] = scannedData?.plastics.map(
      (e: any) => ({ size: e.size, quantity: e?.quantity, perUnitCp: e?.perUnitCp }),
    );
    //
    let plastics: any[] = JSON.parse(JSON.stringify(requirePlasticData));

    if (oneLQuantity !== temp?.quantity) {
      const sizeIndex = plastics.findIndex(e => e.size == '1L');
      if (sizeIndex > 0) plastics[sizeIndex].quantity = oneLQuantity;
    }
    if (twoLQuantity !== temp1?.quantity) {
      const sizeIndex = plastics.findIndex(e => e.size == '1.5L');
      if (sizeIndex > 0) plastics[sizeIndex].quantity = twoLQuantity;
    }
    if (FiveLQuantity !== temp2?.quantity) {
      const sizeIndex = plastics.findIndex(e => e.size == '5L');
      if (sizeIndex > 0) plastics[sizeIndex].quantity = FiveLQuantity;
    }

    mutateAsync(
      {
        queryId: scannedData._id,
        plastics: plastics,
        plasticId: scannedData?.plasticAgent,
      },
      {
        onSuccess: () => {
          const totalPlastic = getPlasticCount();
          navigate('PlasticApproveScreen', { username: scannedData?.user?.userName, totalPlastic });
        },
        onError: error => {
          console.log('🚀 ~ handlePlasticSupply ~ error:', error);
        },
      },
    );
    //     .then(() => {
    //     });
  };

  return (
    <ScrollView
      className="flex-1 bg-white py-2"
      contentContainerStyle={{ justifyContent: 'space-between', paddingBottom: 16 }}>
      <View className="px-6">
        <Header showBackIcon title={scannedData?.user?.userName} />
      </View>

      <View className="mt-16">
        {scannedData?.plastics?.map((elem: any) => (
          <PlasticCounter
            setCount={setCountStates[elem.size]}
            price={elem?.perUnitPrice * countStates[elem.size]}
            count={countStates[elem.size]}
            image={getImageForSize(elem.size)}
          />
        ))}
      </View>
      <View className="px-7 " style={{ marginTop: units.vh * 2 }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{ marginVertical: 20, fontWeight: '400', fontSize: 18 }}>
            Total plastics = {getPlasticCount()}
          </Text>
          <Text className={text({ type: 'm20' })} style={{ marginVertical: 20, color: '#5b5858' }}>
            = {getPlasticsPrice(scannedData?.plastics)}cfa
          </Text>
        </View>
        <TouchableOpacity
          onPress={handlePlasticSupply}
          style={{
            width: 120,
            backgroundColor: '#ff9133',
            paddingVertical: 12,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 20,
          }}>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { height: units.vw * 56, width: units.vh * 44 },
  imageContainer: { height: units.vh * 24, paddingTop: units.vh * 1, marginTop: units.vh * 1 },
  textContainer: { height: units.vh * 16, flexDirection: 'row' },
  h8: { height: units.vh * 8 },
});

export default ModifyConfirmPlastic;
