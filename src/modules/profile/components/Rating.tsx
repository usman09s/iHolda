import { Text, View } from 'react-native';
import Icons from 'components/Icons';
import { text } from 'theme/text';
import { getStars } from 'utils/helpers';

const Rating = ({ point, customTextType }: { point: number; customTextType?: string }) => {
  const { starCount, halfStarCount } = getStars(point);

  return (
    <View className="flex-row items-center justify-center">
      {starCount.map((_, index) => (
        <Icons.StarIcon key={`${index}-star`} />
      ))}
      {halfStarCount.map((_, index) => (
        <Icons.HalfStarIcon key={`${index}-halfStarIcon`} />
      ))}
      <Text className={text({ type: customTextType || 'r10', class: 'text-black-o-50 ml-1.5' })}>
        {point}
      </Text>
    </View>
  );
};

export default Rating;
