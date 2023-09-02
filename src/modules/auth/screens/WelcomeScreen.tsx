import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp } from '@react-navigation/native';
import Button from 'components/Button';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { WelcomeComments } from 'utils/fixtures';

import { AuthStackParamList } from '../AuthStackNavigator';
import UserCommentItem from '../components/UserCommentItem';

const WelcomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const { navigate } = useAppNavigation<NavigationProp<AuthStackParamList>>();

  return (
    <View className="flex-1 justify-center">
      <ScrollView
        className="bg-blue px-10"
        style={{ paddingTop: top }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollableContent}>
        {WelcomeComments.map(item => (
          <UserCommentItem {...item} key={item.comment} />
        ))}
        <Button
          title="Start"
          type="borderedSolid"
          customContainer="self-center"
          onPress={() => navigate('SignUp')}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollableContent: { justifyContent: 'center', flex: 1 },
});

export default WelcomeScreen;
