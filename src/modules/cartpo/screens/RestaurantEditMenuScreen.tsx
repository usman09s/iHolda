import Header from 'components/Header/Header';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { CustomRestaurantButton } from '../components/CustomRestaurantButton';
import { units } from 'utils/helpers';
import { selectCartpoSettings, setSelectedMenuItem } from 'store/cartpo/calculateSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getImageLink } from 'modules/moments/helpers/imageHelpers';

export const RestaurantEditMenuScreen = ({ navigation }: any) => {
  const restaurantData = useSelector(selectCartpoSettings);
  const dispatch = useDispatch();
  const splitIntoRows = (items, itemsPerRow) => {
    const rows = [];
    for (let i = 0; i < items.length; i += itemsPerRow) {
      const rowItems = items.slice(i, i + itemsPerRow);
      rows.push(rowItems);
    }
    return rows;
  };

  const foodRows = splitIntoRows(restaurantData.setting.shop.menu, 3);

  const handleMenuItemPress = selectedMenuItem => {
    dispatch(setSelectedMenuItem(selectedMenuItem));
    navigation.navigate('RestaurantAddMenu');
  };

  return (
    <ScrollView>
      <View className="px-6">
        <Header
          showBackIcon
          centerComponent={<Text>Edit Menu</Text>}
          rightComponent={
            <CustomRestaurantButton
              title="+ Add"
              customButtonClass={'w-16 py-1.5'}
              customTextClass={'text-xs'}
              onPress={() => navigation.navigate('RestaurantAddMenu')}
            />
          }
        />
        {restaurantData.setting?.shop?.menu.length === 0 ? (
          <View>
            <Text>No Items in the Menu Currently</Text>
          </View>
        ) : (
          <View className="mt-8">
            <Text>Click on the menu item to edit</Text>
            {foodRows.map((row, rowIndex) => (
              <View key={rowIndex} className="flex flex-row justify-between space-x-4 mt-4">
                {row.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    className="flex-1"
                    onPress={() => handleMenuItemPress(item)}>
                    <Image
                      source={{ uri: item.photos[1] }}
                      style={{ width: units.vw * 26, height: units.vw * 26, borderRadius: 15 }}
                    />
                    <Text className="text-[10px] text-left font-bold mt-1.5">{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};