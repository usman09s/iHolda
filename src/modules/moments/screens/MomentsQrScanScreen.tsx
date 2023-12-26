import { useCallback, useEffect, useRef } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native';
import { BarCodeScanningResult, Camera } from 'expo-camera';
import { NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native';
import Header from 'components/Header/Header';
import Icons from 'components/Icons';
import { useMutation, useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import Api from 'services/Api';
import { resetState, setMatchedUser } from 'store/moments/momentsSlice';
import colors from 'theme/colors';
import { text } from 'theme/text';
import { width } from 'utils/helpers';

import MeetupAndJobButtons from '../components/MeetupAndJobButtons';
import { MomentsStackParamList } from '../MomentsStackNavigator';

const throttle = (func: any, delay: number) => {
  let throttling = false;

  return (...args: any[]) => {
    if (!throttling) {
      throttling = true;
      func(...args);
      setTimeout(() => {
        throttling = false;
      }, delay);
    }
  };
};

const MomentsQrScanScreen = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  useQuery('currentUserProfile', Api.getUserProfile0);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const { navigate } = useNavigation<NavigationProp<MomentsStackParamList>>();

  const { mutate, isLoading } = useMutation(Api.postMeetup, {
    onError: async (error: any) => {
      console.log('🚀 ~ file: MomentsQrScanScreen.tsx:41 ~ onError: ~ error:', error);

      let errorMessage = 'An unknown error occurred';

      try {
        // Attempt to parse the error as JSON
        const errorObject = JSON.parse(error?.message || '');
        errorMessage = errorObject?.message || errorMessage;
      } catch (parseError) {
        // Handle parsing error if necessary
        console.error('Error parsing JSON:', parseError);
      }

      errorMessage = errorMessage.toLowerCase().includes('location mismatch')
        ? "Your location must be close to the other user's location. Please make sure you're nearby and try again."
        : errorMessage;

      // Display the error message in an alert
      Alert.alert('Error', errorMessage);
    },
    onSuccess: data => {
      if (!data) return alert('Invalid QR Code');
      if (!data.data.metBefore) {
        navigate('MomentsMatch', {
          id: 12343,
          user: data.data.user,
          location_name: 'No Location',
          user_profile_image: {
            id: 4545345,
            image: data.data.user.photo.mediaId,
            uploaded_at: data.data.user.updatedAt,
          },
          metBefore: data.data.metBefore,
        });
        return;
      }

      dispatch(
        setMatchedUser({
          meetupId: 123,
          id: 12343,
          user: data.data.user,
          metBefore: data.data.metBefore,
          location_name: 'No Location',
          user_profile_image: {
            id: 123,
            image: '',
            uploaded_at: 'fdaskfjdsakf',
          },
        }),
      );
      navigate('MomentsSelfie', {
        id: 12343,
        user: data.data.user,
        metBefore: data.data.metBefore,
        location_name: 'No Location',
        user_profile_image: {
          id: 4545345,
          image: data.data.user.photo.mediaId,
          uploaded_at: data.data.user.updatedAt,
        },
      });
    },
  });

  const sizes = { width: width - 56, height: width - 56 };

  const onBarCodeScanned = (result: BarCodeScanningResult) => {
    if (isLoading) return;
    console.log('gettinig data------------');
    const matchedUserQueryId = result.data;
    mutate({ queryId: matchedUserQueryId });
  };

  const handeCodeScan = useCallback(
    throttle((data: any) => {
      onBarCodeScanned(data);
    }, 1000),
    [],
  );

  useEffect(() => {
    if (isFocused) dispatch(resetState());
  }, [isFocused]);

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <>
      <ScrollView>
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
              <Camera ratio="4:3" onBarCodeScanned={handeCodeScan} style={sizes} />
            )}
            {/* {isLoading && (
            <ActivityIndicator
              color={colors.coolGreen}
              className="absolute self-center"
              style={{ top: sizes.height / 2 }}
            />
          )} */}
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
          <View style={{ height: 100}} />
        </View>

        {/* <MeetupAndJobButtons isAbsolute={false} flow="meetup" /> */}
      </ScrollView>
      <View className="absolute right-0 bottom-0 w-full">
        <MeetupAndJobButtons isAbsolute={false} flow="meetup" />
      </View>
    </>
  );
};

export default MomentsQrScanScreen;
