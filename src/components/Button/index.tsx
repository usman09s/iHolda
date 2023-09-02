import { ActivityIndicator, Pressable, Text } from 'react-native';
import { button } from 'theme/button';
import colors from 'theme/colors';

type Props = {
  title: string;
  disabled?: boolean;
  isLoading?: boolean;
  onPress?: () => void;
  customContainer?: string;
  customTextClass?: string;
  type?: 'borderedSolid' | 'solid' | 'borderedTransparent' | 'ghost';
};

const Button = ({
  title,
  disabled,
  isLoading,
  type = 'solid',
  customTextClass,
  customContainer,
  onPress = () => null,
}: Props) => (
  <Pressable
    onPress={onPress}
    disabled={disabled}
    className={button({ type, class: customContainer })}>
    {isLoading ? (
      <ActivityIndicator color={colors.white} />
    ) : (
      <Text className={button({ title: type, class: customTextClass })}>{title}</Text>
    )}
  </Pressable>
);

export default Button;
