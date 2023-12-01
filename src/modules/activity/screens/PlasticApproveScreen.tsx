import Header from 'components/Header/Header';
import Icons from 'components/Icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

export default function PlasticApproveScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: "center", gap: 0, paddingVertical: 50 }}>
      <Header title="" />
      <Text style={{ fontSize: 16, textAlign: 'center' }}>
        You approved Plastic drop off{'\n'} to @andy
      </Text>

      <View
        style={{
          width: 200,
          height: 200,
          borderWidth: 2,
          borderColor: '#52c3ff',
          borderRadius: 150,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50
        }}>
        <Feather name="check" size={100} color="#52c3ff" />
      </View>
      <Text style={{ fontSize: 25, textAlign: 'center', color: '#31bf4f', fontWeight: '700', flex: 1, marginTop: 80 }}>
        Approved
      </Text>

      <TouchableOpacity
        style={{
          width: '30%',
          backgroundColor: '#ff9133',
          paddingVertical: 10,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: "center"
        }}>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>Close</Text>
      </TouchableOpacity>
    </View>
  );
}
