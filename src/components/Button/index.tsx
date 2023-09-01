import { Pressable, Text } from 'react-native';
import { button } from 'theme/button';

type Props = {
  title: string;
  onPress?: () => void;
  customContainer?: string;
  type?: 'borderedSolid' | 'solid' | 'borderedTransparent' | 'ghost';
};

const Button = ({ type = 'solid', title, onPress = () => null, customContainer }: Props) => (
  <Pressable onPress={onPress} className={button({ type, class: customContainer })}>
    <Text className={button({ title: type })}>{title}</Text>
  </Pressable>
);

export default Button;
