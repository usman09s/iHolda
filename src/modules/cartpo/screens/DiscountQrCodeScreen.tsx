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
import {
  selectCalculatorAmount,
  selectCartpoSettings,
  selectSelectedOption,
} from 'store/cartpo/calculateSlice';
import Api from 'services/Api';
import Toast from 'react-native-toast-message';

export const DiscountQrCodeScreen = ({ navigation }: any) => {
  const isFocused = useIsFocused();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [qrCode, setQrCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [errorText, setErrorText] = useState();
  const calculatorAmount = useSelector(selectCalculatorAmount);
  const settingsData = useSelector(selectCartpoSettings);
  const paymentAmount = parseFloat(calculatorAmount);
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
        const [metId, qrCode] = data.split('/');
        console.log('metId:', metId);
        console.log('qrCode:', qrCode);
        const userId = 'your-user-id';
        const result = await Api.scanQRCode({ qrCode, userId });
        console.log('API Response:', result);
        navigation.navigate('TotalDiscount', { metId: metId });
      } catch (error) {
        console.error('Error scanning QR Code:', error);
        setErrorText('Error scanning QR Code');
        setModalVisible(true);
      }
    }
  };

  const outerViewStyle = isSmallScreen ? {} : { justifyContent: 'space-between' };

  const makeApiRequest = async paymentType => {
    try {
      const response = await fetch('http://ihold.yameenyousuf.com/api/cartpo/discount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: paymentAmount,
          type: paymentType,
        }),
      });
      const responseData = await response.json();
      console.log('API response:', responseData);
      return responseData;
    } catch (error) {
      console.error('API request failed:', error.message);
      throw error;
    }
  };

  const handleNavigation = async () => {
    if (selectedOption === 'cash') {
      try {
        const responseData = await makeApiRequest('cash');
        navigation.navigate('SaleComplete');
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Unexpected error occurred',
          visibilityTime: 1500,
        });
        return;
      }
    } else if (selectedOption === 'direct') {
      if (settingsData.setting?.paymentMethod[0].account) {
        try {
          const responseData = await makeApiRequest('other');
          navigation.navigate('DirectPayment');
        } catch (error) {
          Toast.show({
            type: 'error',
            text1: 'Unexpected error occurred',
            visibilityTime: 1500,
          });
          return;
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'No Payment Account added',
          text2: 'You need to add a payment account to make a transaction',
          visibilityTime: 1500,
        });
      }
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
