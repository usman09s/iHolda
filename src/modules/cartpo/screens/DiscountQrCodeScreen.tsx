import { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { BarCodeScanningResult, Camera } from 'expo-camera';
import { NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native';
import Header from 'components/Header/Header';
import { text } from 'theme/text';
import { height, width } from 'utils/helpers';
import CustomErrorModal from 'components/ErrorModal/errorModal';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useSelector } from 'react-redux';
import { selectSelectedOption } from 'store/cartpo/calculateSlice';
import Api from 'services/Api';

export const DiscountQrCodeScreen = ({ navigation }: any) => {
  const isFocused = useIsFocused();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [qrCode, setQrCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [errorText, setErrorText] = useState('');
  const scanResult = useRef<
    { encrypted_data: string; query_id: string; plastic_id: string } | undefined
  >();
  const selectedOption = useSelector(selectSelectedOption);
  const isSmallScreen = height < 700;

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    if (isFocused) {
      scanResult.current = undefined;
    }
  }, [isFocused]);

  const sizes = {
    width: isSmallScreen ? width - 100 : width - 56,
    height: isSmallScreen ? width - 100 : width - 56,
  };

  const onBarCodeScanned = async ({ type, data }: BarCodeScanningResult) => {
    if (data) {
      setQrCode(data);
      try {
        const userId = 'your-user-id';
        const result = await Api.scanQRCode({ qrCode: data, userId });
        console.log('API Response:', result);
        navigation.navigate('TotalDiscount');
      } catch (error) {
        console.error('Error scanning QR Code:', error);
        setErrorText('Error scanning QR Code');
        setModalVisible(true);
      }
    }
  };

  const outerViewStyle = isSmallScreen ? {} : { justifyContent: 'space-between' };

  const handleNavigation = () => {
    if (selectedOption === 'cash') {
      navigation.navigate('SaleComplete');
    } else {
      navigation.navigate('DirectPayment');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View className="bg-black px-7 pb-6">
        <Header showBackIcon backIconColor="white" />
        <View
          className="overflow-hidden rounded-xl self-center mt-4 border-white border-b1"
          style={sizes}>
          <BarCodeScanner onBarCodeScanned={onBarCodeScanned} style={sizes} />
        </View>
      </View>
      <View className="px-7 my-12 flex-column flex-1" style={outerViewStyle}>
        <View style={{ marginBottom: isSmallScreen && '15%' }}>
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
        <TouchableOpacity
          className="mb-6"
          onPress={handleNavigation}
          style={{ marginTop: isSmallScreen && '15%' }}>
          <Text className="text-center text-2xl">Skip</Text>
        </TouchableOpacity>
      </View>
      <CustomErrorModal
        errorText={errorText}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        buttonTitle="CLOSE"
      />
    </ScrollView>
  );
};
