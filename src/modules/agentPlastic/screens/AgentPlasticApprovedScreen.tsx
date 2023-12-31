import { Text, View } from 'react-native';
import {
  NavigationProp,
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Button from 'components/Button';
import Header from 'components/Header/Header';
import Icons from 'components/Icons';
import { text } from 'theme/text';

import { AgentPlasticStackParamList } from '../AgentPlasticNavigator';

const AgentPlasticApprovedScreen = () => {
  const { params } = useRoute<RouteProp<AgentPlasticStackParamList, 'AgentPlasticApproved'>>();
  console.log(params, 'params');
  const { dispatch, goBack, navigate } =
    useNavigation<NavigationProp<AgentPlasticStackParamList>>();

  return (
    <View className="flex-1 bg-white items-center">
      <Header />
      <View className="flex-1 items-center justify-evenly">
        <View className="items-center">
          <Text
            className={text({ type: 'l16', class: 'text-center mb-12' })}
            style={{ marginHorizontal: 25 }}>
            You approved {params.totalPlastic} Plastic drop off for @
            {params.username ? params.username : 'bayuga'}
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
            navigate('Auth');
          }}
        />
      </View>
    </View>
  );
};

export default AgentPlasticApprovedScreen;
