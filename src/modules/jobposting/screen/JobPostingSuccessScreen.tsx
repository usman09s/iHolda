import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, StackActions, useNavigation } from '@react-navigation/native';
import Button from 'components/Button';
import Header from 'components/Header/Header';
import { text } from 'theme/text';

import { JobPostingStackParamList } from '../JobPostingStackNavigator';

const JobPostingSuccessScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const { dispatch } = useNavigation<NavigationProp<JobPostingStackParamList>>();

  return (
    <View className="bg-white flex-1">
      <View
        className="px-4 mb-2 self-center flex-1 justify-between"
        style={{ paddingBottom: bottom || 16 }}>
        <Header showBackIcon />
        <Text className="text-[150px] text-center">🥳</Text>
        <View>
          <Text className={text({ type: 'm16', class: 'text-[52px] text-center' })}>
            You’re all set!
          </Text>
          <Text className={text({ type: 'r16', class: 'text-center' })}>
            We’re handling your job right now.
          </Text>
        </View>
        <View>
          <Button
            title="Close"
            onPress={() => {
              dispatch(StackActions.popToTop());
              dispatch(StackActions.popToTop());
            }}
          />
          <Button title="View job" type="ghost" customContainer="mt-4" />
        </View>
      </View>
    </View>
  );
};

export default JobPostingSuccessScreen;
