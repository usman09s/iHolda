import { Text, View } from 'react-native';
import { text } from 'theme/text';

type Props = {
  date: string;
  value: string;
  title: string;
  subTitle: string;
  type: 'IN' | 'OUT';
  symbol: React.ReactNode;
  customContainerClass?: any;
};

const capitalizeLastTwoChars = (str: string): string => {
  if (str.length < 2) {
    return str.toUpperCase();
  }

  const firstPart = str.slice(0, -2);
  const lastTwoChars = str.slice(-2).toUpperCase();

  return `${firstPart}${lastTwoChars}`;
};

const TransactionInOut = ({
  type,
  date,
  title,
  value,
  symbol,
  subTitle,
  customContainerClass,
}: Props) => (
  <View
    className={`flex-row items-center justify-between bg-lightCultured px-4 py-3 rounded-md mb-4 ${customContainerClass}`}>
    <View className="flex-row items-center">
      {symbol && symbol}
      <View className="ml-2">
        <Text className={text({ type: 'm13', class: 'text-black-o-80 mb-2' })}>{title}</Text>
        <Text className={text({ type: 'm10', class: 'text-baseLight20' })}>{subTitle}</Text>
      </View>
    </View>
    <View>
      <Text
        className={text({
          type: 'b13',
          class: `text-right ${type === 'IN' ? 'text-green-600' : 'text-red-500'}`,
        })}>
        {value}
      </Text>
      <Text className={text({ type: 'r13', class: 'text-right text-black-o-50' })}>
        {capitalizeLastTwoChars(date)}
      </Text>
    </View>
  </View>
);

export default TransactionInOut;
