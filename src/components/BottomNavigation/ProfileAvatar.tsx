import { getImageLink } from 'modules/moments/helpers/imageHelpers';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import { profileImageSelector } from 'store/auth/userSelectors';

const ProfileAvatar = () => {
  const user = useSelector(profileImageSelector);
  const uri = user?.photo.mediaId;

  return user ? <Image source={{ uri: getImageLink(uri) }} className="w-7 h-7 rounded-full" /> : null;
};

export default ProfileAvatar;
