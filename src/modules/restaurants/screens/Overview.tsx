import { Image, ScrollView, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Antdesign from '@expo/vector-icons/AntDesign';

import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import ProfileDescriptionAndStats from '../../profile/components/ProfileDescriptionAndStats';
import ProfilePostItem from '../../profile/components/ProfilePostItem';
import ProfilePostTabs from '../../profile/components/ProfilePostTabs';
import { Text } from 'react-native';
import { text } from 'theme/text';
import { Restaurant } from '../types';
import { getImageLink } from 'modules/moments/helpers/imageHelpers';

interface Props {
  data: Restaurant;
}

const Overview = ({ data }: Props) => (
  <ScrollView style={{ backgroundColor: '#f9f9f9', paddingTop: 20, paddingHorizontal: 10 }}>
    <Text className={text({ type: 'b26', class: 'pb-2' })}>{data.name}</Text>
    <Text className={text({ type: 'r14', class: 'py-2' })} style={{ color: 'grey' }}>
      Customer reviews {'  '}
      {[1, 2, 3, 4, 5].map(item => (
        <Antdesign
          key={item}
          name={data.averageRating < item ? 'staro' : 'star'}
          color={'#ffc859'}
        />
      ))}{' '}
      {data.averageRating}({data.ratingCount}reviews)
    </Text>
    <Text className={text({ type: 'r14', class: 'py-2' })} style={{ color: 'grey' }}>
      Location: <Text style={{ color: '#0684fa' }}>{data.address}</Text>
    </Text>
    <Text className={text({ type: 'r14', class: 'py-2' })} style={{ color: 'grey' }}>
      Cost: <Text style={{ color: '#000' }}>Average</Text>
    </Text>
    {data?.contact ? (
      <Text className={text({ type: 'r14', class: 'py-2' })} style={{ color: 'grey' }}>
        Contact Number: <Text style={{ color: '#000' }}>+1234567890</Text>
      </Text>
    ) : null}
    <View style={{ flexDirection: 'row' }} className="py-2">
      <Text className={text({ type: 'r14' })} style={{ color: 'grey' }}>
        opening times:
      </Text>
      <View>
        <Text>
          {'  '}
          <Text style={{ color: '#02891d', fontWeight: 'bold' }}>Open Now .</Text>
          <Text style={{ color: '#000', fontWeight: 'bold' }}>Closes at {data.opening.to}</Text>
        </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 50 }}>
          <View>
            {data.opening.days.map(day => (
              <Text className={text({ type: 'r14' })} style={{ color: 'black', marginTop: 5 }}>
                {day}
              </Text>
            ))}
          </View>
          <View>
            {data.opening.days.map(day => (
              <Text className={text({ type: 'r14' })} style={{ color: 'black', marginTop: 5 }}>
                <Text className={text({ type: 'r14' })} style={{ color: 'black', marginTop: 5 }}>
                  {data.opening.from} to {data.opening.to}
                </Text>
              </Text>
            ))}
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
      {data.description}
    </Text>

    <Text
      className={text({ type: 'r14', class: 'py-2' })}
      style={{ color: 'grey', fontWeight: 'bold', fontSize: 12 }}>
      Featured images
    </Text>

    {data.photos.length > 1 && (
      <View style={{ height: 300, paddingTop: 10, flexDirection: 'row' }}>
        <Image
          style={{ width: data.photos[1] ? '60%' : '99%', borderRadius: 30 }}
          className="h-full"
          source={{
            uri: getImageLink(data.photos[0]?.mediaId),
          }}
        />

        {data.photos[1] ? (
          <View style={{ flex: 1, width: '40%', paddingLeft: 10, justifyContent: 'space-between' }}>
            <Image
              style={{ width: '100%', borderRadius: 20, height: data.photos[2] ? '49%' : '100%' }}
              source={{
                uri: getImageLink(data.photos[1]?.mediaId),
              }}
            />
            {data.photos[2] ? (
              <Image
                style={{ width: '100%', borderRadius: 20, height: '49%' }}
                source={{
                  uri: getImageLink(data.photos[2]?.mediaId),
                }}
              />
            ) : null}
          </View>
        ) : null}
      </View>
    )}

    <View
      style={{
        flexDirection: 'row',
        gap: 20,
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            backgroundColor: '#3cc03c',
            height: 40,
            // width: 40,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 50,
            flexDirection: 'row',
            gap: 5,
          }}>
          <Ionicons name="call" color={'#FFF'} size={18} />
          <Text style={{ color: 'white' }}>Call</Text>
        </View>
      </View>

      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            backgroundColor: '#0684fa',
            height: 40,
            // width: 40,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 30,
            flexDirection: 'row',
            gap: 5,
          }}>
          <FontAwesome5 name="directions" color={'#FFF'} size={20} />
          <Text style={{ color: 'white' }}>Direction</Text>
        </View>
      </View>
    </View>

    <View style={{ height: 200 }} />
  </ScrollView>
);

export default Overview;
