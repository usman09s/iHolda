import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const StatusBarItem = ({ status, title, onPress }) => {
  return (
    <Pressable
      className="bg-gray-200 justify-between flex-row h-20 items-center px-3.5 my-2 rounded-xl"
      onPress={onPress}>
      <Text>{title}</Text>
      {status === 'completed' ? (
        <Octicons name="check-circle-fill" color="#01d34f" size={24} />
      ) : (
        <AntDesign name="rightcircle" color="#4a4a4a" size={24} />
      )}
    </Pressable>
  );
};

export default StatusBarItem;
