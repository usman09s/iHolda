import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Fontisto';
// import Modal from 'react-native-modal'
import Header from 'components/Header/Header';
import { Video, ResizeMode } from 'expo-av';
const TestVideo = require('../../../../assets/testVideo.mp4');

const window = Dimensions.get('window');

const TutorialItem = ({ title, onPress, extraClass, extraStyles }) => {
  const containerHeight = window.height * 0.23;

  return (
    <TouchableOpacity
      style={[
        { height: containerHeight, backgroundColor: '#005ac9', position: 'relative' },
        extraStyles,
      ]}
      className={`items-center justify-center bg-blue p-4 rounded-md mt-2 pb-6 ${extraClass}`}
      onPress={onPress}>
      <Ionicons
        name="play"
        size={30}
        color="white"
        style={{
          transform: [{ rotate: '3deg' }],
          position: 'absolute',
          top: '45%',
          left: '50%',
        }}
      />
      <Text className="text-white mt-auto text-center font-semibold">{title}</Text>
    </TouchableOpacity>
  );
};

export const TutorialScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View className="flex-1 px-6">
      <Header
        showBackIcon
        centerComponent={<Text className="text-black text-xl font-semibold mt-2">Tutorials</Text>}
      />
      <View className="mt-4">
        <Text className="mt-2 font-semibold text-base">Recommended</Text>
        <TutorialItem title="How to deposit plastics" onPress={toggleModal} />
        <Text className="mt-8 font-semibold text-base">Plastics</Text>
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
        <View className="flex-row mt-2 w-full">
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
    </View>
  );
};
