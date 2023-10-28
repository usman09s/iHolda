import { ActivityIndicator, FlatList, View } from 'react-native';
import Button from 'components/Button';
import ErrorModal from 'components/ErrorModal';
import Header from 'components/Header/Header';
import colors from 'theme/colors';

import AgentPlasticItem from '../components/AgentPlasticItem';
import TotalResultBar from '../components/TotalResultBar';
import { useAgentPlasticConfirmationActions } from '../hooks/useAgentPlasticConfirmationActions';
import { agentPlasticSizeSelector } from 'store/agentPlastic/agentSelectors';
import { useSelector } from 'react-redux';
const Bottle = require('../../../../assets/images/bottleLabel.png');
const DefaultImage = require('../../../../assets/images/bottle.png');
const BiggerBottle = require('../../../../assets/images/biggerBottle.png');
const BiggestBottle = require('../../../../assets/images/biggestBottle.png');

const AgentPlasticConfirmationScreen = () => {
  const agentPlasticSizes = useSelector(agentPlasticSizeSelector);
  console.log(agentPlasticSizes);
  const {
    username,
    plastics,
    // isLoading,
    errorMessage,
    buttonLoading,
    onPressConfirm,
    onPressDecrease,
    onPressIncrease,
    addedPlasticTotalPrice,
    agentPlasticCountTotal,
  } = useAgentPlasticConfirmationActions();

  const getImageForSize = size => {
    if (size === '1L') {
      return Bottle;
    } else if (size === '1.5L') {
      return BiggerBottle;
    } else if (size === '5L') {
      return BiggestBottle;
    } else {
      return DefaultImage;
    }
  };

  return (
    <View className="px-7 bg-white flex-1">
      <Header title={username ? username : 'bayuga'} showBackIcon />
      {/* {isLoading && <ActivityIndicator color={colors.saffron} size={'large'} className="mt-4" />} */}
      <FlatList
        contentContainerStyle={{ flexGrow: 1, paddingVertical: 32 }}
        className="flex-1"
        showsVerticalScrollIndicator={false}
        data={agentPlasticSizes || []}
        renderItem={({ item }) => (
          <View className="flex-grow">
            <AgentPlasticItem
              image={getImageForSize(item.size)}
              count={item.quantity}
              totalPrice={item.perUnitPrice}
              onPressDecrease={() => onPressDecrease(item.size)}
              onPressIncrease={() => onPressIncrease(item.size)}
            />
          </View>
        )}
        ListFooterComponent={() => (
          <TotalResultBar
            totalPrice={addedPlasticTotalPrice}
            totalPlastic={agentPlasticCountTotal}
          />
        )}
      />
      <Button
        title="Confirm"
        onPress={onPressConfirm}
        disabled={buttonLoading}
        isLoading={buttonLoading}
        customContainer="bg-saffron rounded-xl my-4 self-center px-12"
      />
      <ErrorModal errorText={errorMessage} />
    </View>
  );
};

export default AgentPlasticConfirmationScreen;
