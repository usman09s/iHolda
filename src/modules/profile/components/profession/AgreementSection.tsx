import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icons from 'components/Icons';
import { text } from 'theme/text';

const AgreementSection = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View className="px-8 bg-white mt-6 pt-2" style={{ paddingBottom: bottom }}>
      <View>
        <View className="w-5 h-5 rounded-md bg-blue absolute overflow-hidden items-center justify-center">
          <Icons.TinyTickIcon />
        </View>
        <Text className={text({ type: 'r14', class: 'leading-[22px]' })}>
          {'          '}By ticking this box, you agree to the terms and conditions surrounding quick
          jobs. This is a quick job and you would be required to arrive at the job location and
          start on the time specified and any delay on your part could lead to a reduction of your
          potential pay a CP.
        </Text>
      </View>
    </View>
  );
};

export default AgreementSection;
