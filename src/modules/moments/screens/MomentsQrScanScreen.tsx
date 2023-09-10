import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { BarCodeScanningResult, Camera } from 'expo-camera';
import { NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native';
import Header from 'components/Header/Header';
import Icons from 'components/Icons';
import { text } from 'theme/text';
import { getHitSlop, width } from 'utils/helpers';

import { MomentsStackParamList } from '../MomentsStackNavigator';

const MomentsQrScanScreen = () => {
  const isFocused = useIsFocused();
  const [, setScanResult] = useState<BarCodeScanningResult>();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const { navigate } = useNavigation<NavigationProp<MomentsStackParamList>>();

  const sizes = { width: width - 56, height: width - 56 };

  const onBarCodeScanned = (result: BarCodeScanningResult) => {
    setScanResult(result);
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <View className="flex-1">
      <View className="bg-black px-7 pb-6">
        <Header
          showBackIcon
          backIconColor="white"
          rightComponent={<Icons.QrCodeIcon />}
          onPressRight={() => navigate('MomentsQrCode')}
        />
        <View
          style={sizes}
          className="overflow-hidden rounded-xl self-center mt-4 border-white border-b1">
          {permission?.granted && isFocused && (
            <Camera onBarCodeScanned={onBarCodeScanned} style={sizes} />
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
            Meetup
          </Text>
          <Text
            className={text({
              type: 'r15',
              class: 'text-center',
            })}>
            Position the QR code at the center of the square and scan to create a moment.
          </Text>
        </View>
        <View className="flex-row bg-gray-300 shadow-md mx-2 self-end mt-10 py-4 px-10 rounded-full items-between">
          <Pressable
            hitSlop={getHitSlop({ value: 20, right: 10, left: 40 })}
            onPress={() => navigate('MomentsMatch')}>
            <Text className={text({ type: 'r15', class: 'mr-8' })}>Meetup</Text>
          </Pressable>
          <Pressable
            hitSlop={getHitSlop({ value: 20, left: 10, right: 40 })}
            onPress={() => alert('j')}>
            <Text className={text({ type: 'r15', class: 'text-black-o-40' })}>Job</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default MomentsQrScanScreen;
