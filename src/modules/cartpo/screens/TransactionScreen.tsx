import { View, Text, Image, ScrollView } from 'react-native';
import { CustomTransaction } from '../components/CustomTransaction';
import Icon from 'react-native-vector-icons/Entypo';
import { HamburgerIcon } from '../../../../assets/referralGift';
import TransactionInOut from 'modules/profile/components/TransactionInOut';
import Icons from 'components/Icons';

const Header = () => {
  return (
    <View className="flex-row justify-between items-center pt-6 px-6">
      <View />
      <Text className="text-base font-bold text-center text-gray-500">Transactions</Text>
      <View className="border border-gray-400 justify-center items-center p-0.5 rounded-lg">
        <HamburgerIcon />
      </View>
    </View>
  );
};

const TransactionList = () => {
  return (
    <View>
      <CustomTransaction
        avatarComponent={
          <View className="flex-row">
            <View className="rounded-full border-[3px] border-saffron bg-gray-400 justify-center items-center">
              <View className="rounded-full border-[2px] border-white justify-center items-center">
                <Image
                  source={{ uri: 'https://i.pravatar.cc/150?img=36' }}
                  className="w-10 h-10 rounded-full"
                />
              </View>
            </View>
            <View className="rounded-full right-4 border-[3px] border-green-400 bg-gray-400">
              <View className="rounded-full border-[2px] border-white justify-center items-center">
                <Image
                  source={{ uri: 'https://i.pravatar.cc/150?img=35' }}
                  className="w-10 h-10 rounded-full"
                />
              </View>
            </View>
          </View>
        }
        topText="Discount sale"
        bottomText="to @bayuga"
        amount="+800"
        type="positive"
        time="08:30 PM"
      />
      <CustomTransaction
        avatarComponent={
          <View className="rounded-full border-[3px] border-green-500 bg-gray-400 justify-center items-center mr-2">
            <View className="rounded-full border-[2px] border-white justify-center items-center">
              <Image
                source={{ uri: 'https://i.pravatar.cc/150?img=36' }}
                className="w-10 h-10 rounded-full"
              />
            </View>
          </View>
        }
        topText="Cash sale"
        bottomText="to @bayuga"
        amount="-500"
        type="positive"
        time="09:30 PM"
      />
      <TransactionInOut
        type="IN"
        title="Sale"
        value="- 1500 CFA"
        subTitle="Anonymous"
        date="08:45 PM"
        customContainerClass="bg-[#e1e1e1] rounded-xl mb-0 my-1"
        symbol={<Icons.CashInIcon />}
      />
      <TransactionInOut
        type="OUT"
        title="Cash out"
        value="- 1500 CFA"
        subTitle="via mobile money"
        date="09:00 PM"
        customContainerClass="bg-[#e1e1e1] rounded-xl mb-0 my-1"
        symbol={<Icons.CashOutIcon />}
      />
    </View>
  );
};

export const TransactionScreen = () => {
  return (
    <ScrollView className="mt-6" showsVerticalScrollIndicator={false}>
      <Header />
      <View className="px-6">
        <View>
          <Text className="text-lg text-black font-semibold mt-4 mb-3">Today</Text>
          <TransactionList />
        </View>
        <View>
          <Text className="text-lg text-black font-semibold mt-4 mb-3">Yesterday</Text>
          <TransactionList />
        </View>
      </View>
    </ScrollView>
  );
};
