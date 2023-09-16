import { View } from 'react-native';

const FeedItemIndex = ({ activeIndex, indexCount }: { activeIndex: number; indexCount: number }) =>
  new Array(indexCount)
    .fill('')
    .map((_, index) => (
      <View
        key={`${index}-feed-item-index`}
        className={`h-[${index === activeIndex ? '3px' : '0.5px'}] ml-1.5 w-[10px] bg-${
          index === activeIndex ? 'saffron' : 'white'
        }`}
      />
    ));

export default FeedItemIndex;
