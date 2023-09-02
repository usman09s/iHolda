import { Image, ImageSourcePropType, Text, View } from 'react-native';
import Icons from 'components/Icons';
import { text } from 'theme/text';
import { vh } from 'utils/ViewportUnits';

type Props = {
  bgColor: string;
  comment: string;
  username: string;
  image: ImageSourcePropType;
};

const UserCommentItem = ({ bgColor, comment, username, image }: Props) => (
  <View
    className="bg-teaGreen rounded-xl p-4 mb-11 pb-8"
    style={{ backgroundColor: bgColor, minHeight: vh(18) }}>
    <View className="flex-row items-center">
      <Image source={image} className="w-12 h-12 rounded-full" />
      <View className="flex-row ml-2 items-center">
        <Text className={text({ type: 'r15' })} style={{}}>
          {username}
        </Text>
        <Icons.VerifiedBadgeIcon />
      </View>
    </View>
    <Text className={text({ type: 'r15', class: 'mt-4', isCenter: true })}>{comment}</Text>
  </View>
);

export default UserCommentItem;
