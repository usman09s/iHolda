import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from 'components/Button';
import { WelcomeComments } from 'utils/fixtures';

import UserCommentItem from '../components/UserCommentItem';

const WelcomeScreen = () => {
  const { top } = useSafeAreaInsets();

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
          onPress={() => null}
          customContainer="self-center"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollableContent: { justifyContent: 'center', flex: 1 },
});

export default WelcomeScreen;
