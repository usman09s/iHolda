import { Image, Text, View } from 'react-native';
import Button from 'components/Button';
import Icons from 'components/Icons';
import { text } from 'theme/text';
import { height } from 'utils/helpers';

import TransactionInOut from '../components/TransactionInOut';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useQuery } from 'react-query';
import Api from 'services/Api';
import { useEffect } from 'react';

const Wallet = () => {
  const navigation: any = useNavigation();
  const { data, refetch, isLoading } = useQuery('walletBalance', Api.getWalletBalance, {
    refetchOnWindowFocus: true,
  });
  const { data: transactions, refetch: refetchTransactions } = useQuery(
    'walletTransactions',
    Api.getTransactions,
    {
      refetchOnWindowFocus: true,
    },
  );

  const isFocused = useIsFocused();

  const formatDate = (inputDateString: string) => {
    const inputDate = new Date(inputDateString);

    const options: Intl.DateTimeFormatOptions | undefined = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };

    const formattedDateString = new Intl.DateTimeFormat('en-US', options).format(inputDate);

    return formattedDateString;
  };

  useEffect(() => {
    if (isFocused) {
      refetch();
      refetchTransactions();
    }
  }, [isFocused]);

  // const wallet = data.data.data?.wallet;
  // console.log('🚀 ~ file: Wallet.tsx:17 ~ Wal ~ wallet:', data?.data?.wallet);
  // plastic/balance
  return (
    <View className="flex-1 bg-white pt-6 px-6" style={{ minHeight: height + 200 }}>
      <View className="border-b1 rounded-xl p-6">
        <Text className={text({ class: 'text-center', type: 'm12' })}>Available balance</Text>
        <Text className={text({ class: 'text-center mt-7', type: 'b44' })}>
          {data?.data?.wallet?.availableBalance?.toFixed(2) ?? 0}cfa
        </Text>
        <Button
          title="Cash Out"
          type="solid"
          customContainer="bg-green-600 mt-6"
          onPress={() =>
            !isLoading && navigation.navigate('WalletStack', { wallet: data?.data?.wallet })
          }
        />
      </View>
      <View className="mt-11">
        <Text className={text({ type: 'm10', class: 'text-black-o-50 mb-6' })}>
          Past transactions
        </Text>
        {transactions?.data?.transactionData?.map((item: any) => (
          <TransactionInOut
            key={item.createdAt}
            type="OUT"
            title="Cash out"
            value={`- ${item.amount} CFA`}
            subTitle="Mobile money"
            date={formatDate(item.createdAt)}
            symbol={<Icons.CashOutIcon />}
          />
        ))}
        {/* <TransactionInOut
          type="OUT"
          title="Cash out"
          value="- 1500 CFA"
          subTitle="Mobile money"
          date="12/12/2022 07:30 PM"
          symbol={<Icons.CashOutIcon />}
        />
        <TransactionInOut
          type="IN"
          title="Cash in"
          value="- 1500 CFA"
          subTitle="Mobile money"
          date="12/12/2022 07:30 PM"
          symbol={<Icons.CashInIcon />}
        />
        <TransactionInOut
          type="IN"
          title="Cash in"
          value="+ 500"
          subTitle="Mobile money"
          date="12/12/2022 07:30 PM"
          symbol={
            <View>
              <Image
                resizeMode="cover"
                className="h-10 w-10 rounded-full"
                source={{ uri: 'https://i.pravatar.cc/300?img=39' }}
              />
            </View>
          }
        /> */}
      </View>
    </View>
  );
};

export default Wallet;
