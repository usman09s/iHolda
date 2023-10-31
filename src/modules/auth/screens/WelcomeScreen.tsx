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
        className="bg-blue px-10 py-2"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollableContent}>
        <View style={{ paddingVertical: 40, flex: 1, marginTop: 50 }}>
          {WelcomeComments.map(item => (
            <UserCommentItem {...item} key={item.comment} />
          ))}
          <View style={{ height: 25 }} />
          <Button
            title="Start"
            type="borderedSolid"
            customContainer="self-center"
            onPress={() => navigate('SignUp')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollableContent: { justifyContent: 'center' },
});

export default WelcomeScreen;
