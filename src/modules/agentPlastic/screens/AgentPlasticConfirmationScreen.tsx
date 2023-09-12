import { ScrollView, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Button from 'components/Button';
import Header from 'components/Header/Header';

import { AgentPlasticStackParamList } from '../AgentPlasticNavigator';
import AgentPlasticItem from '../components/AgentPlasticItem';
import TotalResultBar from '../components/TotalResultBar';

const AgentPlasticConfirmationScreen = () => {
  const { navigate } = useNavigation<NavigationProp<AgentPlasticStackParamList>>();

  return (
    <View className="px-7 bg-white flex-1">
      <Header title="Bayuga" showBackIcon />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingVertical: 32 }}
        className="flex-1"
        showsVerticalScrollIndicator={false}>
        <AgentPlasticItem
          image="https://holda-spaces.fra1.digitaloceanspaces.com/media/plastic/sizes/-1/1lt_png.png"
          count={10}
          onPressDecrease={() => null}
          onPressIncrease={() => null}
        />
        <AgentPlasticItem
          image="https://holda-spaces.fra1.digitaloceanspaces.com/media/plastic/sizes/-1/1lt_png.png"
          count={10}
          onPressDecrease={() => null}
          onPressIncrease={() => null}
        />
        <TotalResultBar totalPlastic={100} totalPrice={100} />
      </ScrollView>
      <Button
        title="Confirm"
        onPress={() => navigate('AgentPlasticApproved')}
        customContainer="bg-saffron rounded-xl my-2 self-center px-12"
      />
    </View>
  );
};

export default AgentPlasticConfirmationScreen;
