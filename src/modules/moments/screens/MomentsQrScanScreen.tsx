import { useEffect, useRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { BarCodeScanningResult, Camera } from 'expo-camera';
import { NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native';
import Header from 'components/Header/Header';
import Icons from 'components/Icons';
import { useMutation, useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import Api from 'services/Api';
import { setMatchedUser } from 'store/moments/momentsSlice';
import colors from 'theme/colors';
import { text } from 'theme/text';
import { width } from 'utils/helpers';

import MeetupAndJobButtons from '../components/MeetupAndJobButtons';
import { MomentsStackParamList } from '../MomentsStackNavigator';

const MomentsQrScanScreen = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  useQuery('currentUserProfile', Api.getUserProfile);
  const scanResultRef = useRef<BarCodeScanningResult>();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const { navigate } = useNavigation<NavigationProp<MomentsStackParamList>>();

  const { mutate, isLoading } = useMutation(Api.postMeetup, {
    onSuccess: data => {
      if (!data.met_with) {
        return;
      }

      dispatch(
        setMatchedUser({
          meetupId: data.id,
          id: data.met_with.id,
          user: data.met_with.user,
          location_name: data.met_with.location_name,
          user_profile_image: data.met_with.user_profile_image,
        }),
      );
      navigate('MomentsMatch');
    },
  });

  const sizes = { width: width - 56, height: width - 56 };

  const onBarCodeScanned = (result: BarCodeScanningResult) => {
    const matchedUserQueryId = JSON.parse(result.data).query_id;
    if (scanResultRef.current !== matchedUserQueryId) {
      mutate({ queryId: matchedUserQueryId });
    }

    scanResultRef.current = matchedUserQueryId;
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
        <View />
        <MeetupAndJobButtons flow="meetup" />
      </View>
    </View>
  );
};

export default MomentsQrScanScreen;
