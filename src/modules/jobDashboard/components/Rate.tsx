import { useState } from 'react';
import { Pressable, View } from 'react-native';
import Icons from 'components/Icons';

const Rate = ({ value = 0 }: { value: number }) => {
  const [rating, setRating] = useState(value);

  const onPressStar = (index: number) => () => setRating(index);

  const renderStar = (index: number) => (
    <Pressable onPress={onPressStar(index)} key={index}>
      <Icons.RatingStarIcon
        className="mr-2.5"
        color={index === rating || index < rating ? undefined : 'transparent'}
      />
    </Pressable>
  );

  return (
    <View className="flex-row">
      {new Array(5).fill('').map((_, index) => renderStar(index + 1))}
    </View>
  );
};

export default Rate;
