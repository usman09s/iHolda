import { Image, ScrollView, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Antdesign from '@expo/vector-icons/AntDesign';

import ProfileDescriptionAndStats from '../../profile/components/ProfileDescriptionAndStats';
import ProfilePostItem from '../../profile/components/ProfilePostItem';
import ProfilePostTabs from '../../profile/components/ProfilePostTabs';
import { Text } from 'react-native';
import { text } from 'theme/text';

interface Props {
  followers: string;
  impression: string;
  metPeople: string;
}

const Overview = ({ followers = '100k', impression = '190k', metPeople = '19 people' }: Props) => (
  <ScrollView style={{ backgroundColor: '#f9f9f9', paddingTop: 20, paddingHorizontal: 10 }}>
    <Text className={text({ type: 'b26', class: 'pb-2' })}>Teras Ibunya anga</Text>
    <Text className={text({ type: 'r14', class: 'py-2' })} style={{ color: 'grey' }}>
      Customer reviews {'  '}
      <Antdesign name="star" color={'#ffc859'} />
      <Antdesign name="star" color={'#ffc859'} />
      <Antdesign name="star" color={'#ffc859'} />
      <Antdesign name="star" color={'#ffc859'} />
      <Antdesign name="star" color={'#ffc859'} /> 4.5(24reviews)
    </Text>
    <Text className={text({ type: 'r14', class: 'py-2' })} style={{ color: 'grey' }}>
      Location: <Text style={{ color: '#0684fa' }}>SWT 3TY, London, UnitedKingdome</Text>
    </Text>
    <Text className={text({ type: 'r14', class: 'py-2' })} style={{ color: 'grey' }}>
      Cost: <Text style={{ color: '#000' }}>Average</Text>
    </Text>
    <Text className={text({ type: 'r14', class: 'py-2' })} style={{ color: 'grey' }}>
      Contact Number: <Text style={{ color: '#000' }}>+1234567890</Text>
    </Text>
    <View style={{ flexDirection: 'row' }} className="py-2">
      <Text className={text({ type: 'r14' })} style={{ color: 'grey' }}>
        opening imes:
      </Text>
      <View>
        <Text>
          {'  '}
          <Text style={{ color: '#02891d', fontWeight: 'bold' }}>Open Now .</Text>
          <Text style={{ color: '#000', fontWeight: 'bold' }}>Closes at 8pm</Text>
        </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 50 }}>
          <View>
            <Text className={text({ type: 'r14' })} style={{ color: 'black', marginTop: 5 }}>
              Tuesday
            </Text>
            <Text className={text({ type: 'r14' })} style={{ color: 'black', marginTop: 5 }}>
              Wednesday
            </Text>
            <Text className={text({ type: 'r14' })} style={{ color: 'black', marginTop: 5 }}>
              Thursday
            </Text>
            <Text className={text({ type: 'r14' })} style={{ color: 'black', marginTop: 5 }}>
              Friday
            </Text>
            <Text className={text({ type: 'r14' })} style={{ color: 'black', marginTop: 5 }}>
              Saturday
            </Text>
            <Text className={text({ type: 'r14' })} style={{ color: 'black', marginTop: 5 }}>
              Sunday
            </Text>
          </View>
          <View>
            <Text className={text({ type: 'r14' })} style={{ color: 'black', marginTop: 5 }}>
              08am to 8pm
            </Text>
            <Text className={text({ type: 'r14' })} style={{ color: 'black', marginTop: 5 }}>
              08am to 8pm
            </Text>
            <Text className={text({ type: 'r14' })} style={{ color: 'black', marginTop: 5 }}>
              08am to 8pm
            </Text>
            <Text className={text({ type: 'r14' })} style={{ color: 'black', marginTop: 5 }}>
              08am to 8pm
            </Text>
            <Text className={text({ type: 'r14' })} style={{ color: 'black', marginTop: 5 }}>
              08am to 8pm
            </Text>
            <Text className={text({ type: 'r14' })} style={{ color: 'black', marginTop: 5 }}>
              08am to 8pm
            </Text>
          </View>
        </View>
      </View>
    </View>

    <Text
      className={text({ type: 'r14', class: 'py-2' })}
      style={{ color: '#000', fontWeight: 'bold' }}>
      Restaurant Overview
    </Text>

    <Text className={text({ type: 'r14' })} style={{ color: '#000' }}>
      I'm a product manager with 2 years experience actively seeking full-time management rolesl In
      the meeantime, I'm offering quick job services as side hustles, available to assist with
      various tasks.AW
    </Text>

    <Text
      className={text({ type: 'r14', class: 'py-2' })}
      style={{ color: 'grey', fontWeight: 'bold', fontSize: 12 }}>
      Featured images
    </Text>

    <View style={{ height: 300, paddingTop: 10, flexDirection: 'row' }}>
      <Image
        style={{ width: '60%', borderRadius: 30 }}
        className="h-full"
        source={{
          uri: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D',
        }}
      />

      <View style={{ flex: 1, width: '40%', paddingLeft: 10 }}>
        <Image
          style={{ width: '100%', borderRadius: 30, height: '50%' }}
          source={{
            uri: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D',
          }}
        />
        <Image
          style={{ width: '100%', borderRadius: 30, height: '50%' }}
          source={{
            uri: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D',
          }}
        />
      </View>
    </View>

    <View style={{ height: 200 }} />
  </ScrollView>
);

export default Overview;
