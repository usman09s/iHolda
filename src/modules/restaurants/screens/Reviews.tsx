import React, { useState } from 'react';
import { FlatList, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Antdesign from '@expo/vector-icons/AntDesign';

import { text } from 'theme/text';

export default function Reviews() {
  const [reviewType, setReviewType] = useState<string>('All');

  const reviewsTypes = ['All', 'Service', 'Food', 'Hygiene'];

  return (
    <View className="px-2">
      <Text className={text({ type: 'b18', class: 'pl-1 pt-5' })}>Sort reviews by</Text>

      <View className="flex-row mt-4 pl-1">
        <FlatList
          data={reviewsTypes}
          horizontal
          keyExtractor={e => e}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: c, index }) => (
            <TouchableOpacity
              onPress={() => setReviewType(c)}
              className={'flex-grow-0 py-2.5 px-8 rounded-2xl mr-6 mb-1'}
              style={{
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,

                elevation: 3,

                backgroundColor: reviewType === c ? '#0584fa' : '#f2f2f2',
              }}>
              <Text
                className={text({
                  type: 'm16',
                  class: `text-center ${reviewType !== c ? 'text-black' : 'text-white'}`,
                })}>
                {c}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <Text className={text({ type: 'r15', class: 'pl-1 pt-5' })}>Recent</Text>

      <FlatList
        data={[1, 2, 3]}
        horizontal
        keyExtractor={e => e.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: c, index }) => (
          <ImageBackground
            source={{
              uri: 'https://www.influglue.com/files/medialibrary/6c905cabc7a6fd3760b0408bd53fbc19.jpg',
            }}
            resizeMode="cover"
            className="h-[200] w-[150] rounded-md overflow-hidden justify-center items-center mt-2 mr-3">
            <Entypo name="controller-play" color={'#fff'} size={40} />

            <View className="flex-row absolute bottom-2 justify-center gap-1">
              <Antdesign name="star" color={'#ffc859'} size={15} />
              <Antdesign name="star" color={'#ffc859'} size={15} />
              <Antdesign name="star" color={'#ffc859'} size={15} />
              <Antdesign name="star" color={'#ffc859'} size={15} />
              <Antdesign name="star" color={'#ffc859'} size={15} />
            </View>
          </ImageBackground>
        )}
      />

      <Text className={text({ type: 'r15', class: 'pl-1 pt-5' })}>More</Text>

      <FlatList
        data={[1, 2, 3, 4]}
        keyExtractor={e => e.toString()}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        renderItem={({ item: c, index }) => (
          <ImageBackground
            source={{
              uri: 'https://www.influglue.com/files/medialibrary/6c905cabc7a6fd3760b0408bd53fbc19.jpg',
            }}
            resizeMode="cover"
            className="h-[280] flex-1 rounded overflow-hidden justify-center items-center mt-2 mr-3">
            <Entypo name="controller-play" color={'#fff'} size={40} />

            <View className="flex-row absolute bottom-2 justify-center gap-1">
              <Antdesign name="star" color={'#ffc859'} size={15} />
              <Antdesign name="star" color={'#ffc859'} size={15} />
              <Antdesign name="star" color={'#ffc859'} size={15} />
              <Antdesign name="star" color={'#ffc859'} size={15} />
              <Antdesign name="star" color={'#ffc859'} size={15} />
            </View>
          </ImageBackground>
        )}
      />
    </View>
  );
}
