import CustomProfileAvatar from 'components/CustomProfileAvatar';
import { getImageLink } from 'modules/moments/helpers/imageHelpers';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/userDataSlice';
import { text } from 'theme/text';

type Props = {
  title: string;
  subTitle: string;
  momentThumbnail: string;
  lastUserUsername: string;
  time?: any;
  onPress?: any;
  user1Photo?: any;
};

const MultipleUsersActivity = ({
  title,
  subTitle,
  momentThumbnail,
  lastUserUsername,
  user1Photo,
  time,
  onPress,
}: Props) => {
  const userData = useSelector(selectUser);
  return (
    <TouchableOpacity className="flex-row items-center mb-7" onPress={onPress}>
      <View className="flex-row">
        <View className="rounded-full border-[3px] border-white bg-gray-400 justify-center items-center">
          <CustomProfileAvatar
            userName={lastUserUsername}
            photo={getImageLink(
              user1Photo ? user1Photo.mediaId : '66183a5b-cbf1-48a1-a240-7a9cf25d3400',
            )}
            size={30}
          />
        </View>
        <View className="rounded-full  right-7 border-[3px] border-white bg-gray-400 top-2.5 ">
          <CustomProfileAvatar
            userName={userData.userName}
            photo={getImageLink(userData.photo?.mediaId)}
            size={30}
          />
        </View>
      </View>
      <View className="flex-1 right-4">
        <Text numberOfLines={2} className={text({ type: 'b15' })} style={{ color: '#606060' }}>
          {title}
        </Text>
        <Text className={text({ type: 'r12', class: 'mt-1.5 mr-1.5' })}>
          {subTitle} @<Text className={text({ type: 'b12' })}>{lastUserUsername} ?</Text>
          <Text className={text({ type: 'm12', class: 'text-red-500' })}>
            {' '}
            {time ? time : '30s'}
          </Text>
        </Text>
      </View>
      {momentThumbnail && (
        <View>
          <Image source={{ uri: momentThumbnail }} className="w-10 h-10 rounded-md" />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default MultipleUsersActivity;
