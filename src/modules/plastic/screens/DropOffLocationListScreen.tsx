import { ActivityIndicator, FlatList, ListRenderItem, Text, View } from 'react-native';
import Header from 'components/Header/Header';
import Input from 'components/Input';
import colors from 'theme/colors';
import { text } from 'theme/text';
import { DropOffLocationItemType } from 'types/PlasticTypes';

import DropOffLocationItem from '../components/DropOffLocationItem';
import LocationClosedPopup from '../components/LocationClosedPopup';
import useDropOffLocationListActions from '../hooks/useDropOffLocationListActions';
import { height } from 'utils/helpers';

const DropOffLocationListScreen = () => {
  const isSmallScreen = height < 700;
  console.log(height);
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
    console.log("🚀 ~ file: DropOffLocationListScreen.tsx:26 ~ DropOffLocationListScreen ~ data:", data)

  const filteredData = Array.isArray(data)
    ? data.filter(item => item.name.includes(searchKeyword))
    : [];

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
      <Header
        showBackIcon
        centerComponent={
          <Text
            className={`mt-2 ${isSmallScreen ? 'text-16 font-semibold' : 'text-20 font-semibold'}`}>
            Select drop off location
          </Text>
        }
      />
      <View className="mb-7 mt-6">
        <Input
          onChangeText={setSearchKeyword}
          placeholder="search town"
          placeholderTextColor={colors['black-o-30']}
          className="rounded-xl text-black py-4"
          style={{ marginHorizontal: 30, borderColor: 'gray', borderWidth: 1 }}
        />
      </View>
      {isLoading || (!data && <ActivityIndicator className="mb-4 flex-1" color={colors.blue} />)}
      <FlatList
        renderItem={renderItem}
        keyboardDismissMode="on-drag"
        ListEmptyComponent={emptyListItem}
        showsVerticalScrollIndicator={false}
        data={!!searchKeyword ? filteredData : data || []}
      />
      <LocationClosedPopup
        visible={showClosedDropOffLocationPopup}
        onClose={() => setShowClosedDropOffLocationPopup(false)}
      />
    </View>
  );
};

export default DropOffLocationListScreen;
