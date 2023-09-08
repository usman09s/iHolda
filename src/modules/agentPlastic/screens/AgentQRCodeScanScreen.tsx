import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { BarCodeScanningResult, Camera } from 'expo-camera';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Button from 'components/Button';
import Header from 'components/Header/Header';
import { text } from 'theme/text';
import { width } from 'utils/helpers';

import { AgentPlasticStackParamList } from '../AgentPlasticNavigator';

const AgentQRCodeScanScreen = () => {
  const { navigate } = useNavigation<NavigationProp<AgentPlasticStackParamList>>();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [, setScanResult] = useState<
    { encrypted_data: string; query_id: string; plastic_id: string } | undefined
  >();

  useEffect(() => {
    requestPermission();
  }, []);

  const sizes = { width: width - 56, height: width - 56 };

  const onBarCodeScanned = (result: BarCodeScanningResult) => {
    const parsedResult = JSON.parse(result.data) as {
      data: string;
      query_id: string;
      plastic_id: string;
    };

    setScanResult({
      query_id: parsedResult.query_id,
      encrypted_data: parsedResult.data,
      plastic_id: parsedResult.plastic_id,
    });
  };

  return (
    <View className="flex-1">
      <View className="bg-black px-7 pb-6">
        <Header showBackIcon backIconColor="white" />
        <View
          className="overflow-hidden rounded-xl self-center mt-4 border-white border-b1"
          style={sizes}>
          {permission?.granted && <Camera onBarCodeScanned={onBarCodeScanned} style={sizes} />}
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
        <Button
          title="Scan Code"
          customContainer="bg-saffron mt-6"
          onPress={() => navigate('AgentPlasticConfirmation')}
        />
      </View>
    </View>
  );
};

export default AgentQRCodeScanScreen;
