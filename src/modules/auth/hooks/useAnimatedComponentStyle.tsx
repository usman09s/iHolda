import { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useKeyboardVisible } from 'hooks/useKeyboardVisible';

export const useAnimatedComponentStyle = ({
  customSize = 100,
  spacingHeight = 80,
  customSizeNewValue = 0,
  customComponentProperty = 'height',
}: {
  customSize?: number;
  spacingHeight?: number;
  customSizeNewValue?: number;
  customComponentProperty?: 'height' | 'fontSize';
}) => {
  const spacingShared = useSharedValue(spacingHeight);
  const customSizeShared = useSharedValue(customSize);

  const isVisibleKeyboard = useKeyboardVisible();

  useEffect(() => {
    if (isVisibleKeyboard) {
      spacingShared.value = spacingHeight;
      customSizeShared.value = customSizeNewValue ? customSizeNewValue : customSize / 2;
    } else {
      customSizeShared.value = customSize;
      spacingShared.value = spacingHeight;
    }
  }, [isVisibleKeyboard]);

  const spacingAnimatedStyle = useAnimatedStyle(() => ({
    height: withTiming(spacingShared.value),
  }));

  const customSizeAnimatedStyle = useAnimatedStyle(() => {
    if (customComponentProperty === 'height') {
      return {
        height: withTiming(customSizeShared.value, { duration: 100 }),
        width: withTiming(customSizeShared.value, { duration: 100 }),
      };
    }

    return {
      [customComponentProperty]: withTiming(customSizeShared.value, { duration: 100 }),
    };
  });

  const Spacing = () => <Animated.View style={spacingAnimatedStyle} />;

  return {
    Spacing,
    customSizeAnimatedStyle,
  };
};
