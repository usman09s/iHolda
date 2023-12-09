import React from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icons from 'components/Icons';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { text } from 'theme/text';
import { getHitSlop } from 'utils/helpers';
import { verticalScale } from '../../utils/helpers';

type Props = {
  title?: string;
  backIconColor?: string;
  showBackIcon?: boolean;
  customTopHeight?: number;
  onPressLeft?: () => void;
  onPressRight?: () => void;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  centerComponent?: React.ReactNode;
  contextMenu?: React.ReactNode | null;
  onPressBackIcon?: () => void;
};

const Header = ({
  title,
  onPressLeft,
  onPressRight,
  showBackIcon,
  onPressBackIcon,
  backIconColor,
  leftComponent,
  rightComponent,
  centerComponent,
  customTopHeight,
}: Props) => {
  const { top } = useSafeAreaInsets();
  const { goBack } = useAppNavigation<{ goBack: () => void }>();

  return (
    <View
      className="flex-row items-center content-center justify-between"
      style={{ marginTop: customTopHeight || top + 8, zIndex: 10 }}>
      <View className="flex-row z-20">
        {showBackIcon && !leftComponent && (
          <TouchableOpacity onPress={onPressBackIcon ?? goBack} hitSlop={getHitSlop({ value: 20 })}>
            <Icons.ArrowLeftIcon color={backIconColor} />
          </TouchableOpacity>
        )}
        {leftComponent && (
          <Pressable hitSlop={getHitSlop({ value: 25 })} onPress={onPressLeft} className="z-20">
            {leftComponent}
          </Pressable>
        )}
      </View>
      <View className="justify-center items-center left-0 right-0 top-2 absolute">
        {title && !centerComponent && <Text className={text({ type: 'm20' })}>{title}</Text>}
      </View>
      {!!centerComponent && centerComponent}
      <View className="flex-row z-20">
        {!!rightComponent && (
          <Pressable onPress={onPressRight} hitSlop={getHitSlop({ value: 20 })}>
            {rightComponent}
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default Header;
