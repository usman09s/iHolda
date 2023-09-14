import { useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BarCodeScanningResult, Camera } from 'expo-camera';
import { NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native';
import Button from 'components/Button';
import { text } from 'theme/text';
import { width } from 'utils/helpers';

import { AgentPlasticStackParamList } from '../AgentPlasticNavigator';

const AgentQRCodeScanScreen = () => {
  const { top } = useSafeAreaInsets();
  const isFocused = useIsFocused();

  const { navigate } = useNavigation<NavigationProp<AgentPlasticStackParamList>>();
  const [permission, requestPermission] = Camera.useCameraPermissions();
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

  const onBarCodeScanned = (result: BarCodeScanningResult) => {
    let parsedResult = JSON.parse(result.data);

    parsedResult = {
      query_id: parsedResult.query_id,
      encrypted_data: parsedResult.data,
      plastic_id: parsedResult.plastic,
    };

    if (scanResult.current?.plastic_id !== parsedResult.plastic_id && parsedResult) {
      navigate('AgentPlasticConfirmation', parsedResult);
    }

    scanResult.current = parsedResult;
  };

  return (
    <View className="flex-1">
      <View className="bg-black px-7 pb-6" style={{ paddingTop: top + 16 }}>
        <View
          className="overflow-hidden rounded-xl self-center mt-4 border-white border-b1"
          style={sizes}>
          {permission?.granted && isFocused && (
            <Camera onBarCodeScanned={onBarCodeScanned} style={sizes} />
          )}
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
