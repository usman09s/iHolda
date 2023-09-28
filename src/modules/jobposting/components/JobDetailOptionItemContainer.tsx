import { Pressable, Text } from 'react-native';
import { text } from 'theme/text';
import { width } from 'utils/helpers';

type Props = {
  title?: string;
  isBig?: boolean;
  itemCount?: number;
  isSelected?: boolean;
  onPressItem?: () => void;
  customTextClass?: string;
  customComponent?: React.ReactNode;
};

const JobDetailOptionItemContainer = ({
  title,
  isBig,
  itemCount = 4,
  isSelected,
  customTextClass,
  customComponent,
  onPressItem,
}: Props) => {
  const horizontalSpace = 48;
  const totalItemSpacing = 16;
  const itemWidth = (width - horizontalSpace - totalItemSpacing) / itemCount;
  const bigItemWidth = itemWidth * 2 + totalItemSpacing / (itemCount - 1);
  const height = ((width - horizontalSpace - totalItemSpacing) / 4) * 0.6;

  return (
    <Pressable
      onPress={() => onPressItem && onPressItem()}
      className={`bg-${
        isSelected ? 'black' : 'gray-200'
      } justify-center items-center rounded-xl mb-2 overflow-hidden`}
      style={{
        width: !isNaN(itemWidth) ? (isBig ? bigItemWidth : itemWidth) : 0,
        height: !isNaN(itemWidth) ? height : 0,
      }}>
      {title && (
        <Text
          className={text({
            type: 'r15',
            class: isSelected ? 'text-white ' + customTextClass : 'text-black ' + customTextClass,
          })}>
          {title}
        </Text>
      )}
      {customComponent && customComponent}
    </Pressable>
  );
};

export default JobDetailOptionItemContainer;
