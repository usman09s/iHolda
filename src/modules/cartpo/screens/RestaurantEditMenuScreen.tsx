import Header from 'components/Header/Header';
import { View, Text, Image, ScrollView } from 'react-native';
import { CustomRestaurantButton } from '../components/CustomRestaurantButton';
import { units } from 'utils/helpers';

export const RestaurantEditMenuScreen = ({ navigation }: any) => {
  const splitIntoRows = (items, itemsPerRow) => {
    const rows = [];
    for (let i = 0; i < items.length; i += itemsPerRow) {
      const rowItems = items.slice(i, i + itemsPerRow);
      rows.push(rowItems);
    }
    return rows;
  };

  // const foodRows = splitIntoRows(foodItems, 3);
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
        <View>
          <Text>No Items in the Menu Currently</Text>
        </View>
        {/* {foodRows.map((row, rowIndex) => (
          <View key={rowIndex} className="flex flex-row justify-between space-x-4 mt-4">
            {row.map((item, index) => (
              <View key={index} className="flex-1">
                <Image
                  source={item.imageSource}
                  style={{ width: units.vw * 26, height: units.vw * 26, borderRadius: 15 }}
                />
                <Text className="text-[10px] text-left font-bold mt-1.5">{item.text}</Text>
              </View>
            ))}
          </View>
        ))} */}
      </View>
    </ScrollView>
  );
};
