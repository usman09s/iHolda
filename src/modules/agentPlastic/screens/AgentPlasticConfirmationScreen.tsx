import { ActivityIndicator, FlatList, View } from 'react-native';
import Button from 'components/Button';
import ErrorModal from 'components/ErrorModal';
import Header from 'components/Header/Header';
import colors from 'theme/colors';

import AgentPlasticItem from '../components/AgentPlasticItem';
import TotalResultBar from '../components/TotalResultBar';
import { useAgentPlasticConfirmationActions } from '../hooks/useAgentPlasticConfirmationActions';

const AgentPlasticConfirmationScreen = () => {
  const {
    username,
    plastics,
    isLoading,
    errorMessage,
    buttonLoading,
    onPressConfirm,
    onPressDecrease,
    onPressIncrease,
    addedPlasticTotalPrice,
    agentPlasticCountTotal,
  } = useAgentPlasticConfirmationActions();

  return (
    <View className="px-7 bg-white flex-1">
      <Header title={username} showBackIcon />
      {isLoading && <ActivityIndicator color={colors.saffron} size={'large'} className="mt-4" />}
      <FlatList
        contentContainerStyle={{ flexGrow: 1, paddingVertical: 32 }}
        className="flex-1"
        showsVerticalScrollIndicator={false}
        data={[...plastics] || []}
        renderItem={({ item }) => (
          <View className="flex-grow">
            <AgentPlasticItem
              image={item.image}
              count={item.quantity}
              totalPrice={item.price}
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
