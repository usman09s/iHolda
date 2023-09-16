import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import { profileImageSelector } from 'store/auth/userSelectors';

const ProfileAvatar = () => {
  const uri = useSelector(profileImageSelector);

  return uri ? <Image source={{ uri }} className="w-7 h-7 rounded-full" /> : null;
};

export default ProfileAvatar;
