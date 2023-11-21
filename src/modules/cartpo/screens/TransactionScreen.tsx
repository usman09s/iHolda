import { View, Text, Image, ScrollView } from 'react-native';
import { CustomTransaction } from '../components/CustomTransaction';
import Icon from 'react-native-vector-icons/Entypo';
import { HamburgerIcon } from '../../../../assets/referralGift';

const transactionsData = [
  {
    avatarComponent: (
      <View className="flex-row">
        <View className="rounded-full border-[3px] border-saffron bg-gray-400 justify-center items-center">
          <View className="rounded-full border-[2px] border-white justify-center items-center">
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=36' }}
              className="w-10 h-10 rounded-full"
            />
          </View>
        </View>
        <View className="rounded-full  right-4 border-[3px] border-green-400  bg-gray-400">
          <View className="rounded-full border-[2px] border-white justify-center items-center">
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=35' }}
              className="w-10 h-10 rounded-full"
            />
          </View>
        </View>
      </View>
    ),
    topText: 'Discount sale',
    bottomText: 'to @bayuga',
    amount: '+800',
    type: 'positive',
    time: '08:30 PM',
  },
  {
    avatarComponent: (
      <View className="rounded-full border-[3px] border-saffron bg-gray-400 justify-center items-center mr-3">
        <View className="rounded-full border-[2px] border-white justify-center items-center">
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=36' }}
            className="w-10 h-10 rounded-full"
          />
        </View>
      </View>
    ),
    topText: 'Cash sale',
    bottomText: 'to @bayuga',
    amount: '-500',
    type: 'positive',
    time: '09:30 PM',
  },
  {
    avatarComponent: (
      <View className="self-center p-2 rounded-xl mr-2" style={{ backgroundColor: '#b2ffd7' }}>
        <Icon name="wallet" size={25} color={'green'} />
      </View>
    ),
    topText: 'Sale',
    bottomText: 'Anonymous',
    amount: '+5000',
    type: 'positive',
    time: '08:45 PM',
  },
  {
    avatarComponent: (
      <View className="self-center p-2 rounded-xl mr-2" style={{ backgroundColor: '#fac4cc' }}>
        <Icon name="wallet" size={25} color={'red'} />
      </View>
    ),
    topText: 'Cash out',
    bottomText: 'via mobile money',
    amount: '-1800',
    type: 'negative',
    time: '09:00 PM',
  },
];

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

export const TransactionScreen = () => {
  return (
    <ScrollView className="mt-6" showsVerticalScrollIndicator={false}>
      <Header />
      <View className="px-6">
        <View>
          <Text className="text-lg text-black font-semibold mt-4 mb-3">Today</Text>
          {transactionsData.map((transaction, index) => (
            <View key={index}>
              <CustomTransaction {...transaction} />
            </View>
          ))}
        </View>
        <View>
          <Text className="text-lg text-black font-semibold mt-4 mb-3">Yesterday</Text>
          {transactionsData.map((transaction, index) => (
            <View key={index}>
              <CustomTransaction {...transaction} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};
