import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export const useKeyboardVisible = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setTimeout(() => setKeyboardVisible(true), 0);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setTimeout(() => setKeyboardVisible(false), 0);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return isKeyboardVisible;
};
