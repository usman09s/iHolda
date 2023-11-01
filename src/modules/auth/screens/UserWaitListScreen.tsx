import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import Button from 'components/Button';
import Icons from 'components/Icons';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import Api from 'services/Api';
import { profileImageSelector, usernameSelector } from 'store/auth/userSelectors';
import { text } from 'theme/text';
import { horizontalScale, verticalScale, moderateScale } from '../../../utils/helpers';

const UserWaitListScreen = () => {
  const { goBack, dispatch } = useNavigation();
  const username = useSelector(usernameSelector);
  const userImage = useSelector(profileImageSelector);
  // const { data } = useQuery('waitingList', Api.getWaitingList);

  const copyToClipboard = async (value: string) => await Clipboard.setStringAsync(value);

  return (
    <View className="pt-10 bg-petrol flex-1 px-7">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1 justify-evenly">
          <View style={{ marginTop: verticalScale(80), marginBottom: verticalScale(30) }}>
            <Image
              source={{ uri: userImage }}
              className="w-28 h-28 rounded-full self-center"
              style={{ borderWidth: 4, borderColor: 'white', marginBottom: verticalScale(30) }}
            />
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: verticalScale(14),
                borderColor: 'white',
                borderRadius: 40,
                marginHorizontal: horizontalScale(30),
                borderWidth: 2,
                justifyContent: 'space-between',
                paddingHorizontal: horizontalScale(18),
              }}>
              <Text className={text({ type: 'r12', class: 'text-white-o-60' })}>Your username</Text>
              <TouchableOpacity
                className="flex-row"
                onPress={() => copyToClipboard(`@${username}`)}>
                <Text className={text({ type: 'b13', class: 'text-white mr-1' })}>
                  {username?.startsWith('@') ? `${username}` : `@${username}`}
                </Text>
                <Icons.CopyIcon />
              </TouchableOpacity>
            </View>
          </View>
          <View className="self-center" style={{ paddingTop: verticalScale(50) }}>
            <Text
              className={text({ class: 'text-white text-center' })}
              style={{ fontSize: moderateScale(26), fontWeight: '500' }}>
              You are currently Number
            </Text>
            <View className="border-b1 self-center px-6 py-2 rounded-2xl my-5 border-coolGreen">
              {/* {data?.id ? ( */}
              <Text
                className={text({ class: 'text-white text-center' })}
                style={{ fontSize: moderateScale(48), fontWeight: '500' }}>
                18
              </Text>
              {/* ) : (
                <ActivityIndicator />
              )} */}
            </View>
            <Text
              className={text({ class: 'text-white text-center' })}
              style={{ fontSize: moderateScale(22), fontWeight: '500' }}>
              on the waiting list
            </Text>
          </View>
          <View style={{ marginTop: verticalScale(30), paddingTop: verticalScale(30) }}>
            <Text className={text({ class: 'text-white mb-8 text-center', type: 'm13' })}>
              If you don’t have a referral code, you can wait for full launch or request a referral
              code from an iHolda user.
            </Text>
            <View className="flex-row justify-between">
              <Button
                onPress={goBack}
                title="Enter code"
                customContainer="self-center"
                extraStyles={{
                  borderWidth: 5,
                  borderColor: 'white',
                  width: '50%',
                }}
                extraTextStyles={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}
              />
              <Button
                title="Exit"
                customContainer="self-center"
                onPress={() => dispatch(StackActions.popToTop())}
                extraStyles={{ borderWidth: 5, borderColor: 'white', width: '40%' }}
                extraTextStyles={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UserWaitListScreen;
