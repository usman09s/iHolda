import { View } from 'react-native';
import Button from 'components/Button';
import Icons from 'components/Icons';

const SideProfessionBottomAction = () => (
  <View className="py-8 border-t-b1 border-black-o-20 mt-10">
    <View className="flex-row items-center justify-evenly">
      <Button
        title="Share"
        customContainer="px-5 py-2 bg-[#8A8C8E]"
        rightIcon={<Icons.TinyShareIcon color={'white'} className="ml-2" />}
      />
      <Button title="Hire me!" customContainer="px-10 py-2 bg-darkBlue" />
    </View>
  </View>
);

export default SideProfessionBottomAction;
