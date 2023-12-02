import { View } from 'react-native';

const FeedItemIndex = ({ activeIndex, indexCount }: { activeIndex: number; indexCount: number }) =>
  new Array(indexCount)
    .fill('')
    .map((_, index) => (
      <View
        key={`${index}-feed-item-index`}
        className={`ml-1.5 w-[10px]`}
        style={{ backgroundColor: index === activeIndex ? '#f9ae2b' : 'white', height: index === activeIndex ? 3:1 }}
      />
    ));

export default FeedItemIndex;
