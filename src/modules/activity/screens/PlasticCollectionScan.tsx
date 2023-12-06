import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { BarCodeScanningResult, Camera } from 'expo-camera';
import { NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native';
import Header from 'components/Header/Header';
import Icons from 'components/Icons';
import { useMutation, useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import Api from 'services/Api';
import { setMatchedUser } from 'store/moments/momentsSlice';
import colors from 'theme/colors';
import { text } from 'theme/text';
import { width } from 'utils/helpers';

import { MomentsStackParamList } from '../../moments/MomentsStackNavigator';
import { userSelector } from 'store/auth/userSelectors';

const throttle = (func: (data: string) => void, delay: number) => {
  let throttling = false;

  return (...args) => {
    if (!throttling) {
      throttling = true;
      func(...args);
      setTimeout(() => {
        throttling = false;
      }, delay);
    }
  };
};

const PlasticCollectionScreen = () => {
  const dispatch = useDispatch();
  const [sccannedQrCode, setScannedQrCode] = useState('');
  const isFocused = useIsFocused();
  const { data } = useQuery('currentUserProfile', Api.getUserProfile);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const { navigate } = useNavigation<NavigationProp<any>>();
  const { user } = useSelector(userSelector);

  const { mutate, isLoading } = useMutation(Api.agentScan, {
    onError: error => {
      console.error(error);
    },
    onSuccess: ({ data }) => {
      navigate('ModifyConfirmPlastic', { data });
    },
  });

  const sizes = { width: width - 56, height: width - 56 };

  const onBarCodeScanned = (result: BarCodeScanningResult) => {
    if (isLoading) return;

    const userPlasticId = result.data;
    handeCodeScan(userPlasticId);
  };

  const handeCodeScan = useCallback(
    throttle((data: string) => {
      setScannedQrCode(data);
    }, 1000),
    [],
  );

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <View className="flex-1">
      <View className="bg-black px-7 pb-6">
        <Header
          showBackIcon
          backIconColor="white"
          rightComponent={<View style={{ height: 50, width: 20 }} />}
          //           onPressRight={() => navigate('MomentsQrCode')}
        />
        <View
          style={sizes}
          className="overflow-hidden rounded-xl self-center mt-4 border-white border-b1">
          {permission?.granted && isFocused && (
            <Camera ratio="4:3" onBarCodeScanned={onBarCodeScanned} style={sizes} />
          )}
          {isLoading && (
            <ActivityIndicator
              color={colors.coolGreen}
              className="absolute self-center"
              style={{ top: sizes.height / 2 }}
            />
          )}
        </View>
      </View>

      <View className="flex-1 justify-around">
        <View className="px-7 mt-8">
          <Text
            className={text({
              type: 'b34',
              class: 'text-center mb-3',
            })}>
            Plastic Collection
          </Text>
          <Text
            className={text({
              type: 'r15',
              class: 'text-center',
            })}>
            Scan the user's QR code to check and confirm their plastic drop off.
          </Text>
        </View>
        <View />
        <TouchableOpacity
          onPress={() => {
                mutate({ queryId: sccannedQrCode, agentId: data?.data?.plasticAgent?._id });
            // navigate('ModifyConfirmPlastic');
          }}
          style={{
            width: '40%',
            backgroundColor: '#ff9133',
            paddingVertical: 10,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>Scan code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlasticCollectionScreen;
