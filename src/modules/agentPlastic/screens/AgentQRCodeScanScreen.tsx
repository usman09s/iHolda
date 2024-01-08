import { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { BarCodeScanningResult, Camera } from 'expo-camera';
import { NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native';
import Button from 'components/Button';
import Header from 'components/Header/Header';
import { text } from 'theme/text';
import { width } from 'utils/helpers';
import axios from 'axios';

import { AgentPlasticStackParamList } from '../AgentPlasticNavigator';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { setScannedPlastic, setUserPlasticAgent } from 'store/agentPlastic/agentPlasticSlice';
// import ErrorModal from 'components/ErrorModal';
import CustomErrorModal from 'components/ErrorModal/errorModal';
import { BarCodeScanner } from 'expo-barcode-scanner';

const AgentQRCodeScanScreen = () => {
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<NavigationProp<AgentPlasticStackParamList>>();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [qrCode, setQrCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [errorText, setErrorText] = useState();
  const plasticAgent = '652e726f397bc8f89cbd5a6c';
  const scanResult = useRef<
    { encrypted_data: string; query_id: string; plastic_id: string } | undefined
  >();

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    if (isFocused) {
      scanResult.current = undefined;
    }
  }, [isFocused]);

  const sizes = { width: width - 56, height: width - 56 };

  const onBarCodeScanned = async ({ type, data }: any) => {
    if (data) {
      setQrCode(data);
    }
  };

  const handleContinuePress = async () => {
    try {
      const apiUrl = `http://ihold.yameenyousuf.com/api/plastic/scan/${qrCode}/${plasticAgent}`;
      const response = await axios.get(apiUrl);

      if (response.status === 200) {
        const result = response.data;
        if (result.message === 'qr code verified') {
          dispatch(setScannedPlastic(result.data));
          dispatch(setUserPlasticAgent(result.data));
          navigate('AgentPlasticConfirmation', result.data);
          return result;
        } else {
          setErrorText('Try Again');
          setModalVisible(true);
        }
      }
    } catch (error: any) {
      setErrorText('Try Again');
      setModalVisible(true);
    }
  };

  return (
    <View className="flex-1">
      <View className="bg-black px-7 pb-6">
        <Header showBackIcon backIconColor="white" />
        <View
          className="overflow-hidden rounded-xl self-center mt-4 border-white border-b1"
          style={sizes}>
          {/* {permission?.granted && isFocused && ( */}
          <BarCodeScanner onBarCodeScanned={onBarCodeScanned} style={sizes} />
          {/* )} */}
        </View>
      </View>
      <View className="px-7 mt-8">
        <Text
          className={text({
            type: 'b26',
            class: 'text-center mb-3',
          })}>
          Plastic collection
        </Text>
        <Text
          className={text({
            type: 'r15',
            class: 'text-center',
          })}>
          Scan the user’s QR code to check and confirm their plastic drop off.
        </Text>
        <Button title="Scan Code" customContainer="bg-saffron mt-6" onPress={handleContinuePress} />
      </View>
      {/* <ErrorModal errorText={errorText} /> */}
      <CustomErrorModal
        errorText={errorText}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        buttonTitle="CLOSE"
      />
    </View>
  );
};

export default AgentQRCodeScanScreen;
