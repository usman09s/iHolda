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

const UserWaitListScreen = () => {
  const { goBack, dispatch } = useNavigation();
  const username = useSelector(usernameSelector);
  const userImage = useSelector(profileImageSelector);
  // const { data } = useQuery('waitingList', Api.getWaitingList);

  const copyToClipboard = async (value: string) => await Clipboard.setStringAsync(value);

  return (
    <View className="pt-10 bg-petrol flex-1 px-7 ">
      <ScrollView className="flex-1" contentContainerStyle={{ flex: 1 }}>
        <View className="flex-1 justify-evenly">
          <View>
            <Image
              source={{ uri: userImage }}
              className="w-28 h-28 rounded-full self-center"
              style={{ borderWidth: 4, borderColor: 'white', marginBottom: 30 }}
            />
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 14,
                borderColor: 'white',
                borderRadius: 40,
                marginHorizontal: 30,
                borderWidth: 2,
                justifyContent: 'space-between',
                paddingHorizontal: 18,
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
          <View className="self-center">
            <Text className={text({ type: 'm24', class: 'text-white text-center' })}>
              You are currently Number
            </Text>
            <View className="border-b1 self-center px-6 py-2 rounded-2xl my-5 border-coolGreen">
              {/* {data?.id ? ( */}
              <Text className={text({ class: 'text-white text-center', type: 'm48' })}>18</Text>
              {/* ) : (
                <ActivityIndicator />
              )} */}
            </View>
            <Text className={text({ type: 'm24', class: 'text-white text-center' })}>
              on the waiting list
            </Text>
          </View>
          <View>
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
