import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Modal, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Fontisto';
// import Modal from 'react-native-modal'
import Header from 'components/Header/Header';
import { Video, ResizeMode } from 'expo-av';
import { height } from 'utils/helpers';
import { verticalScale } from '../../../utils/helpers';
const TestVideo = require('../../../../assets/testVideo.mp4');

const window = Dimensions.get('window');
const isSmallScreen = height < 700;
const TutorialItem = ({ title, onPress, extraClass, extraStyles }) => {
  const containerHeight = window.height * 0.23;

  return (
    <TouchableOpacity
      style={[
        {
          height: containerHeight,
          backgroundColor: '#005ac9',
          position: 'relative',
          justifyContent: 'center', // Ensure items are centered vertically
          padding: isSmallScreen ? 10 : 20, // Adjust padding for small screens
        },
        extraStyles,
      ]}
      className={`items-center bg-blue rounded-md mt-2 ${extraClass}`}
      onPress={onPress}>
      <Ionicons
        name="play"
        size={isSmallScreen ? 25 : 30}
        color="white"
        style={{
          alignSelf: 'center',
          marginBottom: verticalScale(25),
        }}
      />
      <Text
        style={{
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: isSmallScreen ? 14 : 16,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export const TutorialScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
      <Header
        showBackIcon
        centerComponent={<Text className="text-black text-xl font-semibold mt-2">Tutorials</Text>}
      />
      <View className="mt-4">
        <Text className="mt-2 font-semibold text-base">Recommended</Text>
        <TutorialItem title="How to deposit plastics" onPress={toggleModal} />
        <Text className={`font-semibold text-base ${isSmallScreen ? 'mt-5' : 'mt-8'}`}>
          Plastics
        </Text>
        <View className="flex-row mt-2 w-full">
          <TutorialItem
            extraClass={'mr-2'}
            extraStyles={{ width: '49%' }}
            title="How to deposit plastics"
            onPress={toggleModal}
          />
          <TutorialItem
            extraStyles={{ width: '49%' }}
            title="How to Cash Out"
            onPress={toggleModal}
          />
        </View>
        <View className={`flex-row w-full ${isSmallScreen ? 'mt-2 mb-6' : 'mt-2'}`}>
          <TutorialItem
            extraClass={'mr-2'}
            extraStyles={{ width: '49%' }}
            title="How to become an agent"
            onPress={toggleModal}
          />
          <TutorialItem
            extraStyles={{ width: '49%' }}
            title="How much does iHolda pay per plastic"
            onPress={toggleModal}
          />
        </View>
      </View>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={toggleModal}
        style={{ backgroundColor: 'black' }}>
        <View style={{ flex: 1 }}>
          <View style={{ alignSelf: 'flex-end' }}>
            <TouchableOpacity
              style={{
                marginHorizontal: 16,
                marginVertical: 16,
              }}
              onPress={toggleModal}>
              <Ionicons name="close-a" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <Video
            source={TestVideo}
            shouldPlay
            rate={1.0}
            volume={1.0}
            isMuted={false}
            isLooping
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            style={{ flex: 1 }}
          />
        </View>
      </Modal>
    </ScrollView>
  );
};
