import { Dimensions, Image, ScrollView, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Antdesign from '@expo/vector-icons/AntDesign';

import ProfileDescriptionAndStats from '../../profile/components/ProfileDescriptionAndStats';
import ProfilePostItem from '../../profile/components/ProfilePostItem';
import ProfilePostTabs from '../../profile/components/ProfilePostTabs';
import { Text } from 'react-native';
import { text } from 'theme/text';

interface Props {}

const Menu = ({}: Props) => (
  <ScrollView style={{ backgroundColor: '#fff', paddingTop: 20, paddingHorizontal: 10 }}>
    {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
      <View
        key={i}
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
          //           borderWidth: 1
        }}>
        <Image
          style={{ height: '100%', width: 130, borderRadius: 15 }}
          resizeMode="cover"
          source={{
            uri: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D',
          }}
        />

        <View style={{ paddingLeft: 10, flex: 1 }}>
          <Text className={text({ type: 'm18', class: 'pb-2 pt-3' })}>
            Stewed Beef curry with spinach
          </Text>
          <Text className={text({ type: 'r15', class: 'pb-2' })} style={{ color: '#c4c4c4' }}>
            <Antdesign size={16} name="star" color={'#ffc859'} />
            <Antdesign size={16} name="star" color={'#ffc859'} />
            <Antdesign size={16} name="star" color={'#ffc859'} />
            <Antdesign size={16} name="star" color={'#ffc859'} />
            <Antdesign size={16} name="star" color={'#c4c4c4'} /> 12
          </Text>

          <Text className="pb-4">$50</Text>
        </View>
      </View>
    ))}
  </ScrollView>
);

export default Menu;
