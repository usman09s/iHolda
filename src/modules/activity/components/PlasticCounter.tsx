import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function PlasticCounter({ image, count = 20, price = 400, setCount }: any) {
  return (
    <View
      style={{
        borderWidth: 0.7,
        borderColor: 'black',
        backgroundColor: '#f8f8f8',
        paddingVertical: 15,
        paddingLeft: 30,
        borderRadius: 15,
        overflow: 'hidden',
        marginHorizontal: 20,
        height: 180,
        flexDirection: 'row',
        marginBottom: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: '70%',
        }}>
        <View
          style={{
            backgroundColor: '#52c3ff',
            height: '100%',
            width: '30%',
            borderTopStartRadius: 15,
            borderBottomStartRadius: 15,
            justifyContent: 'center',
          }}>
          <Image
            resizeMode="contain"
            source={image}
            style={{
              width: '80%',
              height: '95%',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: '#eff9ff',
            height: '100%',
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            className="flex-initial justify-center items-center"
            style={{
              padding: 10,
              borderColor: 'black',
              borderWidth: 0.5,
              width: 50,
              borderRadius: 15,
              paddingVertical: 15,
            }}>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: '400' }}>{count}</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#52c3ff',
            height: '100%',
            width: '20%',
            borderTopEndRadius: 15,
            borderBottomEndRadius: 15,
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => setCount((prevCount: number) => ++prevCount)}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderColor: '#f8f8f8',
            }}>
            <Text style={{ color: '#1d4459', fontSize: 45 }}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCount((prevCount: number) => (prevCount <= 0 ? 0 : --prevCount))}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderTopWidth: 1,
              borderColor: '#f8f8f8',
            }}>
            <Text style={{ color: '#1d4459', fontSize: 50, letterSpacing: -3 }}>--</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="justify-center items-center flex-1">
        <Text>{price}cfa</Text>
      </View>
    </View>
  );
}
