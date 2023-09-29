import { Text, TouchableOpacity, View } from 'react-native';
import Icons from 'components/Icons';
import { text } from 'theme/text';
import { getHitSlop } from 'utils/helpers';

type FeedItemActionBarProps = {
  hideComment?: boolean;
  onPressLike: () => void;
  onPressShare: () => void;
  onPressComment: () => void;
  onPressBookmark: () => void;
};

const FeedItemActionBar = ({
  hideComment,
  onPressLike,
  onPressShare,
  onPressComment,
  onPressBookmark,
}: FeedItemActionBarProps) => (
  <View
    className={` w-9 absolute right-7 z-30 ${
      !!hideComment ? 'bottom-[132px]' : 'bottom-16'
    } items-center`}>
    <TouchableOpacity className="mb-7" onPress={onPressLike} hitSlop={getHitSlop({})}>
      <Icons.ShareIcon />
    </TouchableOpacity>
    <TouchableOpacity className="mb-7" onPress={onPressShare} hitSlop={getHitSlop({})}>
      <Icons.HeartIcon />
      <Text className={text({ type: 'r10', class: 'text-white text-center' })}>10</Text>
    </TouchableOpacity>
    {!hideComment && (
      <TouchableOpacity className="mb-7" onPress={onPressComment} hitSlop={getHitSlop({})}>
        <Icons.CommentIcon />
        <Text className={text({ type: 'r10', class: 'text-white text-center' })}>100</Text>
      </TouchableOpacity>
    )}
    <TouchableOpacity className="mb-7" onPress={onPressBookmark} hitSlop={getHitSlop({})}>
      <Icons.BookmarkIcon />
    </TouchableOpacity>
  </View>
);

export default FeedItemActionBar;
