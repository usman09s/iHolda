import { useState, useEffect } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Button from 'components/Button';
import ErrorModal from 'components/ErrorModal';
import Input from 'components/Input';
import { useKeyboardVisible } from 'hooks/useKeyboardVisible';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import Api from 'services/Api';
import { profileImageSelector, userImageSelector, userSelector } from 'store/auth/userSelectors';
import colors from 'theme/colors';
import { text } from 'theme/text';
import { Image as ImageCompresor } from 'react-native-compressor';
import { parseApiError, verticalScale } from 'utils/helpers';

import { AuthStackParamList } from '../AuthStackNavigator';
import CustomErrorModal from 'components/ErrorModal/errorModal';
import { selectQrCodeData } from 'store/plastic/userPlasticSlice';
import mime from 'mime';
import { getImageLink } from '../../moments/helpers/imageHelpers';

const EnterReferralCodeScreen = () => {
  LayoutAnimation.easeInEaseOut();
  const [modalVisible, setModalVisible] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();
  const { mutate, error } = useMutation(Api.setReferralCode);
  const userImage = useSelector(userSelector);
  // const { mutate: updateUser } = useMutation(Api.updateuser);
  // const isVisibleKeyboard = useKeyboardVisible();

  // TODO: add type
  const userInfo: any = useSelector(userSelector);

  async function postData(url = '', data: FormData) {
    const response = await fetch(url, {
      method: 'Put',
      headers: {
        // 'Content-Type': 'multipart/form-data',
      },
      body: data,
    });
    // console.log("🚀 ~ file: MomentsMoodScreen.tsx:43 ~ postData ~ response.json():", await  response.text())
    return { ...(await response.json()), status: response.status };
  }

  const onContinue = () => {
    mutate(
      { referralCode },
      {
        onSuccess: result => {
          console.log(result);
          navigate('ReferralCodeSuccessful', { result });
        },
        onError: error => {
          setModalVisible(true);
        },
      },
    );
  };

  useEffect(() => {
    console.log(
      '🚀 ~ file: EnterReferralCodeScreen.tsx:58 ~ useEffect ~ userInfo:',
      userInfo.username,
    );
    ImageCompresor.compress(userInfo.userImage, {
      progressDivider: 10,
      downloadProgress: progress => {
        console.log('downloadProgress: ', progress);
      },
    }).then(result => {
      const formData1 = new FormData();
      formData1.append('firstName', userInfo.username ? userInfo.username : userInfo.user.userName);
      formData1.append('bio', '');
      formData1.append('address', 'none');
      formData1.append('userName', userInfo.username ? userInfo.username : userInfo.user.userName);
      formData1.append('socialLinks[0][platform]', 'facebook');
      formData1.append('socialLinks[0][link]', '');
      formData1.append('socialLinks[2][platform]', 'tiktok');
      formData1.append('socialLinks[2][link]', '');
      formData1.append('socialLinks[3][platform]', 'youtube');
      formData1.append('socialLinks[3][link]', '');
      formData1.append('socialLinks[4][platform]', 'twitter');
      formData1.append('socialLinks[4][link]', '');
      formData1.append('socialLinks[5][platform]', 'instagram');
      formData1.append('socialLinks[5][link]', '');
      formData1.append('socialLinks[1][platform]', 'website');
      formData1.append('socialLinks[1][link]', '');
      const image: any = {
        name: result.split('/').pop(),
        type: mime.getType(result),
        uri: result,
      };
      formData1.append('photo', image);

      postData(Api.baseUrl + 'user', formData1)
        .then(res => {
          console.log('🚀 ~ file: EnterReferralCodeScreen.tsx:105 ~ useEffect ~ res:', res);
        })
        .catch(err => {
          console.log('🚀 ~ file: EnterReferralCodeScreen.tsx:109 ~ useEffect ~ err:', err);
        });

      // Api.updateuser(formdata).then(() => {
      //   navigate('EnterReferralCode');
      // });
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View className="flex-1 bg-blue px-7 justify-evenly pt-14">
        <Text className={text({ type: 'm18', class: 'text-white text-center mb-8' })}>
          Referral code
        </Text>
        <View className="flex-row self-center">
          <Image
            source={{
              uri: userImage.userImage
                ? userImage.userImage
                : getImageLink(userInfo.user?.photo?.mediaId),
            }}
            className={'w-28 h-28 rounded-3xl border-4 border-white -rotate-30'}
            style={{ borderColor: 'white', borderWidth: 4 }}
          />
          <View
            className={
              'w-28 h-28 rounded-3xl border-4 border-white rotate-30 -left-8 top-2 bg-blue justify-center items-center'
            }>
            <Text className="text-white text-36">?</Text>
          </View>
        </View>
        <View style={{ height: verticalScale(80) }} />
        <Input
          onChangeText={setReferralCode}
          placeholder="Enter referral code"
          customInputClass="text-20 mx-7"
          placeholderTextColor={colors['white-o-60']}
          // keyboardType="numeric"
        />
        <View style={{ height: verticalScale(64) }} />
        <View>
          <Button
            title="Confirm"
            customContainer="self-center"
            type="borderedSolid"
            extraStyles={{ borderWidth: 5, borderColor: 'white', width: 200 }}
            onPress={onContinue}
          />
          <View style={{ height: verticalScale(35) }} />
          <Button
            title="Skip"
            type="ghost"
            customContainer="self-center pb-8"
            onPress={() => navigate('UserWaitList')}
            customTextClass={text({ type: 'm18', class: 'text-white-o-70 ' })}
          />
          <View style={{ height: verticalScale(16) }} />
        </View>
        <CustomErrorModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          errorText={'Incorrect Referral code!'}
          buttonTitle="CLOSE"
        />
      </View>
    </ScrollView>
  );
};

export default EnterReferralCodeScreen;
