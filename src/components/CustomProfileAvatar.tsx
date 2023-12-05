import { View } from 'react-native';
import { Userpic } from 'react-native-userpic';

const CustomProfileAvatar = ({ photo, userName, size = 40, extraStyles }: any) => {
  return (
    <View>
      {photo ? (
        <Userpic source={{ uri: photo }} size={size} style={extraStyles} />
      ) : (
        <Userpic name={userName} size={size} style={extraStyles} />
      )}
    </View>
  );
};

export default CustomProfileAvatar;
