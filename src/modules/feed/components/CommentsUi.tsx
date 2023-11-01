import { useEffect, useState } from 'react';
import { Modal, Pressable, Text, View, Image } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import Button from 'components/Button';
import Icons from 'components/Icons';
import { text as themeText } from 'theme/text';

type Props = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  btn1Txt?: string;
  btn2Txt?: string;
  text: string;
  onPressBtn1?: () => void;
  onPressBtn2?: () => void;
};

const Commentsui = ({
  visible,
  setVisible,
  btn1Txt = 'back',
  btn2Txt = 'Accept',
  text,
  onPressBtn1,
  onPressBtn2,
}: Props) => {
  const onClose = () => setVisible(false);
  return (
    <Modal visible={visible} onRequestClose={onClose} transparent>
      <View className="flex-1 justify-end items-center px-7">
        <Animated.View
          className="p-4 bg-white mb-2 rounded-xl w-full"
          entering={SlideInDown}>
          <View
            className="flex-row justify-between w-full"
            style={{
              borderBottomWidth: 0.5,
              borderColor: 'grey',
              paddingBottom: 10,
              paddingHorizontal: 5,
            }}>
            <View className="flex-row gap-1">
              <Image
                source={{
                  uri: 'https://wordynerdbird.files.wordpress.com/2019/06/facebook-circle-heart-love-png-4.png',
                }}
                resizeMode="contain"
                style={{ width: 20, height: 20 }}
              />
              <Text>788</Text>
            </View>
            <View className="flex-row gap-1">
              <Text>43 comments</Text>
            </View>
          </View>


          <View className='mt-2'>
            <View>
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg',
                }}
                resizeMode='cover'
                style={{ width: 30, height: 30, borderRadius: 50}}
              />
              {/* <Image
                source={{
                  uri: 'https://img.freepik.com/premium-vector/vector-illustration-heart-symbol-red-color-isolated-white-background_842925-86.jpg',
                }}
                resizeMode='contain'
                style={{ width: 50, height: 50}}
              /> */}
            </View>
            <View>
                    
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default Commentsui;
