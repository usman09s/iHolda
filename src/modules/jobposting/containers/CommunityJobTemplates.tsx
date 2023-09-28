import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { text } from 'theme/text';
import { units } from 'utils/helpers';

type Props = {
  navigateJobPostingDetails: () => void;
};
const CommunityJobTemplates = ({ navigateJobPostingDetails }: Props) => (
  <View className="mt-6 flex-1">
    <View className="px-4">
      <Text className={text({ type: 'b18', class: 'text-white' })}>Templates</Text>
      <Text className={text({ type: 'r13', class: 'text-white mt-1' })}>
        Select a community job template below or create a custom job post from scratch by tapping
        the camera above.
      </Text>
    </View>
    <FlatList
      horizontal
      className="mt-4 flex-1"
      data={[1, 2, 3, 4, 5, 6, 7, 8]}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingLeft: 32 }}
      renderItem={({ index }) => (
        <Pressable
          onPress={navigateJobPostingDetails}
          style={{ width: units.vw * 70, height: units.vh * 50 }}
          className="overflow-hidden  mr-5 border-4 rounded-md  border-white">
          <Image
            className="w-full h-full"
            source={{ uri: 'https://i.pravatar.cc/1024?img=' + index }}
          />
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

export default CommunityJobTemplates;
