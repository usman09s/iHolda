import { Text, View } from 'react-native';
import { NavigationProp, StackActions, useNavigation } from '@react-navigation/native';
import Button from 'components/Button';
import Header from 'components/Header/Header';
import Icons from 'components/Icons';
import { text } from 'theme/text';

import { AgentPlasticStackParamList } from '../AgentPlasticNavigator';

const AgentPlasticApprovedScreen = () => {
  const { dispatch, goBack } = useNavigation<NavigationProp<AgentPlasticStackParamList>>();

  return (
    <View className="flex-1 bg-white items-center">
      <Header />
      <View className="flex-1 items-center justify-evenly">
        <View className="items-center">
          <Text className={text({ type: 'l16', class: 'text-center mb-12' })}>
            You approved 60 Plastic drop off for @andy
          </Text>
          <Icons.ApprovedCircleIcon />
          <Text className={text({ type: 'b34', class: 'text-center text-green-500 mt-12' })}>
            Approved
          </Text>
        </View>
        <Button
          customContainer="self-center px-10 rounded-lg bg-saffron"
          title="Close"
          onPress={() => {
            dispatch(StackActions.popToTop());
            goBack();
          }}
        />
      </View>
    </View>
  );
};

export default AgentPlasticApprovedScreen;
