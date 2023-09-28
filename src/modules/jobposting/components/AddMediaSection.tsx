import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { text } from 'theme/text';
import { width } from 'utils/helpers';

const AddMediaSection = () => (
  <View className="px-4 mt-8">
    <View className="flex-row mb-6 items-center">
      <Text className={text({ type: 'r15' })}>Add more photos or videos</Text>
      <Text className={text({ type: 'r10', class: 'text-red-600 bottom-0 ml-1' })}>
        {'(Optional)'}
      </Text>
    </View>
    <View className="flex-row justify-between">
      <View style={styles.wh} className="overflow-hidden rounded-lg">
        <Image source={{ uri: 'https://i.pravatar.cc/1024?img=22' }} className="h-full w-full" />
      </View>
      <View style={styles.wh} className="overflow-hidden rounded-lg">
        <Image source={{ uri: 'https://i.pravatar.cc/1024?img=22' }} className="h-full w-full" />
      </View>
      <Pressable
        style={[styles.wh, styles.dashedContainer]}
        className="overflow-hidden justify-center items-center">
        <Text className={text({ type: 'r32', class: 'text-gray-300' })}>+</Text>
      </Pressable>
      <Pressable
        style={[styles.wh, styles.dashedContainer]}
        className="overflow-hidden justify-center items-center">
        <Text className={text({ type: 'r32', class: 'text-gray-300' })}>+</Text>
      </Pressable>
    </View>
  </View>
);

const styles = StyleSheet.create({
  wh: {
    width: (width - 48) / 4,
    height: (width - 48) / 4,
  },
  dashedContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderColor: '#C4C4C4',
  },
});

export default AddMediaSection;
