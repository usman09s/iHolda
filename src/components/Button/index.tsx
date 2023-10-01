import { ActivityIndicator, Pressable, Text } from 'react-native';
import { button } from 'theme/button';
import colors from 'theme/colors';

type Props = {
  title: string;
  hitSlop?: object;
  disabled?: boolean;
  isLoading?: boolean;
  onPress?: () => void;
  customContainer?: string;
  customTextClass?: string;
  rightIcon?: React.ReactNode;
  type?: 'borderedSolid' | 'solid' | 'borderedTransparent' | 'ghost';
};

const Button = ({
  title,
  hitSlop,
  disabled,
  rightIcon,
  isLoading,
  type = 'solid',
  customTextClass,
  customContainer,
  onPress = () => null,
}: Props) => (
  <Pressable
    onPress={onPress}
    hitSlop={hitSlop}
    disabled={disabled}
    className={button({ type, class: `${customContainer} flex-row`, disabled })}>
    {isLoading ? (
      <ActivityIndicator color={colors.white} />
    ) : (
      <Text className={button({ title: type, class: customTextClass })}>{title}</Text>
    )}
    {rightIcon && rightIcon}
  </Pressable>
);

export default Button;
