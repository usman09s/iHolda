import { Text, View } from 'react-native';
import Button from 'components/Button';
import Header from 'components/Header/Header';
import Icons from 'components/Icons';
import { text } from 'theme/text';
import { usePlasticConfirmationActions } from '../hooks/usePlasticConfirmationActions';

const PlasticDeliveredDetailsScreen = () => {
  const { totalPlastic, selectedRatio, totalPrice } = usePlasticConfirmationActions();

  const getCfa = () => {
    const cfa = totalPrice - totalPrice * (1 - selectedRatio?.cash);
    return cfa.toString();
  };

  const getPoints = () => {
    const points = selectedRatio?.point * 100;
    return points.toString();
  };

  return (
    <View className="bg-milkWhite px-7 flex-1">
      <Header />
      <Text className={text({ type: 'r15', class: 'text-center' })}>
        {totalPlastic} successfully delivered
      </Text>
      <View className="w-15 h-15 rounded-full bg-green-500 self-center p-6 mt-20">
        <Icons.TickIcon />
      </View>
      <Button title={getCfa()} customContainer="bg-slate-800 mt-12" />
      <Text className={text({ type: 'b26', class: 'text-center my-4' })}>&</Text>
      <Button title={getPoints()} customContainer="bg-green-600" />
      <Text className={text({ type: 'l16', class: 'text-center mt-12' })}>
        will be credited into your accounts
      </Text>
    </View>
  );
};

export default PlasticDeliveredDetailsScreen;
