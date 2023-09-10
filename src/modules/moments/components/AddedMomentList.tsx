import { FlatList, Image, ListRenderItem, Pressable, StyleSheet, Text, View } from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { setSelectedMoment } from 'store/moments/momentsSlice';
import { text } from 'theme/text';
import { MomentType } from 'types/MomentsTypes';

type Props = {
  listHeight: number;
  moments: MomentType[];
  selectedMoment?: MomentType;
};

const AddedMomentList = ({ moments, selectedMoment, listHeight }: Props) => {
  const dispatch = useAppDispatch();

  const renderItem: ListRenderItem<MomentType> = ({ item, index }) => (
    <Pressable
      onPress={() => dispatch(setSelectedMoment(item))}
      className={`justify-center items-center w-12 h-12 overflow-hidden border-${
        selectedMoment?.id === item.id ? '4' : 'b1'
      } border-white rounded-lg mb-2`}>
      {item.type === 'PHOTO' && (
        <Image
          resizeMode="cover"
          className="w-12 h-12"
          source={{ uri: item.localUri || item.base64 }}
        />
      )}
      {item.type === 'VIDEO' && (
        <Video
          className="w-12 h-12"
          resizeMode={ResizeMode.COVER}
          source={{ uri: item.localUri }}
        />
      )}
      <View className="absolute h-full w-full justify-center items-center bg-black-o-10">
        <Text className={text({ type: 'm2o', class: 'text-white' })}>{index + 1}</Text>
      </View>
    </Pressable>
  );

  return (
    <View className="absolute pl-4 justify-center items-center" style={{ height: listHeight }}>
      <View className="h-[280px] justify-end items-end">
        <FlatList
          className="flex-1"
          data={moments || []}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
});

export default AddedMomentList;
