import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { text } from 'theme/text';
import { units, width } from 'utils/helpers';

type Props = {
  navigateJobPostingDetails: () => void;
};

const PrivateJobTemplates = ({ navigateJobPostingDetails }: Props) => (
  <View className="mt-10 flex-1 px-4">
    <Text className={text({ type: 'b18', class: 'text-white' })}>Templates</Text>
    <Text className={text({ type: 'r12', class: 'text-white mt-1' })}>
      Select a job template below or create a job post from scratch by tapping the camera above
    </Text>
    <FlatList
      numColumns={3}
      className="mt-4 flex-1"
      data={[1, 2, 3, 4, 5, 6, 7, 8]}
      showsVerticalScrollIndicator={false}
      renderItem={({}) => (
        <Pressable
          onPress={navigateJobPostingDetails}
          style={{ width: (width - 48) / 3, height: units.vh * 24 }}
          className="overflow-hidden  mr-2 mb-4 border-2 rounded-md  border-white">
          <Image source={{ uri: 'https://i.pravatar.cc/150?img=13' }} className="w-full h-full" />
          <Text
            style={{ bottom: units.vh * 2 }}
            className={text({
              type: 'b20',
              class: 'text-white absolute text-center bottom-0 self-center',
            })}>
            House Cleaner
          </Text>
        </Pressable>
      )}
    />
  </View>
);

export default PrivateJobTemplates;
