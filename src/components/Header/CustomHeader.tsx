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
  extraTitleStyles?: any;
};

const CustomHeader = ({
  title,
  onPressRight,
  showBackIcon,
  backIconColor,
  rightComponent,
  centerComponent,
  customTopHeight,
  extraTitleStyles,
}: Props) => {
  const { top } = useSafeAreaInsets();
  const { goBack } = useAppNavigation<{ goBack: () => void }>();

  return (
    <View
      className="flex-row items-center content-center justify-between self-center"
      style={{ marginTop: customTopHeight || top + 8, zIndex: 10 }}>
      <View className="w-1/3">
        {showBackIcon && (
          <TouchableOpacity onPress={goBack} hitSlop={getHitSlop({ value: 20 })}>
            <Icons.ArrowLeftIcon color={backIconColor} />
          </TouchableOpacity>
        )}
      </View>
      <View className="w-1/3 items-center">
        {title && !centerComponent && (
          <Text style={[{ fontSize: 14, textAlign: 'center' }, extraTitleStyles]}>{title}</Text>
        )}
        {!!centerComponent && centerComponent}
      </View>
      <View className="w-1/3">
        {!!rightComponent && (
          <Pressable onPress={onPressRight} hitSlop={getHitSlop({ value: 20 })}>
            {rightComponent}
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default CustomHeader;
