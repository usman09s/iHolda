import { TouchableOpacity, Text } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  customContainerClass?: any;
  customTextClass?: any;
  extraStyles?: any;
}

export const CustomReferenceButton = ({
  title,
  onPress,
  customContainerClass,
  customTextClass,
  extraStyles,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`bg-transparent px-12 py-2 items-center justify-center mt-4 border-sky-600 border-8 rounded-full ${customContainerClass}`}
      style={extraStyles}>
      <Text className={`text-black text-center text-lg font-medium ${customTextClass}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
