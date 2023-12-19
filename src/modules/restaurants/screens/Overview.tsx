import { Image, Modal, ScrollView, TouchableOpacity, View } from 'react-native';
import Antdesign from '@expo/vector-icons/AntDesign';

import { Text } from 'react-native';
import { text } from 'theme/text';
import { Restaurant } from '../types';
import { getImageLink } from 'modules/moments/helpers/imageHelpers';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

interface Props {
  data: Restaurant;
}

const Overview = ({ data }: Props) => {
  const [discountNoticeVisible, setDiscountNoticeVisible] = useState(false);
  const { navigate }: any = useNavigation();
  const discountNotice = () => (
    <Modal visible={discountNoticeVisible} transparent>
      <View className="flex-1 justify-center items-center bg-black-o-50 ">
        <Animated.View
          style={{ maxWidth: 320 }}
          className="bg-white py-2 px-3 pt-10 rounded-2xl"
          entering={SlideInDown}>
          <View>
            <Text className={text({ type: 'm20', class: 'text-center' })} style={{ color: '#000' }}>
              Discount Notice
            </Text>
            <Text className={text({ type: 'r18', class: 'text-center text-black mt-2' })}>
              This restaurant requires a minimum of 2 people to apply discount.
            </Text>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                marginBottom: 20,
                marginTop: 40,
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity
                onPress={() => setDiscountNoticeVisible(false)}
                className="bg-white border-2 rounded-md py-2 px-3">
                <Text className={text({ type: 'r16', class: 'text-black uppercase font-[700]' })}>
                  close
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => (
                  setDiscountNoticeVisible(false),
                  navigate('DiscountUserSelect', {
                    restaurantId: data._id,
                    qrCode: data.qrCode,
                    restaurantData: data,
                  })
                )}
                className="bg-black rounded-md py-2 px-3">
                <Text className={text({ type: 'r16', class: 'text-white uppercase' })}>
                  continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
  return (
    <ScrollView style={{ backgroundColor: '#f9f9f9', paddingTop: 20, paddingHorizontal: 10 }}>
      {discountNotice()}
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
        {Math.floor(data.averageRating)}({data.ratingCount}reviews)
      </Text>
      <Text className={text({ type: 'r14', class: 'py-2' })} style={{ color: 'grey' }}>
        Location: <Text style={{ color: '#0684fa' }}>{data.address}</Text>
      </Text>
      <Text className={text({ type: 'r14', class: 'py-2' })} style={{ color: 'grey' }}>
        Cost: <Text style={{ color: '#000' }}>Average</Text>
      </Text>
      {data?.phone ? (
        <Text className={text({ type: 'r14', class: 'py-2' })} style={{ color: 'grey' }}>
          Contact Number: <Text style={{ color: '#000' }}>+{data?.phone}</Text>
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

      {data.photos.length > 1 && (
        <Text
          className={text({ type: 'r14', class: 'py-2' })}
          style={{ color: 'grey', fontWeight: 'bold', fontSize: 12 }}>
          Featured images
        </Text>
      )}

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
            <View
              style={{ flex: 1, width: '40%', paddingLeft: 10, justifyContent: 'space-between' }}>
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
        <TouchableOpacity
          onPress={() => setDiscountNoticeVisible(true)}
          style={{
            backgroundColor: '#000',
            height: 45,
            // width: 40,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 50,
            flexDirection: 'row',
            gap: 5,
            elevation: 2,
          }}>
          <Text style={{ color: 'white' }}>Get discount code</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 200 }} />
    </ScrollView>
  );
};

export default Overview;
