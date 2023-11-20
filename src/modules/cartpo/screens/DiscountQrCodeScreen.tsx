import { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { BarCodeScanningResult, Camera } from 'expo-camera';
import { NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native';
import Button from 'components/Button';
import Header from 'components/Header/Header';
import { text } from 'theme/text';
import { width } from 'utils/helpers';
import CustomErrorModal from 'components/ErrorModal/errorModal';
import { BarCodeScanner } from 'expo-barcode-scanner';

export const DiscountQrCodeScreen = () => {
  const isFocused = useIsFocused();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [qrCode, setQrCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [errorText, setErrorText] = useState();
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

  return (
    <View className="flex-1">
      <View className="bg-black px-7 pb-6">
        <Header showBackIcon backIconColor="white" />
        <View
          className="overflow-hidden rounded-xl self-center mt-4 border-white border-b1"
          style={sizes}>
          <BarCodeScanner onBarCodeScanned={onBarCodeScanned} style={sizes} />
        </View>
      </View>
      <View className="px-7 my-12 flex-column justify-between flex-1">
        <View>
          <Text
            className={text({
              type: 'b32',
              class: 'text-center mb-3',
            })}>
            Discount?
          </Text>
          <Text
            className={text({
              type: 'r15',
              class: 'text-center',
            })}>
            Scan customer's QR code to verify and apply discount
          </Text>
        </View>
        <TouchableOpacity className="mb-6">
          <Text className="text-center text-2xl">Skip</Text>
        </TouchableOpacity>
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
