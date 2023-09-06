import { Pressable, Text, View } from 'react-native';
import { text } from 'theme/text';

type RatioBarProps = {
  cash: number;
  point: number;
  isSelected?: boolean;
  onPressRatio: () => void;
  customContainerClass?: string;
};

const RatioBar = ({
  cash = 0,
  point = 0,
  isSelected,
  onPressRatio,
  customContainerClass,
}: RatioBarProps) => (
  <Pressable className={`flex-row w-full ${customContainerClass}`} onPress={onPressRatio}>
    <View className="basis-5/6 mr-3">
      <View className="flex-row overflow-hidden rounded-full">
        <View
          className="h-10 bg-slate-600  justify-center items-center"
          style={{ width: `${cash * 100}%` }}>
          <Text className={text({ type: 'r18', class: 'text-white' })}>{`${cash * 100}%`}</Text>
        </View>
        <View
          className="h-10 bg-green-500 justify-center items-center"
          style={{ width: `${point * 100}%` }}>
          <Text className={text({ type: 'r18', class: 'text-white' })}>{`${point * 100}%`}</Text>
        </View>
      </View>
    </View>
    <View className="h-9 w-9 bg-white border-4 border-slate-600 rounded-full justify-center items-center">
      {isSelected && <View className="bg-green-500 w-5 h-5 rounded-full" />}
    </View>
  </Pressable>
);

export default RatioBar;
