import { Image, ScrollView, View } from 'react-native';
import Antdesign from '@expo/vector-icons/AntDesign';

import { Text } from 'react-native';
import { text } from 'theme/text';
import { useQuery } from 'react-query';
import Api from 'services/Api';
import { getImageLink } from 'modules/moments/helpers/imageHelpers';

interface Props {id: string}

const Menu = ({id}: Props) => {
  const { data } = useQuery('restaurantMenu', () => Api.getRestaurantMenu(id));
  console.log("🚀 ~ file: Menu.tsx:13 ~ Menu ~ data:", data?.data?.cartpoMenus)
  return (
    <ScrollView style={{ backgroundColor: '#fff', paddingTop: 20, paddingHorizontal: 10 }}>
      {data?.data?.cartpoMenus.map((item: any, i: number) => (
        <View
          key={item._id}
          style={{
            flexDirection: 'row',
            padding: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,

            elevation: 2,
            borderRadius: 15,
            margin: 5,
            backgroundColor: 'white',
            minHeight: 140
            //           borderWidth: 1
          }}>
          <Image
            style={{ height: '100%', width: 130, borderRadius: 15 }}
            resizeMode="cover"
            source={{
              uri: getImageLink(item?.photos[0]?.mediaId),
            }}
          />

          <View style={{ paddingLeft: 10, flex: 1 }}>
            <Text className={text({ type: 'm18', class: 'pb-2 pt-3' })}>
              {item?.name}
            </Text>
            <Text className={text({ type: 'r15', class: 'pb-2' })} style={{ color: '#c4c4c4' }}>
              <Antdesign size={16} name="star" color={'#ffc859'} />
              <Antdesign size={16} name="star" color={'#ffc859'} />
              <Antdesign size={16} name="star" color={'#ffc859'} />
              <Antdesign size={16} name="star" color={'#ffc859'} />
              <Antdesign size={16} name="star" color={'#c4c4c4'} /> 12
            </Text>

            <Text className="pb-4">${item?.price}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Menu;
