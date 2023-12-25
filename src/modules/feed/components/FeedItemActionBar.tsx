import { Text, TouchableOpacity, View } from 'react-native';
import Icons from 'components/Icons';
import { text } from 'theme/text';
import { getHitSlop } from 'utils/helpers';
import Feather from '@expo/vector-icons/Entypo';

type FeedItemActionBarProps = {
  hideComment?: boolean;
  onPressLike: () => void;
  onPressShare: () => void;
  onPressComment: () => void;
  onPressBookmark: () => void;
  likes: number;
  comments: number;
  bookmarks: number;
  shares: number;
  liked: boolean;
  bookmarked: boolean;
};

const FeedItemActionBar = ({
  hideComment,
  onPressLike,
  onPressShare,
  onPressComment,
  onPressBookmark,
  likes,
  comments,
  shares,
  bookmarks,
  liked,
  bookmarked
}: FeedItemActionBarProps) => (
  <View
    className={` w-9 absolute right-7 z-30 ${
      !!hideComment ? 'bottom-[132px]' : 'bottom-0'
    } items-center`}>
    <TouchableOpacity className="mb-7" onPress={onPressLike} hitSlop={getHitSlop({})}>
      {liked ? <Feather name='heart' color={'red'} size={30} />: <Icons.HeartIcon />}
      <Text className={text({ type: 'r10', class: 'text-white text-center' })}>{likes}</Text>
    </TouchableOpacity>
    {!hideComment && (
      <TouchableOpacity className="mb-7" onPress={onPressComment} hitSlop={getHitSlop({})}>
        <Icons.CommentIcon />
        <Text className={text({ type: 'r10', class: 'text-white text-center' })}>{comments}</Text>
      </TouchableOpacity>
    )}
    <TouchableOpacity className="mb-7" onPress={onPressShare} hitSlop={getHitSlop({})}>
      <Icons.ShareIcon />
      <Text className={text({ type: 'r10', class: 'text-white text-center' })}>{shares}</Text>
    </TouchableOpacity>
    <TouchableOpacity className="mb-7" onPress={onPressBookmark} hitSlop={getHitSlop({})}>
      <Icons.BookmarkIcon fill={bookmarked?"white": "transparent"} />
      <Text className={text({ type: 'r10', class: 'text-white text-center' })}>{bookmarks}</Text>
    </TouchableOpacity>
  </View>
);

export default FeedItemActionBar;
