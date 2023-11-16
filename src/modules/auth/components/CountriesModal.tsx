import { memo } from 'react';
import { FlatList, ListRenderItem, Modal, Pressable, Text, View } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { text } from 'theme/text';
import { CountryCodeType } from 'types/AuthTypes';

type Props = {
  visible: boolean;
  onCloseModal: () => void;
  countries: CountryCodeType[];
  onPressCountry: (value: CountryCodeType) => void;
};

const CountriesModal = ({ visible, onCloseModal, countries, onPressCountry }: Props) => {
  const renderItem: ListRenderItem<CountryCodeType> = ({ item }) => (
    <Pressable
      className="flex-row items-center mb-5"
      onPress={() => {
        onPressCountry(item);
        onCloseModal();
      }}>
      <Text className="mr-2 text-36">{item.emoji}</Text>
      <Text className={text({ type: 'r16', class: 'flex-shrink' })}>
        {item.name} ({item.phone})
      </Text>
    </Pressable>
  );
  const keyExtractor = (item: CountryCodeType) => item.phone + item.name;

  return (
    <Modal statusBarTranslucent visible={visible} onRequestClose={onCloseModal} transparent>
      <View className="flex-1 justify-center items-center px-4 overflow-hidden">
        <Animated.View
          entering={SlideInDown}
          className="bg-white my-20 w-full rounded-2xl px-4 overflow-hidden">
          <FlatList
            windowSize={10}
            removeClippedSubviews
            className="pb-4 pt-5"
            data={countries || []}
            initialNumToRender={20}
            maxToRenderPerBatch={20}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

export default memo(CountriesModal);
