import { Image, Text, View } from 'react-native';
import Button from 'components/Button';
import Icons from 'components/Icons';
import { text } from 'theme/text';
import { height } from 'utils/helpers';

import TransactionInOut from '../components/TransactionInOut';

const Wallet = () => (
  <View className="flex-1 bg-white pt-6 px-6" style={{ minHeight: height + 200 }}>
    <View className="border-b1 rounded-xl p-6">
      <Text className={text({ class: 'text-center', type: 'm12' })}>Available balance</Text>
      <Text className={text({ class: 'text-center mt-7', type: 'b44' })}>3650cfa</Text>
      <Button title="Cash Out" type="solid" customContainer="bg-green-600 mt-6" />
    </View>
    <View className="mt-11">
      <Text className={text({ type: 'm10', class: 'text-black-o-50 mb-6' })}>
        Past transactions
      </Text>
      <TransactionInOut
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
      />
    </View>
  </View>
);

export default Wallet;
