import React, { useEffect, useState } from 'react';
import { FlatList, Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Antdesign from '@expo/vector-icons/AntDesign';

import { text } from 'theme/text';
import { useFocusEffect } from '@react-navigation/native';
import Api from 'services/Api';
import { Review } from '../types';
import VideoPlayer from 'expo-video-player';
import { getImageLink, getVideoLink } from 'modules/moments/helpers/imageHelpers';
import { ResizeMode } from 'expo-av';

type ReviewType = 'all' | 'service' | 'food' | 'hygiene';

export default function Reviews({ id = '' }) {
  const [reviewType, setReviewType] = useState<ReviewType>('all');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [recentReviews, setRecentReviews] = useState<Review[]>([]);

  const reviewsTypes: ReviewType[] = ['all', 'service', 'food', 'hygiene'];

  const getRecentReviews = (reviews: Review[]) => {
    // Get the current date
    const currentDate = new Date();

    // Calculate the date one week ago
    const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000); // Subtracting milliseconds for a week

    // Filter reviews that are one week old or newer
    const recentReviews = reviews.filter(review => {
      const reviewDate = new Date(review.createdAt);
      return reviewDate >= oneWeekAgo;
    });

    return recentReviews;
  };

  const getRatings = async () => {
    try {
      const response = await fetch(
        Api.baseUrl + `rating/cartpo-shop/${id}?category=${reviewType}`,
        {
          method: 'GET',
        },
      );
      if (response.status !== 200) return;

      const { data: res } = await response.json();
      setReviews(res.data);
      setRecentReviews(getRecentReviews(res.data));
    } catch (error) {
      console.log('🚀 ~ getRatings ~ error:', error);
    }
  };

  // useEffect(() => {
  //   getRatings();
  // },[]);

  useEffect(() => {
    getRatings();
  }, [reviewType]);

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
                  class: `text-center ${reviewType !== c ? 'text-black' : 'text-white'} capitalize`,
                })}>
                {c}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {recentReviews.length ? (
        <Text className={text({ type: 'r15', class: 'pl-1 pt-5' })}>Recent</Text>
      ) : null}

      <FlatList
        data={recentReviews}
        horizontal
        keyExtractor={e => e._id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: c, index }) => (
          <View className="h-[200] w-[150] rounded-md overflow-hidden justify-center items-center mt-2 mr-3">
            {c.post.media[0].mediaType.includes('video') ? (
              <VideoPlayer
                videoProps={{
                  shouldPlay: false,
                  resizeMode: ResizeMode.COVER,
                  source: {
                    uri: getVideoLink(c.post.media[0].mediaId),
                  },
                  className: 'h-full w-full absolute',
                }}
              />
            ) : (
              <Image
                source={{
                  uri: getImageLink(c.post.media[0].mediaId),
                }}
                resizeMode="cover"
                className="h-full w-full absolute "
              />
            )}

            <View className="flex-row absolute bottom-2 justify-center gap-1">
              {[1, 2, 3, 4, 5].map(item => (
                <Antdesign
                  key={item}
                  name={'star'}
                  color={c.star < item ? '#c4c4c4' : '#ffc859'}
                  size={15}
                />
              ))}
              {/*  */}
              {/* <Antdesign name="star" color={'#ffc859'} size={15} />
              <Antdesign name="star" color={'#ffc859'} size={15} />
              <Antdesign name="star" color={'#ffc859'} size={15} />
              <Antdesign name="star" color={'#ffc859'} size={15} />
              <Antdesign name="star" color={'#ffc859'} size={15} /> */}
            </View>
          </View>
        )}
      />

      {reviews.length ? (
        <Text className={text({ type: 'r15', class: 'pl-1 pt-5' })}>More</Text>
      ) : null}

      <FlatList
        data={reviews}
        keyExtractor={e => e._id}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        renderItem={({ item: c, index }) => (
          <View className="h-[280] flex-1 rounded overflow-hidden justify-center items-center mt-2 mr-3">
            {c.post.media[0].mediaType.includes('video') ? (
              <VideoPlayer
                videoProps={{
                  shouldPlay: false,
                  resizeMode: ResizeMode.COVER,
                  source: {
                    uri: getVideoLink(c.post.media[0].mediaId),
                  },
                  className: 'h-full w-full absolute',
                }}
              />
            ) : (
              <Image
                source={{
                  uri: getImageLink(c.post.media[0].mediaId),
                }}
                resizeMode="cover"
                className="h-full w-full absolute "
              />
            )}

            <View className="flex-row absolute bottom-2 justify-center gap-1">
              {[1, 2, 3, 4, 5].map(item => (
                <Antdesign
                  key={item}
                  name={'star'}
                  color={c.star < item ? '#c4c4c4' : '#ffc859'}
                  size={15}
                />
              ))}
              {/* <Antdesign name="star" color={'#ffc859'} size={15} />
              <Antdesign name="star" color={'#ffc859'} size={15} />
              <Antdesign name="star" color={'#ffc859'} size={15} />
              <Antdesign name="star" color={'#ffc859'} size={15} />
              <Antdesign name="star" color={'#ffc859'} size={15} /> */}
            </View>
          </View>
        )}
      />
    </View>
  );
}
