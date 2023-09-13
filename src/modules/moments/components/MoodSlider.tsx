import { memo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Slider } from '@miblanchard/react-native-slider';
import colors from 'theme/colors';

const MoodSlider = ({ onChangeMood }: { onChangeMood: (value: string) => void }) => {
  const emotions = ['🥹', '😔', '😐', '😄', '😍'];
  const [value, setValue] = useState(0);
  const sliderValue = useSharedValue(0);

  const mood = useAnimatedStyle(() => ({
    fontSize: withTiming(sliderValue.value === 0 ? 70 : 30),
  }));

  const mood1 = useAnimatedStyle(() => ({
    fontSize: withTiming(sliderValue.value === 1 ? 70 : 30),
  }));

  const mood2 = useAnimatedStyle(() => ({
    fontSize: withTiming(sliderValue.value === 2 ? 70 : 30),
  }));

  const mood3 = useAnimatedStyle(() => ({
    fontSize: withTiming(sliderValue.value === 3 ? 70 : 30),
  }));

  const mood4 = useAnimatedStyle(() => ({
    fontSize: withTiming(sliderValue.value === 4 ? 70 : 30),
  }));

  const moods = [mood, mood1, mood2, mood3, mood4];

  return (
    <>
      <View className="flex-row justify-between h-18 items-center">
        {emotions.map((emotion, index) => (
          <View key={emotion} className="h-24 items-center justify-center">
            <Animated.Text style={moods[index]}>{emotion}</Animated.Text>
          </View>
        ))}
      </View>
      <Slider
        step={1}
        value={value}
        minimumValue={0}
        maximumValue={4}
        thumbStyle={styles.thumbStyle}
        trackStyle={styles.trackStyle}
        onValueChange={arrayValue => {
          sliderValue.value = arrayValue[0];
          setValue(arrayValue[0]);
          onChangeMood(emotions[Number(arrayValue[0])]);
        }}
        minimumTrackTintColor={colors.yellowishOrange}
        maximumTrackTintColor="#000000"
      />
    </>
  );
};

const styles = StyleSheet.create({
  thumbStyle: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#C4C4C4',
  },
  trackStyle: {
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});

export default memo(MoodSlider);
