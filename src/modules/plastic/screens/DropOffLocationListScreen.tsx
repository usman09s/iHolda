import { ActivityIndicator, FlatList, ListRenderItem, Text, View } from 'react-native';
import Header from 'components/Header/Header';
import Input from 'components/Input';
import colors from 'theme/colors';
import { text } from 'theme/text';
import { DropOffLocationItemType } from 'types/PlasticTypes';

import DropOffLocationItem from '../components/DropOffLocationItem';
import LocationClosedPopup from '../components/LocationClosedPopup';
import useDropOffLocationListActions from '../hooks/useDropOffLocationListActions';

const DropOffLocationListScreen = () => {
  const {
    data,
    isLoading,
    searchKeyword,
    locationResult,
    onPressLocation,
    setSearchKeyword,
    showClosedDropOffLocationPopup,
    setShowClosedDropOffLocationPopup,
  } = useDropOffLocationListActions();

  const renderItem: ListRenderItem<DropOffLocationItemType> = ({ item }) => (
    <DropOffLocationItem location={item} onPressLocation={onPressLocation(item)} />
  );

  const emptyListItem = () =>
    !isLoading && searchKeyword ? (
      <View>
        <Text
          className={text({
            type: 'r12',
            class: 'text-center',
          })}>
          There is no location result related search keyword.
        </Text>
      </View>
    ) : null;

  return (
    <View className="bg-milkWhite px-7 flex-1">
      <Header showBackIcon title="Select drop off location" />
      <View className="mb-7 mt-6">
        <Input
          onChangeText={setSearchKeyword}
          placeholder="search town"
          placeholderTextColor={colors['black-o-30']}
          className="border-b1 border-black-o-10 rounded-xl text-black py-4"
        />
      </View>
      {isLoading && <ActivityIndicator className="mb-4" />}
      <FlatList
        renderItem={renderItem}
        keyboardDismissMode="on-drag"
        ListEmptyComponent={emptyListItem}
        showsVerticalScrollIndicator={false}
        data={!!searchKeyword ? locationResult : data || []}
      />
      <LocationClosedPopup
        visible={showClosedDropOffLocationPopup}
        onClose={() => setShowClosedDropOffLocationPopup(false)}
      />
    </View>
  );
};

export default DropOffLocationListScreen;
