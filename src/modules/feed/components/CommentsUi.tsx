import { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  ViewStyle,
  StyleProp,
} from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import Button from 'components/Button';
import Icons from 'components/Icons';
import { text as themeText } from 'theme/text';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Antdesign from '@expo/vector-icons/AntDesign';
import IonIcons from '@expo/vector-icons/Ionicons';

type Props = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  btn1Txt?: string;
  btn2Txt?: string;
  text: string;
  onPressBtn1?: () => void;
  onPressBtn2?: () => void;
};

interface Message {
  id: number;
  text: string;
  replies?: Message[];
}

const messages: Message[] = [
  {
    id: 1,
    text: 'First message',
    replies: [
      {
        id: 2,
        text: 'Reply to the first message',
      },
      {
        id: 3,
        text: 'Another reply to the first message',
        replies: [
          {
            id: 4,
            text: 'Nested reply to another reply',
          },
          {
            id: 4,
            text: 'Nested reply to another reply',
          },
        ],
      },
      {
        id: 3,
        text: 'Another reply to the first message',
        // replies: [
        //   {
        //     id: 4,
        //     text: 'Nested reply to another reply',
        //   },
        // ],
      },
    ],
  },
  {
    id: 5,
    text: 'Lorem Ipsum reply to another reply with optional message body (optional) and optional message body (optional)',
    replies: [
      {
        id: 6,
        text: 'Reply to the second message',
      },
    ],
  },
  {
    id: 7,
    text: 'Third message',
  },
  {
    id: 8,
    text: 'Third message',
  },
  {
    id: 9,
    text: 'Third message',
  },
];

const dottedLine = (extraStyles: StyleProp<ViewStyle> = {}) => (
  <View
    style={[
      {
        borderWidth: 1,
        borderColor: '#dcdcdc',
        borderStyle: 'dashed',
        flex: 1,
        marginTop: 5,
      },
      extraStyles,
    ]}
  />
);

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
  const tabBarHeight = useBottomTabBarHeight();

  const comment = (item: Message, showHorizontalDottedLine = false) => {
    const isReply = item.replies?.length;
    return (
      <View className="flex-row mb-4 mr-4">
        <View style={{ marginRight: 10, alignItems: 'center' }}>
          {showHorizontalDottedLine
            ? dottedLine({
                position: 'absolute',
                top: 10,
                left: -25,
                width: '70%',
              })
            : null}
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg',
            }}
            resizeMode="cover"
            style={{ width: 30, height: 30, borderRadius: 50 }}
          />

          {isReply ? dottedLine() : null}
        </View>
        <View className="items-start">
          <View className="flex-row items-center">
            <Text className={themeText({ type: 'm16' })}>Esther Howard</Text>
            <Text className={themeText({ type: 'r12' })}> 25 minutes ago</Text>
          </View>
          <Text className={themeText({ type: 'r16' })}>{item.text}</Text>
          <View className="flex-row mt-2 items-center" style={{ marginBottom: isReply ? 15 : 0 }}>
            <IonIcons name="heart" color={'#dd191d'} size={16} />
            <Text className={themeText({ type: 'r14', class: 'font-Bold' })}> 18</Text>
            <Text className={themeText({ type: 'r14' })}>{'  '} Reply</Text>
          </View>

          {isReply ? item.replies?.map(item => comment(item, true)) : null}
        </View>
      </View>
    );
  };

  return (
    <Modal visible={visible} onRequestClose={onClose} transparent>
      <View
        className="flex-1 justify-end items-center px-7"
        style={{ marginBottom: tabBarHeight - 16 }}>
        <Animated.View className="p-4 bg-white mb-2 w-full rounded" entering={SlideInDown}>
          <View
            className="flex-row justify-between w-full mb-6"
            style={{
              borderBottomWidth: 2,
              borderColor: '#f9f9f9',
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

          <ScrollView style={{ maxHeight: 350 }}>
            {messages.map(item => {
              return comment(item);
            })}
          </ScrollView>

          <View className="flex-row mt-5 ">
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg',
              }}
              resizeMode="cover"
              style={{ width: 30, height: 30, borderRadius: 50, marginRight: 10 }}
            />

            <View className="bg-[#f8f8f8] py-1 px-3 rounded-md flex-1 border-[#f0f0f0] border flex-row items-center justify-between">
              <TextInput placeholder="Write a comment" className="flex-1" />
              <IonIcons name="send" color={'#1236f3'} size={19} />
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default Commentsui;
