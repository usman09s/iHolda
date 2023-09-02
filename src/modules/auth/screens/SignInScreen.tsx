import { Text, View } from 'react-native';
import Button from 'components/Button';
import { text } from 'theme/text';

const SignInScreen = () => (
  <View className="flex-1 bg-blue justify-center px-7">
    <View className="mb-20">
      <Text className={text({ type: 'b44', class: 'text-white' })}>Enter your pin</Text>
    </View>
    <Button title="Login" onPress={() => null} type="solid" />
    <Button
      type="ghost"
      title="forgot pin?"
      onPress={() => null}
      customContainer="mt-12"
      customTextClass={text({ type: 'r20', class: 'text-white' })}
    />
  </View>
);

export default SignInScreen;
