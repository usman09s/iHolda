import { Text, View } from 'react-native';
import Icons from 'components/Icons';
import { text } from 'theme/text';

type Props = {
  title: string;
  price: string;
  subTitle: string;
};

const PaymentReceivedActivity = ({ title, price, subTitle }: Props) => (
  <View className="flex-row items-center mb-7">
    <View className="flex-row">
      <Icons.PaymentReceivedIcon />
    </View>
    <View className="ml-4 flex-1">
      <Text numberOfLines={2} className={text({ type: 'b15' })} style={{ color: '#606060' }}>
        {title}
      </Text>
      <Text className={text({ type: 'r12', class: 'mt-1.5' })}>
        {subTitle} <Text className={text({ type: 'm12', class: 'text-red-500' })}>30s</Text>
      </Text>
    </View>
    <View>
      <Text className={text({ type: 'b15', class: 'mt-1.5' })} style={{ color: '#5e5f5e' }}>
        {price}
      </Text>
    </View>
  </View>
);

export default PaymentReceivedActivity;
